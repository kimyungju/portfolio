"use client";

import { useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

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
        className="mb-8 font-mono text-2xl tracking-[0.2em]"
      >
        <span className="text-cyan font-bold">{"//"}</span>
        <span className="ml-1 text-white font-bold">
          {project.number.replace("//", "").trim()}
        </span>
      </motion.div>

      {/* Glass card surface */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.015] p-6 md:p-10 lg:p-14 transition-colors duration-500 hover:border-white/[0.08] hover:bg-white/[0.025]"
      >
        {/* Mouse spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.04), transparent 40%)`,
          }}
        />

        <div
          className={`relative z-10 flex flex-col gap-8 lg:gap-14 ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* Info — takes ~45% */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="flex flex-1 flex-col justify-center gap-7 lg:max-w-[50%]"
          >
            {/* Logo + Title */}
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16 lg:h-20 lg:w-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-card-bg">
                <Image
                  src={project.logoSrc}
                  alt={`${project.title} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-4xl font-800 tracking-[-0.02em] md:text-5xl lg:text-6xl">
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="max-w-xl text-xl leading-[1.75] text-text-secondary md:text-2xl">
              {project.description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => {
                const colors = techBrandColors[tech] ?? defaultBadgeColors;
                return (
                  <span
                    key={tech}
                    className="rounded-full px-6 py-2.5 text-lg font-medium tracking-wide transition-all duration-200 hover:brightness-125"
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

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-cyan px-10 py-4 text-xl font-bold text-secondary transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:brightness-110"
                >
                  <HiOutlineExternalLink size={22} />
                  View Project
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-lavender/90 px-10 py-4 text-xl font-bold text-secondary transition-all duration-300 hover:shadow-[0_0_24px_rgba(196,181,253,0.3)] hover:brightness-110"
              >
                <HiOutlineDocumentText size={22} />
                Read Full Story
              </Link>
            </div>
          </motion.div>

          {/* Preview image in laptop mockup — takes ~55% */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="flex-1 lg:max-w-[50%] flex items-center"
          >
            <div className="group/img w-full">
              <div
                className="relative mx-auto transition-transform duration-300 hover:-translate-y-1.5"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(0,0,0,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.4)")
                }
              >
                {/* Top bezel (lid) */}
                <div className="rounded-t-xl bg-[#2a2a2a] px-2.5 pt-2.5">
                  {/* Camera dot */}
                  <div className="flex justify-center pb-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#555]" />
                  </div>
                  {/* Screen — 2:1 to match screenshot aspect ratios */}
                  <div className="relative overflow-hidden rounded-[4px] bg-black aspect-[2/1]">
                    <Image
                      src={project.previewSrc}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/img:opacity-100 bg-gradient-to-t from-cyan/[0.10] via-teal/[0.04] to-transparent" />
                  </div>
                </div>
                {/* Hinge bar */}
                <div className="h-3.5 bg-[#3a3a3a] rounded-b-lg" />
                {/* Keyboard base */}
                <div className="mx-auto w-[40%] h-1.5 bg-[#4a4a4a] rounded-b-md" />

                {/* Phone mockup — only shown when a mobile screenshot exists */}
                {project.mobileSrc && (
                  <div
                    className="absolute -bottom-4 -right-4 z-10 hidden lg:block"
                    style={{
                      width: "28%",
                      filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.6))",
                    }}
                  >
                    <div className="rounded-[20px] bg-[#1e1f26] p-1.5 ring-1 ring-white/[0.06]">
                      {/* Dynamic Island */}
                      <div className="flex items-center justify-center px-4 pt-2 pb-1">
                        <div className="h-3 w-14 rounded-full bg-[#0a0a0a]" />
                      </div>
                      {/* Phone screen */}
                      <div className="relative overflow-hidden rounded-[14px] bg-black aspect-[9/19.5]">
                        <Image
                          src={project.mobileSrc}
                          alt={`${project.title} mobile preview`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      {/* Home indicator */}
                      <div className="flex justify-center py-2">
                        <div className="h-1 w-10 rounded-full bg-[#3a3b42]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
