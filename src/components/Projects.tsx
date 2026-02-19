"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="relative px-4 py-32 md:px-8 lg:px-12">
      {/* Section header */}
      <div className="mb-20 max-w-[90rem] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-[15px] tracking-[0.3em] text-cyan/80"
        >
          SELECTED WORK
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-700 tracking-[-0.02em] md:text-6xl"
        >
          Projects
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 h-px w-full max-w-xs origin-left bg-gradient-to-r from-cyan via-purple/40 to-transparent"
        />
      </div>

      <div className="max-w-[90rem] mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
