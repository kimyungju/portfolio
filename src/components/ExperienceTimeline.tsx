"use client";

import { motion } from "framer-motion";
import { ExperienceEntry, RoleEntry } from "@/data/experience";

function RoleTimeline({ roles }: { roles: RoleEntry[] }) {
  return (
    <div className="relative mt-3 ml-1">
      {/* Vertical connecting line */}
      <div className="absolute left-[4px] top-[10px] bottom-[10px] w-px bg-white/10" />

      {roles.map((role, i) => (
        <div
          key={role.title}
          className={`relative flex items-start gap-3 ${i < roles.length - 1 ? "pb-4" : ""}`}
        >
          <div className="relative z-10 mt-[6px] h-[9px] w-[9px] shrink-0 rounded-full border border-white/20 bg-secondary" />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-600 text-primary/90 md:text-lg">
                {role.title}
              </span>
              <span className="whitespace-nowrap font-mono text-xs tracking-wide text-text-muted/50">
                {role.period}
              </span>
            </div>
            <p className="mt-1 max-w-xl text-base leading-[1.7] text-text-muted">
              {role.description}
            </p>
          </div>
        </div>
      ))}
    </div>
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
      <div className="absolute left-[86px] top-2 bottom-2 w-px bg-gradient-to-b from-white/10 via-white/[0.06] to-transparent md:left-[100px]" />

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
            <div className="w-24 shrink-0 pt-1 text-right md:w-28">
              <span className="whitespace-nowrap font-mono text-base tracking-wider text-text-muted/70 md:text-lg">
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
              {entry.roles ? (
                <>
                  <h3 className="font-display text-xl font-600 tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-base font-medium text-accent/80 md:text-lg">
                    {entry.organization}
                  </p>
                  <RoleTimeline roles={entry.roles} />
                </>
              ) : (
                <>
                  <h3 className="font-display text-xl font-600 tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-base font-medium text-accent/80 md:text-lg">
                    {entry.organization}
                  </p>
                  <p className="mt-2 max-w-xl text-lg leading-[1.7] text-text-muted md:text-xl">
                    {entry.description}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
