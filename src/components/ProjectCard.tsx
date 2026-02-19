"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { techBrandColors, defaultBadgeColors } from "@/data/techBrandColors";
import { HiOutlineExternalLink, HiOutlineDocumentText } from "react-icons/hi";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
      className="group relative mb-36 last:mb-0"
    >
      {/* Number label */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 font-mono text-lg tracking-[0.2em]"
      >
        <span className="text-cyan font-bold">{"//"}</span>
        <span className="ml-1 text-white font-bold">
          {project.number.replace("//", "").trim()}
        </span>
      </motion.div>

      <div
        className={`flex flex-col gap-12 ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Info — takes ~45% */}
        <div className="flex flex-1 flex-col justify-center gap-7 lg:max-w-[45%]">
          {/* Logo + Title */}
          <div className="flex items-center gap-5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-card-bg">
              <Image
                src={project.logoSrc}
                alt={`${project.title} logo`}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-display text-3xl font-800 tracking-[-0.02em] md:text-4xl lg:text-[2.75rem]">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="max-w-xl text-lg leading-[1.75] text-text-secondary md:text-xl">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => {
              const colors = techBrandColors[tech] ?? defaultBadgeColors;
              return (
                <span
                  key={tech}
                  className="rounded-full px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200 hover:brightness-125"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: "transparent",
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-cyan px-8 py-3.5 text-[15px] font-bold text-secondary transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:brightness-110"
              >
                <HiOutlineExternalLink size={18} />
                View Project
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-lavender/90 px-8 py-3.5 text-[15px] font-bold text-secondary transition-all duration-300 hover:shadow-[0_0_24px_rgba(196,181,253,0.3)] hover:brightness-110"
            >
              <HiOutlineDocumentText size={18} />
              Read Full Story
            </Link>
          </div>
        </div>

        {/* Preview image — takes ~55% */}
        <div className="flex-1 lg:max-w-[55%]">
          <div className="group/img relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card-bg transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <Image
              src={project.previewSrc}
              alt={`${project.title} preview`}
              width={1080}
              height={608}
              className="w-full transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/img:opacity-100 bg-gradient-to-t from-cyan/[0.10] via-teal/[0.04] to-transparent" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
