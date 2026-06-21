import { techStack } from "@/data/techStack";
import {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiCplusplus,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  javascript: <SiJavascript className="h-6 w-6 md:h-10 md:w-10" />,
  java: <FaJava className="h-6 w-6 md:h-10 md:w-10" />,
  python: <SiPython className="h-6 w-6 md:h-10 md:w-10" />,
  cplusplus: <SiCplusplus className="h-6 w-6 md:h-10 md:w-10" />,
  nextdotjs: <SiNextdotjs className="h-6 w-6 md:h-10 md:w-10" />,
  react: <SiReact className="h-6 w-6 md:h-10 md:w-10" />,
  typescript: <SiTypescript className="h-6 w-6 md:h-10 md:w-10" />,
  postgresql: <SiPostgresql className="h-6 w-6 md:h-10 md:w-10" />,
  docker: <SiDocker className="h-6 w-6 md:h-10 md:w-10" />,
  tailwindcss: <SiTailwindcss className="h-6 w-6 md:h-10 md:w-10" />,
};

const marqueeCopies = [0, 1, 2] as const;

export default function TechStackStrip() {
  return (
    <div className="marquee-mask marquee-container w-full overflow-hidden">
      <div className="animate-tech-stack-marquee flex w-max">
        {marqueeCopies.map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 0 ? undefined : true}
            className="flex shrink-0 gap-3 pr-3 md:gap-6 md:pr-6"
          >
            {techStack.map((tech) => (
              <div
                key={`${tech.iconSlug}-${copy}`}
                className="flex items-center gap-2 md:gap-4 rounded-full border border-white/[0.15] bg-white/[0.08] px-3 py-1.5 md:px-6 md:py-3 transition-all duration-300 hover:border-white/[0.3] hover:bg-white/[0.12]"
                style={{ boxShadow: "0 0 12px rgba(255,255,255,0.05)" }}
              >
                <span style={{ color: tech.brandColor }}>
                  {iconMap[tech.iconSlug] ?? tech.name}
                </span>
                <span
                  className="text-xs md:text-lg font-medium whitespace-nowrap text-[#e5e5e5]"
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
