"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const images = [
  {
    src: "/experience/photo-1.jpeg",
    alt: "Experience photo from a university event",
  },
  {
    src: "/experience/photo-2.jpeg",
    alt: "Experience photo from a team session",
  },
  {
    src: "/experience/photo-3.jpeg",
    alt: "Experience photo from a presentation",
  },
  {
    src: "/experience/sea-openai-hackathon.jpeg",
    alt: "SEA OpenAI hackathon team photo",
  },
  {
    src: "/experience/agent-forge-hackathon-win.jpg",
    alt: "Agent Forge Hackathon first-place team photo",
  },
  {
    src: "/experience/agent-forge-hackathon-pitch.jpg",
    alt: "Agent Forge Hackathon pitch presentation",
  },
  {
    src: "/experience/lumcloon-energy-leu-1.png",
    alt: "Lumcloon Energy site visit photo",
  },
  {
    src: "/experience/lumcloon-energy-leu-2.png",
    alt: "Lumcloon Energy facility photo",
  },
];

const AUTO_ADVANCE_MS = 4000;
const TRANSITION_MS = 700;

// Slot indices in `slides`:
//   0           → clone of last image
//   1..length   → real images
//   length + 1  → clone of first image
const slides = [images[images.length - 1], ...images, images[0]];
const LAST_CLONE = 0;
const FIRST_REAL = 1;
const LAST_REAL = images.length;
const FIRST_CLONE = images.length + 1;

export default function ImageCarousel() {
  const [slide, setSlide] = useState(FIRST_REAL);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Mirror of `slide` that updates synchronously inside event handlers so that
  // back-to-back clicks see each other's effects without waiting for commits.
  const slideRef = useRef(FIRST_REAL);
  // Pending rAFs from a snap-then-animate chain. Cancelled on every new move
  // so a stale rAF can't overwrite a newer slide later.
  const pendingChainRef = useRef<{ outer?: number; inner?: number }>({});

  useEffect(() => {
    slideRef.current = slide;
  }, [slide]);

  const realIndex =
    slide === LAST_CLONE
      ? images.length - 1
      : slide === FIRST_CLONE
        ? 0
        : slide - 1;

  const cancelPendingChain = useCallback(() => {
    const { outer, inner } = pendingChainRef.current;
    if (outer !== undefined) cancelAnimationFrame(outer);
    if (inner !== undefined) cancelAnimationFrame(inner);
    pendingChainRef.current = {};
  }, []);

  // Move to a target slot. If we're sitting on a clone (a visual duplicate of
  // a real slide), snap to the real counterpart with no transition first, then
  // animate to the target. Otherwise just animate.
  const moveTo = useCallback(
    (target: number) => {
      cancelPendingChain();
      const current = slideRef.current;
      const onClone = current === FIRST_CLONE || current === LAST_CLONE;

      if (!onClone) {
        setTransitionEnabled(true);
        setSlide(target);
        slideRef.current = target;
        return;
      }

      const snapTo = current === FIRST_CLONE ? FIRST_REAL : LAST_REAL;
      setTransitionEnabled(false);
      setSlide(snapTo);
      slideRef.current = snapTo;

      if (target === snapTo) return;

      // Two rAFs guarantee the snap state paints before the transition is
      // re-enabled — without this the browser collapses both updates into a
      // single long animation across every intervening slide.
      pendingChainRef.current.outer = requestAnimationFrame(() => {
        pendingChainRef.current.outer = undefined;
        pendingChainRef.current.inner = requestAnimationFrame(() => {
          pendingChainRef.current.inner = undefined;
          setTransitionEnabled(true);
          setSlide(target);
          slideRef.current = target;
        });
      });
    },
    [cancelPendingChain],
  );

  const next = useCallback(() => {
    const current = slideRef.current;
    // From FIRST_CLONE the visible image is image[0]; "next" means image[1] at
    // FIRST_REAL + 1 — not current + 1, which would be out of bounds.
    if (current === FIRST_CLONE) {
      moveTo(FIRST_REAL + 1);
      return;
    }
    moveTo(current + 1);
  }, [moveTo]);

  const prev = useCallback(() => {
    const current = slideRef.current;
    // Symmetric: from LAST_CLONE the visible image is image[length-1]; "prev"
    // means image[length-2] at LAST_REAL - 1.
    if (current === LAST_CLONE) {
      moveTo(LAST_REAL - 1);
      return;
    }
    moveTo(current - 1);
  }, [moveTo]);

  const goTo = useCallback((index: number) => moveTo(index + 1), [moveTo]);

  // Restart the auto-advance countdown from zero. Called on every manual
  // interaction so a click never lands right before a pending tick fires —
  // otherwise a fixed wall-clock interval could advance again milliseconds
  // after the user navigated. window.setInterval is required for the DOM
  // overload's number return type (bare setInterval resolves to NodeJS.Timeout).
  const autoTimerRef = useRef<number | undefined>(undefined);
  const restartAuto = useCallback(() => {
    if (autoTimerRef.current !== undefined) clearInterval(autoTimerRef.current);
    autoTimerRef.current = window.setInterval(next, AUTO_ADVANCE_MS);
  }, [next]);

  // User-facing handlers: navigate, then reset the auto timer. The interval
  // itself calls the raw `next`, so auto-advance keeps its own rhythm.
  const handlePrev = useCallback(() => {
    prev();
    restartAuto();
  }, [prev, restartAuto]);
  const handleNext = useCallback(() => {
    next();
    restartAuto();
  }, [next, restartAuto]);
  const handleGoTo = useCallback(
    (index: number) => {
      goTo(index);
      restartAuto();
    },
    [goTo, restartAuto],
  );

  // After landing on a clone via animation (typically auto-advance), schedule
  // a silent snap-back once the transition completes.
  useEffect(() => {
    if (slide !== LAST_CLONE && slide !== FIRST_CLONE) return;
    const timeoutId = setTimeout(() => {
      setTransitionEnabled(false);
      setSlide(slide === LAST_CLONE ? LAST_REAL : FIRST_REAL);
    }, TRANSITION_MS);
    return () => clearTimeout(timeoutId);
  }, [slide]);

  // Re-enable transitions only after the no-transition snap has painted.
  useEffect(() => {
    if (transitionEnabled) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [transitionEnabled]);

  useEffect(() => () => cancelPendingChain(), [cancelPendingChain]);

  useEffect(() => {
    restartAuto();
    return () => {
      if (autoTimerRef.current !== undefined) clearInterval(autoTimerRef.current);
    };
  }, [restartAuto]);

  return (
    <div className="relative mx-auto max-w-xl sm:max-w-2xl">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card-bg">
        <div
          className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)]" : ""}`}
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {slides.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              className="relative w-full shrink-0 aspect-[4/5] bg-black"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 672px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
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
          onClick={handleNext}
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
            onClick={() => handleGoTo(i)}
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
