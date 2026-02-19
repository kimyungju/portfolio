"use client";

import { motion } from "framer-motion";
import TechStackStrip from "@/components/TechStackStrip";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Subtle radial glow behind headline */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-accent-warm/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-5xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-[13px] tracking-[0.3em] text-cyan"
        >
          PORTFOLIO &rsquo;26
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-800 leading-[0.95] tracking-[-0.03em]"
        >
          Aspiring
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-text-secondary to-text-muted">
            Software Engineer.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-text-muted"
        >
          I&apos;m Yungju &mdash; I build AI-powered full-stack applications
          focused on turning ideas into products that solve real problems.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 h-px w-full max-w-md origin-left bg-gradient-to-r from-cyan via-purple/50 to-transparent"
        />

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <TechStackStrip />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.25em] text-text-muted/50 font-mono">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-text-muted/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
