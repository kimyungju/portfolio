"use client";

import { motion } from "framer-motion";
import { ExperienceEntry, RoleProgression } from "@/data/experience";

function RoleProgressionTimeline({ roles }: { roles: RoleProgression[] }) {
  return (
    <div className="relative mt-4 ml-1.5">
      {/* Continuous vertical line connecting all dots */}
      <div className="absolute left-0 top-[7px] bottom-[7px] w-px bg-white/10" />

      {roles.map((role, i) => (
        <div
          key={role.role}
          className={`relative flex gap-3 ${i < roles.length - 1 ? "pb-5" : ""}`}
        >
          {/* Dot — centered on the vertical line */}
          <div
            className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 -ml-[5px] rounded-full ${
              role.current
                ? "bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                : "border border-white/20 bg-secondary"
            }`}
          />

          {/* Role content */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                className={`text-lg font-600 md:text-xl ${
                  role.current ? "text-primary" : "text-text-muted/50"
                }`}
              >
                {role.role}
              </span>
              <span
                className={`whitespace-nowrap font-mono text-sm tracking-wide ${
                  role.current ? "text-text-muted/70" : "text-text-muted/30"
                }`}
              >
                {role.period}
              </span>
            </div>
            {role.description && (
              <p
                className={`mt-1 max-w-xl text-base leading-[1.7] ${
                  role.current ? "text-text-muted" : "text-text-muted/40"
                }`}
              >
                {role.description}
              </p>
            )}
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
      <div className="absolute left-[104px] top-2 bottom-2 w-px bg-gradient-to-b from-white/10 via-white/[0.06] to-transparent md:left-[120px]" />

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

            {/* Dot on timeline — hidden for role-progression entries */}
            {!entry.roles && (
              <div className="relative flex shrink-0 items-start pt-2">
                <div className="relative z-10 h-2.5 w-2.5 rounded-full border border-white/20 bg-secondary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/20">
                  <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="pb-2">
              {entry.roles ? (
                <>
                  <h3 className="font-display text-xl font-600 tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary md:text-2xl">
                    {entry.organization}
                  </h3>
                  <RoleProgressionTimeline roles={entry.roles} />
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
