"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/experience/photo-1.svg",
  "/experience/photo-2.svg",
  "/experience/photo-3.svg",
  "/experience/photo-4.svg",
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative mt-12 overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500"
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

      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
