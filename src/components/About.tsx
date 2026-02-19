"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
      <p className="text-sm tracking-wider text-text-muted mb-12">DEVELOPER</p>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/profile.svg"
            alt="Yungju Kim"
            width={400}
            height={400}
            className="rounded-2xl"
          />
        </motion.div>

        <motion.div
          className="space-y-4 text-text-muted leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            I&apos;m Yungju, an undergraduate Computer Science student at the{" "}
            <strong className="text-white">
              National University of Singapore
            </strong>
            . I made an intentional pivot from Business and Economics to CS
            because I wanted to turn ideas into reality through{" "}
            <code className="bg-badge-bg px-1.5 py-0.5 rounded text-sm text-white">
              code
            </code>
            .
          </p>

          <p>
            I focus on building{" "}
            <strong className="text-white">
              AI-powered full-stack applications
            </strong>{" "}
            — from autonomous agents to real-time platforms — using tools like
            Next.js, Python, and OpenAI. Most of my projects start from a simple
            question: how can technology make this easier?
          </p>

          <p>
            Fluent in{" "}
            <strong className="text-white">English and Korean</strong>, I bring
            an international perspective from growing up in Kuala Lumpur and
            studying in Singapore. When I&apos;m not coding, I&apos;m
            contributing to the developer community at NUS as Head of Technology
            at Developer Group.
          </p>

          <a
            href="#contact"
            className="inline-block mt-4 rounded-full bg-white text-secondary px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Send me a message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
