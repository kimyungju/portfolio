import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { socials } from "@/data/socials";

export default function Footer() {
  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-16">
        <a
          href={`mailto:${socials.email}`}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <HiOutlineMail size={20} />
          {socials.email}
        </a>

        <a
          href={`tel:${socials.phone}`}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <HiOutlinePhone size={20} />
          {socials.phone}
        </a>

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <FaLinkedin size={20} />
          LinkedIn
        </a>

        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <FaGithub size={20} />
          GitHub
        </a>
      </div>

      <div className="border-t border-white/10 pt-8 text-sm text-text-muted">
        &copy; 2026 Kim Yungju. All rights reserved.
      </div>
    </section>
  );
}
