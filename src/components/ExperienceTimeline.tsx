"use client";

import { motion } from "framer-motion";
import { ExperienceEntry } from "@/data/experience";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export default function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="space-y-12">
      {entries.map((entry, i) => (
        <motion.div
          key={i}
          className="flex gap-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="w-20 shrink-0 text-right">
            <span className="text-sm font-mono text-text-muted">{entry.year}</span>
          </div>
          <div className="border-l border-white/20 pl-6">
            <h3 className="text-lg font-bold">{entry.title}</h3>
            <p className="text-sm text-accent">{entry.organization}</p>
            <p className="mt-2 text-text-muted text-sm leading-relaxed">
              {entry.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
