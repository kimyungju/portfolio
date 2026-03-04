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
  overlayColor?: string;
  letterImages?: string[];
}

export const projects: Project[] = [
  {
    slug: "interviewpilot",
    number: "//1",
    title: "InterviewPilot",
    description:
      "A full-stack mock interview platform that generates role-tailored questions, conducts speech-based interviews with webcam recording, and delivers AI-scored feedback.",
    longDescription:
      "Implemented multi-turn conversational flow with AI-generated follow-up questions, fire-and-forget video upload pipeline with late URL patching, and cross-browser MediaRecorder MIME negotiation. Bilingual support (English/Korean) with dual TTS pipeline and CJK PDF export.",
    techStack: ["Next.js", "React", "TypeScript", "OpenAI", "Supabase", "Clerk"],
    liveUrl: "https://interview-pilot-ace.vercel.app/",
    githubUrl: "https://github.com/kimyungju/interviewpilot",
    logoSrc: "/projects/interviewpilot-logo.svg",
    previewSrc: "/projects/interviewpilot-preview.png",
    readTime: "5 min read",
    publishDate: "19 February 2026",
    overlayColor: "#a78bfa",
    letterImages: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=200&h=200&fit=crop",
    ],
  },
  {
    slug: "pricewise",
    number: "//2",
    title: "PriceWise",
    description:
      "An autonomous AI shopping agent that compares prices and reviews across retailers, delivering structured receipts via a conversational interface with selective human-in-the-loop approval.",
    longDescription:
      "Engineered a LangGraph agent with 10 orchestrated tools, dual-mode SSE streaming, persistent checkpointing via AsyncPostgresSaver, and conversation summarization with safe message splitting.",
    techStack: ["LangGraph", "FastAPI", "OpenAI", "Next.js", "PostgreSQL", "Docker"],
    liveUrl: "https://pricewise-ai-shop.vercel.app/",
    githubUrl: "https://github.com/kimyungju/pricewise",
    logoSrc: "/projects/pricewise-logo.svg",
    previewSrc: "/projects/pricewise-preview.png",
    readTime: "5 min read",
    publishDate: "19 February 2026",
    overlayColor: "#22d3ee",
    letterImages: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=200&h=200&fit=crop",
    ],
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
    githubUrl: "https://github.com/kimyungju/castory",
    logoSrc: "/projects/castory-logo.svg",
    previewSrc: "/projects/castory-preview.png",
    readTime: "4 min read",
    publishDate: "19 February 2026",
    overlayColor: "#f97316",
    letterImages: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1487537023557-4ef09b0be3d4?w=200&h=200&fit=crop",
    ],
  },
  {
    slug: "devg-website",
    number: "//4",
    title: "DG Website",
    description:
      "The official website for Developer Group @ NUS Computing, showcasing events, initiatives, and partner collaborations for a 2,300+ follower student tech community.",
    longDescription:
      "Designed and developed the organization website to improve visibility and outreach, supporting event promotion and community engagement.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://dg-nus.vercel.app/#/about",
    githubUrl: "https://github.com/kimyungju/devg-website",
    logoSrc: "/projects/devg-logo.svg",
    previewSrc: "/projects/devg-preview.png",
    readTime: "3 min read",
    publishDate: "19 February 2026",
    overlayColor: "#34d399",
    letterImages: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=200&fit=crop",
    ],
  },
];
