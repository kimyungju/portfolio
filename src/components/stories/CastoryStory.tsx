export default function CastoryStory() {
  return (
    <>
      <h2>Why I Built a Podcast Platform</h2>

      <p>
        Staying current in tech and cybersecurity means reading dozens of articles every
        day. Most people don&apos;t have the bandwidth for that &mdash; but they do have a
        commute, a gym session, or a lunch break. I wanted a tool that could take the
        firehose of daily news and turn it into something I could listen to in five minutes
        while walking to class. That&apos;s how Castory started: a full-stack podcast
        platform that transforms text into studio-quality audio using AI, targeted at CS
        students and busy engineers who want curated news without the overhead of manual
        research.
      </p>

      <h2>Two Ways to Create</h2>

      <p>
        Castory offers two distinct creation workflows. The first is a manual mode where
        content creators write or paste their own scripts, pick an AI voice, and generate
        both audio narration and cover art in one flow. The second &mdash; and the one I&apos;m
        most proud of &mdash; is an automated news podcast wizard. It&apos;s a five-step
        guided flow: you choose a topic, the system fetches trending articles using
        <strong> GPT-4.1-mini</strong> with real-time web search, you curate which stories
        to include, it generates a natural-sounding podcast script with your preferred tone
        and duration, produces the audio with <strong>OpenAI TTS</strong>, creates a
        thumbnail with <strong>DALL-E 3</strong>, and publishes &mdash; end to end, no
        external tooling required.
      </p>

      <p>
        The whole stack is built on <strong>Next.js 16</strong> with <strong>React 19</strong> on
        the frontend, <strong>Convex</strong> as the serverless backend with real-time
        subscriptions and integrated file storage, and <strong>Clerk</strong> for
        authentication synced via webhooks. The UI follows a deliberately brutalist aesthetic
        with thick borders, hard offset shadows, and a high-contrast orange-on-charcoal
        palette that I designed to stand apart from default component library looks.
      </p>

      <h2>The Chunking Problem</h2>

      <p>
        The most interesting technical challenge came from a hard constraint in
        <strong> OpenAI&apos;s TTS-1</strong> model: it refuses any input longer than 4,096
        characters. A medium-length news podcast script runs around 1,200 words &mdash;
        roughly 6,000 to 7,000 characters. So the text has to be split into multiple chunks,
        each converted to audio independently, then stitched back together. The naive
        approach would be to cut at exactly 4,096 characters, but that lands you mid-word or
        mid-sentence, producing cut-off words, unnatural pauses, and tonal discontinuities
        at the seams.
      </p>

      <p>
        I wrote a sentence-aware splitting algorithm that works like this: it takes a window
        of up to 4,096 characters and scans backward for the last sentence-ending
        punctuation &mdash; a period, exclamation mark, or question mark followed by a space
        or newline. If it finds one, it splits there. But there&apos;s a catch: if the only
        sentence boundary sits very early in the window (say, within the first 30%), you&apos;d
        get a tiny chunk followed by a huge remainder, which defeats the purpose. So the
        algorithm enforces a 30% minimum threshold &mdash; if the best sentence boundary is
        too close to the start, it falls back to splitting at the last word boundary instead.
        As a final safety net, if the input has no whitespace at all, it hard-splits at the
        character limit. After generating audio for every chunk, the MP3 buffers are
        concatenated at the byte level. This works because MP3 is a frame-based format where
        each frame is independently decodable, so simple byte concatenation produces a valid
        file without needing server-side audio tools like FFmpeg.
      </p>

      <h2>The Race Condition in Draft Persistence</h2>

      <p>
        The news wizard manages around fifteen pieces of state that flow forward through its
        five steps &mdash; selected topic, fetched articles, curated picks, generated script,
        tone and duration preferences, and more. All five steps live in a single page
        component rather than separate routes, because serializing complex objects like
        article arrays into URL state would be fragile, and server-side session storage would
        fight the real-time <strong>Convex</strong> architecture. To handle the case where a
        user closes their browser mid-flow, I built a draft persistence hook that auto-saves
        the entire wizard state to <strong>localStorage</strong> with a 500ms debounce.
      </p>

      <p>
        But there was a subtle race condition. When the component mounts, it initializes with
        default values. The debounced save would detect that &quot;new&quot; state and
        immediately write it to <strong>localStorage</strong> &mdash; before the restoration
        logic had a chance to read the existing draft and hydrate the component. The fix was
        a ready-delay: the hook waits 750 milliseconds after mount before enabling saves.
        That window gives the restore function time to read the draft from storage and
        populate the wizard state. Only after the delay does the auto-save kick in, ensuring
        it captures the restored state rather than overwriting it with empty defaults. On top
        of that, an auto-fill cascade reduces friction &mdash; when a script is generated,
        the wizard automatically populates the podcast title, description, voice prompt, and
        image prompt, taking the user from five manual inputs down to zero with full override
        capability.
      </p>

      <h2>Where It Stands</h2>

      <p>
        Castory is a working end-to-end platform with both creation pipelines, a global
        audio player accessible from any route, full-text search across titles, authors, and
        descriptions, and a responsive three-column layout. The features I&apos;m most
        excited to add next are:
      </p>

      <ul>
        <li>
          <strong>Scheduled publishing</strong> &mdash; using <strong>Convex</strong> scheduled
          functions to automatically generate and publish daily or weekly news podcasts on a
          user-configured cadence, with no manual intervention required.
        </li>
        <li>
          <strong>Multi-voice episodes</strong> &mdash; a host-and-guest format using
          multiple TTS voices within a single episode to produce conversational-style
          podcasts from a single text input.
        </li>
      </ul>

      <p>
        Building Castory taught me that the most satisfying engineering problems aren&apos;t
        the ones with obvious solutions &mdash; they&apos;re the ones where you have to
        respect a hard constraint and find a way to make the output feel seamless anyway.
        The chunking algorithm and the draft persistence hook are small pieces of code, but
        they&apos;re the difference between a demo and something you&apos;d actually use.
      </p>
    </>
  );
}
