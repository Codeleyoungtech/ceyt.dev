export type ProjectStatus = "shipped" | "in-lab";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  featured?: boolean;
  summary: string;
  focus: string;
  stack: string[];
  links: {
    live?: string;
    github?: string;
  };
  details: {
    why: string;
    build: string;
    outcome: string;
    portfolioAngle?: string;
    metrics: string[];
  };
  screenshotPlaceholder: string;
  image?: string;
};

export const profile = {
  brand: "CEYT",
  name: "Eleazar Ogoyemi",
  role: "Full Stack Software Engineer at Alpinebolt",
  bio: "18-year-old solo indie dev and CS student (University of Ibadan, expected 2028), building under Eleyoungtech.",
  focus: "Building Flustro, growing Zeyt, and shipping practical AI + Rust tools.",
  contact: {
    email: "eleazar@codeleyoungtech.dev",
    github: "https://github.com/codeleyoungtech",
    linkedin: "https://www.linkedin.com/in/eleazar-ogoyemi",
    x: "https://x.com/codeleyoungtech",
    threads: "https://www.threads.net/@codeleyoungtech",
  },
};

export const projects: Project[] = [
  {
    slug: "flustro",
    name: "Flustro",
    status: "shipped",
    featured: true,
    summary:
      "Offline-first voice dictation desktop app with real paying users and a Free/Pro model.",
    focus:
      "Fast, local-first dictation that still feels premium for daily writing and coding workflows.",
    stack: ["Tauri v2", "Rust", "React", "Python", "Faster-Whisper", "Moonshine"],
    links: { live: "https://flustro.app" },
    details: {
      why: "Most dictation products force cloud dependency, latency, or privacy tradeoffs. Flustro exists to make voice input dependable even when offline.",
      build:
        "Built with a Rust/Tauri shell and a Python sidecar for local transcription models, with desktop UX tuned for low-friction capture.",
      outcome:
        "Flustro is active with paying users and remains the flagship product in the CEYT portfolio.",
      metrics: [
        "[PLACEHOLDER: Add publicly-shareable user count or retention metric from Eleazar.]",
      ],
    },
    screenshotPlaceholder:
      "[PLACEHOLDER: Add real Flustro screenshots or a short screen recording from production use.]",
    image: "/projects/flustro.png",
  },
  {
    slug: "zeyt",
    name: "Zeyt",
    status: "shipped",
    featured: true,
    summary:
      "Open-source, GPU-optional terminal emulator with real users and CI/CD release flow.",
    focus:
      "A terminal that stays practical: native app ergonomics, predictable performance, and transparent open-source iteration.",
    stack: ["Tauri v2", "Rust", "portable-pty", "React", "xterm.js", "GitHub Actions"],
    links: {
      live: "https://zeyt.tech",
      github: "https://github.com/codeleyoungtech/zeyt",
    },
    details: {
      why: "Zeyt started as a direct response to the friction of terminal workflows that feel heavy or brittle across environments.",
      build:
        "Core PTY behavior is handled in Rust with portable-pty, while the UI layer uses React + xterm.js and ships via automated GitHub Releases.",
      portfolioAngle:
        "This portfolio page focuses on engineering choices, lessons learned, and product iteration context, not duplicating zeyt.tech documentation.",
      outcome:
        "Zeyt has real users providing feedback through issues and release testing loops.",
      metrics: [
        "GitHub star count intentionally not highlighted at this stage; shipping velocity and user feedback loops are prioritized.",
      ],
    },
    screenshotPlaceholder:
      "[PLACEHOLDER: Add real Zeyt screenshots and terminal-in-use sequence.]",
    image: "/projects/zeyt.png",
  },
  {
    slug: "swyp",
    name: "Swyp",
    status: "shipped",
    featured: true,
    summary:
      "In-house AI carousel generation engine for Eleyoungtech brands and social content workflows.",
    focus:
      "Automating content generation with control over speed, visual consistency, and output quality.",
    stack: ["Cloudflare Workers", "Hono", "Satori", "resvg", "R2", "D1"],
    links: {},
    details: {
      why: "Manual social-carousel production was a bottleneck. Swyp was built to reduce turnaround time while preserving brand quality.",
      build:
        "A Worker-first pipeline composes images and text server-side using Satori/resvg, then stores outputs and metadata in R2 + D1.",
      outcome:
        "Swyp is used internally and directly supports ongoing build-in-public publishing velocity.",
      metrics: [
        "[PLACEHOLDER: Add internal throughput metric (e.g., average generation time or posts/week supported).]",
      ],
    },
    screenshotPlaceholder:
      "[PLACEHOLDER: Add real Swyp output examples from live usage.]",
    image: "/projects/swyp.png",
  },
  {
    slug: "desplio",
    name: "Desplio",
    status: "in-lab",
    summary: "Linux-first virtual display streaming exploration.",
    focus: "Rust + WebRTC + evdi experiments for robust multi-display workflows.",
    stack: ["Rust", "WebRTC", "evdi", "Linux"],
    links: {},
    details: {
      why: "Portable remote display workflows still have rough edges on Linux-heavy setups.",
      build: "Prototype architecture and transport decisions are being iterated.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Concept diagram or prototype capture.]",
  },
  {
    slug: "provel",
    name: "Provel",
    status: "in-lab",
    summary: "Offline-first productivity app exploration.",
    focus: "Ionic + Capacitor app architecture with robust offline sync strategy.",
    stack: ["Ionic", "Capacitor", "TypeScript"],
    links: {},
    details: {
      why: "Productivity tools often collapse without stable network conditions.",
      build: "Local-first task and state management prototypes in progress.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Prototype screenshots.]",
  },
  {
    slug: "eply",
    name: "EPLY",
    status: "in-lab",
    summary: "WhatsApp AI agent concept.",
    focus: "Conversation workflows and automation logic for messaging-native AI interactions.",
    stack: ["WhatsApp APIs", "TypeScript", "AI tooling"],
    links: {},
    details: {
      why: "Messaging-first interfaces are often where automation is most useful.",
      build: "Flow design and backend command orchestration prototypes are in progress.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Flow capture.]",
  },
  {
    slug: "offrr",
    name: "Offrr",
    status: "in-lab",
    summary: "AI job aggregator concept.",
    focus: "Ranking and curation workflows for practical hiring discovery.",
    stack: ["TypeScript", "Workers", "AI ranking"],
    links: {},
    details: {
      why: "Job-search signal-to-noise is poor for many early-career devs.",
      build: "Source aggregation and scoring strategy in active development.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: UI concept capture.]",
  },
  {
    slug: "diaforga",
    name: "Diaforga",
    status: "in-lab",
    summary: "Autonomous social content engine concept.",
    focus: "Planning, generation, and scheduling loops with human override control.",
    stack: ["Workers", "AI pipelines", "Scheduling"],
    links: {},
    details: {
      why: "Consistent publishing pipelines are hard to sustain manually.",
      build: "Autonomous generation loop and approval checkpoints are in exploration.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Pipeline diagram.]",
  },
  {
    slug: "zyqonet",
    name: "ZyqoNet",
    status: "in-lab",
    summary: "Network/system concept in early R&D.",
    focus: "Low-level architecture exploration and feasibility checks.",
    stack: ["Rust", "Systems"],
    links: {},
    details: {
      why: "A space to explore systems-level constraints before full productization.",
      build: "Prototype assumptions and architecture notes in progress.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Architecture notes.]",
  },
  {
    slug: "prospectai",
    name: "ProspectAI",
    status: "in-lab",
    summary: "Prospecting automation concept.",
    focus: "Pipeline automation with practical guardrails and human review points.",
    stack: ["TypeScript", "AI automation"],
    links: {},
    details: {
      why: "Outreach pipelines need better quality control than raw automation.",
      build: "Scoring, drafting, and review workflows are in iterative design.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Product direction notes.]",
  },
  {
    slug: "wraven-labs-watch-showcase",
    name: "Wraven Labs Watch Showcase",
    status: "in-lab",
    summary: "Concept showcase project for watch-focused presentation workflows.",
    focus: "Visual storytelling experiments for product showcases.",
    stack: ["Web", "Content tooling"],
    links: {},
    details: {
      why: "Exploration of high-polish visual product narratives.",
      build: "Layout and storytelling prototypes in progress.",
      outcome: "In active exploration; not shipped.",
      metrics: ["Concept stage — no public metrics yet."],
    },
    screenshotPlaceholder: "[PLACEHOLDER: Showcase mock preview.]",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const inLabProjects = projects.filter((project) => project.status === "in-lab");

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
