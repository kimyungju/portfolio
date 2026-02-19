export default function DevgStory() {
  return (
    <>
      <h2>Building a Home for the Developer Community</h2>
      <p>
        As Head of Technology at Developer Group @ NUS Computing, one of my first
        initiatives was giving our 2,300+ member community a proper digital presence.
        We needed a website that could showcase events, highlight partner collaborations,
        and serve as the central hub for everything DevG.
      </p>

      <h3>Design Philosophy</h3>
      <p>
        The website needed to reflect two things at once: the energy and ambition of a
        student-led tech community, and the professionalism expected by corporate partners.
        I chose a clean, modern approach &mdash; bold typography, generous whitespace, and
        a cohesive color system that aligned with our brand identity.
      </p>
      <p>
        The stack was deliberately lean: <strong>Next.js</strong> for the framework,{" "}
        <strong>React</strong> and <strong>TypeScript</strong> for components, and{" "}
        <strong>Tailwind CSS</strong> for rapid styling iteration. No CMS, no database &mdash;
        all content is statically generated at build time for instant page loads.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>
          <strong>Event showcase</strong> &mdash; a curated section for past and upcoming
          events, including our flagship Hack4Good 2026 hackathon for non-profit organizations
        </li>
        <li>
          <strong>Partner section</strong> &mdash; highlighting industry collaborations to
          build credibility and attract sponsorships
        </li>
        <li>
          <strong>Responsive design</strong> &mdash; fully optimized for mobile, since most
          of our community discovers us through Instagram stories and messaging links
        </li>
        <li>
          <strong>Performance-first</strong> &mdash; static site generation for sub-second
          page loads, critical for retaining visitors from social media referrals
        </li>
      </ul>

      <h3>Impact</h3>
      <p>
        The website became DevG&apos;s primary digital touchpoint. Instead of relying on
        lengthy Instagram captions, we could direct people to dedicated event pages with
        all the details, registration links, and schedules they needed.
      </p>
      <p>
        Building this project reinforced a valuable lesson: sometimes the most impactful
        work isn&apos;t the most technically complex. A well-designed, performant website
        that serves its community is worth more than a technically impressive project that
        nobody uses.
      </p>
    </>
  );
}
