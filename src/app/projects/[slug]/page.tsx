import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Yungju Kim`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-text-muted transition-colors duration-300 hover:text-primary"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <path d="m19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to projects
        </Link>

        <div className="mt-12">
          <span className="font-mono text-[13px] tracking-[0.3em] text-text-muted/60">
            {project.number}
          </span>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/[0.06] bg-card-bg">
              <Image
                src={project.logoSrc}
                alt={`${project.title} logo`}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-display text-4xl font-700 tracking-[-0.02em] md:text-5xl">
              {project.title}
            </h1>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-badge-border bg-badge-bg px-3 py-1 text-[11px] font-medium tracking-wide text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-card-bg">
            <Image
              src={project.previewSrc}
              alt={`${project.title} preview`}
              width={1080}
              height={608}
              className="w-full"
            />
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-[15px] leading-[1.8] text-text-muted">
              {project.description}
            </p>
            <p className="text-[15px] leading-[1.8] text-text-muted">
              {project.longDescription}
            </p>
          </div>

          {project.liveUrl && (
            <div className="mt-8">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[13px] font-medium text-text-secondary transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-primary"
              >
                View Live Project
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="m5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
