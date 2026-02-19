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
      className="group relative mb-32 last:mb-0"
    >
      {/* Number label — cyan split */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 inline-block font-mono text-xs tracking-[0.3em]"
      >
        <span className="text-cyan">{"//"}</span>
        <span className="text-cyan/70">
          {project.number.replace("//", "")}
        </span>
      </motion.span>

      <div
        className={`flex flex-col gap-10 ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Info */}
        <div className="flex flex-1 flex-col justify-center gap-5">
          <div className="flex items-center gap-4">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-white/[0.06] bg-card-bg">
              <Image
                src={project.logoSrc}
                alt={`${project.title} logo`}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-display text-2xl font-700 tracking-[-0.02em] md:text-3xl">
              {project.title}
            </h3>
          </div>

          <p className="max-w-lg text-[15px] leading-[1.7] text-text-muted">
            {project.description}
          </p>

          {/* Tech badges — per-tech brand colors */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => {
              const colors = techBrandColors[tech] ?? defaultBadgeColors;
              return (
                <span
                  key={tech}
                  className="rounded-full px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-200 hover:brightness-125"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.bg,
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>

          {/* Buttons — cyan + lavender */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-[13px] font-semibold text-secondary transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110"
              >
                <HiOutlineExternalLink size={15} />
                View Project
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-lavender px-5 py-2.5 text-[13px] font-semibold text-secondary transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,181,253,0.3)] hover:brightness-110"
            >
              <HiOutlineDocumentText size={15} />
              Read Full Story
            </Link>
          </div>
        </div>

        {/* Preview image — colored hover glow */}
        <div className="flex-1">
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
