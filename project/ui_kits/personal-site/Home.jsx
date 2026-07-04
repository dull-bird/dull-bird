/* Home — the landing screen. */
function Home({ lang, go }) {
  const { BirdMark, Button, Tag, Card, PostMeta, TextLink } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const p = D.profile;
  const t = lang === "zh"
    ? { eyebrow: "在公开处思考 · Thinking in public", read: "读一读", about: "关于我", latest: "最新文章", all: "全部文章 →" }
    : { eyebrow: "Thinking in public · 在公开处思考", read: "Start reading", about: "About", latest: "Latest writing", all: "All writing →" };
  const posts = D.posts.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="db-container" style={{ paddingTop: "var(--space-11)", paddingBottom: "var(--space-9)" }}>
        <div style={{ display: "flex", gap: "var(--space-8)", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px", minWidth: 300 }}>
            <div className="db-eyebrow" style={{ marginBottom: "var(--space-4)" }}>{t.eyebrow}</div>
            <h1 style={{ fontSize: "var(--text-4xl)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-5)" }}>
              {lang === "zh" ? "呆鸟小筑" : "dull-bird"}
            </h1>
            <p style={{ fontFamily: "var(--font-reading)", fontSize: "var(--text-lg)", lineHeight: lang === "zh" ? "var(--leading-cjk)" : "var(--leading-reading)", color: "var(--text-body)", maxWidth: "40ch", marginBottom: "var(--space-6)" }}>
              {p.bio[lang]}
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <Button onClick={() => go("#/writing")}>{t.read}</Button>
              <Button variant="secondary" onClick={() => go("#/about")}>{t.about}</Button>
            </div>
          </div>
          <div style={{ flex: "0 0 auto", margin: "0 auto" }}>
            <BirdMark variant="line" size={260} strokeWidth={4} color="var(--accent)" animate />
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="db-container" style={{ paddingBottom: "var(--space-9)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
          <h2 style={{ fontSize: "var(--text-2xl)" }}>{t.latest}</h2>
          <TextLink muted onClick={() => go("#/writing")} style={{ cursor: "pointer" }}>{t.all}</TextLink>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-5)" }}>
          {posts.map((post) => (
            <Card key={post.slug} onClick={() => go("#/post/" + post.slug)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <Tag variant="accent">{post.topic[lang]}</Tag>
              <h3 style={{ fontSize: "var(--text-xl)", lineHeight: "var(--leading-snug)" }}>{post.title[lang]}</h3>
              <p style={{ fontFamily: "var(--font-reading)", color: "var(--text-body)", fontSize: "var(--text-base)", lineHeight: 1.6, margin: 0 }}>
                {post.lede[lang]}
              </p>
              <div style={{ marginTop: "auto", paddingTop: "var(--space-3)" }}>
                <PostMeta date={post.date} readingTime={post.reading} lang={lang} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote strip */}
      <section style={{ background: "var(--surface-well)", borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)" }}>
        <div className="db-reading" style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--space-9)", textAlign: "center" }}>
          <BirdMark variant="stroke" size={40} color="var(--accent)" style={{ margin: "0 auto var(--space-5)" }} />
          <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: "var(--leading-snug)", color: "var(--text-heading)", marginBottom: "var(--space-3)" }}>
            {lang === "zh" ? "未来已来，只是分布不均。" : "The future is already here — it's just not evenly distributed."}
          </p>
          <div className="db-eyebrow">William Gibson</div>
        </div>
      </section>
    </main>
  );
}
window.Home = Home;
