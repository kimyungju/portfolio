# Portfolio Website Design

## Overview

Personal portfolio website for Kim Yungju, modeled after kennethsunjaya.com. Dark-themed, Next.js + TypeScript + Tailwind CSS, deployed on Vercel.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Animations:** CSS transitions + scroll-based animations

## Sections

### 1. Navbar

Fixed top navigation with dark background. Left: logo image. Right: anchor links (CONTACT, EXPERIENCE, PROJECTS) + Download CV button serving resume PDF. Smooth scroll on click. Subtle background blur on scroll.

### 2. Hero

- Headline: "Aspiring Software Engineer."
- Subtitle: "I'm Yungju — I build AI-powered full-stack applications focused on turning ideas into products that solve real problems."
- Tech stack icon strip: JavaScript, Java, Python, C, SQL, Next.js, React, TypeScript, PostgreSQL, Docker, Tailwind CSS

### 3. Projects

Four project cards with `//1` through `//4` numbering. Each card has: project logo, title, description, tech badges, "View Project" + "Read Full Story" CTAs, and a large preview screenshot.

| # | Name | Tech Badges |
|---|------|-------------|
| //1 | PriceWise | LangGraph, FastAPI, OpenAI, Next.js, PostgreSQL, Docker |
| //2 | InterviewPilot | Next.js, React, TypeScript, OpenAI, Supabase, Clerk |
| //3 | Castory | Next.js, React, TypeScript, Convex, OpenAI, Clerk |
| //4 | DevG Website | Next.js, React, TypeScript, Tailwind CSS |

"Read Full Story" links to `/projects/[slug]` detail pages.

### 4. Experience & Awards

Timeline-style layout:

| Year | Entry |
|------|-------|
| 2021 | IB Diploma — ISKL — 45/45 (Top 1%), Bilingual Diploma |
| 2024 | NUS Computer Science — Transferred from BBA & Economics |
| 2025 | Developer Group @ NUS Computing — Head of Technology, Hack4Good 2026 |
| 2025-2026 | Lumcloon Energy — Data Center Systems Intern |

Horizontal image carousel of event photos/certificates (user-supplied).

### 5. About / Developer

Profile photo + bio text:

> I'm Yungju, an undergraduate Computer Science student at the National University of Singapore. I made an intentional pivot from Business and Economics to CS because I wanted to turn ideas into reality through code.
>
> I focus on building AI-powered full-stack applications — from autonomous agents to real-time platforms — using tools like Next.js, Python, and OpenAI. Most of my projects start from a simple question: how can technology make this easier?
>
> Fluent in English and Korean, I bring an international perspective from growing up in Kuala Lumpur and studying in Singapore. When I'm not coding, I'm contributing to the developer community at NUS as Head of Technology at Developer Group.

"Send me a message" CTA button scrolling to contact.

### 6. Footer & Contact

Contact info:
- Email: yjkim101002@gmail.com
- Phone: +65 8889 1059
- LinkedIn: linkedin.com/in/yungju/
- GitHub: github.com/kimyungju

Footer: "© 2026 Kim Yungju. All rights reserved."

## Assets Required (User-Supplied)

- Logo image
- Profile photo
- Resume PDF
- Project screenshots (4)
- Project logos/icons (4)
- Experience/event photos for carousel
