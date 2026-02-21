"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import ExperienceTimeline from "./ExperienceTimeline";
import ImageCarousel from "./ImageCarousel";

export default function Experience() {
  return (
    <section id="experience" className="relative px-4 py-32 md:px-8 lg:px-12">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.02] blur-[120px]" />

      <div className="mx-auto max-w-[90rem]">
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

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1 min-w-0">
            <ExperienceTimeline entries={experiences} />
          </div>
          <div className="lg:w-[350px] lg:shrink-0">
            <div className="lg:sticky lg:top-32">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
