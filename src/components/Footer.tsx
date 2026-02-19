"use client";

import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { socials } from "@/data/socials";

const contactLinks = [
  {
    href: `mailto:${socials.email}`,
    icon: <HiOutlineMail size={18} />,
    label: socials.email,
  },
  {
    href: `tel:${socials.phone}`,
    icon: <HiOutlinePhone size={18} />,
    label: socials.phone,
  },
  {
    href: socials.linkedin,
    icon: <FaLinkedin size={18} />,
    label: "LinkedIn",
    external: true,
  },
  {
    href: socials.github,
    icon: <FaGithub size={18} />,
    label: "GitHub",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative px-8 pb-12 pt-32 md:px-16 lg:px-24">
      {/* Top divider */}
      <div className="mx-auto mb-20 max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-[15px] tracking-[0.3em] text-cyan/80"
        >
          CONTACT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-700 tracking-[-0.02em] md:text-6xl"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 max-w-lg text-lg leading-relaxed text-text-muted md:text-xl"
        >
          Have a project in mind or just want to connect? I&apos;d love to hear
          from you.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 mb-12 h-px w-full max-w-xs origin-left bg-gradient-to-r from-cyan via-purple/40 to-transparent"
        />

        {/* Contact links */}
        <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-5 py-5 transition-all duration-300 hover:border-cyan/20 hover:bg-white/[0.04] hover:shadow-[0_0_24px_rgba(34,211,238,0.06)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-text-muted transition-all duration-300 group-hover:bg-cyan/10 group-hover:text-cyan">
                {link.icon}
              </span>
              <span className="text-[15px] font-medium text-text-muted transition-colors duration-300 group-hover:text-primary">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-8">
          <p className="text-[12px] tracking-wider text-text-muted/60">
            &copy; 2026 Kim Yungju
          </p>
          <p className="text-[12px] tracking-wider text-text-muted/40">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
