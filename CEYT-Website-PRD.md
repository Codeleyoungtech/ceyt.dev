# CEYT — codeleyoungtech.dev
## Product Requirements Document & Build Prompt for AI Agent

**Owner:** Eleazar Ogoyemi (Eleyoungtech / @codeleyoungtech, "CEYT")
**Domain:** codeleyoungtech.dev
**Status:** v1.0 — ready to build
**Goal:** A personal developer site that reads as award-tier (Awwwards / CSS Design Awards caliber) — the kind of site that makes a recruiter, a fellow dev, and a build-in-public follower all stop scrolling. It needs to work equally hard for all three audiences: it's a hiring signal, a project showcase, and a home base for build-in-public content.

---

## 1. Who this is for (context the agent needs)

Eleazar is an 18-year-old solo indie developer and CS distance-learning student (University of Ibadan, expected 2028), building under the brand **Eleyoungtech**. His coding identity — "CEYT" / codeleyoungtech — is the developer-facing brand, kept deliberately separate from Eleyoungtech's consumer/gadget-review identity.

**Day job:** Full Stack Software Engineer at Alpinebolt (remote), ~40% author of FieldPilot, a Next.js AI voice-agent scheduling platform.

**Core stack he already works in daily** (the site should feel native to this world, not like a template): TypeScript, React, Next.js, Express.js, Rust, Tauri v2, Cloudflare Workers/D1/KV/Queues, Hono, Drizzle ORM, Capacitor, Groq, WebRTC.

**Shipped/active projects to feature** (real, not placeholders):
- **Flustro** (flustro.app) — offline-first voice dictation desktop app. Tauri v2 + Rust + React + Python (Faster-Whisper/Moonshine) sidecar. Real paying users, Free/Pro tiers. Flagship product.
- **Zeyt** (github.com/codeleyoungtech/zeyt, zeyt.tech) — open-source GPU-optional terminal emulator. Tauri v2 + Rust (portable-pty) + React + xterm.js. Real users (tipdevs and others), public GitHub Releases via CI/CD.
- **Swyp** — in-house AI carousel-generation tool for his own brands. Cloudflare Workers + Hono + Satori/resvg + R2/D1.

