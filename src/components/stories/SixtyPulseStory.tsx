export default function SixtyPulseStory() {
  return (
    <>
      <h2>Pressure-Testing a Launch Before the Internet Does</h2>

      <p>
        60&apos;s Pulse started from a simple product question: what if a brand could
        see the backlash path before a campaign went live? Instead of asking
        whether an idea feels positive or negative, the dashboard asks which
        specific line, scene, or claim will become the attack surface, who is
        likely to amplify it, and whether the cheapest fix is copy, production,
        or a strategic decision.
      </p>

      <p>
        We built it during Agent Forge AI Hackathon 2026 as a launch-risk war
        room. The product simulates a 60-agent reaction panel and returns a
        <strong> Blast Score</strong>, objection clusters, stakeholder verdicts,
        a fictional next-day headline, and a fix ladder that separates small
        wording changes from deeper premise problems.
      </p>

      <h2>Sixty Agents, Not One Sentiment Score</h2>

      <p>
        The panel is designed for risk coverage rather than polling accuracy.
        Public personas model everyday sharing behavior, concern lenses inspect
        sensitive areas in third person, and stakeholder agents represent the
        people who can turn a bad comment into consequences: journalists,
        regulators, advocacy groups, employees, competitors, and standards
        bodies.
      </p>

      <p>
        Each agent produces a structured reaction with severity, trigger moment,
        quote, fix tier, and press-conference question. That structure is what
        lets the dashboard cluster objections, identify the blast map for video,
        and show where a rewrite can help versus where the underlying premise
        needs a product or leadership call.
      </p>

      <h2>A Demo-Safe Sponsor Stack</h2>

      <p>
        The backend is <strong>FastAPI</strong> with a static dashboard. Kimi
        orchestrates the panel, Bright Data grounds personas in public discourse,
        Daytona provides sandboxed execution receipts, and VideoDB parses video
        into scenes, transcript, and creative manifest. The live path supports
        typed campaign analysis, while the stage demo can replay a baked golden
        run so the presentation does not depend on Wi-Fi, sponsor latency, or
        sixty live model calls.
      </p>

      <p>
        That tradeoff mattered. A hackathon demo has to be honest about what is
        live, but it also has to survive the room. The architecture keeps the
        product story intact while making the demo deterministic: the same
        dashboard can run from a fixture, a mini live bake, or the fuller sponsor
        stack when credentials are available.
      </p>

      <h2>What I Would Harden Next</h2>

      <p>
        The winning prototype proved the core loop: campaign in, objections out,
        fix path visible. The next version would focus on production-grade trust:
        clearer source citations per objection, stronger abuse limits on live
        analysis, deeper video evidence linking, and richer controls for teams
        to tune the panel to a market, launch channel, or brand-risk profile.
      </p>

      <p>
        The important lesson was product-shaped: the value is not that AI can
        generate sixty opinions. The value is that a launch team can stop
        arguing in vague sentiment terms and see the exact risk surface before it
        becomes public.
      </p>
    </>
  );
}
