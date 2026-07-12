export default function DevgStory() {
  return (
    <>
      <h2>Building a Home for the Developer Community</h2>
      <p>
        Developer Group @ NUS Computing needed a public home for a student tech community
        with 2,300+ followers. As Head of Technology, I contributed to the team-built website
        by shipping responsive fixes, richer project content, media support, and partner-section
        improvements across the existing experience.
      </p>

      <h3>Design Philosophy</h3>
      <p>
        The website balances the energy of a student-led tech community with the
        professionalism expected by corporate partners. My updates preserved its clean visual
        language while improving mobile navigation, media fallbacks, project presentation, and
        the partner experience.
      </p>
      <p>
        The stack is deliberately lean: <strong>Vite</strong> builds the application,
        <strong> React 19</strong> and <strong>TypeScript</strong> power the component layer,
        and <strong>Tailwind CSS</strong> handles styling. A client-side hash router keeps the
        event, team, and project routes compatible with a static Vercel deployment. There is no
        CMS or database; content ships in the frontend bundle.
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
          <strong>Static deployment</strong> &mdash; a Vite-built SPA served as static assets,
          with hash-based routing that avoids server-side route dependencies
        </li>
      </ul>

      <h3>Impact</h3>
      <p>
        The website gives DevG a durable destination beyond social posts. Visitors can move
        from community discovery to dedicated event pages with the details, partner context,
        and schedules they need.
      </p>
      <p>
        Working on this shared codebase reinforced a valuable lesson: sometimes the most
        impactful engineering is careful stewardship. Focused improvements to a maintained
        community website can matter more than adding complexity for its own sake.
      </p>
    </>
  );
}
