# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark-themed personal portfolio website for Kim Yungju, closely matching the design of kennethsunjaya.com.

**Architecture:** Next.js 15 App Router with TypeScript and Tailwind CSS v4. Single-page layout with smooth scroll navigation. Project detail pages at `/projects/[slug]`. Static assets in `/public`. Reusable components in `/src/components`. Data-driven sections using typed constants in `/src/data`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion (scroll animations), Vercel deployment

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: entire project scaffold via `create-next-app`
- Modify: `tailwind.config.ts` (custom colors, fonts)
- Modify: `src/app/globals.css` (base styles)
- Modify: `src/app/layout.tsx` (fonts, metadata)

**Step 1: Create Next.js project**

Run from `C:\NUS\Projects\portfolio`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
Expected: Project scaffolded with `src/` directory structure.

**Step 2: Install additional dependencies**

```bash
npm install framer-motion react-icons
```

**Step 3: Configure Tailwind with custom theme**

Edit `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#0a0a0a",
        accent: "#3b82f6",
        "card-bg": "#141414",
        "badge-bg": "#1e1e1e",
        "text-muted": "#a1a1aa",
      },
      fontFamily: {
        primary: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
```

Note: Tailwind CSS v4 (which ships with latest create-next-app) uses CSS-based config instead of `tailwind.config.ts`. If the scaffold uses v4, configure the theme in `src/app/globals.css` using `@theme` instead:

```css
@import "tailwindcss";

@theme {
  --color-primary: #ffffff;
  --color-secondary: #0a0a0a;
  --color-accent: #3b82f6;
  --color-card-bg: #141414;
  --color-badge-bg: #1e1e1e;
  --color-text-muted: #a1a1aa;
}
```

**Step 4: Set up global styles**

Edit `src/app/globals.css` — add base body styles:
```css
body {
  @apply bg-secondary text-white antialiased overflow-x-hidden;
}

html {
  scroll-behavior: smooth;
}
```

**Step 5: Update layout.tsx with metadata**

Edit `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yungju Kim | Aspiring Software Engineer",
  description:
    "Personal portfolio of Yungju Kim — CS student at NUS, building AI-powered full-stack applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-primary`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 6: Verify build**

```bash
npm run build
```
Expected: Build succeeds with no errors.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind theme"
```

---

### Task 2: Create Data Layer

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/techStack.ts`
- Create: `src/data/socials.ts`

**Step 1: Create project data**

Create `src/data/projects.ts`:
```ts
export interface Project {
  slug: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  logoSrc: string;
  previewSrc: string;
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
    logoSrc: "/projects/pricewise-logo.png",
    previewSrc: "/projects/pricewise-preview.png",
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
    logoSrc: "/projects/interviewpilot-logo.png",
    previewSrc: "/projects/interviewpilot-preview.png",
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
    logoSrc: "/projects/castory-logo.png",
    previewSrc: "/projects/castory-preview.png",
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
    logoSrc: "/projects/devg-logo.png",
    previewSrc: "/projects/devg-preview.png",
  },
];
```

**Step 2: Create experience data**

Create `src/data/experience.ts`:
```ts
export interface ExperienceEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
  imageSrc?: string;
}

export const experiences: ExperienceEntry[] = [
  {
    year: "2021",
    title: "IB Diploma — 45/45 (Top 1%)",
    organization: "International School of Kuala Lumpur",
    description:
      "Achieved distinctions in Mathematics, Chemistry, Business, Economics, English, and Korean. Awarded IB Bilingual Diploma.",
  },
  {
    year: "2024",
    title: "Transferred to Computer Science",
    organization: "National University of Singapore",
    description:
      "Made an intentional pivot from Double Honours in BBA and Economics to Bachelor of Computing (Computer Science) to pursue technical specialization.",
  },
  {
    year: "2025",
    title: "Head of Technology",
    organization: "Developer Group @ NUS Computing",
    description:
      "Contributing to a student-led tech community with 2,300+ followers. Designed the organization website and organized Hack4Good 2026, a flagship hackathon for non-profit organizations.",
  },
  {
    year: "2025–2026",
    title: "Data Center Systems Intern",
    organization: "Lumcloon Energy",
    description:
      "Authored a 46-page internal assessment on Ireland's LEU framework. Modeled grid capacity constraints for hyperscale deployment and identified a 73MW capacity deficit.",
  },
];
```

