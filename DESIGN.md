# Portfolio Design System

## 1. Atmosphere & Identity

This portfolio feels like a dark technical gallery: cinematic enough to make shipped work feel memorable, but restrained enough that the projects and timeline stay readable. The signature is a near-black canvas with thin luminous cyan/lavender accents, glassy media frames, and motion that reveals content without changing layout.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Text/primary | `--color-primary` | `#f5f5f5` | Main headings and high-emphasis text |
| Surface/base | `--color-secondary` | `#050505` | Page background |
| Accent/primary | `--color-accent` | `#6d9fff` | General accent glow and focus moments |
| Accent/warm | `--color-accent-warm` | `#f59e0b` | Limited warm contrast |
| Accent/alert | `--color-accent-alert` | `#ff3355` | High-risk project accents and winner callouts |
| Surface/card | `--color-card-bg` | `#0c0c0c` | Media frames and card interiors |
| Border/card | `--color-card-border` | `#1a1a1a` | Default dark card outlines |
| Surface/badge | `--color-badge-bg` | `#141414` | Badge backgrounds and inline code |
| Border/badge | `--color-badge-border` | `#252525` | Badge outlines |
| Text/muted | `--color-text-muted` | `#71717a` | Captions, labels, lower-emphasis copy |
| Text/secondary | `--color-text-secondary` | `#a1a1aa` | Body copy and secondary paragraphs |
| Divider | `--color-divider` | `#1a1a1a` | Rules and separators |
| Accent/cyan | `--color-cyan` | `#22d3ee` | Section labels, CTAs, active details |
| Accent/teal | `--color-teal` | `#2dd4bf` | Supporting gradients and overlays |
| Accent/purple | `--color-purple` | `#a78bfa` | Secondary gradient stops |
| Accent/lavender | `--color-lavender` | `#c4b5fd` | Secondary CTA color |

### Rules

- Keep the base dark and let imagery carry color.
- Use cyan for primary emphasis, lavender/purple as a secondary gradient accent.
- White alpha overlays are allowed for glass borders, hover states, and subtle dividers.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `clamp(1.8rem, 4.5vw, 4.2rem)` | 800 | 0.95 | -0.03em | Hero title variants |
| Section H1 | `3rem` to `3.75rem` | 700 | 1.1 | -0.02em | Section headings |
| Card H2 | `2.25rem` to `3.75rem` | 800 | 1.1 | -0.02em | Project titles |
| Body/lg | `1.25rem` to `1.5rem` | 400 | 1.7 | 0 | Hero and project descriptions |
| Body | `1rem` | 400 | 1.8 | 0 | Story prose |
| Body/sm | `0.875rem` | 400 | 1.5 | 0 | Table and support copy |
| Caption | `0.6875rem` to `0.9375rem` | 500-700 | 1.3 | 0.2em-0.3em | Mono labels and nav text |

### Font Stack

- Display: Syne via `--font-display`
- Body: DM Sans via `--font-body`
- Mono: Geist Mono via `--font-geist-mono`

### Rules

- Use Syne for section and project headlines.
- Use DM Sans for readable body copy.
- Use Geist Mono for labels, counters, and technical accents.

## 4. Spacing & Layout

### Base Unit

All spacing derives from 4px. Tailwind spacing tokens should stay on that rhythm.

| Token | Value | Usage |
|-------|-------|-------|
| Compact | 8px-12px | Dot indicators, icon gaps, tight lists |
| Standard | 16px-24px | Mobile page padding, card internals |
| Comfortable | 32px-48px | Component groups |
| Section | 64px-128px | Section rhythm and major breaks |

### Grid

- Max content width: `90rem`
- Primary page gutters: `px-4 md:px-8 lg:px-12`
- Breakpoints: Tailwind `sm`, `md`, `lg`, `xl`
- Large sections use asymmetric two-column layouts where useful, then collapse to one column on mobile.

### Rules

- Preserve explicit aspect ratios for media to avoid layout shift.
- Keep Experience media constrained beside the timeline on desktop and full-width above/below flow on mobile.

## 5. Components

### Experience Carousel

- Structure: a contained media frame, horizontal slide track, arrow buttons, and dot indicators.
- Spacing: frame uses a fixed aspect ratio; controls sit inside the media edge; dots use compact spacing.
- States: arrows and dots have hover states; active dot expands.
- Accessibility: each control has an `aria-label`; each image needs descriptive alt text.
- Motion: slide transition uses transform only.

### Project Card

- Structure: number label, glass card surface, text column, media mockup column.
- Spacing: large cards use generous `p-6 md:p-10 lg:p-14` with `gap-8 lg:gap-14`.
- States: hover raises media and strengthens the border/spotlight treatment.
- Motion: Framer Motion reveal and transform-only hover effects.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 200-300ms | ease-out | Hover and tactile feedback |
| Standard | 500-700ms | cubic-bezier(0.25, 0.1, 0, 1) | Section and carousel transitions |
| Emphasis | 800ms | ease-out | Divider reveals and larger entrances |

### Rules

- Animate `transform` and `opacity`; do not animate layout dimensions.
- Respect `prefers-reduced-motion` for ambient loops.
- Keep scroll-triggered reveals one-way unless an existing component intentionally replays.

## 7. Depth & Surface

### Strategy

Use a mixed dark-gallery strategy: tonal shifts for base surfaces, thin alpha borders for media frames, and restrained glow only for accent feedback.

| Level | Treatment | Usage |
|-------|-----------|-------|
| Base | `#050505` | Page background |
| Card | `#0c0c0c` or low-opacity white | Media and project surfaces |
| Border | `rgba(255, 255, 255, 0.04-0.10)` | Glass outlines |
| Glow | Low-opacity cyan/purple blur | Background atmosphere and hover feedback |

### Rules

- Do not add new large decorative gradient blobs for small content changes.
- Media frames should use borders and tonal contrast before heavy shadows.
