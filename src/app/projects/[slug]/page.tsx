import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { projects } from "@/data/projects";
import StorySidebar from "@/components/StorySidebar";
import ProjectStoryShell from "@/components/ProjectStoryShell";
import PricewiseStory from "@/components/stories/PricewiseStory";
import InterviewpilotStory from "@/components/stories/InterviewpilotStory";
import ColonialArchivesStory from "@/components/stories/ColonialArchivesStory";
import DevgStory from "@/components/stories/DevgStory";
import SixtyPulseStory from "@/components/stories/SixtyPulseStory";

const storyComponents: Record<string, ComponentType> = {
  "60s-pulse": SixtyPulseStory,
  pricewise: PricewiseStory,
  interviewpilot: InterviewpilotStory,
  "colonial-archives": ColonialArchivesStory,
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
    title: `The Dev's Story Behind ${project.title} | Kim Yungju`,
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
    <>
      <StorySidebar />
      <ProjectStoryShell
        project={project}
        nextProject={nextProject}
        StoryComponent={StoryComponent}
      />
    </>
  );
}
