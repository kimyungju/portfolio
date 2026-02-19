export interface Project {
  slug: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  mobileSrc?: string;
  logoSrc: string;
  previewSrc: string;
  readTime: string;
  publishDate: string;
}

export const projects: Project[] = [
  {
    slug: "pricewise",
    number: "//1",
    title: "PriceWise",
    description:
      "An autonomous AI shopping agent that compares prices and reviews across retailers, delivering structured receipts via a conversational interface with selective human-in-the-loop approval.",
    longDescription:
      "Engineered a LangGraph agent with 10 orchestrated tools, dual-mode SSE streaming, persistent checkpointing via AsyncPostgresSaver, and conversation summarization with safe message splitting.",
    techStack: ["LangGraph", "FastAPI", "OpenAI", "Next.js", "PostgreSQL", "Docker"],
    liveUrl: "https://pricewise-ai-shop.vercel.app/",
    logoSrc: "/projects/pricewise-logo.svg",
    previewSrc: "/projects/pricewise-preview.png",
    readTime: "5 min read",
    publishDate: "19 February 2026",
  },
  {
    slug: "interviewpilot",
    number: "//2",
    title: "InterviewPilot",
    description:
      "A full-stack mock interview platform that generates role-tailored questions, conducts speech-based interviews with webcam recording, and delivers AI-scored feedback.",
    longDescription:
      "Implemented multi-turn conversational flow with AI-generated follow-up questions, fire-and-forget video upload pipeline with late URL patching, and cross-browser MediaRecorder MIME negotiation. Bilingual support (English/Korean) with dual TTS pipeline and CJK PDF export.",
    techStack: ["Next.js", "React", "TypeScript", "OpenAI", "Supabase", "Clerk"],
    liveUrl: "https://interview-pilot-ace.vercel.app/",
    logoSrc: "/projects/interviewpilot-logo.svg",
    previewSrc: "/projects/interviewpilot-preview.png",
    readTime: "5 min read",
    publishDate: "19 February 2026",
  },
  {
    slug: "castory",
    number: "//3",
    title: "Castory",
    description:
      "A full-stack SaaS platform enabling users to generate AI-narrated podcasts from trending news via a 5-step guided workflow using OpenAI.",
    longDescription:
      "Implemented chunked TTS pipeline, persistent audio player, full-text search, draft auto-save, and dynamic user profiles with listener analytics.",
    techStack: ["Next.js", "React", "TypeScript", "Convex", "OpenAI", "Clerk"],
    liveUrl: "https://castory-ai.vercel.app/",
    logoSrc: "/projects/castory-logo.svg",
    previewSrc: "/projects/castory-preview.png",
    readTime: "4 min read",
    publishDate: "19 February 2026",
  },
  {
    slug: "devg-website",
    number: "//4",
    title: "DevG Website",
    description:
      "The official website for Developer Group @ NUS Computing, showcasing events, initiatives, and partner collaborations for a 2,300+ follower student tech community.",
    longDescription:
      "Designed and developed the organization website to improve visibility and outreach, supporting event promotion and community engagement.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    logoSrc: "/projects/devg-logo.svg",
    previewSrc: "/projects/devg-preview.svg",
    readTime: "3 min read",
    publishDate: "19 February 2026",
  },
];
