"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="mb-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-text-muted text-sm font-mono">
        {project.number}
      </span>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Left side — info */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image
              src={project.logoSrc}
              alt={`${project.title} logo`}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <h3 className="text-2xl md:text-3xl font-bold text-primary">
              {project.title}
            </h3>
          </div>

          <p className="text-text-muted leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-badge-bg px-3 py-1 text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition-colors text-primary"
              >
                View Project
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-full bg-white text-secondary px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Read Full Story
            </Link>
          </div>
        </div>

        {/* Right side — preview */}
        <div className="flex-1">
          <Image
            src={project.previewSrc}
            alt={`${project.title} preview`}
            width={1080}
            height={608}
            className="rounded-xl border border-white/10 w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}
