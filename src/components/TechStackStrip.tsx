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
  javascript: <SiJavascript size={28} />,
  java: <FaJava size={28} />,
  python: <SiPython size={28} />,
  c: (
    <span className="flex items-center justify-center w-7 h-7 border border-text-muted rounded text-sm font-bold">
      C
    </span>
  ),
  sql: (
    <span className="flex items-center justify-center w-7 h-7 border border-text-muted rounded text-xs font-bold">
      SQL
    </span>
  ),
  nextdotjs: <SiNextdotjs size={28} />,
  react: <SiReact size={28} />,
  typescript: <SiTypescript size={28} />,
  postgresql: <SiPostgresql size={28} />,
  docker: <SiDocker size={28} />,
  tailwindcss: <SiTailwindcss size={28} />,
};

export default function TechStackStrip() {
  return (
    <div className="flex flex-wrap gap-4">
      {techStack.map((tech) => (
        <div
          key={tech.iconSlug}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          {iconMap[tech.iconSlug] ?? tech.name}
          <span className="hidden sm:inline text-sm">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}
