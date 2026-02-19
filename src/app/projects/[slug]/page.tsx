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
    <main className="min-h-screen bg-secondary text-white px-8 md:px-16 lg:px-24 py-24">
      <Link
        href="/#projects"
        className="text-text-muted hover:text-white transition-colors text-sm"
      >
        &larr; Back to projects
      </Link>

      <div className="mt-8">
        <span className="text-text-muted text-sm font-mono">
          {project.number}
        </span>

        <div className="mt-4 flex items-center gap-4">
          <Image
            src={project.logoSrc}
            alt={`${project.title} logo`}
            width={48}
            height={48}
          />
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-badge-bg px-3 py-1 text-xs text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <Image
          src={project.previewSrc}
          alt={`${project.title} preview`}
          width={1080}
          height={608}
          className="rounded-xl border border-white/10 mt-8"
        />

        <div className="mt-8 max-w-3xl space-y-4 text-text-muted leading-relaxed">
          <p>{project.description}</p>
          <p>{project.longDescription}</p>
        </div>

        {project.liveUrl && (
          <div className="mt-8">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              View Live Project &rarr;
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
