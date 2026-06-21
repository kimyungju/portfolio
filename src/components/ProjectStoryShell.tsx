import Link from "next/link";
import type { ComponentType } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import type { Project } from "@/data/projects";
import { defaultBadgeColors, techBrandColors } from "@/data/techBrandColors";
import { projectStoryBriefs } from "@/data/projectStoryBriefs";
import ProjectStoryHero from "@/components/ProjectStoryHero";

type ProjectStoryShellProps = {
  readonly project: Project;
  readonly nextProject: Project;
  readonly StoryComponent?: ComponentType;
};

function StoryMetricCard({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold leading-snug text-primary">
        {value}
      </p>
    </div>
  );
}

function CompactTechStack({ techStack }: { readonly techStack: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((tech) => {
        const colors = techBrandColors[tech] ?? defaultBadgeColors;
        return (
          <span
            key={tech}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.bg,
              color: colors.text,
            }}
          >
            {tech}
          </span>
        );
      })}
    </div>
  );
}

export default function ProjectStoryShell({
  project,
  nextProject,
  StoryComponent,
}: ProjectStoryShellProps) {
  const brief = projectStoryBriefs[project.slug];

  return (
    <main id="top" className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_86%_8%,rgba(167,139,250,0.10),transparent_30%)]" />

      <article className="relative px-4 pb-20 pt-24 md:pl-[100px] md:pr-8 md:pt-16 lg:pl-[120px] lg:pr-12">
        <div className="mx-auto max-w-[90rem]">
          <ProjectStoryHero project={project} brief={brief} />

          <section className="mt-10 grid gap-3 md:grid-cols-3">
            {brief.metrics.map((metric) => (
              <StoryMetricCard
                key={`${metric.label}-${metric.value}`}
                label={metric.label}
                value={metric.value}
              />
            ))}
          </section>

          <div className="mt-14 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <aside className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 lg:sticky lg:top-8">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-cyan">
                Story map
              </p>
              <ol className="mt-5 space-y-3">
                {brief.readMap.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm text-text-secondary">
                    <span className="font-mono text-xs text-text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 h-px bg-white/[0.08]" />
              <div className="mt-5">
                <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-text-muted">
                  Stack
                </p>
                <CompactTechStack techStack={project.techStack} />
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <HiOutlineDocumentText
                    size={24}
                    className="mt-1 shrink-0 text-cyan"
                  />
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-text-muted">
                      Quick read
                    </p>
                    <p className="mt-2 text-lg leading-[1.7] text-text-secondary">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="case-study-prose">
                {StoryComponent ? (
                  <StoryComponent />
                ) : (
                  <>
                    <h2>Overview</h2>
                    <p>{project.description}</p>
                    <p>{project.longDescription}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-4 border-t border-white/[0.08] pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm text-text-muted">Next case study</p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="mt-1 inline-block font-display text-2xl font-700 tracking-normal text-primary transition-colors duration-300 hover:text-cyan"
              >
                {nextProject.title}
              </Link>
            </div>
            <a
              href="#top"
              className="w-fit rounded-lg border border-white/[0.10] px-4 py-2 text-sm font-semibold text-text-secondary transition-colors duration-300 hover:border-white/[0.18] hover:text-primary"
            >
              Back to top
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
