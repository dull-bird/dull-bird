/* AgentView — the machine-readable view: a site meant to be read by
   AI agents as easily as by people. Renders an /llms.txt-style doc
   with a toggle to a JSON representation. */
function AgentView({ lang, go }) {
  const { BirdMark, Button } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const [fmt, setFmt] = React.useState("llms");
  const t = lang === "zh"
    ? { eyebrow: "机器可读 · For agents", title: "给 AI agent 的视图", sub: "同样的内容，为自动化读者整理。稳定链接、清晰语义、可直接抓取——主动兼容，而非被爬。" }
    : { eyebrow: "Machine-readable · 机器可读", title: "A view for AI agents", sub: "The same content, arranged for automated readers. Stable links, clean semantics, ready to parse — compatible by intent, not by scraping." };

  const llms = [
    "# 呆鸟小筑 · dull-bird",
    "> " + D.profile.bio.en,
    "",
    "## Site",
    "- [Writing](#/writing): essays on tech, AI, and equal access",
    "- [About](#/about): who dull-bird is",
    "- [Now](#/about): a dated snapshot of current focus",
    "",
    "## Writing",
    ...D.posts.map((p) => `- [${p.title.en}](#/post/${p.slug}) — ${p.topic.en}, ${p.date}, ${p.reading}min`),
    "",
    "## Meta",
    "- feed: /feed.xml",
    "- llms: /llms.txt",
    "- languages: zh (primary), en (AI-translated)",
    "- license: CC BY 4.0",
  ].join("\n");

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "呆鸟小筑 · dull-bird",
    inLanguage: ["zh", "en"],
    author: { "@type": "Person", name: "dull-bird" },
    description: D.profile.bio.en,
    blogPost: D.posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title.en,
      about: p.topic.en,
      datePublished: p.date,
      timeRequired: `PT${p.reading}M`,
      url: `#/post/${p.slug}`,
      translationOfWork: p.translated ? "zh" : undefined,
    })),
  }, null, 2);

  const doc = fmt === "llms" ? llms : json;

  return (
    <main className="db-container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)", maxWidth: 880 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <BirdMark variant="stroke" size={40} color="var(--accent)" />
        <div style={{ flex: 1 }}>
          <div className="db-eyebrow" style={{ marginBottom: 6 }}>{t.eyebrow}</div>
          <h1 style={{ fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-3)" }}>{t.title}</h1>
          <p style={{ fontFamily: "var(--font-reading)", fontSize: "var(--text-md)", color: "var(--text-body)", lineHeight: 1.6, maxWidth: "60ch" }}>{t.sub}</p>
        </div>
      </div>

      {/* Format toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
        <div className="db-langtoggle" role="group" aria-label="Format">
          <button data-active={fmt === "llms" ? "true" : undefined} onClick={() => setFmt("llms")}>llms.txt</button>
          <button data-active={fmt === "json" ? "true" : undefined} onClick={() => setFmt("json")}>JSON-LD</button>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
          {fmt === "llms" ? "GET /llms.txt · 200 OK · text/markdown" : "GET / · <script type=application/ld+json>"}
        </span>
      </div>

      {/* The document */}
      <pre style={{
        margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", lineHeight: 1.7,
        color: "var(--text-body)", background: "var(--surface-well)", border: "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-md)", padding: "var(--space-6)", overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word",
      }}>
        <code>{doc}</code>
      </pre>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-faint)", marginTop: "var(--space-4)" }}>
        {lang === "zh" ? "每个页面都带有语义 HTML 与 JSON-LD；agent 可跟随 #/ 链接抓取全文。" : "Every page ships semantic HTML + JSON-LD; agents can follow #/ links to the full text."}
      </p>
    </main>
  );
}
window.AgentView = AgentView;
