import { experiences } from "@/data/experience";
import ExperienceTimeline from "./ExperienceTimeline";
import ImageCarousel from "./ImageCarousel";

export default function Experience() {
  return (
    <section id="experience" className="px-8 md:px-16 lg:px-24 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Experience &amp; Awards
      </h2>
      <ExperienceTimeline entries={experiences} />
      <ImageCarousel />
    </section>
  );
}
