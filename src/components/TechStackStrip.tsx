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
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  javascript: <SiJavascript size={40} />,
  java: <FaJava size={40} />,
  python: <SiPython size={40} />,
  c: (
    <span className="flex items-center justify-center w-10 h-10 border border-current rounded text-base font-bold">
      C
    </span>
  ),
  sql: (
    <span className="flex items-center justify-center w-10 h-10 border border-current rounded text-xs font-bold">
      SQL
    </span>
  ),
  nextdotjs: <SiNextdotjs size={40} />,
  react: <SiReact size={40} />,
  typescript: <SiTypescript size={40} />,
  postgresql: <SiPostgresql size={40} />,
  docker: <SiDocker size={40} />,
  tailwindcss: <SiTailwindcss size={40} />,
};

export default function TechStackStrip() {
  const duplicated = [...techStack, ...techStack];

  return (
    <div className="marquee-mask marquee-container overflow-hidden">
      <div className="animate-marquee flex w-max gap-6">
        {duplicated.map((tech, i) => (
          <div
            key={`${tech.iconSlug}-${i}`}
            className="flex items-center gap-3 rounded-full border border-white/[0.15] bg-white/[0.08] px-5 py-2.5 transition-all duration-300 hover:border-white/[0.3] hover:bg-white/[0.12]"
            style={{ boxShadow: '0 0 12px rgba(255,255,255,0.05)' }}
          >
            <span style={{ color: tech.brandColor }}>
              {iconMap[tech.iconSlug] ?? tech.name}
            </span>
            <span
              className="text-sm font-medium whitespace-nowrap text-[#e5e5e5]"
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
