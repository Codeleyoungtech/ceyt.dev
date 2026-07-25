"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ContactState } from "@/app/contact/types";

type ContactFormProps = {
  action: (_prevState: ContactState, formData: FormData) => Promise<ContactState>;
  initialState: ContactState;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded border border-[var(--accent-indigo)] px-4 py-2 font-mono text-sm text-[var(--text-primary)] hover:bg-[rgba(110,91,255,0.1)] disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "sending..." : "send message"}
    </button>
  );
}

export function ContactForm({ action, initialState }: ContactFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="editor-panel grid gap-4 rounded-xl p-5">
      <label className="grid gap-1">
        <span className="font-mono text-xs text-[var(--text-muted)]">name</span>
        <input
          required
          name="name"
          type="text"
          className="rounded border border-[var(--border-soft)] bg-transparent px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </label>
      <label className="grid gap-1">
        <span className="font-mono text-xs text-[var(--text-muted)]">email</span>
        <input
          required
          name="email"
          type="email"
          className="rounded border border-[var(--border-soft)] bg-transparent px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </label>
      <label className="grid gap-1">
        <span className="font-mono text-xs text-[var(--text-muted)]">message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="rounded border border-[var(--border-soft)] bg-transparent px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </label>
      <div className="flex items-center justify-between gap-3">
        <SubmitButton />
        <p className={state.ok ? "text-sm text-[var(--accent-indigo)]" : "text-sm text-[var(--accent-amber)]"}>{state.message}</p>
      </div>
    </form>
  );
}