**Step 3: Create tech stack data**

Create `src/data/techStack.ts`:
```ts
export interface TechItem {
  name: string;
  iconSlug: string;
}

export const techStack: TechItem[] = [
  { name: "JavaScript", iconSlug: "javascript" },
  { name: "Java", iconSlug: "java" },
  { name: "Python", iconSlug: "python" },
  { name: "C", iconSlug: "c" },
  { name: "SQL", iconSlug: "postgresql" },
  { name: "Next.js", iconSlug: "nextdotjs" },
  { name: "React", iconSlug: "react" },
  { name: "TypeScript", iconSlug: "typescript" },
  { name: "PostgreSQL", iconSlug: "postgresql" },
  { name: "Docker", iconSlug: "docker" },
  { name: "Tailwind CSS", iconSlug: "tailwindcss" },
];
```

**Step 4: Create socials data**

Create `src/data/socials.ts`:
```ts
export const socials = {
  email: "yjkim101002@gmail.com",
  phone: "+65 8889 1059",
  linkedin: "https://www.linkedin.com/in/yungju/",
  github: "https://github.com/kimyungju",
};
```

**Step 5: Verify build**

```bash
npm run build
```
Expected: Build succeeds.

**Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data layer for projects, experience, tech stack, and socials"
```

---

### Task 3: Build Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Navbar component**

Create `src/components/Navbar.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled ? "bg-secondary/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#" className="flex items-center">
        <Image src="/logo.svg" alt="YK" width={40} height={40} />
      </a>

      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm tracking-wider text-text-muted hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/resume.pdf"
          download
          className="rounded-full border border-white/20 px-5 py-2 text-sm tracking-wider hover:bg-white/10 transition-colors"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}
```

**Step 2: Add Navbar to page**

Replace content of `src/app/page.tsx`:
```tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 px-8">
        <p>Portfolio coming soon...</p>
      </div>
    </main>
  );
}
```

**Step 3: Create placeholder logo**

Create a simple SVG at `public/logo.svg` — text "YK" in a circle, white on transparent.

**Step 4: Verify dev server**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: Navbar visible at top with logo, links, and download button. Scrolling triggers backdrop blur.

**Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/app/page.tsx public/logo.svg
git commit -m "feat: add fixed navbar with smooth scroll and backdrop blur"
```

---

### Task 4: Build Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/TechStackStrip.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create TechStackStrip component**

Create `src/components/TechStackStrip.tsx`:
```tsx
import { techStack } from "@/data/techStack";
import {
  SiJavascript, SiPython, SiTypescript, SiReact, SiNextdotjs,
  SiPostgresql, SiDocker, SiTailwindcss, SiC,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  javascript: <SiJavascript size={28} />,
  java: <FaJava size={28} />,
  python: <SiPython size={28} />,
  c: <SiC size={28} />,
  typescript: <SiTypescript size={28} />,
  react: <SiReact size={28} />,
  nextdotjs: <SiNextdotjs size={28} />,
  postgresql: <SiPostgresql size={28} />,
  docker: <SiDocker size={28} />,
  tailwindcss: <SiTailwindcss size={28} />,
};

export default function TechStackStrip() {
  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {techStack.map((tech) => (
        <div
          key={tech.name}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
          title={tech.name}
        >
          {iconMap[tech.iconSlug]}
          <span className="text-sm hidden sm:inline">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}
```

