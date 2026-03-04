"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "PROJECTS", href: "/#projects" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "CONTACT", href: "/#contact" },
];

export default function StorySidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <motion.nav
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-0 left-0 z-50 hidden h-screen w-[68px] flex-col items-center py-8 md:flex"
      >
        <a href="/">
          <Image src="/logo.svg" alt="YJ" width={32} height={32} />
        </a>

        <div className="flex flex-1 flex-col items-center justify-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium tracking-[0.2em] text-text-muted transition-colors duration-300 [writing-mode:vertical-lr] rotate-180 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile top bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:hidden"
      >
        <a href="/">
          <Image src="/logo.svg" alt="YJ" width={32} height={32} />
        </a>

        <button
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-5 bg-text-secondary transition-all duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-text-secondary transition-all duration-300 ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-secondary/98 backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="font-display text-2xl font-medium tracking-[0.15em] text-text-secondary transition-colors hover:text-primary"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
