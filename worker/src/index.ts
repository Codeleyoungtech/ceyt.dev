import type {
  D1Database,
  ExecutionContext,
} from "@cloudflare/workers-types";

export interface Env {
  CONTACT_DB: D1Database;
  CONTACT_ALLOWED_ORIGIN?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

function resolveAllowOrigin(request: Request, env: Env): string {
  const configured = env.CONTACT_ALLOWED_ORIGIN?.trim();
  if (!configured) {
    return "*";
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin === configured) {
    return requestOrigin;
  }

  return configured;
}

function corsHeaders(request: Request, env: Env): HeadersInit {
  return {
    "access-control-allow-origin": resolveAllowOrigin(request, env),
    "access-control-allow-methods": "POST,OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function jsonResponse(request: Request, env: Env, body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: corsHeaders(request, env),
  });
}

function validateContactPayload(payload: unknown):
  | { ok: true; value: ContactPayload }
  | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "invalid-body" };
  }

  const raw = payload as Partial<ContactPayload>;
  const name = raw.name?.trim();
  const email = raw.email?.trim().toLowerCase();
  const message = raw.message?.trim();

  if (!name || !email || !message) {
    return { ok: false, error: "missing-required-fields" };
  }

  if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "field-too-long" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "invalid-email" };
  }

  return { ok: true, value: { name, email, message } };
}

async function sendResendEmail(apiKey: string, to: string, from: string, payload: ContactPayload) {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `New contact from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    throw new Error(`resend-notification-failed:${resendResponse.status}:${details}`);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request, env),
      });
    }

    if (pathname !== "/contact") {
      return jsonResponse(request, env, { error: "not-found" }, 404);
    }

    if (request.method !== "POST") {
      return jsonResponse(request, env, { error: "method-not-allowed" }, 405);
    }

    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return jsonResponse(request, env, { error: "unsupported-content-type" }, 415);
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse(request, env, { error: "invalid-json" }, 400);
    }

    const validated = validateContactPayload(payload);
    if (validated.ok === false) {
      return jsonResponse(request, env, { error: validated.error }, 400);
    }

    await env.CONTACT_DB.prepare(
      "INSERT INTO contact_messages (name, email, message, created_at) VALUES (?1, ?2, ?3, ?4)",
    )
      .bind(validated.value.name, validated.value.email, validated.value.message, new Date().toISOString())
      .run();

    if (env.RESEND_API_KEY && env.CONTACT_NOTIFY_EMAIL) {
      const fromEmail = env.CONTACT_FROM_EMAIL ?? "portfolio@REPLACE_WITH_YOUR_DOMAIN";
      ctx.waitUntil(sendResendEmail(env.RESEND_API_KEY, env.CONTACT_NOTIFY_EMAIL, fromEmail, validated.value));
    }

    return jsonResponse(request, env, {
      ok: true,
      message: "Contact submission received.",
    });
  },
};
