import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { techBrandColors, defaultBadgeColors } from "@/data/techBrandColors";
import Navbar from "@/components/Navbar";
import PricewiseStory from "@/components/stories/PricewiseStory";
import InterviewpilotStory from "@/components/stories/InterviewpilotStory";
import CastoryStory from "@/components/stories/CastoryStory";
import DevgStory from "@/components/stories/DevgStory";

const storyComponents: Record<string, React.ComponentType> = {
  pricewise: PricewiseStory,
  interviewpilot: InterviewpilotStory,
  castory: CastoryStory,
  "devg-website": DevgStory,
};

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
    title: `The Dev's Story Behind ${project.title} | Yungju Kim`,
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

  const StoryComponent = storyComponents[project.slug];
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="top">
      <Navbar />

      <article className="px-8 pt-32 pb-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
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

          {/* Header */}
          <header className="mt-12">
            <div className="font-mono text-lg tracking-[0.2em] mb-6">
              <span className="text-cyan font-bold">{"//"}</span>
              <span className="ml-1 text-white font-bold">
                {project.number.replace("//", "").trim()}
              </span>
            </div>

            <h1 className="font-display text-3xl font-800 tracking-[-0.02em] leading-[1.15] md:text-4xl lg:text-5xl">
              The Dev&apos;s Story Behind {project.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 text-[13px] text-text-muted">
              <span>{project.readTime}</span>
              <span className="text-text-muted/40">&middot;</span>
              <span>{project.publishDate}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => {
                const colors = techBrandColors[tech] ?? defaultBadgeColors;
                return (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: "transparent",
                    }}
                  >
                    {tech}
                  </span>
                );
              })}
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
          </header>

          {/* Divider */}
          <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Story content */}
          <div className="article-prose">
            {StoryComponent ? (
              <StoryComponent />
            ) : (
              <>
                <p>{project.description}</p>
                <p>{project.longDescription}</p>
              </>
            )}
          </div>

          {/* Back to top */}
          <div className="mt-20 flex justify-center">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-primary"
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
              >
                <path d="m12 5 0 14" />
                <path d="m5 12 7-7 7 7" />
              </svg>
              Back to Top
            </a>
          </div>

          {/* Divider */}
          <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Next article */}
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03]"
          >
            <span className="text-[11px] font-medium tracking-[0.3em] text-text-muted/60">
              NEXT ARTICLE
            </span>
            <div className="mt-3 flex items-center gap-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-card-bg">
                <Image
                  src={nextProject.logoSrc}
                  alt={nextProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-display text-xl font-700 tracking-[-0.01em] transition-colors duration-300 group-hover:text-cyan">
                {nextProject.title}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto text-text-muted transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="m5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </article>
    </main>
  );
}
