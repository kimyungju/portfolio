"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative px-4 py-32 md:px-8 lg:px-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent-warm/[0.03] blur-[100px]" />

      <div className="mx-auto max-w-[90rem]">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-[15px] tracking-[0.3em] text-cyan/80"
        >
          ABOUT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-700 tracking-[-0.02em] md:text-6xl"
        >
          Developer
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 mb-16 h-px w-full max-w-xs origin-left bg-gradient-to-r from-cyan via-purple/40 to-transparent"
        />

        <div className="flex flex-col items-start gap-14 lg:flex-row lg:items-stretch">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
            className="w-full lg:w-[320px] shrink-0"
          >
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[320px] overflow-hidden rounded-2xl border border-white/[0.06]">
              <Image
                src="/profile.jpg"
                alt="Kim Yungju"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl leading-[1.85] text-text-muted md:text-2xl">
              I&apos;m Yungju, an undergraduate Computer Science student at the{" "}
              <strong className="font-semibold text-primary">
                National University of Singapore
              </strong>
              . I made an intentional pivot from Business and Economics to CS
              because I wanted to turn ideas into reality through{" "}
              <code className="rounded border border-white/[0.08] bg-badge-bg px-1.5 py-0.5 font-mono text-[13px] text-primary/90">
                code
              </code>
              .
            </p>

            <p className="text-xl leading-[1.85] text-text-muted md:text-2xl">
              I focus on building{" "}
              <strong className="font-semibold text-primary">
                AI-powered full-stack applications
              </strong>{" "}
              , from autonomous agents to real-time platforms, using tools like
              Next.js, Python, and OpenAI. Most of my projects start from a
              simple question: how can technology make this easier?
            </p>

            <p className="text-xl leading-[1.85] text-text-muted md:text-2xl">
              Fluent in{" "}
              <strong className="font-semibold text-primary">
                English and Korean
              </strong>
              , I bring an international perspective from growing up in Kuala
              Lumpur and studying in Singapore. Beyond full-stack development,
              I&apos;m drawn to{" "}
              <strong className="font-semibold text-primary">
                software engineering and AI engineering
              </strong>
              , aiming to build systems that are both powerful and intelligent.
              Outside of coding, I serve as Head of Technology at NUS Developer
              Group, and I unwind in the pool.
            </p>
          </motion.div>
        </div>

        {/* Button centered under photo */}
        <div className="mt-6 flex justify-center lg:w-[320px]">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-secondary transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.1)]"
          >
            Send me a message
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="m5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
