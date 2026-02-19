export default function CastoryStory() {
  return (
    <>
      <h2>1. Overview &amp; Motivation</h2>

      <p>
        Staying current in tech and cybersecurity means reading dozens of articles daily. Most
        professionals don&apos;t have the bandwidth for that. They do, however, have a commute, a gym
        session, or a lunch break &mdash; and five minutes to listen to a podcast.
      </p>

      <p>
        Castory is a full-stack podcast platform that closes that gap. It provides two distinct
        creation workflows:
      </p>

      <ul>
        <li>
          <strong>Manual podcast creation</strong> &mdash; content creators write or paste their own
          scripts, select an AI voice, and generate studio-quality audio with AI-generated cover art.
          A four-section form handles the full pipeline: metadata, voice selection, audio generation,
          and thumbnail generation.
        </li>
        <li>
          <strong>Automated news podcast wizard</strong> &mdash; a five-step guided flow that fetches
          trending articles for a chosen topic using real-time web search, lets the user curate which
          stories to include, generates a natural-sounding podcast script, produces audio narration,
          and publishes &mdash; end to end, with no external tooling required.
        </li>
      </ul>

      <p>
        The platform targets CS students, early-career engineers, and busy security professionals who
        want curated, narrated news without the overhead of manual research.
      </p>

      <p>
        Castory exists at the intersection of a real product and a systems engineering demonstration.
        It exercises every layer of modern web development: authentication, real-time backend,
        multi-model AI orchestration, complex state management, and a cohesive design system. Every
        architectural decision described below was made to serve both goals simultaneously &mdash;
        ship something usable, and build something worth examining.
      </p>

      <hr />

      <h2>2. Technical Architecture &amp; Workflow</h2>

      <h3>System Overview</h3>

      <pre><code>{`                        ┌──────────────────┐
                        │    Clerk Auth     │
                        │  (JWT + Webhooks) │
                        └────────┬─────────┘
                                 │
                   Webhook (Svix)│  JWT Token
                   user.created  │  (per request)
                   user.updated  │
                   user.deleted  │
                                 v
┌─────────────┐  Convex React  ┌──────────────────┐   OpenAI APIs
│  Next.js 16 │<=============> │     Convex       │ <===========>
│  App Router │  real-time     │   Serverless     │  GPT-4.1-mini
│  + React 19 │  subscriptions │   Backend        │  + web search
│             │                │                  │  DALL-E 3
│  - Pages    │  mutations /   │  - HTTP Router   │  TTS-1
│  - Audio    │  queries /     │  - Mutations     │
│    Provider │  actions       │  - Queries       │
│  - Draft    │                │  - Server Actions│
│    Persist. │                │  - File Storage  │
└─────────────┘                └──────────────────┘`}</code></pre>

      <h3>Authentication &amp; Webhook Sync</h3>

      <p>
        Clerk handles user sessions and provides JWTs that Convex validates on every query and
        mutation. User data is synchronized to the Convex <code>users</code> table via signed
        webhooks verified with Svix.
      </p>

      <p>
        The webhook handler is designed defensively. Clerk&apos;s <code>email_addresses</code> array
        can be empty on the first webhook for OAuth sign-ups, and <code>first_name</code> is
        nullable. The handler chains safe fallbacks:
      </p>

      <pre><code>{`// convex/http.ts — safe fallback chain for webhook data
case "user.created": {
  const primaryEmail = event.data.email_addresses?.[0]?.email_address;
  const email = primaryEmail ?? \`\${event.data.id}@clerk.user\`;
  const name =
    event.data.first_name ??
    primaryEmail?.split("@")[0] ??
    "Unknown";`}</code></pre>

      <p>
        The <code>updateUser</code> and <code>deleteUser</code> mutations return early (no-op) if
        the user doesn&apos;t exist in the database, ensuring webhooks always return 200 regardless
        of event ordering or race conditions. As a secondary guard, the{" "}
        <code>createPodcast</code> mutation creates the user record just-in-time if the webhook
        hasn&apos;t synced yet.
      </p>

      <h3>Data Model</h3>

      <p>Two tables power the application:</p>

      <ul>
        <li>
          <strong><code>podcasts</code></strong> &mdash; stores metadata, AI prompts, Convex file
          storage IDs for audio/images, and denormalized author fields (<code>author</code>,{" "}
          <code>authorId</code>, <code>authorImageUrl</code>). Denormalization avoids join-like
          patterns in a document database. Three search indexes (<code>search_title</code>,{" "}
          <code>search_author</code>, <code>search_body</code>) enable full-text discovery.
        </li>
        <li>
          <strong><code>users</code></strong> &mdash; synced from Clerk via webhooks, indexed on{" "}
          <code>clerkId</code> for fast lookup.
        </li>
      </ul>

      <h3>Creation Pipelines</h3>

      <p>
        <strong>Manual:</strong>
        <br />
        Form input → Zod validation → TTS action (OpenAI) → upload to Convex storage → DALL-E
        action → upload → <code>createPodcast</code> mutation → home feed
      </p>

      <p>
        <strong>News wizard:</strong>
        <br />
        Topic select → GPT-4.1-mini + web search → article curation → script generation (tone +
        duration) → TTS + DALL-E → publish
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
              <td><strong>Next.js 16 + React 19</strong></td>
              <td>Frontend framework</td>
              <td>
                App Router enables granular server/client boundaries; React 19 provides the latest
                concurrent features
              </td>
              <td>Newer ecosystem &mdash; fewer community examples for edge cases</td>
            </tr>
            <tr>
              <td><strong>Convex</strong></td>
              <td>Serverless backend</td>
              <td>
                Real-time subscriptions (live queries update the UI automatically), integrated file
                storage, fully typed schema, zero-config deployment. Eliminates the need for a
                separate database, file storage service, and WebSocket layer
              </td>
              <td>Vendor lock-in; smaller community than Supabase or Firebase</td>
            </tr>
            <tr>
              <td><strong>Clerk</strong></td>
              <td>Authentication</td>
              <td>
                Drop-in auth with webhook-based sync, social login, and session management. Avoids
                building auth primitives from scratch
              </td>
              <td>
                External dependency on a critical path; webhook reliability demands defensive coding
                patterns
              </td>
            </tr>
            <tr>
              <td><strong>OpenAI</strong></td>
              <td>AI pipeline (GPT-4.1-mini, DALL-E 3, TTS-1)</td>
              <td>
                Single vendor for text generation, image generation, and text-to-speech.
                GPT-4.1-mini&apos;s web search tool provides real-time news fetching without a
                separate news API
              </td>
              <td>
                Per-generation cost; TTS-1&apos;s 4096-character limit requires chunking logic
              </td>
            </tr>
            <tr>
              <td><strong>Tailwind CSS + shadcn/ui</strong></td>
              <td>Styling &amp; components</td>
              <td>
                Utility-first CSS with an accessible component library built on Radix primitives.
                Rapid iteration without fighting CSS specificity
              </td>
              <td>Custom design system requires significant CSS beyond shadcn defaults</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Design System</h3>

      <p>
        The UI follows a deliberately brutalist aesthetic: thick 4-6px borders, hard offset shadows,
        and a high-contrast palette (charcoal backgrounds, orange <code>#ff6b35</code> accent, cream
        text). Typography uses Syne (900 weight, uppercase) for display headings and Crimson Pro
        (italic) for descriptions. Custom CSS component classes &mdash; <code>card-brutal</code>,{" "}
        <code>btn-brutal</code>, <code>noise-texture</code> &mdash; enforce visual consistency. This
        is a conscious choice to create a distinctive visual identity that stands apart from default
        component library aesthetics.
      </p>

      <hr />

      <h2>4. Technical Challenges &amp; Solutions</h2>

      <h3>Challenge 1: TTS Text Chunking at the 4096-Character Boundary</h3>

      <p>
        <strong>Constraint:</strong> OpenAI&apos;s TTS-1 model enforces a hard 4096-character input
        limit. A &quot;medium&quot; news podcast script targets ~1,200 words &mdash; roughly
        6,000-7,000 characters. The text must be split into multiple chunks, each converted to audio
        independently, then reassembled.
      </p>

      <p>
        <strong>Why naive splitting fails:</strong> Cutting text at exactly 4,096 characters lands
        mid-word or mid-sentence, producing cut-off words, unnatural pauses, and tonal
        discontinuities at chunk boundaries.
      </p>

      <p>
        <strong>Solution:</strong> A priority-based boundary detection algorithm:
      </p>

      <pre><code>{`// convex/openai.ts — sentence-aware text chunking for TTS
function splitText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }

    const window = remaining.slice(0, maxLen);
    const sentenceEnd = Math.max(
      window.lastIndexOf(". "),
      window.lastIndexOf("! "),
      window.lastIndexOf("? "),
      window.lastIndexOf(".\\n"),
      window.lastIndexOf("!\\n"),
      window.lastIndexOf("?\\n"),
    );

    let splitAt: number;
    if (sentenceEnd > maxLen * 0.3) {
      splitAt = sentenceEnd + 1;
    } else {
      const lastSpace = window.lastIndexOf(" ");
      splitAt = lastSpace > 0 ? lastSpace : maxLen;
    }

    chunks.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }

  return chunks;
}`}</code></pre>

      <p>
        The algorithm searches for the last sentence-ending punctuation (<code>. </code>,{" "}
        <code>! </code>, <code>? </code>) within the 4096-character window. A 30% minimum threshold
        (<code>sentenceEnd &gt; maxLen * 0.3</code>) prevents degenerate cases where a single long
        sentence pushes the split point too early in the window, which would produce very short
        chunks. If no suitable sentence boundary exists, it falls back to the last word boundary.
        Hard splitting at <code>maxLen</code> is a last resort for pathological inputs with no
        whitespace.
      </p>

      <p>
        After generating audio for each chunk, the MP3 buffers are concatenated via{" "}
        <code>Uint8Array</code>:
      </p>

      <pre><code>{`// convex/openai.ts — MP3 buffer concatenation
const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.byteLength, 0);
const combined = new Uint8Array(totalLength);
let offset = 0;
for (const buf of audioBuffers) {
  combined.set(new Uint8Array(buf), offset);
  offset += buf.byteLength;
}`}</code></pre>

      <p>
        This works because MP3 is a frame-based format &mdash; each frame is independently
        decodable, so byte-level concatenation produces a valid file without requiring server-side
        audio processing tools like FFmpeg.
      </p>

      <p>
        <strong>Tradeoff:</strong> Byte-level concatenation can produce a barely perceptible audio
        glitch at chunk boundaries. For podcast-length spoken content, this is acceptable. For music
        production, it would not be.
      </p>

      <h3>Challenge 2: Orchestrating the 5-Step News Podcast Wizard</h3>

      <p>
        <strong>Constraint:</strong> The news podcast flow is a five-step wizard where each step
        depends on the output of the previous step, individual steps involve async API calls that
        take 3-15 seconds, and the user might close their browser mid-flow.
      </p>

      <pre><code>{`Topic Select ──> Article Fetch ──> Script Gen ──> Audio & Art ──> Publish
   (user)      (GPT + web search)   (GPT chat)  (TTS + DALL-E)  (mutation)
     │               │                  │              │             │
     └───────────────┴──────────────────┴──────────────┴─────────────┘
              localStorage draft state persisted across all steps`}</code></pre>

      <p>
        <strong>Design decision:</strong> All five steps live in a single page component rather than
        being split across routes. Route-per-step would require either URL state (fragile for complex
        objects like article arrays and generated scripts) or server-side session storage (which
        defeats the real-time Convex architecture). A single component manages ~15 pieces of state
        that flow forward through the wizard.
      </p>

      <p>
        <strong>Draft persistence</strong> is handled by a custom hook:
      </p>

      <pre><code>{`// lib/useDraftPersistence.ts — auto-save with debounce + ready-delay
export function useDraftSave<T>(key: string, state: T) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);
  const debouncedState = useDebounce(state, 500);

  // Wait 750ms after mount before enabling saves
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 750);
    return () => clearTimeout(timer);
  }, []);

  // Persist debounced state once ready
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(debouncedState));
      setLastSaved(new Date());
    } catch {
      // localStorage full or unavailable — silently ignore
    }
  }, [key, debouncedState, ready]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setLastSaved(null);
  }, [key]);

  return { lastSaved, clearDraft };
}`}</code></pre>

      <p>
        The 750ms ready-delay after mount prevents the initial restore from immediately overwriting
        localStorage with stale default values &mdash; a subtle race condition where the component
        mounts with defaults, triggering a save before the restoration logic executes. On mount,{" "}
        <code>readDraft</code> restores the entire wizard state including the current step index,
        selected articles, generated script, and tone/duration preferences.
      </p>

      <p>
        An <strong>auto-fill cascade</strong> reduces friction: when a script is generated, the
        wizard automatically populates the podcast title (topic + date), description, voice prompt
        (the full script), and image prompt (a DALL-E prompt seeded with the topic). The user goes
        from five manual inputs to zero, with full override capability.
      </p>

      <hr />

      <h2>5. Impact &amp; Future Roadmap</h2>

      <h3>Current State</h3>

      <ul>
        <li>
          End-to-end creation pipeline for both manual and news podcasts, from text input to
          published audio
        </li>
        <li>
          Global audio player accessible from any route, with play/pause, seek, and volume controls
        </li>
        <li>
          Full-text search across podcast titles, authors, and descriptions with 500ms debounced
          input
        </li>
        <li>
          Consistent brutalist design system with responsive three-column layout (sidebar + content +
          recommendations)
        </li>
      </ul>

      <h3>Scalability Considerations</h3>

      <ul>
        <li>
          Convex file storage handles audio and image hosting without self-managed object storage
          infrastructure
        </li>
        <li>
          Denormalized author data on podcast records avoids N+1 query patterns but requires batch
          updates on profile changes &mdash; already implemented in the <code>updateUser</code>{" "}
          webhook handler, which propagates changes across all of a user&apos;s podcasts
        </li>
        <li>
          Search indexes on three fields provide flexible discovery without a dedicated search
          service like Algolia or Elasticsearch
        </li>
      </ul>

      <h3>Planned Features</h3>

      <ul>
        <li>
          <strong>Scheduled publishing</strong> &mdash; Convex scheduled functions to trigger daily
          or weekly news podcast generation automatically. Users configure a topic, tone, and
          cadence; the system fetches, scripts, narrates, and publishes on schedule without manual
          intervention.
        </li>
        <li>
          <strong>Multi-voice episodes</strong> &mdash; Host-and-guest format using multiple TTS
          voices within a single episode. Requires script format changes to support speaker labels
          and interleaved audio chunk generation, producing conversational-style podcasts from a
          single text input.
        </li>
      </ul>

      <p>
        The underlying architecture is designed for this kind of extension: each layer &mdash; auth,
        backend, AI, frontend &mdash; can evolve independently while the overall system remains
        stable. Swapping TTS providers, adding a new AI model, or extending the schema requires
        changes in a single layer without cascading rewrites.
      </p>
    </>
  );
}
