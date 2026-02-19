export interface TechItem {
  name: string;
  iconSlug: string;
  brandColor: string;
}

export const techStack: TechItem[] = [
  { name: "JavaScript", iconSlug: "javascript", brandColor: "#f7df1e" },
  { name: "Java", iconSlug: "java", brandColor: "#ed8b00" },
  { name: "Python", iconSlug: "python", brandColor: "#4B8BBE" },
  { name: "Next.js", iconSlug: "nextdotjs", brandColor: "#ffffff" },
  { name: "React", iconSlug: "react", brandColor: "#61dafb" },
  { name: "TypeScript", iconSlug: "typescript", brandColor: "#3B8EEA" },
  { name: "PostgreSQL", iconSlug: "postgresql", brandColor: "#336791" },
  { name: "Docker", iconSlug: "docker", brandColor: "#2496ed" },
  { name: "Tailwind CSS", iconSlug: "tailwindcss", brandColor: "#06b6d4" },
];
