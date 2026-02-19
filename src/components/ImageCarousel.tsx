"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const images = [
  "/experience/photo-1.jpeg",
  "/experience/photo-2.jpeg",
  "/experience/photo-3.jpeg",
  "/experience/lumcloon-energy-leu-1.png",
  "/experience/lumcloon-energy-leu-2.png",
  "/experience/army-it.jpg",
];

// Extended array: [clone-last, ...real slides, clone-first]
const extended = [images[images.length - 1], ...images, images[0]];

const AUTO_ADVANCE_MS = 4000;

export default function ImageCarousel() {
  // slideIndex 1..N maps to real images 0..N-1; 0 and N+1 are clones
  const [slideIndex, setSlideIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const realIndex = ((slideIndex - 1) % images.length + images.length) % images.length;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideIndex((s) => s + 1);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleTransitionEnd = () => {
    // Landed on clone-first → jump to real first
    if (slideIndex === images.length + 1) {
      setAnimate(false);
      setSlideIndex(1);
    }
    // Landed on clone-last → jump to real last
    if (slideIndex === 0) {
      setAnimate(false);
      setSlideIndex(images.length);
    }
  };

  // Re-enable animation on next frame after an instant jump
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  }, [animate]);

  const goNext = () => {
    setSlideIndex((s) => s + 1);
    resetTimer();
  };

  const goPrev = () => {
    setSlideIndex((s) => s - 1);
    resetTimer();
  };

  const goTo = (real: number) => {
    setSlideIndex(real + 1);
    resetTimer();
  };

  return (
    <div className="relative mx-auto max-w-xl sm:max-w-2xl">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card-bg">
        <div
          className={`flex ${animate ? "transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)]" : ""}`}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((src, i) => (
            <div key={i} className="w-full shrink-0">
              <Image
                src={src}
                alt={`Experience photo ${((i - 1) % images.length + images.length) % images.length + 1}`}
                width={800}
                height={600}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
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
          onClick={goNext}
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
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === realIndex
                ? "w-6 bg-primary/60"
                : "w-1.5 bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
