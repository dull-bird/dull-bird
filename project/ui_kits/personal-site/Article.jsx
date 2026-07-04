/* Article — a single essay reading view. */
function Article({ lang, go, slug }) {
  const { Prose, Callout, Tag, PostMeta, BirdMark, TextLink } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const idx = D.posts.findIndex((p) => p.slug === slug);
  const post = D.posts[idx] || D.posts[0];
  const next = D.posts[(idx + 1) % D.posts.length];
  const t = lang === "zh"
    ? { back: "← 全部文章", trans: "本文由 AI 翻译，人工校对。", note: "呆鸟按", noteBody: "笨鸟先飞——与其等技术普及，不如现在就把想法分享出来。", nextUp: "下一篇" }
    : { back: "← All writing", trans: "Machine-translated, human-checked.", note: "dull-bird's note", noteBody: "The slow bird starts early — rather than wait for tech to spread, share the idea now.", nextUp: "Next" };

  const renderBlock = (b, i) => {
    if (b.t === "h2") return <h2 key={i}>{b.c}</h2>;
    if (b.t === "quote") return <blockquote key={i}>{b.c}</blockquote>;
    const html = b.c.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");
    return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <main className="db-reading" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}>
      <TextLink muted onClick={() => go("#/writing")} style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>{t.back}</TextLink>

      <header style={{ margin: "var(--space-6) 0 var(--space-7)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          <Tag variant="accent">{post.topic[lang]}</Tag>
          <PostMeta date={post.date} readingTime={post.reading} lang={lang} />
        </div>
        <h1 style={{ fontSize: "var(--text-3xl)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-4)" }}>{post.title[lang]}</h1>
        <p style={{ fontFamily: "var(--font-reading)", fontSize: "var(--text-lg)", color: "var(--text-muted)", lineHeight: "var(--leading-snug)", fontStyle: "italic" }}>{post.lede[lang]}</p>
      </header>

      {post.translated && <Callout tone="quiet" mark={false} style={{ marginBottom: "var(--space-6)" }}>{t.trans}</Callout>}

      <Prose lang={lang}>
        {post.body[lang].map(renderBlock)}
      </Prose>

      <Callout title={t.note} style={{ margin: "var(--space-8) 0" }}>{t.noteBody}</Callout>

      {/* Next up */}
      <div onClick={() => go("#/post/" + next.slug)}
        style={{ cursor: "pointer", marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-hairline)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <BirdMark variant="stroke" size={30} color="var(--accent)" />
        <div>
          <div className="db-eyebrow" style={{ marginBottom: 4 }}>{t.nextUp}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--text-heading)" }}>{next.title[lang]}</div>
        </div>
      </div>
    </main>
  );
}
window.Article = Article;
