export type ProjectStoryMetric = {
  readonly label: string;
  readonly value: string;
};

export type ProjectStoryBrief = {
  readonly eyebrow: string;
  readonly focus: string;
  readonly outcome: string;
  readonly metrics: readonly ProjectStoryMetric[];
  readonly readMap: readonly string[];
};

export const projectStoryBriefs: Record<string, ProjectStoryBrief> = {
  "60s-pulse": {
    eyebrow: "Hackathon case study",
    focus:
      "A launch-risk dashboard that turns campaign material into objection clusters, stakeholder verdicts, and a fix ladder.",
    outcome:
      "Won Agent Forge AI Hackathon 2026 by making AI criticism feel operational instead of abstract.",
    metrics: [
      { label: "panel", value: "60 AI critics" },
      { label: "result", value: "1st place" },
      { label: "mode", value: "demo-safe replay" },
    ],
    readMap: [
      "Risk surface before launch",
      "60-agent panel design",
      "Sponsor stack and demo path",
      "Production hardening",
    ],
  },
  interviewpilot: {
    eyebrow: "AI interview coach",
    focus:
      "A browser-based mock interview loop with speech, webcam recording, adaptive follow-ups, and scored feedback.",
    outcome:
      "Turns interview practice from a static question bank into a complete listen, evaluate, follow-up, review workflow.",
    metrics: [
      { label: "modes", value: "4 interview types" },
      { label: "feedback", value: "4 score dimensions" },
      { label: "language", value: "English + Korean" },
    ],
    readMap: [
      "Feedback-starved practice",
      "Speech and video interview loop",
      "Async upload pipeline",
      "Difficulty-calibrated scoring",
      "Bilingual delivery",
    ],
  },
  pricewise: {
    eyebrow: "Agentic shopping research",
    focus:
      "A conversational shopping agent that searches, compares, reviews, calculates, and asks for approval before risky external actions.",
    outcome:
      "Compresses a multi-tab purchase research session into one structured recommendation with a transparent action trail.",
    metrics: [
      { label: "tools", value: "10 agent tools" },
      { label: "control", value: "selective approvals" },
      { label: "transport", value: "dual SSE streams" },
    ],
    readMap: [
      "Shopping research pain",
      "Agent tools and trust layer",
      "Selective interrupt design",
      "Streaming and persistence",
      "Recommendation output",
    ],
  },
  "colonial-archives": {
    eyebrow: "Digital humanities Graph-RAG",
    focus:
      "A research interface that turns scanned CO 273 archive PDFs into source-grounded answers, graph exploration, and exact page-level citations.",
    outcome:
      "Makes messy colonial records searchable without letting the AI drift away from the documents it can prove.",
    metrics: [
      { label: "corpus", value: "30 documents" },
      { label: "graph", value: "1,959 graph nodes" },
      { label: "links", value: "8,952 edges" },
    ],
    readMap: [
      "Archive access problem",
      "Nine-step ingestion pipeline",
      "Hybrid vector and graph retrieval",
      "Citation and PDF verification loop",
      "Graph visualization at scale",
    ],
  },
  "devg-website": {
    eyebrow: "Community platform",
    focus:
      "A fast public website for Developer Group @ NUS Computing that supports events, partners, and community discovery.",
    outcome:
      "Gives a 2,300+ follower student tech community a credible home beyond social posts and message threads.",
    metrics: [
      { label: "community", value: "2,300+ followers" },
      { label: "build", value: "Vite SPA" },
      { label: "goal", value: "partner-ready" },
    ],
    readMap: [
      "Community need",
      "Design philosophy",
      "Vite SPA architecture",
      "Events and partners",
      "Impact",
    ],
  },
};
