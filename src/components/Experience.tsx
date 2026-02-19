"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import ExperienceTimeline from "./ExperienceTimeline";
import ImageCarousel from "./ImageCarousel";

export default function Experience() {
  return (
    <section id="experience" className="relative px-8 py-32 md:px-16 lg:px-24">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.02] blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-[15px] tracking-[0.3em] text-cyan/80"
        >
          JOURNEY
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-700 tracking-[-0.02em] md:text-6xl"
        >
          Experience
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 mb-16 h-px w-full max-w-xs origin-left bg-gradient-to-r from-cyan via-purple/40 to-transparent"
        />

        <ExperienceTimeline entries={experiences} />
        <ImageCarousel />
      </div>
    </section>
  );
}
