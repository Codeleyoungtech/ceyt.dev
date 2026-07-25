"use server";

import type { ContactState } from "./types";

function resolveContactEndpoint(rawEndpoint: string): string {
  const trimmed = rawEndpoint.trim();
  if (trimmed.endsWith("/contact")) {
    return trimmed;
  }

  return `${trimmed.replace(/\/+$/, "")}/contact`;
}

export async function submitContact(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Name, email, and message are required." };
  }

  const endpointEnv = process.env.CONTACT_WORKER_ENDPOINT;
  if (!endpointEnv) {
    return {
      ok: false,
      message: "Contact endpoint is not configured. Set CONTACT_WORKER_ENDPOINT.",
    };
  }

  let endpoint: string;
  try {
    endpoint = new URL(resolveContactEndpoint(endpointEnv)).toString();
  } catch {
    return {
      ok: false,
      message: "CONTACT_WORKER_ENDPOINT is invalid. Use a full https URL.",
    };
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, message }),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      message: "Contact service is unreachable right now. Please try again shortly.",
    };
  }

  if (!response.ok) {
    let errorCode = "request-failed";

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (contentType.includes("application/json")) {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) {
        errorCode = payload.error;
      }
    }

    return {
      ok: false,
      message: `Message was not sent (${errorCode}). Please review your details and try again.`,
    };
  }

  return { ok: true, message: "Message sent successfully. Eleazar will reply by email." };
}
