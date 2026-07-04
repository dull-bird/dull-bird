/* About & Now — who I am + a dated snapshot of right now. */
function About({ lang, go }) {
  const { BirdMark, Tag, TextLink } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const t = lang === "zh"
    ? { eyebrow: "关于 · About", title: "呆鸟是谁", now: "此刻", nowSub: "一份会过时的快照 · 更新于 2026 年 6 月", contact: "找到我", agent: "给 AI agent 读 →" }
    : { eyebrow: "About · 关于", title: "Who is dull-bird", now: "Now", nowSub: "A snapshot that will age · updated June 2026", contact: "Find me", agent: "For AI agents →" };

  return (
    <main className="db-reading" style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--space-8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", marginBottom: "var(--space-6)" }}>
        <BirdMark variant="line" size={72} color="var(--accent)" />
        <div>
          <div className="db-eyebrow" style={{ marginBottom: 6 }}>{t.eyebrow}</div>
          <h1 style={{ fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)" }}>{t.title}</h1>
        </div>
      </div>

      <div className="db-prose" data-lang={lang} style={{ marginBottom: "var(--space-9)" }}>
        <p>{D.profile.bio[lang]}</p>
        <p>{lang === "zh"
          ? "我相信技术最好的样子，是让更多人平等地用上它。所以我把学习和思考公开出来——写得不完美也没关系，先飞起来再说。"
          : "I believe technology is at its best when more people can use it, equally. So I keep my learning and thinking in the open — imperfect is fine, the point is to take off first."}</p>
      </div>

      {/* Now */}
      <section style={{ marginBottom: "var(--space-8)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
          <h2 style={{ fontSize: "var(--text-2xl)" }}>{t.now}</h2>
          <span className="db-eyebrow">{t.nowSub}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {D.now[lang].map(([label, body], i) => (
            <div key={i} style={{ display: "flex", gap: "var(--space-5)", padding: "var(--space-5) 0", borderTop: "1px solid var(--border-hairline)", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-ink)", flex: "0 0 84px" }}>{label}</div>
              <div style={{ fontFamily: "var(--font-reading)", fontSize: "var(--text-md)", color: "var(--text-body)", lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact + agent link */}
      <section style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-5)", justifyContent: "space-between", alignItems: "center", padding: "var(--space-6)", background: "var(--surface-well)", borderRadius: "var(--radius-lg)" }}>
        <div>
          <div className="db-eyebrow" style={{ marginBottom: 8 }}>{t.contact}</div>
          <div style={{ display: "flex", gap: "var(--space-4)", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>
            <TextLink href="#">GitHub</TextLink>
            <TextLink href="#">Email</TextLink>
            <TextLink href="#">RSS</TextLink>
          </div>
        </div>
        <TextLink onClick={() => go("#/agents")} style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--accent-ink)" }}>{t.agent}</TextLink>
      </section>
    </main>
  );
}
window.About = About;
