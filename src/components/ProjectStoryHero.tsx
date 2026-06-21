import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCode,
  HiOutlineExternalLink,
} from "react-icons/hi";
import type { Project } from "@/data/projects";
import type { ProjectStoryBrief } from "@/data/projectStoryBriefs";

type ProjectStoryHeroProps = {
  readonly project: Project;
  readonly brief: ProjectStoryBrief;
};

function StoryActionLink({
  href,
  label,
  variant,
}: {
  readonly href: string;
  readonly label: string;
  readonly variant: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-sm font-bold transition-all duration-300 md:text-base ${
        isPrimary
          ? "bg-cyan text-secondary hover:shadow-[0_0_24px_rgba(34,211,238,0.32)] hover:brightness-110"
          : "border border-white/[0.10] bg-white/[0.04] text-primary hover:border-white/[0.18] hover:bg-white/[0.07]"
      }`}
    >
      {isPrimary ? (
        <HiOutlineExternalLink size={20} />
      ) : (
        <HiOutlineCode size={20} />
      )}
      {label}
    </a>
  );
}

export default function ProjectStoryHero({
  project,
  brief,
}: ProjectStoryHeroProps) {
  return (
    <>
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors duration-300 hover:text-primary"
      >
        <HiOutlineArrowLeft size={18} />
        Projects
      </Link>

      <section className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-[0.2em]">
              <span className="text-cyan">{"//"}</span>
              <span className="ml-1 text-primary">
                {project.number.replace("//", "").trim()}
              </span>
            </span>
            {project.badge && (
              <span className="rounded-full border border-cyan/35 bg-cyan/[0.08] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">
                {project.badge}
              </span>
            )}
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
              {brief.eyebrow}
            </span>
          </div>

          <h1 className="mt-6 max-w-full text-balance font-display text-[3rem] font-800 leading-[0.95] tracking-normal text-primary md:max-w-4xl md:text-[4.8rem]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-full text-xl leading-[1.65] text-text-secondary md:max-w-3xl md:text-2xl">
            {brief.focus}
          </p>

          <p className="mt-5 max-w-full text-base leading-[1.8] text-text-muted md:max-w-2xl md:text-lg">
            {brief.outcome}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2">
              <HiOutlineClock size={17} />
              {project.readTime}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span className="inline-flex items-center gap-2">
              <HiOutlineCalendar size={17} />
              {project.publishDate}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <StoryActionLink
                href={project.liveUrl}
                label="View project"
                variant="primary"
              />
            )}
            {project.githubUrl && (
              <StoryActionLink
                href={project.githubUrl}
                label="Source code"
                variant="secondary"
              />
            )}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card-bg">
            <Image
              src={project.previewSrc}
              alt={`${project.title} product preview`}
              width={1600}
              height={1080}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mt-4 flex items-center gap-3 px-1 pb-1">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-card-bg">
              <Image
                src={project.logoSrc}
                alt={`${project.title} logo`}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-primary">{project.title}</p>
              <p className="truncate text-sm text-text-muted">
                {project.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
