# Portfolio — Engineering Write-Up

## 1. Overview & Motivation

Hiring managers spend 30 seconds on a portfolio site. Most developer portfolios use the same template with swapped-in project names, leaving no impression. The portfolio itself — the thing meant to demonstrate engineering ability — demonstrates nothing beyond the ability to install a starter kit.

This project is a fully custom portfolio site built from scratch to solve that problem. Every visual detail, animation, and component exists because it was designed and implemented intentionally — not copied from a template. The site serves as both a real professional presence and a technical artifact that demonstrates frontend engineering depth.

**What it does:**

A statically generated single-page application with animated section reveals, interactive project showcases featuring device mockups, per-project case study pages with long-form prose, a career timeline, and an infinite-scroll tech strip. The entire site ships as static HTML with zero server-side runtime — every page is pre-rendered at build time.

**Target audience:**

Engineering hiring managers, technical recruiters, and senior engineers evaluating frontend capability. The site communicates through its implementation, not through self-description.

**Honest framing:** This is a production personal site that also functions as an engineering portfolio piece. The animation orchestration, design system, and static generation patterns are deliberately more sophisticated than a typical portfolio requires — they exist to demonstrate what I can build under constraint.

---

## 2. Architecture & Workflow

### System Overview

```
┌─────────────────────────────────────────────────────┐
│                    Build Time (SSG)                  │
│                                                     │
│  ┌──────────────┐    ┌──────────────────────────┐   │
│  │  Data Layer   │    │   Component Registry      │   │
│  │              │    │                          │   │
│  │ projects.ts  │───▶│ storyComponents: Record   │   │
│  │ experience.ts│    │   slug → ComponentType    │   │
│  │ techStack.ts │    │                          │   │
│  │ socials.ts   │    └─────────┬────────────────┘   │
│  └──────┬───────┘              │                    │
│         │                      ▼                    │
│         │         ┌────────────────────────┐        │
│         └────────▶│  generateStaticParams  │        │
│                   │  (enumerate all slugs) │        │
│                   └──────────┬─────────────┘        │
│                              │                      │
│                              ▼                      │
│  ┌─────────────────────────────────────────────┐    │
│  │             Static HTML Output               │    │
│  │                                             │    │
│  │  /                    → Home (all sections)  │    │
│  │  /projects/pricewise  → PricewiseStory      │    │
│  │  /projects/colonial-archives → ColonialArchivesStory │
│  │  /projects/...        → (per slug)          │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Data-Driven Composition

All content lives in typed TypeScript arrays with no CMS or API calls. Each data file exports a strongly typed array — `Project[]`, `ExperienceEntry[]`, `TechItem[]` — that components consume directly. This eliminates an entire class of runtime errors: if a project slug is misspelled or a field is missing, TypeScript catches it at build time rather than producing a blank page in production.

The home page composes section components sequentially — Navbar, Hero, Projects, Experience, About, Footer — each independently animated. This composition pattern keeps each section testable in isolation while the page-level assembly controls ordering and spacing.

### Static Generation with Dynamic Content

The project detail pages use a component registry pattern to map slugs to story components at build time. This is the critical architectural decision: it enables rich, per-project content without dynamic imports (which would break static generation) or a CMS dependency.

```tsx
// src/app/projects/[slug]/page.tsx — component registry for SSG
const storyComponents: Record<string, React.ComponentType> = {
  pricewise: PricewiseStory,
  interviewpilot: InterviewpilotStory,
  "colonial-archives": ColonialArchivesStory,
  "devg-website": DevgStory,
};

