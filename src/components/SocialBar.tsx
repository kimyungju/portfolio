"use client";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { socials } from "@/data/socials";

const links = [
  {
    href: socials.linkedin,
    icon: FaLinkedinIn,
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    href: socials.github,
    icon: FaGithub,
    label: "GitHub",
  },
];

export default function SocialBar() {
  return (
    <div className="fixed bottom-1/5 right-20 z-50 hidden lg:flex flex-col gap-7">
      {links.map(({ href, icon: Icon, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center gap-3 flex-row-reverse"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 hover:bg-white/[0.06] hover:scale-110">
            <Icon
              size={40}
              className="transition-[filter] duration-200 group-hover:brightness-125"
              style={{ color: color ?? "#d1d5db" }}
            />
          </span>
          <span className="text-base font-mono tracking-wide text-text-muted/0 group-hover:text-text-muted/80 transition-colors duration-200">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
