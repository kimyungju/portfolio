"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const images = [
  "/experience/photo-1.jpeg",
  "/experience/photo-2.jpeg",
  "/experience/photo-3.jpeg",
];

const AUTO_ADVANCE_MS = 4000;

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
    [],
  );
  const prev = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));

  useEffect(() => {
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [current, next]);

  return (
    <div className="relative mx-auto max-w-xl sm:max-w-2xl">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card-bg">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full shrink-0">
              <Image
                src={src}
                alt={`Experience photo ${i + 1}`}
                width={800}
                height={600}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-secondary/80 backdrop-blur-sm text-text-muted transition-all duration-300 hover:border-white/20 hover:text-primary"
        >
          <svg
            width="14"
            height="14"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-secondary/80 backdrop-blur-sm text-text-muted transition-all duration-300 hover:border-white/20 hover:text-primary"
        >
          <svg
            width="14"
            height="14"
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
      <div className="mt-4 flex justify-center gap-2">
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