Note: `react-icons/si` may not have `SiC` for the C language. If the import fails, use a custom SVG or text fallback for C.

**Step 2: Create Hero component**

Create `src/components/Hero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import TechStackStrip from "./TechStackStrip";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
      >
        Aspiring Software Engineer.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl"
      >
        &ldquo;I&apos;m Yungju — I build AI-powered full-stack applications
        focused on turning ideas into products that solve real problems.&rdquo;
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <TechStackStrip />
      </motion.div>
    </section>
  );
}
```

**Step 3: Add Hero to page**

Update `src/app/page.tsx`:
```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
```

**Step 4: Verify dev server**

```bash
npm run dev
```
Expected: Full-viewport hero with animated headline, subtitle, and tech icons.

**Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/TechStackStrip.tsx src/app/page.tsx
git commit -m "feat: add hero section with animated headline and tech stack strip"
```

---

### Task 5: Build Projects Section

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/Projects.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ProjectCard component**

Create `src/components/ProjectCard.tsx`:
```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-24"
    >
      <span className="text-text-muted text-sm font-mono">{project.number}</span>

      <div className="mt-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={project.logoSrc}
              alt={`${project.title} logo`}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
          </div>

          <p className="text-text-muted leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-badge-bg px-3 py-1 text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition-colors"
              >
                View Project
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-full bg-white text-secondary px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Read Full Story
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Image
            src={project.previewSrc}
            alt={`${project.title} preview`}
            width={1080}
            height={608}
            className="rounded-xl border border-white/10"
          />
        </div>
      </div>
    </motion.div>
  );
}
```

**Step 2: Create Projects section**

Create `src/components/Projects.tsx`:
```tsx
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 lg:px-24 py-24">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}
```

**Step 3: Create placeholder project images**

Create placeholder images in `public/projects/` — 4 logo placeholders (48x48 PNG) and 4 preview placeholders (1080x608 PNG). Use solid colored rectangles with project names as text.

**Step 4: Add Projects to page**

Update `src/app/page.tsx` to include `<Projects />` after `<Hero />`.

**Step 5: Verify dev server**

Expected: Four project cards visible with numbering, descriptions, tech badges, and buttons.

**Step 6: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/Projects.tsx src/app/page.tsx public/projects/
git commit -m "feat: add projects section with animated cards and tech badges"
```

---

### Task 6: Build Experience Section

**Files:**
- Create: `src/components/ExperienceTimeline.tsx`
- Create: `src/components/ImageCarousel.tsx`
- Create: `src/components/Experience.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ExperienceTimeline component**

Create `src/components/ExperienceTimeline.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/data/experience";

