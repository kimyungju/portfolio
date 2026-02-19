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
    <div className="fixed bottom-1/5 right-20 z-50 hidden lg:flex flex-col gap-5">
      {links.map(({ href, icon: Icon, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center gap-2 flex-row-reverse transition-transform duration-200 hover:scale-110"
        >
          <Icon
            size={22}
            className="transition-[filter] duration-200 group-hover:brightness-125"
            style={{ color: color ?? "#d1d5db" }}
          />
          <span className="text-[11px] font-mono tracking-wide text-text-muted/0 group-hover:text-text-muted/80 transition-colors duration-200">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
