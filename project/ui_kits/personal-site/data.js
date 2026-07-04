/* dull-bird 呆鸟小筑 — sample content for the UI kit.
   Bilingual: each post carries zh + en. Content is illustrative. */
window.DB_DATA = {
  profile: {
    zh: { name: "呆鸟小筑", handle: "dull-bird", role: "在公开处思考技术与 AI" },
    en: { name: "dull-bird", handle: "dull-bird", role: "thinking about tech & AI, in the open" },
    bio: {
      zh: "呆鸟是我的外号。笨鸟先飞，所以我想主动把一些关于新技术、尤其是 AI 的想法分享出来。我的理念很简单：让更多人能更平等地享受技术。",
      en: "\u201Cdull-bird\u201D is a nickname of mine. The slow bird starts early — so I share my thinking about new technology, especially AI, out in the open. My belief is simple: help more people enjoy technology, more equally.",
    },
  },
  posts: [
    {
      slug: "uneven-future",
      topic: { zh: "未来", en: "the future" },
      date: "2026-06-18",
      reading: 6,
      translated: true,
      title: { zh: "未来已来，只是分布不均", en: "The future is here, unevenly" },
      lede: {
        zh: "Gibson 那句话被引用太多次了。但每次真正用上一个新工具，我都更相信它——差距不在时间，在于谁先伸手。",
        en: "Gibson's line is over-quoted. But every time I actually pick up a new tool, I believe it more — the gap isn't time, it's who reaches first.",
      },
      body: {
        zh: [
          { t: "p", c: "未来已经到来，只是分布不均。这句话我以前当金句读，直到我开始每天用 AI 写代码、读论文、翻译文章。" },
          { t: "h2", c: "差距不在时间" },
          { t: "p", c: "同一个模型，有人用它十分钟就搭好了原型，有人还在纠结要不要注册。技术是公开的，但**伸手的意愿**不是。" },
          { t: "quote", c: "The future is already here — it's just not evenly distributed." },
          { t: "p", c: "笨鸟先飞。与其等技术自然普及，不如现在就把用法、把想法、把踩过的坑分享出来。" },
          { t: "h2", c: "所以我做了这个小站" },
          { t: "p", c: "它对人友好，也对 AI agent 友好——结构清晰、语义明确、附带机器可读的视图。你可以读，你的 agent 也可以读。" },
        ],
        en: [
          { t: "p", c: "The future is already here, just unevenly distributed. I read that as a nice quote — until I started using AI every day to write code, read papers, translate essays." },
          { t: "h2", c: "The gap isn't time" },
          { t: "p", c: "Same model: one person ships a prototype in ten minutes, another is still deciding whether to sign up. The tech is public; the **willingness to reach** is not." },
          { t: "quote", c: "The future is already here — it's just not evenly distributed." },
          { t: "p", c: "The slow bird starts early. Rather than wait for tech to spread, share the uses, the ideas, the potholes now." },
          { t: "h2", c: "So I built this little place" },
          { t: "p", c: "Friendly to people, and friendly to AI agents — clean structure, clear semantics, a machine-readable view alongside. You can read it; so can your agent." },
        ],
      },
    },
    {
      slug: "slow-bird",
      topic: { zh: "方法", en: "method" },
      date: "2026-05-30",
      reading: 4,
      translated: true,
      title: { zh: "笨鸟先飞：把学习过程公开", en: "Slow bird: learning in public" },
      lede: {
        zh: "我不是最快的那只，但我可以是先起飞的那只。公开地笨拙，比私下地完美更有用。",
        en: "I'm not the fastest bird, but I can be the one that starts early. Publicly clumsy beats privately perfect.",
      },
      body: {
        zh: [
          { t: "p", c: "把半成品的想法写下来，是一件需要勇气的事。但正是这些半成品，最能引出别人的补充。" },
          { t: "p", c: "我给自己定了一条规矩：**想清楚 60% 就可以发**。剩下的 40%，交给读者和时间。" },
        ],
        en: [
          { t: "p", c: "Writing down half-formed ideas takes nerve. But it's exactly the half-formed ones that invite others to finish the thought." },
          { t: "p", c: "My rule: **60% clear is enough to publish**. The other 40% belongs to readers and to time." },
        ],
      },
    },
    {
      slug: "agent-friendly-web",
      topic: { zh: "AI agents", en: "AI agents" },
      date: "2026-05-11",
      reading: 7,
      translated: false,
      title: { zh: "为 agent 而写的网页", en: "Writing web pages for agents" },
      lede: {
        zh: "如果一个 AI agent 来读我的网站，它能顺利拿到它要的东西吗？我把这当成一条新的可访问性标准。",
        en: "If an AI agent visits my site, can it get what it needs? I treat this as a new axis of accessibility.",
      },
      body: {
        zh: [
          { t: "p", c: "无障碍设计曾经是为屏幕阅读器。现在，读者名单里多了一类：自动化的 agent。" },
          { t: "p", c: "我的做法：干净的语义 HTML、稳定的链接、一份 `/llms.txt`、以及一个结构化的机器视图。主动兼容，而不是被抓取。" },
        ],
        en: [
          { t: "p", c: "Accessibility used to mean screen readers. Now the audience includes automated agents." },
          { t: "p", c: "My approach: clean semantic HTML, stable links, an `/llms.txt`, and a structured machine view. Compatible by intent, not by scraping." },
        ],
      },
    },
    {
      slug: "tools-2026",
      topic: { zh: "工具", en: "tools" },
      date: "2026-04-02",
      reading: 3,
      translated: true,
      title: { zh: "此刻我在用的工具", en: "Tools I'm using now" },
      lede: {
        zh: "一份会过时的清单。正因为会过时，才值得记录——它是我此刻的切片。",
        en: "A list that will age. Which is exactly why it's worth keeping — a slice of right now.",
      },
      body: {
        zh: [{ t: "p", c: "清单略。重点不是工具本身，而是换工具的速度。" }],
        en: [{ t: "p", c: "List omitted. The point isn't the tools; it's how fast I swap them." }],
      },
    },
  ],
  now: {
    zh: [
      ["在读", "关于 agent 与人协作的几篇论文，和一本讲城市的书。"],
      ["在做", "把这个小站做得对人和 AI 都更友好，部署在 GitHub Pages。"],
      ["在想", "如果每个人都有一个称职的 AI 助手，什么会变得更平等？"],
    ],
    en: [
      ["Reading", "A few papers on human–agent collaboration, and a book about cities."],
      ["Building", "Making this site friendlier to people and AI alike, hosted on GitHub Pages."],
      ["Thinking", "If everyone had a capable AI assistant, what becomes more equal?"],
    ],
  },
};
