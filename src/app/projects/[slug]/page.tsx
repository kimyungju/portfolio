import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
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
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-[2rem] font-800 tracking-[-0.02em] leading-[1.2] md:text-[2.5rem]">
            The Dev&apos;s Story Behind {project.title}
          </h1>

          <div className="mt-6 flex items-center justify-between text-[13px] text-text-muted">
            <span>{project.readTime}</span>
            <span>{project.publishDate}</span>
          </div>

          <div className="mt-4 mb-10 h-px w-full bg-white/[0.08]" />

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

          <div className="mt-20 mb-8">
            <a
              href="#top"
              className="text-[13px] font-medium text-text-muted transition-colors duration-300 hover:text-primary"
            >
              Back to Top
            </a>
          </div>

          <div className="h-px w-full bg-white/[0.08]" />

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group mt-8 block"
          >
            <span className="text-[13px] text-text-muted">Next Article</span>
            <p className="mt-1 font-display text-xl font-700 tracking-[-0.01em] text-primary transition-colors duration-300 group-hover:text-cyan">
              {nextProject.title}
            </p>
          </Link>
        </div>
      </article>
    </main>
  );
}
