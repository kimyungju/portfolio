"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
  text: string;
  textColor?: string;
  overlayColor?: string;
  className?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
}

export default function RevealText({
  text,
  textColor = "text-white",
  overlayColor = "#22d3ee",
  className = "",
  letterDelay = 0.04,
  overlayDelay = 0.6,
  overlayDuration = 0.3,
  springDuration = 0.5,
  letterImages,
}: RevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const letters = text.split("");
  const totalLetters = letters.filter((l) => l !== " ").length;
  const bounceInEnd = totalLetters * letterDelay + springDuration;
  const overlayStart = bounceInEnd + overlayDelay;

  let letterIndex = 0;

  return (
    <h3 className={`${className} ${textColor}`}>
      <motion.span
        ref={containerRef}
        className="inline-flex flex-wrap"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {letters.map((letter, i) => {
          if (letter === " ") {
            return (
              <span key={i} className="inline-block w-[0.3em]" />
            );
          }

          const idx = letterIndex++;
          const image =
            letterImages && letterImages.length > 0
              ? letterImages[idx % letterImages.length]
              : null;

          return (
            <span
              key={i}
              className="relative inline-block"
              onMouseEnter={() => !isMobile && setHoveredIndex(i)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            >
              {/* Letter */}
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: idx * letterDelay,
                      duration: springDuration,
                    },
                  },
                }}
                style={
                  !isMobile && hoveredIndex === i && image
                    ? {
                        backgroundImage: `url(${image})`,
                        backgroundSize: "200% 200%",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        transition:
                          "background-position 3s ease, color 0.3s ease",
                      }
                    : { transition: "color 0.3s ease" }
                }
              >
                {letter}
              </motion.span>

              {/* Overlay sweep */}
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{ backgroundColor: overlayColor }}
                initial={{ scaleX: 0 }}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: [0, 1, 1, 0],
                    originX: [0, 0, 1, 1],
                    transition: {
                      duration: overlayDuration,
                      delay: overlayStart + idx * 0.03,
                      ease: "easeInOut",
                      times: [0, 0.4, 0.6, 1],
                    },
                  },
                }}
              />
            </span>
          );
        })}
      </motion.span>
    </h3>
  );
}
