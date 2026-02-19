"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-secondary/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#">
            <Image src="/logo.svg" alt="YK Logo" width={40} height={40} />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider text-text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="rounded-full border border-white/20 px-5 py-2 text-sm tracking-wider hover:bg-white/10 transition-colors"
            >
              Download CV
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-2xl text-text-muted hover:text-white transition-colors md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt4 />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-secondary/95 backdrop-blur-md md:hidden">
          <button
            className="absolute top-5 right-6 text-3xl text-text-muted hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <HiX />
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg tracking-wider text-text-muted hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="rounded-full border border-white/20 px-5 py-2 text-sm tracking-wider hover:bg-white/10 transition-colors"
          >
            Download CV
          </a>
        </div>
      )}
    </>
  );
}
