"use client";

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
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  javascript: <SiJavascript size={20} />,
  java: <FaJava size={20} />,
  python: <SiPython size={20} />,
  c: (
    <span className="flex items-center justify-center w-5 h-5 border border-white/20 rounded text-[10px] font-bold">
      C
    </span>
  ),
  sql: (
    <span className="flex items-center justify-center w-5 h-5 border border-white/20 rounded text-[8px] font-bold">
      SQL
    </span>
  ),
  nextdotjs: <SiNextdotjs size={20} />,
  react: <SiReact size={20} />,
  typescript: <SiTypescript size={20} />,
  postgresql: <SiPostgresql size={20} />,
  docker: <SiDocker size={20} />,
  tailwindcss: <SiTailwindcss size={20} />,
};

export default function TechStackStrip() {
  return (
    <div className="flex flex-wrap gap-3">
      {techStack.map((tech, i) => (
        <motion.div
          key={tech.iconSlug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + i * 0.04, duration: 0.3 }}
          className="group flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-text-muted transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-primary"
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {iconMap[tech.iconSlug] ?? tech.name}
          </span>
          <span className="hidden text-[12px] font-medium sm:inline">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
