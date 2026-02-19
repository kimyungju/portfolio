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
  javascript: <SiJavascript size={48} />,
  java: <FaJava size={48} />,
  python: <SiPython size={48} />,
  cplusplus: <SiCplusplus size={48} />,
  nextdotjs: <SiNextdotjs size={48} />,
  react: <SiReact size={48} />,
  typescript: <SiTypescript size={48} />,
  postgresql: <SiPostgresql size={48} />,
  docker: <SiDocker size={48} />,
  tailwindcss: <SiTailwindcss size={48} />,
};

export default function TechStackStrip() {
  const duplicated = [...techStack, ...techStack];

  return (
    <div className="marquee-mask marquee-container overflow-hidden">
      <div className="animate-marquee flex w-max gap-6">
        {duplicated.map((tech, i) => (
          <div
            key={`${tech.iconSlug}-${i}`}
            className="flex items-center gap-4 rounded-full border border-white/[0.15] bg-white/[0.08] px-6 py-3 transition-all duration-300 hover:border-white/[0.3] hover:bg-white/[0.12]"
            style={{ boxShadow: '0 0 12px rgba(255,255,255,0.05)' }}
          >
            <span style={{ color: tech.brandColor }}>
              {iconMap[tech.iconSlug] ?? tech.name}
            </span>
            <span
              className="text-lg font-medium whitespace-nowrap text-[#e5e5e5]"
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