const StoryComponent = storyComponents[project.slug];
// Falls back to description if no story component exists
{StoryComponent ? <StoryComponent /> : <p>{project.description}</p>}
```

The fallback is intentional. New projects can be added to the data layer immediately — they render with their description text. Story components are written later without blocking the project from appearing on the site. This decouples content authoring from deployment.

---

## 3. Tech Stack Deep Dive

| Technology | Role | Why Over Alternatives | Tradeoff |
|---|---|---|---|
| **Next.js 16** | Framework, static generation, routing | App Router provides file-based routing with async params and `generateStaticParams`. Gatsby was considered but its plugin ecosystem adds complexity for a site with no CMS. | Locked into React ecosystem; heavier dev tooling than a pure Vite setup |
| **React 19** | UI runtime | Concurrent features, stable server component primitives. All section components use client-side Framer Motion, so server components are limited to the page shell. | Bundle includes the full React runtime (~40 KB gzipped) for a mostly static site |
| **TypeScript 5** | Type safety | Catches data shape errors at build time. Every data array, component prop, and color mapping is typed — no `any` in the codebase. | Adds compilation step; marginal overhead for a small project |
| **Tailwind CSS v4** | Styling, design tokens | v4's `@theme inline` syntax eliminates the config file entirely. All tokens live in `globals.css` alongside custom CSS. | New syntax has less community documentation; co-workers unfamiliar with v4 need onboarding |
| **Framer Motion** | Scroll-triggered animations | `whileInView` with `viewport: { once: true }` provides declarative scroll animation. GSAP offers more control but requires imperative setup and cleanup. | ~32 KB gzipped; significant for a static site, justified by animation quality |
| **Sharp** | Image optimization | Next.js `<Image>` uses Sharp at build time for responsive srcsets and format conversion. Avoids manual image pipeline. | Build-time dependency only; no runtime cost |

### Design Philosophy

The visual system uses a constrained dark palette — charcoal backgrounds (#050505), muted grays for body text, and cyan/teal/purple accent gradients. A perlin-noise grain overlay at 3% opacity adds analog texture without distraction. Typography pairs a geometric display face (Syne) for headings with a humanist sans (DM Sans) for body text, creating contrast between structural headings and readable prose.

---

## 4. Technical Challenges & Solutions

### Challenge 1: Cohesive Brand Colors Across 25+ Technologies

**Constraint:** Project cards display tech badges (React, TypeScript, LangGraph, etc.) with per-technology brand colors. Each badge needs a coordinated border, text, and background color at consistent opacity — not just a single hex value.

**Why the naive approach fails:** Hardcoding inline styles per badge creates duplication and drift. A simple `Record<string, string>` mapping tech names to hex colors doesn't handle the three-property coordination (border, text, background) needed for the glassmorphic badge design.

**Solution:** A typed color registry with a guaranteed fallback:

```tsx
// src/data/techBrandColors.ts — per-tech color registry
export const techBrandColors: Record<
  string,
  { border: string; text: string; bg: string }
> = {
  "Next.js": { border: "#ffffff", text: "#ffffff", bg: "rgba(255,255,255,0.08)" },
  React:     { border: "#61dafb", text: "#61dafb", bg: "rgba(97,218,251,0.08)" },
  LangGraph: { border: "#22d3ee", text: "#22d3ee", bg: "rgba(34,211,238,0.08)" },
  // ... 23 more entries
};

export const defaultBadgeColors = {
  border: "#8ab4ff", text: "#8ab4ff", bg: "rgba(138,180,255,0.08)",
};

