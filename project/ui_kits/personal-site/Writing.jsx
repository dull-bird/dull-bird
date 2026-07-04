/* Writing — the essay index. */
function Writing({ lang, go }) {
  const { Tag, PostMeta, TextLink } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const [topic, setTopic] = React.useState("all");
  const t = lang === "zh"
    ? { eyebrow: "文章 · Writing", title: "在公开处思考", sub: "关于技术、AI，以及如何让它们更平等地被享受。", all: "全部" }
    : { eyebrow: "Writing · 文章", title: "Thinking in public", sub: "On technology, AI, and making them more evenly enjoyed.", all: "All" };

  const topics = ["all", ...Array.from(new Set(D.posts.map((p) => p.topic.en)))];
  const topicLabel = (en) => {
    if (en === "all") return t.all;
    const p = D.posts.find((x) => x.topic.en === en);
    return p ? p.topic[lang] : en;
  };
  const posts = topic === "all" ? D.posts : D.posts.filter((p) => p.topic.en === topic);

  return (
    <main className="db-reading" style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--space-8)" }}>
      <div className="db-eyebrow" style={{ marginBottom: "var(--space-3)" }}>{t.eyebrow}</div>
      <h1 style={{ fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-3)" }}>{t.title}</h1>
      <p style={{ fontFamily: "var(--font-reading)", fontSize: "var(--text-md)", color: "var(--text-body)", marginBottom: "var(--space-6)" }}>{t.sub}</p>

      {/* Topic filter */}
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-7)" }}>
        {topics.map((en) => (
          <button key={en} onClick={() => setTopic(en)} className="db-tag" data-variant={topic === en ? "accent" : undefined} style={{ cursor: "pointer" }}>
            {topicLabel(en)}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post, i) => (
          <article key={post.slug} onClick={() => go("#/post/" + post.slug)}
            style={{ cursor: "pointer", padding: "var(--space-6) 0", borderTop: i === 0 ? "none" : "1px solid var(--border-hairline)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <Tag variant="accent">{post.topic[lang]}</Tag>
              <PostMeta date={post.date} readingTime={post.reading} lang={lang} items={post.translated ? [lang === "zh" ? "译 AI" : "AI-tr"] : []} />
            </div>
            <h2 style={{ fontSize: "var(--text-xl)", lineHeight: "var(--leading-snug)" }}>{post.title[lang]}</h2>
            <p style={{ fontFamily: "var(--font-reading)", fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: 1.6, margin: 0, maxWidth: "56ch" }}>{post.lede[lang]}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
window.Writing = Writing;
