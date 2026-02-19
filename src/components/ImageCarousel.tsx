"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/experience/photo-1.svg",
  "/experience/photo-2.svg",
  "/experience/photo-3.svg",
  "/experience/photo-4.svg",
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative mt-16">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card-bg">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full shrink-0">
              <Image
                src={src}
                alt={`Experience photo ${i + 1}`}
                width={1200}
                height={675}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/80 backdrop-blur-sm text-text-muted transition-all duration-300 hover:border-white/20 hover:text-primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/80 backdrop-blur-sm text-text-muted transition-all duration-300 hover:border-white/20 hover:text-primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-primary/60"
                : "w-1.5 bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