// src/components/ProjectCard.tsx:120 — null-coalescing lookup
const colors = techBrandColors[tech] ?? defaultBadgeColors;
```

**Tradeoff:** The registry requires manual updates when adding new technologies. An automated approach (deriving shades from a single hex) would reduce maintenance but produces inconsistent results against dark backgrounds — some brand blues need different opacity than brand greens. Manual tuning per-tech ensures visual consistency at the cost of a larger data file.

### Challenge 2: Frame-Rate Independent Text Morphing

**Constraint:** The hero section morphs between role titles ("Software Engineer" ↔ "Cyber Security Engineer") using blur and opacity transitions. The animation must run smoothly on 60 Hz laptops, 120 Hz phones, and throttled background tabs.

**Why the naive approach fails:** CSS transitions and `setInterval`-based timing drift across frame rates. A 60 Hz device processes 16.6 ms per frame; a 120 Hz device processes 8.3 ms. Fixed-interval animations run at double speed on high-refresh displays or stutter on throttled tabs.

**Solution:** A `requestAnimationFrame` loop with per-frame delta-time calculation:

```tsx
// src/components/ui/morphing-text.tsx — frame-rate independent animation
useEffect(() => {
  let animationFrameId: number;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    const newTime = new Date();
    const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
    timeRef.current = newTime;

    cooldownRef.current -= dt;
    if (cooldownRef.current <= 0) doMorph();
    else doCooldown();
  };

  animate();
  return () => cancelAnimationFrame(animationFrameId);
}, [doMorph, doCooldown]);
```

The morph applies power-law opacity (`Math.pow(fraction, 0.4)`) rather than linear interpolation. The 0.4 exponent compresses the opacity curve, keeping text readable longer during the transition — linear interpolation drops to 50% opacity at the midpoint, while the power curve holds above 70% until the final third.

**Tradeoff:** `requestAnimationFrame` consumes a continuous animation loop even when the component is off-screen. Adding an Intersection Observer to pause the loop when scrolled away would reduce idle CPU usage, but the overhead is minimal for a single morph instance and the added complexity isn't justified.

### Challenge 3: Per-Project Aspect Ratios in Device Mockups

**Constraint:** Each project card displays a screenshot inside a laptop mockup. Screenshots come from different applications at different resolutions — 2861x1456 for one, 1920x985 for another. Using a uniform aspect ratio either clips content or adds letterboxing.

**Why the naive approach fails:** A fixed `aspect-ratio: 16/9` distorts non-standard screenshots. Using `object-fit: cover` clips critical UI elements. Using `object-fit: contain` adds black bars that break the mockup illusion.

**Solution:** A per-project aspect ratio lookup applied to the screen container:

```tsx
// src/components/ProjectCard.tsx — per-project screen ratios
const screenRatios: Record<string, string> = {
  "colonial-archives": "2861/1456",
  pricewise: "2874/1448",
  interviewpilot: "1920/985",
  "devg-website": "1920/983",
};

// Line 196: Dynamic aspect ratio on the screen element
<div
  className="relative overflow-hidden rounded-[4px] bg-black"
  style={{ aspectRatio: screenRatios[project.slug] || "2/1" }}
>
  <Image src={project.previewSrc} fill className="object-contain" />
</div>
```

**Tradeoff:** The ratio map is manually maintained. An automated approach (reading image metadata at build time) would be more robust but adds a build step dependency. For four projects, manual mapping is the right level of effort.

---

## 5. Impact & Future Roadmap

### Current State

- **4 project showcases** with interactive device mockups, tech badges, and long-form case study pages
- **Zero server-side runtime** — fully static output, deployable to any CDN
- **Sub-second page transitions** with pre-rendered routes and client-side navigation
- **Accessibility-aware animations** — all motion respects `prefers-reduced-motion`, scroll listeners use `{ passive: true }`

### Scalability Considerations

- **Adding projects** requires only a data entry in `projects.ts` and an optional story component. The component registry pattern and `generateStaticParams` handle routing automatically.
- **Design token expansion** via `@theme inline` in `globals.css` — new colors, spacing, or typography can be added without touching component files.
- **Animation budget** — Framer Motion's `viewport: { once: true }` ensures entrance animations fire once, preventing cumulative performance degradation as more sections are added.

### Planned Features

- **Additional project showcases** — the architecture supports unlimited projects with the same data-entry workflow. Each new project gets a card, static route, and optional story page without structural changes.
- **Case study depth** — expanding existing story pages with embedded code snippets, architecture diagrams, and metrics to demonstrate end-to-end engineering thinking.
- **Performance instrumentation** — adding Core Web Vitals tracking via `next/web-vitals` to quantify the impact of animation choices on real-user metrics.

The architecture optimizes for a specific tradeoff: maximum visual sophistication within a fully static deployment model. Every animation, interaction, and design decision works within the constraint of zero server-side computation — proving that rich frontend experiences don't require runtime infrastructure.