export default function ExperienceTimeline({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  return (
    <div className="space-y-12">
      {entries.map((entry, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex gap-6"
        >
          <div className="w-20 shrink-0 text-right">
            <span className="text-sm font-mono text-text-muted">
              {entry.year}
            </span>
          </div>
          <div className="border-l border-white/20 pl-6">
            <h3 className="text-lg font-bold">{entry.title}</h3>
            <p className="text-sm text-accent">{entry.organization}</p>
            <p className="mt-2 text-text-muted text-sm leading-relaxed">
              {entry.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

**Step 2: Create ImageCarousel component**

Create `src/components/ImageCarousel.tsx`:
```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const carouselImages = [
  "/experience/photo-1.jpg",
  "/experience/photo-2.jpg",
  "/experience/photo-3.jpg",
  "/experience/photo-4.jpg",
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % carouselImages.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="relative mt-12 overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {carouselImages.map((src, i) => (
          <div key={i} className="w-full shrink-0">
            <Image
              src={src}
              alt={`Experience photo ${i + 1}`}
              width={1200}
              height={675}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
      >
        &#8594;
      </button>
    </div>
  );
}
```

**Step 3: Create Experience wrapper**

Create `src/components/Experience.tsx`:
```tsx
import { experiences } from "@/data/experience";
import ExperienceTimeline from "./ExperienceTimeline";
import ImageCarousel from "./ImageCarousel";

export default function Experience() {
  return (
    <section id="experience" className="px-8 md:px-16 lg:px-24 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Experience & Awards
      </h2>
      <ExperienceTimeline entries={experiences} />
      <ImageCarousel />
    </section>
  );
}
```

**Step 4: Create placeholder carousel images**

Create `public/experience/` with 4 placeholder images.

**Step 5: Add Experience to page**

Update `src/app/page.tsx` to include `<Experience />` after `<Projects />`.

**Step 6: Verify dev server**

Expected: Timeline entries with year labels, left border line, and image carousel with arrow navigation.

**Step 7: Commit**

```bash
git add src/components/ExperienceTimeline.tsx src/components/ImageCarousel.tsx src/components/Experience.tsx src/app/page.tsx public/experience/
git commit -m "feat: add experience timeline and image carousel"
```

---

### Task 7: Build About Section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create About component**

Create `src/components/About.tsx`:
```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-24">
      <h2 className="text-sm tracking-wider text-text-muted mb-12">
        DEVELOPER
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shrink-0"
        >
          <Image
            src="/profile.webp"
            alt="Yungju Kim"
            width={400}
            height={400}
            className="rounded-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 text-text-muted leading-relaxed"
        >
          <p>
            I&apos;m Yungju, an undergraduate Computer Science student at the{" "}
            <strong className="text-white">
              National University of Singapore
            </strong>
            . I made an intentional pivot from Business and Economics to CS
            because I wanted to turn ideas into reality through{" "}
            <code className="bg-badge-bg px-1.5 py-0.5 rounded text-sm text-white">
              code
            </code>
            .
          </p>
          <p>
            I focus on building{" "}
            <strong className="text-white">
              AI-powered full-stack applications
            </strong>{" "}
            — from autonomous agents to real-time platforms — using tools like
            Next.js, Python, and OpenAI. Most of my projects start from a simple
            question: how can technology make this easier?
          </p>
          <p>
            Fluent in{" "}
            <strong className="text-white">English and Korean</strong>, I bring
            an international perspective from growing up in Kuala Lumpur and
            studying in Singapore. When I&apos;m not coding, I&apos;m
            contributing to the developer community at NUS as Head of Technology
            at Developer Group.
          </p>

          <a
            href="#contact"
            className="inline-block mt-4 rounded-full bg-white text-secondary px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Send me a message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Add placeholder profile photo**

Place a placeholder at `public/profile.webp`.

**Step 3: Add About to page**

Update `src/app/page.tsx` to include `<About />` after `<Experience />`.

**Step 4: Verify dev server**

Expected: Profile photo and bio text side by side, with inline code and bold styling.

**Step 5: Commit**

```bash
git add src/components/About.tsx src/app/page.tsx public/profile.webp
git commit -m "feat: add about section with profile photo and bio"
```

---

### Task 8: Build Footer & Contact Section

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Footer component**

Create `src/components/Footer.tsx`:
```tsx
import { socials } from "@/data/socials";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export default function Footer() {
  return (
    <footer id="contact" className="px-8 md:px-16 lg:px-24 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-16">
        <a
          href={`mailto:${socials.email}`}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <HiOutlineMail size={20} />
          {socials.email}
        </a>
        <a
          href={`tel:${socials.phone}`}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <HiOutlinePhone size={20} />
          {socials.phone}
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <FaLinkedin size={20} />
          LinkedIn
        </a>
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <FaGithub size={20} />
          GitHub
        </a>
      </div>

      <div className="border-t border-white/10 pt-8 text-sm text-text-muted">
        &copy; 2026 Kim Yungju. All rights reserved.
      </div>
    </footer>
  );
}
```

**Step 2: Add Footer to page**

Update `src/app/page.tsx` to include `<Footer />` after `<About />`.

**Step 3: Verify dev server**

Expected: Contact section with email, phone, LinkedIn, GitHub links, and copyright footer.

**Step 4: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: add footer with contact links and copyright"
```

---

### Task 9: Build Project Detail Pages

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

**Step 1: Create dynamic project page**

Create `src/app/projects/[slug]/page.tsx`:
```tsx
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Yungju Kim`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-secondary text-white px-8 md:px-16 lg:px-24 py-24">
      <Link
        href="/#projects"
        className="text-text-muted hover:text-white transition-colors text-sm"
      >
        &larr; Back to projects
      </Link>

      <div className="mt-8">
        <span className="text-text-muted text-sm font-mono">
          {project.number}
        </span>
        <div className="flex items-center gap-4 mt-2">
          <Image
            src={project.logoSrc}
            alt={`${project.title} logo`}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-badge-bg px-3 py-1 text-xs text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <Image
        src={project.previewSrc}
        alt={`${project.title} preview`}
        width={1080}
        height={608}
        className="rounded-xl border border-white/10 mt-8"
      />

      <div className="mt-8 max-w-3xl space-y-4 text-text-muted leading-relaxed">
        <p>{project.description}</p>
        <p>{project.longDescription}</p>
      </div>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition-colors"
        >
          View Live Project &rarr;
        </a>
      )}
    </main>
  );
}
```

**Step 2: Verify build**

```bash
npm run build
```
Expected: Static pages generated for all 4 project slugs.

**Step 3: Commit**

```bash
git add src/app/projects/
git commit -m "feat: add project detail pages with static generation"
```

---

### Task 10: Mobile Responsive Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Add mobile hamburger menu**

Update `src/components/Navbar.tsx` to include a hamburger button that toggles a mobile menu drawer. Desktop keeps the horizontal layout; mobile shows a full-screen overlay with vertical links.

Key additions:
- `useState` for `menuOpen`
- Hamburger icon (three lines) visible below `md` breakpoint
- Full-screen overlay with vertical nav links and close button
- `overflow-hidden` on body when open

**Step 2: Verify at mobile breakpoint**

Resize browser to < 768px. Expected: Hamburger icon visible, clicking opens full-screen nav.

**Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add mobile responsive hamburger menu"
```

---

### Task 11: Add Placeholder Assets & Final Page Assembly

**Files:**
- Create: `public/resume.pdf` (placeholder or user-supplied)
- Verify: all placeholder images in `public/`
- Modify: `src/app/page.tsx` (final assembly)

**Step 1: Verify all assets exist**

Check that `public/` contains:
- `logo.svg`
- `profile.webp`
- `resume.pdf`
- `projects/` (4 logos + 4 previews)
- `experience/` (4 photos)

For any missing assets, create clearly labeled placeholders.

**Step 2: Final page assembly**

Ensure `src/app/page.tsx` imports and renders all sections in order:
```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Footer />
    </main>
  );
}
```

**Step 3: Full build + dev test**

```bash
npm run build && npm run start
```
Navigate through all sections. Verify smooth scroll, animations, responsive layout, and project detail pages.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete portfolio with all sections and placeholder assets"
```

---

## Summary

| Task | Description | Estimated Steps |
|------|-------------|-----------------|
| 1 | Scaffold Next.js + Tailwind theme | 7 |
| 2 | Data layer (projects, experience, tech, socials) | 6 |
| 3 | Navbar (fixed, blur, smooth scroll) | 5 |
| 4 | Hero (headline, subtitle, tech icons) | 5 |
| 5 | Projects (cards with badges and CTAs) | 6 |
| 6 | Experience (timeline + carousel) | 7 |
| 7 | About (photo + bio) | 5 |
| 8 | Footer & Contact | 4 |
| 9 | Project detail pages | 3 |
| 10 | Mobile responsive navbar | 3 |
| 11 | Asset placeholders + final assembly | 4 |

**Total: 11 tasks, 55 steps**
