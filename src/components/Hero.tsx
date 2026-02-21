"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import TechStackStrip from "@/components/TechStackStrip";
import { MorphingText } from "@/components/ui/morphing-text";

const SCRAMBLE_CHARS = "@#$%&!?*^~+=";

function useTextScramble(
  text: string,
  delay: number,
  duration: number,
  active: boolean
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }

    const length = text.length;
    const tickMs = 30;
    const totalTicks = Math.ceil(duration / tickMs);
    let tick = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        tick++;
        const resolved = Math.min(
          length,
          Math.floor((tick / totalTicks) * length)
        );

        let result = "";
        for (let i = 0; i < length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (i < resolved) {
            result += text[i];
          } else {
            result +=
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        setDisplayed(result);

        if (resolved >= length) {
          clearInterval(intervalId);
          setDisplayed(text);
          setDone(true);
        }
      }, tickMs);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, duration, active]);

  return { displayed, done };
}

export default function Hero() {
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: false, amount: 0.3 });

  const name = useTextScramble("KIM YUNGJU", 100, 1500, inView);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Radial glow blobs */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-purple/[0.05] blur-[120px]" />

      {/* Dot grid pattern */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 md:px-8 lg:px-12">
        {/* Name label — scramble re-triggers on scroll */}
        <p className="mb-6 font-mono text-[clamp(1.6rem,4.9vw,4.2rem)] tracking-[0.2em] font-bold text-text-muted leading-none">
          {name.displayed || "\u00A0"}
        </p>

        {/* Headline — morphing titles */}
        <MorphingText
          texts={["Software Engineer", "Cyber Security Engineer"]}
          className="h-[1.1em] max-w-none text-left font-display text-[clamp(1.8rem,4.5vw,4.2rem)] font-800 leading-[0.95] tracking-[-0.03em] text-primary"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl text-xl leading-relaxed text-text-muted md:text-2xl"
        >
          I build AI-powered full-stack applications focused on turning ideas
          into products that solve real problems.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 h-px w-full max-w-md origin-left bg-gradient-to-r from-cyan via-purple/50 to-transparent"
        />

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8"
        >
          <TechStackStrip />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.25em] text-text-muted/50 font-mono">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiChevronDown className="text-text-muted/50 text-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
}