**In-development / conceptual work worth a lighter-weight showcase** (don't oversell these as shipped — frame as "in the lab" or "explorations"): Desplio (Linux-first virtual display streaming, Rust/WebRTC/evdi), Provel (offline-first productivity app, Ionic/Capacitor), EPLY (WhatsApp AI agent), Offrr (AI job aggregator), Diaforga (autonomous social content engine), ZyqoNet, ProspectAI, Wraven Labs Watch Showcase.

**Voice:** direct, informal, honest — he prefers frank communication over polish-for-polish's-sake. The copy on this site should sound like him talking, not like marketing copy generated for a generic SaaS.

---

## 2. Design direction

*(Read this section as design law — don't default to generic AI-portfolio patterns: no cream-background-with-terracotta-accent, no near-black-with-acid-green, no broadsheet-hairline-newspaper layout. Build something that could only be this person's site.)*

**Concept: "The Editor."** Eleazar lives inside a terminal and a code editor all day — that's the actual, honest source material, not a borrowed aesthetic. The site should feel like a beautifully-crafted dev environment: syntax-highlighting-inspired color logic, monospace used with real purpose (not just for flavor), and a hero built around a live-typed terminal sequence rather than a generic headline-plus-gradient-blob.

**Color tokens:**
| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#0D0F14` | primary background, near-black but with a blue undertone (not pure black) |
| `--bg-raised` | `#151822` | cards, panels, code blocks |
| `--text-primary` | `#F1F3F7` | body/headline text |
| `--text-muted` | `#8B92A6` | secondary text, captions |
| `--accent-indigo` | `#6E5BFF` | primary accent — links, active states, cursor blink |
| `--accent-amber` | `#FFB454` | secondary accent — used sparingly, like a syntax-highlight keyword color, for emphasis words and hover states only |

Two accents, not one, because the whole concept is "editor syntax theme" — indigo reads as keyword/function color, amber as string/constant color. Never let them appear with equal weight in one place; indigo dominates, amber punctuates.

**Type:**
- Display / signature face: a real monospace with personality — **Fragment Mono** or **JetBrains Mono** (not the default system mono). Used for the hero terminal sequence, section labels, and nav.
- Body face: a clean geometric/humanist sans — **Inter** or **General Sans** — for anything longer than a line, so long-form (blog, about, project write-ups) stays readable.
- Numerals and data (stats, dates) can stay in the mono face even inside sans paragraphs — this is intentional, not an accident.

**Layout concept:**
```
┌─────────────────────────────────────┐
│  ceyt_  [projects] [writing] [about]│  <- nav, monospace, thin, sticky
├─────────────────────────────────────┤
│                                       │
│   $ whoami                          │  <- hero: real terminal sequence
│   eleazar — full stack dev, 18       │     types itself out on load,
│   $ cat focus.md                     │     then settles. cursor keeps
│   building flustro, zeyt, and        │     blinking. this is the ONE
│   whatever's next                    │     big animated moment.
│   $ _                                │
│                                       │
├─────────────────────────────────────┤
│  FEATURED PROJECTS                   │  <- 3 large cards: Flustro,
│  [ big card ] [ big card ] [ card ]  │     Zeyt, Swyp. Screenshot/
│                                       │     demo-first, not logo-first
├─────────────────────────────────────┤
│  IN THE LAB                          │  <- smaller grid, in-progress
│  [sm][sm][sm][sm][sm][sm][sm][sm]    │     work, honestly labeled
├─────────────────────────────────────┤
│  LATEST WRITING          [view all]  │  <- 3 most recent posts
├─────────────────────────────────────┤
│  $ contact --reach-out                │  <- footer, terminal-styled
└─────────────────────────────────────┘
```

**Motion:** One orchestrated moment (the hero terminal type-on), not scattered effects everywhere. Beyond that: subtle scroll-reveal on section entry (fade + 8px rise, nothing more), hover states that feel like a cursor landing on a clickable token in an editor (underline draws in, color shifts), and a custom cursor state on interactive elements is optional — only add if it doesn't feel gimmicky on review. Respect `prefers-reduced-motion` everywhere.

**Signature element:** the live-typed terminal hero, and a recurring `$` prompt motif used as a section marker throughout the site (e.g., blog posts introduced as `$ cat posts/slug.md`). This is the one idea to spend the "boldness budget" on — everything else stays quiet and disciplined.

**Explicitly avoid:** numbered 01/02/03 markers unless something is a genuine sequence; gradient blobs; generic "hire me" hero banners; stock illustration; excessive glassmorphism.

---

## 3. Tech stack (and why)

**Recommendation: Next.js 15 (App Router) on Vercel, with Cloudflare Workers/D1 for anything stateful.**

Eleazar floated Vercel — that's the right call for the frontend. Reasoning:
- Next.js on Vercel gives the smoothest path to the motion/animation quality this brief demands (App Router, streaming, image optimization, edge middleware, instant preview deployments for iterating on design).
- GitHub Student Developer Pack includes Vercel benefits — confirm current terms at the time of setup since offers change.
- **But** don't migrate his backend logic off Cloudflare just to be "all-Vercel." He already runs a Cloudflare Workers/Hono/D1/Drizzle stack daily across Flustro, Swyp, and other projects — reuse that fluency. Any stateful feature (contact form storage, blog post storage/CMS, view counters, newsletter signup) should hit a small Cloudflare Worker + D1 API rather than introducing a third data layer. This keeps one consistent backend pattern across his entire portfolio of projects, not two.

**Stack:**
- **Framework:** Next.js 15 (App Router, Server Components by default, Server Actions for simple form submits)
- **Language:** TypeScript throughout
- **Styling:** Tailwind CSS v4 + a small custom design-token layer (CSS variables from Section 2) — no heavy component-library default look; use shadcn/ui only as unstyled primitives (dialogs, dropdowns) if needed, always re-skinned
- **Motion:** Framer Motion (Motion for React) for the hero sequence and scroll reveals
- **Content/Blog:** MDX for post content, stored either as local `.mdx` files in-repo (simplest, ships with the site build, good enough for v1) or served from a small Cloudflare D1-backed API if he wants to publish without redeploying — **ask Eleazar which he prefers before building** (recommend starting file-based MDX for v1, migrate to D1-backed CMS later if posting cadence gets high)
- **Contact form:** Server Action → Cloudflare Worker endpoint → D1, with email notification via a simple provider (Resend is the easiest fit here)
- **Analytics:** PostHog (he already uses it for Flustro — reuse the same account/project pattern)
- **Fonts:** self-hosted via `next/font` (Fragment Mono or JetBrains Mono + Inter/General Sans) — never load from a render-blocking external CDN
- **Deployment:** Vercel, custom domain `codeleyoungtech.dev` pointed via DNS (A/CNAME records provided by Vercel once the project is created)
- **Version control:** GitHub, repo under the `codeleyoungtech` account, so it matches his existing project ecosystem

---

## 4. Site structure / pages

| Route | Purpose |
|---|---|
| `/` | Home — hero terminal sequence, featured projects (Flustro, Zeyt, Swyp), "in the lab" grid, latest 3 posts, contact footer |
| `/projects` | Full project index — featured + in-the-lab, filterable by stack/status |
| `/projects/flustro` | Case-study page: problem, stack, screenshots/demo, metrics if shareable, link to flustro.app |
| `/projects/zeyt` | Case-study page: same pattern, links to GitHub + zeyt.tech (avoid duplicating zeyt.tech's own content — this page is the "portfolio angle" on Zeyt: why he built it, what he learned, not the product's own docs) |
| `/projects/swyp` | Case-study page |
| `/projects/[slug]` | Template for every other project (Desplio, Provel, EPLY, Offrr, Diaforga, etc.) — lighter template, honestly labeled as concept/in-progress where true |
| `/writing` | Blog index — this doubles as a home for adapted versions of his Build Story content format |
| `/writing/[slug]` | Individual post, MDX-rendered, `$ cat posts/slug.md` header treatment |
| `/about` | Real bio — CS student at UI, Alpinebolt role, brand history since 2021, meditation/lotus-pose detail if he wants a personal touch, photo or illustrated avatar |
| `/resume` | Live version of his existing ATS resume — HTML formatted to match site design, with a "Download PDF" button that serves the actual ATS-formatted PDF (don't let the pretty HTML version replace the ATS-safe PDF recruiters may run through parsers) |
| `/contact` | Simple form (name, email, message) + direct links to X, Threads, LinkedIn, GitHub, email |
| `/uses` *(optional, dev-culture staple, ask if he wants it)* | Linux Mint 22 Cinnamon setup, Zeyt as daily terminal, pnpm, WARP/ProtonVPN toggle, editor/tools — this is exactly the kind of page that resonates with the dev audience specifically |
| `404` | Custom, terminal-styled: `bash: /page: command not found` energy, with a way back home |

---

## 5. Content the agent needs from Eleazar before/during build

Ask directly rather than inventing placeholder copy for:
1. A real headshot/photo or a commissioned illustrated avatar for `/about` (no stock imagery)
2. Screenshots or short screen-recordings of Flustro and Zeyt in actual use, for the project case studies
3. Whether the blog is file-based MDX (simpler, redeploy to publish) or D1-backed (can publish without a redeploy) — see Section 3
4. Whether `/uses` should exist
5. Final call on featuring in-progress/conceptual projects publicly (Desplio, Provel, etc.) vs. keeping the site tighter with only shipped work
6. Real metrics he's comfortable sharing publicly (e.g. Flustro user counts, Zeyt GitHub stars) — only include numbers he confirms, never estimate or invent them

My answers Blog: file-based MDX. Decided, not left open.
Simpler to ship, versioned in git alongside your code (fits how you already work), zero extra backend to maintain, and completely sufficient for your actual posting cadence right now. You migrate to a D1-backed CMS later only if you're publishing so often that redeploying to post becomes annoying — that's a "nice problem to have," not a v1 concern.

/uses — yes, keep it in. Cheap to build, you already have the content (Linux Mint 22 Cinnamon, Zeyt as your terminal, pnpm, WARP/ProtonVPN toggle), and it's one of the highest-signal pages for the dev-audience segment specifically. No real reason to cut it.

Zeyt at 3 stars — don't show that number on the site yet. Frank take: a star count that low next to Flustro's real user base actually undersells Zeyt rather than helping it. I'd drop GitHub stars as a displayed metric entirely for now and lean on what's actually impressive instead — it's a real open-source terminal emulator with CI/CD-driven public releases and real users giving you bug feedback (tipdevs). That's a stronger, truer story than a vanity number this early. Revisit showing stars once it's in the hundreds.
---

## 6. Non-negotiable quality bar

- **Performance:** Core Web Vitals green across the board; hero animation must not block LCP — use a lightweight initial paint with the terminal type-on layered on top, not blocking first render.
- **Accessibility:** full keyboard navigation, visible focus states styled to match the design system (not a default blue outline), semantic HTML, alt text on every image, `prefers-reduced-motion` respected (hero should show final state immediately, no forced animation).
- **Responsive:** the terminal hero and project cards need real mobile-specific layouts, not just a squeezed desktop grid — test at 375px width first, not last.
- **SEO:** proper metadata/OG images per page (auto-generate OG images per blog post and per project using `next/og` so shares look designed, not default), sitemap.xml, robots.txt.
- **No dead ends:** every page needs a clear next action (view project → try it / view code; read post → see more posts; land on 404 → get home).

---

## 7. Build prompt (paste this to the coding agent to kick off the build)

> Build a Next.js 15 (App Router, TypeScript) personal developer portfolio site for Eleazar Ogoyemi ("CEYT" / codeleyoungtech), deployed to Vercel at codeleyoungtech.dev. Follow the design system in Section 2 exactly — dark editor-inspired theme, indigo/amber two-accent syntax-highlight logic, Fragment Mono or JetBrains Mono paired with Inter, a single orchestrated hero moment built around a live-typed terminal sequence (`$ whoami` → bio → `$ cat focus.md` → current focus → blinking cursor), and the recurring `$` prompt motif as a structural device throughout. Build every page listed in Section 4, using the real project data in Section 1 — do not invent placeholder companies or fake testimonials. Use Tailwind CSS v4 with the CSS variable tokens from Section 2, Framer Motion for the hero and scroll-reveal animations only, MDX for blog content, and a small Cloudflare Worker + D1 API for the contact form. Hit every item in the Section 6 quality bar before considering any page done. Where content is missing (photos, screenshots, real metrics), leave a clearly marked placeholder and flag it back to Eleazar rather than inventing numbers or using stock imagery.

---

## 8. Launch checklist

- [ ] DNS: point `codeleyoungtech.dev` at Vercel (A/CNAME per Vercel's project setup)
- [ ] Verify GitHub Student Pack / Vercel student benefit status before relying on any free-tier assumption
- [ ] SSL auto-provisioned via Vercel
- [ ] PostHog project created/reused, event tracking on key CTAs (contact submit, project link-outs, resume download)
- [ ] OG images verified by pasting each key URL into X/Threads/LinkedIn share debuggers
- [ ] Lighthouse pass (Performance/Accessibility/Best Practices/SEO all 90+) before sharing publicly
- [ ] Cross-check `/projects/zeyt` doesn't duplicate zeyt.tech content 1:1 — link out instead
- [ ] Resume PDF matches the settled ATS rules already established (single-column, no em dashes, Education at bottom, etc.)
