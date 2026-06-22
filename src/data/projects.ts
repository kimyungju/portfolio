export interface Project {
  slug: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  badge?: string;
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
    slug: "60s-pulse",
    number: "//1",
    title: "60's Pulse",
    badge: "AI Premortem Dashboard",
    description:
      "Agent Forge Hackathon Winner: an AI premortem dashboard for pressure-testing product and campaign launches with 60 AI critics before they reach the public.",
    longDescription:
      "Built at Agent Forge AI Hackathon 2026, 60's Pulse turns campaign copy, keynotes, images, or videos into a launch-risk war room: Blast Score, 60-agent reactions, objection clusters, blast maps, stakeholder verdicts, and the cheapest fix path.",
    techStack: ["Python", "FastAPI", "Kimi", "Bright Data", "Daytona", "VideoDB"],
    liveUrl: "https://60s-pulse-production.up.railway.app",
    githubUrl: "https://github.com/kimyungju/AI-Forge-Hackathon",
    logoSrc: "/projects/60s-pulse-logo.svg",
    previewSrc: "/projects/60s-pulse-preview.png",
    readTime: "4 min read",
    publishDate: "20 June 2026",
    overlayColor: "#ff3355",
    letterImages: ["/projects/60s-pulse-preview.png"],
  },
  {
    slug: "interviewpilot",
    number: "//2",
    title: "InterviewPilot",
    badge: "AI Interview Coach",
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
    number: "//3",
    title: "PriceWise",
    badge: "AI Shopping Agent",
    description:
      "An autonomous AI shopping agent that compares prices and reviews across retailers, delivering structured receipts via a conversational interface with selective human-in-the-loop approval.",
    longDescription:
      "Engineered a LangGraph agent with 10 orchestrated tools, dual-mode SSE streaming, persistent checkpointing via AsyncPostgresSaver, and conversation summarization with safe message splitting.",
    techStack: ["LangGraph", "FastAPI", "OpenAI", "Next.js", "PostgreSQL", "Docker"],
    liveUrl: "https://pricewise-ai-shop.vercel.app/",
    githubUrl: "https://github.com/kimyungju/pricewise",
    logoSrc: "/projects/pricewise-logo.png",
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
    slug: "colonial-archives",
    number: "//4",
    title: "Colonial Archives",
    badge: "Graph-RAG Research Tool",
    description:
      "A source-grounded Graph-RAG research tool for colonial-era archive documents, combining OCR, vector search, Neo4j graph traversal, and page-level citations.",
    longDescription:
      "Ingests CO 273 scanned PDFs through Document AI OCR, Vertex AI embeddings and search, Gemini entity extraction, and Neo4j MERGE to build a traceable knowledge graph for archive-first Q&A.",
    techStack: ["Python", "FastAPI", "React", "TypeScript", "Vertex AI", "Neo4j"],
    liveUrl: "https://colonial-archives.vercel.app/",
    githubUrl: "https://github.com/kimyungju/colonial-archives",
    logoSrc: "/projects/colonial-archives-logo.png",
    previewSrc: "/projects/colonial-archives-preview.png",
    readTime: "5 min read",
    publishDate: "2 March 2026",
    overlayColor: "#d4ad6a",
    letterImages: [
      "/projects/colonial-archives-preview.png",
      "/projects/colonial-archives-logo.png",
    ],
  },
  {
    slug: "devg-website",
    number: "//5",
    title: "DG Website",
    badge: "Developer Community",
    description:
      "The official website for Developer Group @ NUS Computing, showcasing events, initiatives, and partner collaborations for a 2,300+ follower student tech community.",
    longDescription:
      "Designed and developed the organization website to improve visibility and outreach, supporting event promotion and community engagement.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://dg-nus.vercel.app/#/about",
    githubUrl: "https://github.com/kimyungju/devg-website",
    logoSrc: "/projects/devg-logo.png",
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
