"use client";

import { motion } from "framer-motion";
import TechStackStrip from "@/components/TechStackStrip";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24">
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Aspiring Software Engineer.
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        I&apos;m Yungju — I build AI-powered full-stack applications focused on
        turning ideas into products that solve real problems.
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <TechStackStrip />
      </motion.div>
    </section>
  );
}
