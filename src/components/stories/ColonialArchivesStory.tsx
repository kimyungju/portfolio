export default function ColonialArchivesStory() {
  return (
    <>
      <h2>Making Scanned Archives Searchable</h2>

      <p>
        Colonial Archives started from a practical research frustration. The CO 273
        Straits Settlements records contain valuable administrative, economic, and social
        history, but the source material is locked inside scanned PDFs. A historian looking
        for one officer, commodity, or regulation has to scan page after page and then keep
        track of where each claim came from.
      </p>

      <p>
        The project turns that workflow into a source-grounded research assistant. It
        ingests archive PDFs, extracts text and entities, builds a knowledge graph, and
        lets users ask natural-language questions. Every answer is tied back to exact
        archive pages, so the interface is not asking researchers to trust an AI summary
        without evidence.
      </p>

      <h2>A Nine-Step Ingestion Pipeline</h2>

      <p>
        The backend is a <strong>FastAPI</strong> system that processes PDFs through a
        nine-step pipeline: download from Cloud Storage, OCR with <strong>Google Document
        AI</strong>, clean and chunk the text, embed chunks with <strong>Vertex AI</strong>,
        upsert vectors, extract entities with <strong>Gemini</strong>, normalize duplicate
        names, merge entities and relationships into <strong>Neo4j</strong>, and classify
        documents into archive categories.
      </p>

      <p>
        The graph steps are intentionally non-blocking. If Neo4j is temporarily unavailable,
        vector ingestion can still succeed and the graph can catch up later. That choice
        keeps long-running OCR and embedding work from being wasted just because the graph
        database has a cold start or a transient outage.
      </p>

      <h2>Hybrid Retrieval With Citations</h2>

      <p>
        Querying the archive uses two retrieval paths at once. Vector search finds the most
        semantically relevant chunks, while graph traversal follows entity hints through
        related people, places, institutions, and events. The two paths have independent
        timeouts and fault isolation, so one slow service does not bring the whole answer
        down.
      </p>

      <p>
        The answer generator is archive-first. Gemini receives only the retrieved archive
        context and emits numbered <strong>[archive:N]</strong> markers. The frontend turns
        those markers into citation badges, and clicking a badge opens the original PDF page
        in a viewer. If the archive cannot answer, the system can fall back to web search,
        but the UI labels that fallback separately instead of pretending it came from the
        archive.
      </p>

      <h2>Normalizing Messy Historical Names</h2>

      <p>
        One of the hardest parts was entity normalization. Historical documents and OCR
        output rarely name things consistently: the same person can appear with initials,
        titles, spelling variants, or OCR mistakes. Exact matching alone would split one
        historical actor into several graph nodes.
      </p>

      <p>
        I handled that with three stages: exact and alias matching first, embedding
        similarity second, and fuzzy string matching third. The pipeline catches simple
        duplicates cheaply, then uses semantic similarity and spelling tolerance only when
        they are needed. Re-ingestion is safe because graph writes use <strong>MERGE</strong>
        rather than blind creates.
      </p>

      <h2>The Interface: Graph Beside Chat</h2>

      <p>
        The frontend is a <strong>React 19</strong> research workspace with a graph panel,
        chat panel, citation badges, PDF modal, and category controls. The overview graph
        shows the archive by community, while query mode narrows the view to the entities
        and relationships that support a specific answer.
      </p>

      <p>
        At the current scale, the system has processed 28 PDFs into 1,463 entities and
        6,843 relationships. The product lesson was that digital humanities tools need more
        than a good answer box. They need source visibility, uncertainty boundaries, and an
        interface that lets researchers inspect the evidence rather than just consume a
        summary.
      </p>

      <p>
        The next engineering frontier is operational: keeping the graph and vector services
        warm enough for demos, improving PDF reopen performance, and making the deployment
        path boringly repeatable. The core research loop is already there: ask, retrieve,
        cite, inspect, and return to the archive page that proves the claim.
      </p>
    </>
  );
}
