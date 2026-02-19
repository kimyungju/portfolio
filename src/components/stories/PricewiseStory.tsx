export default function PricewiseStory() {
  return (
    <>
      <h2>The Problem With Shopping Research</h2>

      <p>
        Every considered purchase follows the same exhausting ritual: open a dozen tabs,
        search for the product on three different retailers, skim reviews, mentally convert
        prices with tax, forget which site had the better deal, and start over. Browser
        extensions and deal aggregators help at the margins, but none of them actually
        synthesize information across sources into a single, coherent recommendation. I
        wanted to build something that could do the entire research loop in one
        conversation &mdash; not just surface links, but compare, calculate, and advise.
      </p>

      <p>
        That&apos;s how PriceWise started: an autonomous shopping research agent that takes
        a natural-language request like &ldquo;find me the best mechanical keyboard under
        $150&rdquo; and handles the rest. It searches for products, compares prices across
        retailers, gathers and summarizes reviews, checks availability, hunts for coupons,
        calculates budget impact with tax, and delivers a structured receipt with a clear
        recommendation. The entire workflow is conversational. You describe what you want,
        the agent does the legwork, and you stay in control the whole time.
      </p>

      <h2>An Agent With Ten Tools and a Trust Layer</h2>

      <p>
        Under the hood, PriceWise is a <strong>LangGraph</strong> ReAct agent powered by
        <strong> OpenAI gpt-4o</strong>, served through a <strong>FastAPI</strong> streaming
        backend, and presented via a <strong>Next.js</strong> chat frontend. The agent has
        access to ten tools: product search, price comparison, review aggregation, URL
        scraping, coupon and deal finding, availability checking, budget calculation,
        wishlist management, and a multi-product delegation tool that fans out parallel
        searches when you ask for several items at once. All web-facing tools are powered
        by the <strong>Tavily</strong> search API, which returns clean parsed content
        instead of raw HTML &mdash; ideal for feeding directly into an LLM context window.
      </p>

      <p>
        But giving an agent ten tools and letting it run unsupervised felt wrong. Seven of
        those tools make external API calls, and I wanted users to see exactly what the
        agent was about to do before it did it. That meant building a human-in-the-loop
        approval system &mdash; but not one that interrupted on every single tool call.
        Budget calculations and wishlist lookups are pure local computation; pausing for
        approval on those would just be annoying. I needed selective interrupts: pause for
        the dangerous tools, auto-execute the safe ones.
      </p>

      <h2>The Selective Interrupt Problem</h2>

      <p>
        This turned out to be the most interesting technical challenge in the project.
        <strong> LangGraph</strong>&apos;s built-in interrupt mechanism is all-or-nothing
        &mdash; you can tell the framework to pause before the tools node runs, but that
        pauses before every tool call regardless of which tool was invoked. There&apos;s no
        native way to say &ldquo;interrupt for search but not for budget calculation.&rdquo;
      </p>

      <p>
        My first instinct was to wrap individual tool functions with a decorator that calls
        LangGraph&apos;s interrupt function inside the tool body itself, shifting the pause
        from the graph level down to the tool level. The idea was simple: before the
        original tool logic runs, call interrupt with the tool name and arguments. The graph
        pauses, the frontend shows an approval prompt, and when the user approves, execution
        resumes from inside the wrapper. Safe tools skip the wrapper entirely.
      </p>

      <p>
        The catch is that LangChain&apos;s tool decorator doesn&apos;t produce a plain
        function &mdash; it produces a StructuredTool object with metadata the LLM depends
        on: the tool&apos;s name, description, and argument schema. A naive function
        wrapper strips all of that metadata away, and suddenly the model can&apos;t generate
        valid tool calls anymore because it has lost the schema it needs.
      </p>

      <p>
        The solution was surprisingly elegant: shallow-copy the entire StructuredTool object
        using Python&apos;s copy module, then swap only the internal function attribute on
        the clone. The copy preserves every piece of metadata &mdash; name, description,
        argument schema &mdash; while the new function attribute adds the interrupt call
        before delegating to the original implementation. The original tool object stays
        untouched, which matters for testing tools outside a graph context. The wrapper
        function calls LangGraph&apos;s interrupt with a dictionary containing the tool
        name and arguments. If the user denies execution, it returns a polite refusal
        message that the agent can incorporate into its response. If approved, it calls
        through to the original function normally.
      </p>

      <p>
        The overhead of this approach is negligible in practice. The interrupt serialization
        adds a round-trip, but every tool behind this wrapper is already making an external
        API call with hundreds of milliseconds of latency. An extra function call is
        invisible next to a network request.
      </p>

      <h2>Streaming Everything in Real Time</h2>

      <p>
        The frontend needs to feel alive while the agent works, which means streaming
        tokens as they arrive, showing tool call notifications, rendering approval prompts,
        and displaying the final structured receipt &mdash; all over a single SSE
        connection. I run two <strong>LangGraph</strong> stream modes simultaneously:
        a messages mode for per-token delivery that powers the typing animation, and an
        updates mode for complete tool results that populate tool cards in the UI. After
        the stream ends, a post-stream state inspection checks whether the agent paused
        at an interrupt or completed with a structured <strong>Pydantic</strong> receipt.
        That interrupt state lives in the checkpoint, not in the stream itself, so the
        streaming logic and control-flow logic stay cleanly separated.
      </p>

      <p>
        Conversations are persisted via <strong>PostgreSQL</strong> using LangGraph&apos;s
        async checkpoint backend, so sessions survive server restarts. The backend deploys
        to <strong>Railway</strong> with a <strong>Docker</strong> image built using
        <strong> uv</strong> for fast dependency installation, while the frontend deploys
        to <strong>Vercel</strong>. In production, the browser calls Railway directly for
        SSE streams, bypassing Vercel&apos;s serverless timeout entirely.
      </p>

      <h2>What It Adds Up To</h2>

      <p>
        PriceWise compresses a 30-minute, multi-tab research session into a single
        conversation. The agent handles the full pipeline &mdash; search, compare, review,
        calculate, recommend &mdash; while the user retains approval authority over every
        external action. The architecture is deliberately modular: adding a new tool means
        writing one function with a <strong>Pydantic</strong> schema and appending it to
        the agent&apos;s tool list. Swapping LLM providers is a single configuration
        change. The complexity lives in the orchestration boundaries, not in the individual
        components, and that&apos;s exactly where I wanted it.
      </p>
    </>
  );
}
