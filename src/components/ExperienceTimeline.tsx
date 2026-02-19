"use client";

import { motion } from "framer-motion";
import { ExperienceEntry } from "@/data/experience";

function RoleTitle({ title }: { title: string }) {
  if (!title.includes("→")) {
    return <>{title}</>;
  }

  const roles = title.split("→").map((r) => r.trim());
  return (
    <span className="flex flex-col gap-2">
      <span className="flex items-center gap-3 flex-wrap">
        <span className="rounded-full border border-cyan/30 bg-cyan/[0.08] px-3 py-1 text-primary shadow-[0_0_12px_rgba(34,211,238,0.08)]">
          {roles[1]}
        </span>
        <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-sm text-text-muted/50">
          {roles[0]}
        </span>
      </span>
    </span>
  );
}

export default function ExperienceTimeline({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  return (
    <div className="relative">
      {/* Continuous vertical line */}
      <div className="absolute left-[88px] top-2 bottom-2 w-px bg-gradient-to-b from-white/10 via-white/[0.06] to-transparent md:left-[104px]" />

      <div className="space-y-14">
        {entries.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex gap-6 md:gap-8"
          >
            {/* Year */}
            <div className="w-16 shrink-0 pt-1 text-right md:w-20">
              <span className="font-mono text-[13px] tracking-wider text-text-muted/70">
                {entry.year}
              </span>
            </div>

            {/* Dot on timeline */}
            <div className="relative flex shrink-0 items-start pt-2">
              <div className="relative z-10 h-2.5 w-2.5 rounded-full border border-white/20 bg-secondary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/20">
                <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

            {/* Content */}
            <div className="pb-2">
              <h3 className="font-display text-base font-600 tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary md:text-lg">
                <RoleTitle title={entry.title} />
              </h3>
              <p className="mt-1 text-[13px] font-medium text-accent/80">
                {entry.organization}
              </p>
              <p className="mt-2 max-w-lg text-[14px] leading-[1.7] text-text-muted">
                {entry.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
