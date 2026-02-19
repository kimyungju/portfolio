export default function InterviewpilotStory() {
  return (
    <>
      <h2>1. Overview &amp; Motivation</h2>

      <p>
        Preparing for technical interviews is a feedback-starved process. Candidates rehearse answers
        in their heads, record themselves on their phones, or pay for one-off coaching sessions
        &mdash; none of which provide structured, repeatable, diagnostic feedback. The gap is not
        access to questions; it is access to a realistic interview loop that evaluates{" "}
        <em>what you said</em> against <em>what you should have said</em>, broken down by
        competency.
      </p>

      <p>
        This project is a full-stack AI mock interview platform that closes that gap. Users describe
        a target role &mdash; job title, description, experience level &mdash; and the system
        generates a tailored set of interview questions with model answers via OpenAI. The interview
        itself runs in the browser: the platform reads each question aloud using text-to-speech,
        records the candidate&apos;s spoken response via the Web Speech API, captures webcam video
        per question, and submits each answer for AI-powered multi-dimensional feedback. After each
        answer, the AI generates a contextual follow-up question &mdash; probing vague claims,
        requesting examples, or exploring trade-offs &mdash; simulating the back-and-forth of a real
        interview. Results are stored per-session, displayed in a collapsible review interface with
        video playback, and exportable as a formatted PDF report with embedded QR codes linking to
        each recording.
      </p>

      <p>Key capabilities:</p>

      <ul>
        <li>
          <strong>Three creation modes</strong> &mdash; standard form, reference-material-based
          (paste or upload a PDF), and resume-personalized interviews that probe specific claims from
          the candidate&apos;s background
        </li>
        <li>
          <strong>Configurable interviews</strong> &mdash; type (behavioral, technical, system
          design), difficulty (junior/mid/senior), question count, and a question bank with random or
          sequential selection
        </li>
        <li>
          <strong>Live speech interface</strong> &mdash; TTS reads the question (browser-native for
          English, OpenAI cloud TTS for Korean), a visual countdown starts, speech recognition
          captures the answer, and webcam video records the candidate&apos;s delivery
        </li>
        <li>
          <strong>Follow-up questions</strong> &mdash; after each answer, the AI generates a
          contextual follow-up, creating a multi-turn conversational flow with parent-child answer
          linking
        </li>
        <li>
          <strong>Difficulty-aware feedback</strong> &mdash; AI scores across four competency
          dimensions using sandwich-method feedback, with leniency calibrated to the interview&apos;s
          difficulty level
        </li>
        <li>
          <strong>Bilingual support</strong> &mdash; full English and Korean localization including AI
          prompts, dual TTS pipeline (browser-native English, OpenAI cloud Korean with gendered voice
          selection), and PDF rendering with CJK font injection
        </li>
        <li>
          <strong>PDF export with video QR codes</strong> &mdash; client-side report generation with
          per-question breakdowns, competency bar charts, and scannable QR codes linking to recorded
          videos
        </li>
        <li>
          <strong>Dashboard filters</strong> &mdash; search, type/difficulty filtering, and sort
          controls for managing interview history
        </li>
      </ul>

      <p>
        The platform targets job seekers, CS students, and career changers who want structured
        practice without scheduling a human coach. It exists at the intersection of a real product
        and an engineering demonstration &mdash; every architectural decision serves both goals
        simultaneously.
      </p>

      <hr />

      <h2>2. Technical Architecture &amp; Workflow</h2>

      <h3>System Overview</h3>

      <pre><code>{`┌─────────────────────────────────────────────────────────────────────┐
│                          Browser (Client)                           │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐ │
│  │  react-webcam │  │ Web Speech   │  │  jsPDF + QRCode            │ │
│  │  (video feed) │  │ API (STT)    │  │  (PDF export + QR links)   │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────────────────────┘ │
│         │  MediaRecorder  │                                         │
│         │  (per-question  │  spoken answer    TTS playback          │
│         │   video)        │                   ▲                     │
│         │                 │    ┌──────────────┴──────────────┐      │
│         │                 │    │ English: Web Speech API     │      │
│         │                 │    │ Korean:  OpenAI TTS (server)│      │
│         │                 │    └─────────────────────────────┘      │
│         ▼                                        ▼                  │
│  ┌──────────────────────────────────────────────┐                   │
│  │  Next.js 16 App Router (React 19)            │                   │
│  │  Client pages: dashboard, interview, feedback │                   │
│  └───────────┬──────────────────┬───────────────┘                   │
└──────────────┼──────────────────┼───────────────────────────────────┘
               │ Server Actions   │ Video Upload (fire-and-forget)
               ▼                  ▼
┌──────────────────────────┐  ┌──────────────────────┐
│    Server (Node.js)      │  │  Supabase Storage    │
│                          │  │  (video blobs)       │
│  ┌──────────────┐        │  └──────────────────────┘
│  │ Clerk Auth   │        │
│  │ (middleware + │        │
│  │  currentUser) │        │
│  └──────────────┘        │
│  ┌──────────────┐        │
│  │ OpenAI API   │        │
│  │ (gpt-4o-mini │        │
│  │  json_object) │        │
│  └──────────────┘        │
│  ┌──────────────┐        │
│  │ Drizzle ORM  │        │
│  │ + PostgreSQL │        │
│  │  (Supabase)  │        │
│  └──────────────┘        │
└──────────────────────────┘`}</code></pre>

      <h3>Auth &amp; Data Isolation</h3>

      <p>
        Clerk middleware guards all <code>/dashboard/**</code> routes at the edge. Every server
        action independently calls <code>currentUser()</code> as a second authentication check
        before touching the database &mdash; defense in depth that prevents data access even if
        middleware is bypassed:
      </p>

      <pre><code>{`// app/actions/interview.ts — dual-layer auth guard
async function getAuthEmail(): Promise<string> {
  const user = await currentUser();
  if (!user?.emailAddresses?.[0]?.emailAddress) {
    throw new Error("Unauthorized");
  }
  return user.emailAddresses[0].emailAddress;
}`}</code></pre>

      <p>
        Every query filters on the authenticated user&apos;s email. Delete operations enforce
        ownership with a compound <code>WHERE</code> clause (<code>mockId = ? AND createdBy = ?</code>),
        preventing IDOR vulnerabilities even if an attacker guesses a valid UUID.
      </p>

      <h3>Data Model</h3>

      <p>Two tables in Drizzle ORM handle the full lifecycle:</p>

      <ul>
        <li>
          <strong>MockInterview</strong> &mdash; stores job metadata, interview configuration (type,
          difficulty, language), and AI-generated Q&amp;A pairs as a JSON string (
          <code>jsonMockResp</code>). The <code>mockId</code> (UUID) serves as the application-level
          join key, decoupling the external identifier from the auto-increment primary key.
        </li>
        <li>
          <strong>UserAnswer</strong> &mdash; stores per-question user responses, structured AI
          feedback as JSON, a denormalized <code>rating</code> field for quick aggregation, a{" "}
          <code>parentAnswerId</code> for follow-up question chaining (self-referential FK), and a{" "}
          <code>videoUrl</code> for the recorded webcam clip.
        </li>
      </ul>

      <h3>Interview Lifecycle</h3>

      <pre><code>{`Create    →  OpenAI generates Q&A pairs  →  Drizzle INSERT (MockInterview)
Execute   →  TTS reads question → countdown → Speech Recognition + Video Recording
Submit    →  OpenAI scores answer (4 competencies, sandwich feedback)
                → Drizzle INSERT (UserAnswer)
                → fire-and-forget video upload → late URL patch
Follow-up →  OpenAI generates contextual follow-up → record + submit → link to parent
Review    →  Collapsible feedback + video playback → PDF with QR codes`}</code></pre>

      <hr />

      <h2>3. Tech Stack Deep Dive</h2>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Technology</th>
              <th>Role</th>
              <th>Why Over Alternatives</th>
              <th>Tradeoff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Next.js 16 + React 19</strong></td>
              <td>Framework</td>
              <td>App Router enables server actions &mdash; no API routes needed. All AI calls and DB mutations are colocated <code>&quot;use server&quot;</code> functions with type-safe client invocation</td>
              <td>Newer ecosystem; middleware file naming conventions still shifting</td>
            </tr>
            <tr>
              <td><strong>OpenAI (gpt-4o-mini)</strong></td>
              <td>Question generation + answer evaluation + follow-up generation</td>
              <td><code>json_object</code> response format reduces parsing failures. Cost-efficient for structured output tasks (~10x cheaper than GPT-4o with sufficient quality for rubric scoring)</td>
              <td>Per-call latency adds 2-4s to each answer submission; no streaming for structured JSON mode</td>
            </tr>
            <tr>
              <td><strong>Drizzle ORM + Supabase PostgreSQL</strong></td>
              <td>Relational database</td>
              <td>Type-safe schema with zero codegen. Push-based migrations via <code>drizzle-kit push</code> &mdash; no migration files to manage during rapid iteration</td>
              <td>No automatic rollback; push-based workflow requires manual recovery if a schema change fails</td>
            </tr>
            <tr>
              <td><strong>Supabase Storage</strong></td>
              <td>Video blob hosting</td>
              <td>Integrated with the existing Supabase project. Public URL generation via <code>getPublicUrl()</code> &mdash; no signed-URL expiration management</td>
              <td>Separate client from the Drizzle database connection; requires lazy-init singleton to avoid build-time crashes when credentials are absent</td>
            </tr>
            <tr>
              <td><strong>Clerk</strong></td>
              <td>Authentication</td>
              <td>Drop-in auth with webhook sync, social login, and per-request JWT validation. Avoids building session management and OAuth flows from scratch</td>
              <td>External dependency on a critical path; webhook ordering requires defensive coding</td>
            </tr>
            <tr>
              <td><strong>Web Speech API + OpenAI TTS + MediaRecorder</strong></td>
              <td>Speech I/O + video capture</td>
              <td>Dual TTS strategy: browser-native synthesis for English (zero cost, low latency), OpenAI cloud TTS for Korean (reliable gendered voices via <code>nova</code>/<code>onyx</code> where browser voices are unreliable). Speech recognition and video recording through native browser APIs</td>
              <td>English TTS quality varies by OS; Korean TTS adds ~$0.008/interview API cost; no Safari STT</td>
            </tr>
            <tr>
              <td><strong>Tailwind CSS v4 + shadcn/ui</strong></td>
              <td>Styling</td>
              <td>CSS variable-based theming enables dark mode with a single provider. Radix primitives handle accessibility (focus traps, ARIA) without custom implementation</td>
              <td>Design token migration from v3 to v4 required reworking the globals.css structure</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>4. Technical Challenges &amp; Solutions</h2>

      <h3>Challenge 1: Multi-Turn Interview Flow with Fire-and-Forget Video Upload</h3>

      <p>
        <strong>Constraint:</strong> After each answer, the system must submit the response for AI
        feedback, upload the recorded video to Supabase Storage, generate a contextual follow-up
        question, and transition the UI to follow-up mode &mdash; all without blocking the user. The
        video upload alone takes 1-5 seconds depending on recording length. The follow-up question
        must reference the original answer, and the follow-up&apos;s own answer must link back to
        the parent via <code>parentAnswerId</code>.
      </p>

      <p>
        <strong>Why the naive approach fails:</strong> Sequentially awaiting video upload before
        generating the follow-up adds perceptible lag. Blocking on upload also means a network
        failure would prevent the interview from continuing &mdash; a non-critical feature breaking a
        critical path.
      </p>

      <p>
        <strong>Solution:</strong> A three-phase pipeline: (1) submit the answer synchronously to
        get immediate AI feedback and an <code>answerId</code>, (2) fire-and-forget the video upload
        as an unlinked Promise chain that patches the <code>videoUrl</code> column when it resolves,
        (3) generate the follow-up question in parallel with the upload:
      </p>

      <pre><code>{`// app/dashboard/interview/[interviewId]/start/page.tsx — lines 297-345
const result = await submitAnswer(
  params.interviewId,
  questions[activeIndex].question,
  questions[activeIndex].answer,
  userAnswer, language, null, difficulty
);

// Fire-and-forget video upload — non-blocking
if (currentVideoBlob) {
  uploadVideoBlob(currentVideoBlob, params.interviewId, result.answerId)
    .then((url) => {
      if (url) updateVideoUrl(result.answerId, url).catch(console.error);
    })
    .catch(console.error);
}

// Generate follow-up question (does not wait for upload)
const followUp = await generateFollowUpQuestion(
  questions[activeIndex].question,
  questions[activeIndex].answer,
  userAnswer, language
);
setParentAnswerId(result.answerId);
setFollowUpQuestion(followUp.followUpQuestion);
setIsFollowUpMode(true);`}</code></pre>

      <p>
        The <code>uploadVideoBlob</code> wrapper returns <code>null</code> on failure rather than
        throwing, ensuring upload errors are non-fatal. The <code>updateVideoUrl</code> server action
        patches a single column on the already-inserted <code>UserAnswer</code> row. On the feedback
        page, video playback renders conditionally &mdash; a question without a <code>videoUrl</code>{" "}
        simply omits the player.
      </p>

      <p>
        <strong>Tradeoff:</strong> The feedback page and PDF may briefly show questions without video
        if the user navigates there before uploads complete. The PDF generator handles this
        gracefully &mdash; QR codes are only rendered for answers where <code>videoUrl</code> is
        non-null. Accepting eventual consistency here saves 1-5 seconds of perceived latency per
        question.
      </p>

      <h3>Challenge 2: Difficulty-Calibrated AI Feedback with Speech Noise Isolation</h3>

      <p>
        <strong>Constraint:</strong> AI feedback must be calibrated to the interview&apos;s
        difficulty level &mdash; a junior candidate using the right keywords should score at least
        3/5, while a senior candidate must demonstrate depth. Simultaneously, answers are captured
        via speech recognition, which introduces transcription artifacts (filler words, grammar
        errors, repeated phrases) that are properties of the <em>input channel</em>, not the
        candidate&apos;s competence.
      </p>

      <p>
        <strong>Why the naive approach fails:</strong> A single scoring prompt treats all difficulty
        levels identically, frustrating junior candidates with harsh scores and failing to challenge
        senior candidates. Without explicit instructions to ignore speech artifacts, the model
        penalizes transcription noise as poor communication &mdash; conflating delivery medium with
        content quality.
      </p>

      <p>
        <strong>Solution:</strong> A leniency tier system with orthogonal competency axes and
        explicit speech-noise isolation rules:
      </p>

      <pre><code>{`// app/actions/answer.ts — lines 25-49
function getLeniency(difficulty: string) {
  switch (difficulty) {
    case "junior":
      return {
        label: "SUPPORTIVE",
        instructions: "SUPPORTIVE — This candidate is entry-level. Be encouraging. "
          + "If the answer is on-topic and shows basic understanding, "
          + "the minimum overall rating is 3.",
      };
    case "senior":
      return {
        label: "STRICT",
        instructions: "STRICT — Hold to high standards. "
          + "Expect depth, precision, and real-world examples.",
      };
    default:
      return {
        label: "BALANCED",
        instructions: "BALANCED — Standard evaluation.",
      };
  }
}`}</code></pre>

      <p>
        The feedback prompt separates <code>technicalKnowledge</code> (factual accuracy) from{" "}
        <code>communicationClarity</code> (structure and coherence) and enforces:{" "}
        <em>&quot;Poor grammar or filler words from speech recognition must NOT reduce either
        score.&quot;</em> A keyword recognition rule requires <code>technicalKnowledge &gt;= 3</code>{" "}
        if the candidate uses any key term from the expected answer. Feedback follows the sandwich
        method &mdash; praise, correction, actionable tip &mdash; framed as coaching rather than
        judgment.
      </p>

      <p>
        <strong>Tradeoff:</strong> Floor constraints per difficulty level compress the scoring range.
        A junior candidate cannot score below 3 on an on-topic answer, which reduces granularity at
        the lower end. The alternative &mdash; no floors &mdash; produces discouraging scores for
        entry-level candidates who gave reasonable but incomplete answers, which defeats the
        product&apos;s purpose as a practice tool.
      </p>

      <h3>Challenge 3: MediaRecorder Lifecycle and Cross-Browser MIME Negotiation</h3>

      <p>
        <strong>Constraint:</strong> Each interview question requires an independent video recording
        that starts after TTS playback and countdown, stops when the user submits, and produces a
        self-contained Blob for upload. The browser&apos;s <code>MediaRecorder</code> API has no
        standardized MIME type &mdash; VP9+Opus works in Chrome, VP8+Opus in Firefox, and the codec
        list varies by OS. Additionally, <code>MediaRecorder.stop()</code> is asynchronous: the
        final <code>ondataavailable</code> fires before <code>onstop</code>, and calling{" "}
        <code>stop()</code> on an inactive recorder throws.
      </p>

      <p>
        <strong>Why the naive approach fails:</strong> Hardcoding{" "}
        <code>video/webm;codecs=vp9,opus</code> fails silently in Firefox. Calling{" "}
        <code>recorder.stop()</code> without checking state crashes if the user navigates away
        mid-recording. Using raw <code>MediaRecorder</code> in the component mixes imperative
        browser API with React&apos;s declarative model, creating cleanup bugs.
      </p>

      <p>
        <strong>Solution:</strong> A factory-pattern abstraction that encapsulates MIME negotiation,
        Promise-wrapped stop, and defensive cleanup:
      </p>

      <pre><code>{`// lib/mediaRecorder.ts — lines 8-20, 47-64
const MIME_CANDIDATES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

function getSupportedMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  for (const mime of MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return "";
}

// RecordingSession.stop() — Promise wrapper
stop(): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!recorder || recorder.state === "inactive") {
      reject(new Error("Recorder not active"));
      return;
    }
    recorder.onstop = () => {
      const mime = recorder?.mimeType || "video/webm";
      resolve(new Blob(chunks, { type: mime }));
      chunks = [];
      recorder = null;
    };
    recorder.stop();
  });
}`}</code></pre>

      <p>
        The <code>cleanup()</code> method wraps <code>recorder.stop()</code> in a try/catch for
        component unmount &mdash; the recorder may already be inactive if the user submitted before
        navigating. Each question creates a fresh <code>RecordingSession</code> via the factory,
        preventing track leaks across questions. The audio track is acquired once via{" "}
        <code>getUserMedia</code> with echo cancellation and reused across all sessions.
      </p>

      <p>
        <strong>Tradeoff:</strong> The MIME candidate list requires manual maintenance as browser
        codec support evolves. The fallback to bare <code>video/webm</code> without explicit codecs
        produces larger files with less efficient compression. The alternative &mdash; server-side
        transcoding &mdash; would standardize output format but adds infrastructure and latency for
        a non-critical feature.
      </p>

      <hr />

      <h2>5. Impact &amp; Future Roadmap</h2>

      <h3>Current State</h3>

      <ul>
        <li>
          End-to-end interview pipeline: create, execute with speech I/O and video recording,
          receive multi-dimensional AI feedback with follow-up probing, and export a PDF report with
          embedded video QR codes
        </li>
        <li>
          Multi-turn conversational flow: AI-generated follow-up questions create realistic interview
          dynamics, with parent-child answer linking for structured review
        </li>
        <li>
          Difficulty-calibrated feedback: leniency tiers (junior/mid/senior) with sandwich-method
          coaching and speech-noise isolation across four competency dimensions
        </li>
        <li>
          Bilingual support (English + Korean) across all layers: UI, AI prompts, dual TTS pipeline
          (browser-native English, OpenAI cloud Korean), and PDF rendering with CJK font injection
        </li>
        <li>
          Dashboard management: search, filter by type/difficulty, sort by date/rating, with{" "}
          <code>useMemo</code>-filtered client-side rendering
        </li>
      </ul>

      <h3>Scalability Considerations</h3>

      <ul>
        <li>
          Server actions with per-request auth verification scale horizontally behind Vercel&apos;s
          edge network without session affinity requirements
        </li>
        <li>
          JSON-stringified feedback in the <code>UserAnswer</code> table avoids schema migrations
          when adding new competency dimensions &mdash; the parsing layer handles both legacy and
          enhanced formats transparently
        </li>
        <li>
          Fire-and-forget video uploads decouple the critical path (answer submission + feedback)
          from the optional path (video storage), ensuring interview flow is never blocked by network
          conditions
        </li>
        <li>
          Stateless interview execution (each question submission is an independent server action)
          means no server-side session state to manage or lose
        </li>
      </ul>

      <h3>Planned Features</h3>

      <ul>
        <li>
          <strong>Multi-provider AI support</strong> &mdash; abstract the OpenAI dependency behind a
          provider interface to support Gemini, Claude, and local models. The structured JSON
          response format constraint narrows viable providers to those supporting equivalent output
          modes, which Gemini and Claude both now offer. The <code>generateFromPrompt</code> wrapper
          in <code>lib/gemini.ts</code> is already a single integration point, making the swap
          surface area small.
        </li>
        <li>
          <strong>Performance analytics</strong> &mdash; aggregate scores across sessions to surface
          trends over time, identify weak competency dimensions, and recommend targeted practice
          areas. The <code>UserAnswer</code> table&apos;s denormalized <code>rating</code> field and
          structured <code>competencies</code> JSON already support this query pattern without schema
          changes.
        </li>
      </ul>

      <p>
        The architecture is designed for this kind of extension: server actions isolate AI provider
        logic, the schema accommodates new feedback dimensions without migrations, and the
        client-side speech pipeline operates independently of the backend. Each layer evolves without
        cascading rewrites.
      </p>
    </>
  );
}
