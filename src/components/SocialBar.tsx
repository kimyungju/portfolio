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
    <div className="fixed bottom-1/5 right-[clamp(0.5rem,calc((100vw_-_90rem)/2_-_4rem),2rem)] z-50 hidden lg:flex flex-col gap-5">
      {links.map(({ href, icon: Icon, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative flex h-10 w-10 items-center justify-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:bg-white/[0.06] group-hover:scale-110">
            <Icon
              size={22}
              className="transition-[filter] duration-200 group-hover:brightness-125"
              style={{ color: color ?? "#d1d5db" }}
            />
          </span>
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out text-sm font-mono text-white bg-white/10 backdrop-blur-sm rounded-md px-3 py-1 pointer-events-none">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
