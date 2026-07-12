import { techBrandColors, defaultBadgeColors } from "@/data/techBrandColors";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { HiLightningBolt, HiOutlinePlay, HiSparkles } from "react-icons/hi";

type ProjectTechStackProps = {
  readonly techStack: readonly string[];
};

const iconMap: Partial<Record<string, IconType>> = {
  Docker: SiDocker,
  "Next.js": SiNextdotjs,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  Vite: SiVite,
  FastAPI: HiLightningBolt,
  Daytona: HiSparkles,
  VideoDB: HiOutlinePlay,
};

const dotIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

function TechGlyph({ tech, color }: { readonly tech: string; readonly color: string }) {
  if (tech === "Kimi") {
    return (
      <span className="font-display text-2xl font-800 leading-none md:text-3xl">
        K
      </span>
    );
  }

  if (tech === "Bright Data") {
    return (
      <span className="grid grid-cols-3 gap-1">
        {dotIndexes.map((index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full md:h-2 md:w-2"
            style={{ backgroundColor: color }}
          />
        ))}
      </span>
    );
  }

  if (tech === "LangGraph") {
    return (
      <span className="relative h-7 w-7 md:h-8 md:w-8">
        <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border-2" />
        <span className="absolute right-0 top-1 h-2.5 w-2.5 rounded-full border-2" />
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2" />
        <span className="absolute left-2.5 top-3 h-px w-3 rotate-12 bg-current" />
        <span className="absolute right-2.5 top-3 h-px w-3 -rotate-12 bg-current" />
      </span>
    );
  }

  const Icon = iconMap[tech];
  if (Icon) return <Icon className="h-7 w-7 md:h-8 md:w-8" />;

  return (
    <span className="font-display text-xl font-800 leading-none md:text-2xl">
      {tech.slice(0, 1)}
    </span>
  );
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <div className="project-tech-stack" aria-label="Project tech stack">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
        {techStack.map((tech) => {
          const colors = techBrandColors[tech] ?? defaultBadgeColors;
          return (
            <span
              key={tech}
              className="relative inline-flex h-14 min-w-0 items-center gap-3 overflow-hidden rounded-full border px-4 text-sm font-semibold tracking-normal text-primary transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 md:h-16 md:gap-4 md:px-5 md:text-lg"
              style={{
                borderColor: `color-mix(in srgb, ${colors.border} 62%, rgba(255,255,255,0.12))`,
                background: `radial-gradient(120% 120% at 18% 0%, color-mix(in srgb, ${colors.border} 18%, transparent) 0%, rgba(13,18,23,0.94) 44%, rgba(5,7,11,0.98) 100%)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -10px 22px rgba(255,255,255,0.025), 0 0 0 1px rgba(255,255,255,0.035), 0 0 26px color-mix(in srgb, ${colors.border} 22%, transparent)`,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-7 top-0 h-px opacity-95"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
                }}
              />
              <span
                aria-hidden="true"
                className="relative grid shrink-0 place-items-center"
                style={{
                  color: colors.text,
                  filter: `drop-shadow(0 0 10px color-mix(in srgb, ${colors.border} 45%, transparent))`,
                }}
              >
                <TechGlyph tech={tech} color={colors.border} />
              </span>
              <span className="relative min-w-0 truncate text-[0.95em]">
                {tech}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
