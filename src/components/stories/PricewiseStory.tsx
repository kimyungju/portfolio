export default function PricewiseStory() {
  return (
    <>
      <h2>1. Overview &amp; Motivation</h2>

      <p>
        Shopping online for the right product at the right price requires visiting multiple
        retailers, cross-referencing reviews, and mentally tracking a budget. Most consumers repeat
        this process from scratch every time. The tooling that exists &mdash; browser extensions,
        deal aggregators &mdash; is fragmented, passive, and unable to synthesize information across
        sources into a single recommendation.
      </p>

      <p>
        PriceWise is an autonomous agent that handles the full product research workflow
        conversationally. A user describes what they want, and the agent searches for products,
        compares prices across retailers, gathers reviews, calculates budget impact with tax, and
        delivers a structured receipt with a recommendation. Every external API call requires
        explicit human approval before execution &mdash; the user stays in control while the agent
        handles the legwork.
      </p>

      <p>
        The system is built on LangGraph&apos;s ReAct architecture with a FastAPI streaming backend
        and a Next.js chat frontend. Key capabilities:
      </p>

      <ul>
        <li>
          <strong>Multi-tool orchestration</strong> &mdash; ten tools (product search, price
          comparison, reviews, budget calculation, wishlist, URL scraping, coupon/deal finder,
          availability checker, multi-product delegation) composed into a single agent loop
        </li>
        <li>
          <strong>Selective human-in-the-loop</strong> &mdash; only tools that make external API
          calls pause for approval; pure-computation tools auto-execute
        </li>
        <li>
          <strong>Structured output</strong> &mdash; every conversation ends with a typed Pydantic{" "}
          <code>Receipt</code>, not free-form text
        </li>
        <li>
          <strong>Real-time streaming</strong> &mdash; SSE delivers token-by-token responses, tool
          call notifications, approval prompts, and final receipts to the browser as they happen
        </li>
        <li>
          <strong>Conversation summarization</strong> &mdash; a pre-model hook compresses long
          conversations without mutating graph state
        </li>
        <li>
          <strong>Persistent checkpointing</strong> &mdash; <code>AsyncPostgresSaver</code> keeps
          conversation state across server restarts, with <code>InMemorySaver</code> fallback for
          local dev
        </li>
        <li>
          <strong>Multi-product delegation</strong> &mdash; a delegation tool fans out parallel
          Tavily searches across product categories via <code>ThreadPoolExecutor</code>, synthesizing
          results with budget tracking
        </li>
      </ul>

      <p>
        PriceWise targets anyone making a considered purchase &mdash; from students comparing
        laptops to professionals evaluating software subscriptions. The agent reduces a 30-minute
        multi-tab research session to a single conversation.
      </p>

      <p>
        This project exists as both a functional product and an engineering demonstration. Every
        architectural decision described below was made to serve both goals: build something usable,
        and build something worth examining.
      </p>

      <hr />

      <h2>2. Technical Architecture &amp; Workflow</h2>

      <h3>System Overview</h3>

      <pre><code>{`     Vercel                                Railway
┌─────────────────┐              ┌─────────────────────────┐
│  Next.js 16     │   fetch()    │     FastAPI + SSE        │
│  + React 19     │─────────────>│  (Session Manager,       │
│  (Chat UI,      │   SSE stream │   Stream Generator)      │
│   SSE Read)     │<─────────────│                          │
└─────────────────┘              └────────────┬────────────┘
  NEXT_PUBLIC_API_URL              CORS: ALLOWED_ORIGINS
  points to Railway                astream() │ Command(resume=...)
                                             v
┌──────────────┐    ┌──────────────────────────────────┐    ┌──────────────┐
│ Summarization│───>│        LangGraph ReAct Agent      │<──>│  OpenAI      │
│ pre_model    │    │                                    │    │  gpt-4o      │
│ _hook        │    │  interrupt() ──> approve ──> resume│    └──────────────┘
└──────────────┘    └──────────┬──────────┬─────────────┘
                               │          │         │
                    ┌──────────┘          │         └──────────┐
                    v                     v                    v
          ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐
          │  Tavily Tools    │  │  Local Tools      │  │  PostgreSQL  │
          │  (search, compare│  │  (budget calc,    │  │  (checkpoint │
          │   reviews, scrape│  │   wishlist)       │  │   persistence│
          │   coupons, avail,│  │   auto-execute    │  │   via Async  │
          │   delegation)    │  │                   │  │   PostgresSvr│
          │  with_approval() │  │                   │  │   )          │
          └──────────────────┘  └──────────────────┘  └──────────────┘`}</code></pre>

      <h3>Streaming &amp; State Flow</h3>

      <p>
        The API layer uses a shared SSE generator for both new messages and approval resumes. Two
        LangGraph stream modes run simultaneously: <code>&quot;messages&quot;</code> for low-latency
        per-token delivery, and <code>&quot;updates&quot;</code> for complete tool results. After the
        stream ends, the generator inspects graph state to determine the terminal event &mdash;
        either an interrupt requiring approval or a structured receipt:
      </p>

      <pre><code>{`# src/pricewise/api/routes.py — post-stream state inspection
state = await agent.aget_state(config)

if state.next:
    # Agent paused at interrupt() — extract tool info from tasks
    for task in state.tasks:
        if hasattr(task, "interrupts") and task.interrupts:
            for intr in task.interrupts:
                if isinstance(intr.value, dict) and "tool" in intr.value:
                    tool_calls.append({"name": intr.value["tool"], ...})
    yield format_sse_event("approval_required", {"tool_calls": tool_calls})
else:
    structured = state.values.get("structured_response")
    if structured:
        yield format_sse_event("receipt", structured.model_dump())`}</code></pre>

      <p>
        The interrupt state is only accessible through <code>state.tasks</code>, not from the
        message stream itself. This decoupling means the streaming logic and the control-flow logic
        operate independently &mdash; the stream handles content delivery, and the post-stream check
        handles orchestration decisions.
      </p>

      <h3>Data Model</h3>

      <p>
        Pydantic v2 models serve double duty: they define tool input schemas (enabling the LLM to
        generate valid arguments) and the structured output format. The <code>Receipt</code> model
        includes optional <code>comparison_products</code> and <code>comparison_summary</code>{" "}
        fields, allowing the same schema to handle both single-product lookups and multi-product
        comparisons without branching logic.
      </p>

      <p>
        Sessions are keyed by UUID and backed by a configurable checkpointer &mdash;{" "}
        <code>AsyncPostgresSaver</code> for production (persists across restarts) or{" "}
        <code>InMemorySaver</code> for local dev. The choice is made at startup via a FastAPI{" "}
        <code>lifespan</code> async context manager that manages the Postgres connection pool. Each
        session maps to a LangGraph thread ID, and the agent checkpoints its full state (messages,
        tool calls, pending interrupts) after every node execution. On restart,{" "}
        <code>_get_session()</code> queries the checkpointer to rehydrate sessions that exist in
        Postgres but not yet in the in-memory registry.
      </p>

      <hr />

      <h2>3. Tech Stack Deep Dive</h2>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Technology</th>
              <th>Role</th>
              <th>Why This Over Alternatives</th>
              <th>Tradeoff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>LangGraph</strong></td>
              <td>Agent orchestration</td>
              <td>
                Declarative graph with native checkpointing, interrupt, and hook support.{" "}
                <code>create_react_agent</code> replaces the legacy <code>AgentExecutor</code> with
                explicit node/edge control
              </td>
              <td>
                Newer API surface &mdash; patterns like <code>pre_model_hook</code> and per-tool{" "}
                <code>interrupt()</code> have limited community examples
              </td>
            </tr>
            <tr>
              <td><strong>FastAPI + SSE</strong></td>
              <td>HTTP API &amp; streaming</td>
              <td>
                Native async, Pydantic integration for request validation, and{" "}
                <code>sse-starlette</code> for streaming without WebSocket complexity
              </td>
              <td>
                SSE is unidirectional &mdash; approval responses require a separate POST endpoint
                rather than a bidirectional channel
              </td>
            </tr>
            <tr>
              <td><strong>OpenAI gpt-4o</strong></td>
              <td>LLM backbone</td>
              <td>
                Strong tool-calling accuracy and structured output compliance via{" "}
                <code>response_format</code>. <code>init_chat_model</code> provides a
                provider-agnostic interface for future swaps
              </td>
              <td>
                Per-token cost; vendor dependency on OpenAI&apos;s tool-calling format
              </td>
            </tr>
            <tr>
              <td><strong>Tavily</strong></td>
              <td>Web search API</td>
              <td>
                Purpose-built for LLM applications &mdash; returns clean, parsed content rather than
                raw HTML. Shared client factory (<code>get_tavily</code>) centralizes configuration
              </td>
              <td>
                Smaller ecosystem than SerpAPI or Google Custom Search; rate limits require defensive
                error handling
              </td>
            </tr>
            <tr>
              <td><strong>Next.js 16 + React 19</strong></td>
              <td>Frontend (Vercel)</td>
              <td>
                App Router for server/client boundaries, <code>fetch</code> with{" "}
                <code>AbortController</code> for SSE lifecycle management. Deployed to Vercel with{" "}
                <code>NEXT_PUBLIC_API_URL</code> pointing to Railway
              </td>
              <td>
                Vercel serverless functions have a 10s timeout &mdash; SSE streams bypass this by
                calling Railway directly from the browser
              </td>
            </tr>
            <tr>
              <td><strong>Pydantic v2</strong></td>
              <td>Schema validation</td>
              <td>
                Dual-use as both tool input schemas (LLM argument validation) and structured output
                format (<code>response_format=Receipt</code>). Single source of truth for data
                contracts
              </td>
              <td>
                Schema changes require coordination between agent output and frontend rendering
              </td>
            </tr>
            <tr>
              <td><strong>PostgreSQL + AsyncPostgresSaver</strong></td>
              <td>Persistent checkpointing</td>
              <td>
                LangGraph-native checkpoint backend with async connection pooling. Managed via
                FastAPI <code>lifespan</code> context &mdash; auto-creates tables on first run,
                cleans up on shutdown
              </td>
              <td>
                Requires a running Postgres instance; <code>InMemorySaver</code> fallback simplifies
                local dev
              </td>
            </tr>
            <tr>
              <td><strong>Docker + Railway</strong></td>
              <td>Backend deployment</td>
              <td>
                Dockerfile with multi-stage <code>uv</code> install for fast, reproducible builds.
                Railway provides managed Postgres, health checks, and auto-restart.{" "}
                <code>ALLOWED_ORIGINS</code> env var configures CORS per environment
              </td>
              <td>
                Railway&apos;s free tier has resource limits; SSE anti-buffering headers (
                <code>X-Accel-Buffering: no</code>) required to prevent proxy buffering
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>4. Technical Challenges &amp; Solutions</h2>

      <h3>Challenge 1: Per-Tool Human Approval Without Global Interrupts</h3>

      <p>
        <strong>Constraint:</strong> PriceWise has ten tools. Seven make external API calls (search,
        compare, reviews, scrape, coupons, availability, delegation) and must require human
        approval. Three are safe (budget calculation, wishlist add/get) and should auto-execute.
        LangGraph&apos;s built-in <code>interrupt_before=[&quot;tools&quot;]</code> pauses before{" "}
        <em>every</em> tool call &mdash; there is no native mechanism for selective interruption.
      </p>

      <p>
        <strong>Why the naive approach fails:</strong> Wrapping tool functions with a decorator is
        straightforward, but LangChain&apos;s <code>@tool</code> decorator produces{" "}
        <code>StructuredTool</code> objects, not plain functions. A naive <code>functools.wraps</code>{" "}
        wrapper loses the tool&apos;s <code>.name</code>, <code>.description</code>, and{" "}
        <code>.args_schema</code> &mdash; metadata the LLM relies on to generate valid tool calls.
      </p>

      <p>
        <strong>Solution:</strong> Shallow-copy the tool object and swap only its{" "}
        <code>.func</code> attribute:
      </p>

      <pre><code>{`# src/pricewise/middleware/selective_interrupt.py
def with_approval(tool_fn):
    wrapped = copy(tool_fn)       # preserve name, description, args_schema
    original = tool_fn.func

    @wraps(original)
    def wrapper(*args, **kwargs):
        approved = interrupt({"tool": wrapped.name, "args": kwargs})
        if not approved:
            return f"User denied execution of tool '{wrapped.name}'. ..."
        return original(*args, **kwargs)

    wrapped.func = wrapper
    return wrapped`}</code></pre>

      <p>
        <code>copy()</code> creates a shallow clone of the <code>StructuredTool</code> instance,
        preserving all metadata. The <code>interrupt()</code> call inside the wrapper raises{" "}
        <code>GraphInterrupt</code> &mdash; a special exception the LangGraph runtime catches to
        pause execution and serialize state. The original tool object remains unmodified, which
        matters for tests that invoke tools directly outside a graph context.
      </p>

      <p>
        <strong>Tradeoff:</strong> Each approved tool wraps the original with an extra function call
        and interrupt serialization round-trip. For compute-bound tools this overhead would matter;
        for tools that call external APIs with 200ms+ latency, it is negligible.
      </p>

      <h3>Challenge 2: Dual-Mode SSE Streaming with Interrupt Detection</h3>

      <p>
        <strong>Constraint:</strong> The frontend needs three categories of real-time data: per-token
        text (for typing animation), complete tool results (for rendering tool cards), and control
        signals (approval prompts, final receipts). LangGraph&apos;s <code>astream</code> supports
        multiple <code>stream_mode</code> values simultaneously, but each mode produces
        differently-shaped payloads &mdash; and interrupt state is not available from either stream
        mode.
      </p>

      <p>
        <strong>Why a single stream mode fails:</strong> <code>&quot;messages&quot;</code> mode
        delivers <code>AIMessageChunk</code> tokens but does not emit <code>ToolMessage</code>{" "}
        results (they arrive as a single non-chunked message). <code>&quot;updates&quot;</code> mode
        delivers complete node outputs but arrives too late for token-by-token streaming. Neither
        mode surfaces interrupt state.
      </p>

      <p>
        <strong>Solution:</strong> Run both modes simultaneously and inspect state post-stream:
      </p>

      <pre><code>{`# src/pricewise/api/routes.py — dual-mode stream processing
async for mode, payload in agent.astream(
    input_value, config=config, stream_mode=["messages", "updates"]
):
    if mode == "messages":
        message, _metadata = payload
        if isinstance(message, AIMessageChunk):
            if message.content:
                yield format_sse_event("token", {"content": message.content})
            if message.tool_calls:
                for tc in message.tool_calls:
                    yield format_sse_event("tool_call", {...})
    elif mode == "updates":
        if isinstance(payload, dict):
            for node_name, node_output in payload.items():
                if node_name == "tools" and isinstance(node_output, dict):
                    for msg in node_output.get("messages", []):
                        if isinstance(msg, ToolMessage):
                            yield format_sse_event("tool_result", {...})`}</code></pre>

      <p>
        The <code>&quot;messages&quot;</code> arm handles content streaming. The{" "}
        <code>&quot;updates&quot;</code> arm captures tool execution results. After the async
        generator exhausts, <code>aget_state()</code> reveals whether the agent paused at an
        interrupt or completed with a structured response &mdash; information that exists only in the
        checkpoint, not in the stream.
      </p>

      <p>
        <strong>Tradeoff:</strong> Dual-mode streaming doubles the number of payloads the generator
        must process. For conversations with many tool calls, this increases SSE event volume. The
        alternative &mdash; polling state after each tool call &mdash; would add latency and
        complexity to the frontend.
      </p>

      <h3>Challenge 3: Safe Message Splitting for Conversation Summarization</h3>

      <p>
        <strong>Constraint:</strong> LangGraph&apos;s message history interleaves{" "}
        <code>AIMessage</code> (with <code>.tool_calls</code>) and <code>ToolMessage</code> (with
        tool results) in strict pairs. The summarization hook must split this history into
        &quot;old messages to summarize&quot; and &quot;recent messages to keep.&quot; Splitting in
        the wrong place &mdash; between an <code>AIMessage</code> that requested a tool call and its
        corresponding <code>ToolMessage</code> &mdash; produces malformed context that causes LLM
        validation errors.
      </p>

      <p>
        <strong>Why a fixed offset fails:</strong> A naive <code>messages[:-2]</code> split assumes
        the last two messages are a clean boundary. But if the LLM called multiple tools in its last
        turn, the tail of the message list contains one <code>AIMessage</code> followed by multiple{" "}
        <code>ToolMessage</code> responses. Splitting at <code>-2</code> would separate a{" "}
        <code>ToolMessage</code> from its parent <code>AIMessage</code>.
      </p>

      <p>
        <strong>Solution:</strong> Walk backwards from the target split point, skipping over
        tool-call/response pairs:
      </p>

      <pre><code>{`# src/pricewise/middleware/summarization.py — safe split algorithm
split = len(messages) - 2
while split > 0 and isinstance(messages[split], ToolMessage):
    split -= 1
if (split > 0
    and isinstance(messages[split], AIMessage)
    and getattr(messages[split], "tool_calls", None)):
    split -= 1
    while split > 0 and isinstance(messages[split], ToolMessage):
        split -= 1`}</code></pre>

      <p>
        The algorithm first skips past any <code>ToolMessage</code> entries at the split boundary.
        If it lands on an <code>AIMessage</code> with tool calls, it steps back again and skips any
        preceding <code>ToolMessage</code> entries from the previous turn. The result is a split
        point that always falls between complete conversation turns. The summarized prefix is
        compressed via LLM into a <code>SystemMessage</code>, and the recent suffix is preserved
        verbatim &mdash; the hook returns{" "}
        <code>{`{"llm_input_messages": [...]}`}</code> without mutating graph state.
      </p>

      <p>
        <strong>Tradeoff:</strong> The backward walk can push the split point earlier than intended,
        summarizing more messages than necessary. For conversations where every turn involves tool
        calls, this means the &quot;recent&quot; window grows. The alternative &mdash; parsing
        tool-call IDs to match pairs explicitly &mdash; would be more precise but would couple the
        hook to LangChain&apos;s internal message ID format.
      </p>

      <h3>Challenge 4: Parallel Research Inside a Sync Tool Running in an Async Context</h3>

      <p>
        <strong>Constraint:</strong> When a user asks &quot;I need a laptop, monitor, and keyboard
        under $2000,&quot; the agent should research all three products in parallel. But LangGraph
        tools are synchronous functions, the Tavily client is synchronous, and the entire agent runs
        inside FastAPI&apos;s async event loop. You cannot call <code>asyncio.run()</code> or{" "}
        <code>asyncio.new_event_loop()</code> from within an already-running event loop without
        deadlocking.
      </p>

      <p>
        <strong>Why async approaches fail:</strong> The natural instinct is{" "}
        <code>asyncio.gather()</code> with <code>run_in_executor</code>, but that requires an async
        function &mdash; and <code>@tool</code>-decorated functions must be sync (LangGraph invokes
        them synchronously from the tools node). Creating a new event loop with{" "}
        <code>asyncio.new_event_loop()</code> risks conflicts with the outer FastAPI loop and is
        explicitly warned against in Python&apos;s asyncio documentation.
      </p>

      <p>
        <strong>Solution:</strong> Use <code>concurrent.futures.ThreadPoolExecutor</code> for
        thread-based parallelism:
      </p>

      <pre><code>{`# src/pricewise/tools/delegate_research.py
@tool(args_schema=DelegationQuery)
def delegate_research(products: list, total_budget: float | None = None) -> str:
    items = [ProductResearchItem(**p) if isinstance(p, dict) else p for p in products]

    with ThreadPoolExecutor(max_workers=min(len(items), 5)) as pool:
        futures = {pool.submit(_research_one, item): item for item in items}
        results = [f.result() for f in as_completed(futures)]
    # ... synthesize results`}</code></pre>

      <p>
        Each thread gets its own call stack and runs the synchronous Tavily client independently.
        The <code>ThreadPoolExecutor</code> context manager ensures clean shutdown even if one search
        fails. The worker cap (<code>min(len(items), 5)</code>) prevents excessive concurrent API
        calls.
      </p>

      <p>
        <strong>Tradeoff:</strong> Thread-based parallelism has higher overhead than async I/O and
        does not share the event loop&apos;s cooperative scheduling. For the typical case of 2–5
        concurrent Tavily searches (each taking 500ms–2s), the thread overhead is negligible
        compared to network latency. A true async approach would require either an async Tavily
        client or LangGraph support for async tool functions &mdash; neither of which currently
        exists.
      </p>

      <hr />

      <h2>5. Impact &amp; Future Roadmap</h2>

      <h3>Current State</h3>

      <ul>
        <li>
          Full product research pipeline: search, price comparison, reviews, budget calculation,
          wishlist, URL scraping, coupon/deal finding, availability checking, and multi-product
          delegation &mdash; orchestrated in a single conversation
        </li>
        <li>
          Real-time streaming UI with per-token delivery, tool call visualization, approval prompts,
          and structured receipt rendering
        </li>
        <li>
          Persistent checkpointing via <code>AsyncPostgresSaver</code> &mdash; conversations survive
          server restarts and rehydrate automatically. <code>InMemorySaver</code> fallback for local
          dev and tests via <code>USE_MEMORY_SAVER</code> env var
        </li>
        <li>
          Multi-product delegation tool that fans out parallel Tavily searches across product
          categories via <code>ThreadPoolExecutor</code>, with budget tracking and result synthesis
        </li>
        <li>
          Twelve test modules covering schemas, tools (including new tools), middleware, streaming
          format, and API integration with zero live API calls
        </li>
        <li>
          Production-ready deployment: Dockerfile with <code>uv</code>, Railway config with health
          checks and restart policies, configurable CORS, and SSE anti-buffering headers
        </li>
      </ul>

      <h3>Scalability Considerations</h3>

      <ul>
        <li>
          <code>AsyncPostgresSaver</code> provides persistent checkpointing with connection pooling
          managed via FastAPI&apos;s lifespan. The checkpointer interface is pluggable &mdash;
          swapping to Redis or another backend requires changing one factory call
        </li>
        <li>
          The <code>ContextVar</code>-scoped wishlist handles concurrent sessions on a single event
          loop. Scaling beyond a single process requires moving wishlist state to an external store,
          following the same session-keyed pattern
        </li>
        <li>
          The multi-product delegation tool parallelizes Tavily searches via{" "}
          <code>ThreadPoolExecutor</code> with a configurable worker cap. This avoids async event
          loop conflicts (Tavily&apos;s client is synchronous) while achieving concurrent I/O
        </li>
        <li>
          SSE streaming is unidirectional by design. Adding real-time features (collaborative
          sessions, push notifications) would require upgrading to WebSockets, though the existing
          event format could be preserved
        </li>
      </ul>

      <h3>Deployment Architecture</h3>

      <p>
        The frontend (Next.js) deploys to Vercel, and the backend (FastAPI + PostgreSQL) deploys to
        Railway. In local development, Next.js rewrites proxy <code>/api/*</code> to{" "}
        <code>localhost:8000</code>. In production, the frontend calls Railway directly via{" "}
        <code>NEXT_PUBLIC_API_URL</code>, bypassing Vercel&apos;s 10-second serverless timeout. CORS
        origins are configured per environment via <code>ALLOWED_ORIGINS</code>. The Dockerfile uses{" "}
        <code>uv</code> for fast, reproducible dependency installation, and Railway&apos;s health
        check endpoint (<code>/health</code>) enables automatic restart on failure.
      </p>

      <h3>Planned Features</h3>

      <ul>
        <li>
          <strong>CI/CD pipeline</strong> &mdash; Automated testing on push, deployment gating on
          test pass
        </li>
        <li>
          <strong>Structured logging</strong> &mdash; JSON-formatted logs for Railway&apos;s log
          viewer with session-scoped context
        </li>
      </ul>

      <p>
        The architecture is designed for this kind of extension. Each layer &mdash; LLM, tools,
        middleware, API, frontend &mdash; can evolve independently. Adding a tool requires a
        function, a Pydantic schema, and a one-line addition to the agent&apos;s tool list. Swapping
        LLM providers requires changing a single <code>init_chat_model</code> call. The complexity
        lives in the orchestration boundaries, not in the individual components.
      </p>
    </>
  );
}
