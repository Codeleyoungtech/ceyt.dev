"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!key || !host) return;

    posthog.init(key, {
      api_host: host,
      person_profiles: "always",
      capture_pageview: true,
    });
  }, []);

  return null;
}
