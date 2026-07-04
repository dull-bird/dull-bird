# 呆鸟小筑 · dull-bird

The real implementation of the [dull-bird design system](../project/readme.md) —
a quiet, bilingual (中文 · English) personal site about technology and AI, built
with [Astro](https://astro.build) for static hosting on GitHub Pages.

## Stack

- **Astro** — static by default. Every page ships as plain HTML/CSS; the only
  client JS is a handful of small, non-blocking scripts (theme toggle, the
  accent-hue engine, the writing-index topic filter, the agent-view format
  switch). None of it is required to read the site.
- **Content collections** (`src/content/posts/{zh,en}/*.md`) — one Markdown
  file per post per language, paired by a shared `postSlug` frontmatter field.
- **Astro's built-in i18n routing** — 中文 lives at the root (`/`), English is
  prefixed (`/en/`).
- Styling is the design system's own CSS **as-is** (`src/styles/`, ported
  verbatim from `../project/tokens/` and `../project/components/components.css`)
  — no Tailwind, no re-authoring of values.

## Structure

```
src/
  content.config.ts       content collection schema
  content/posts/{zh,en}/  bilingual Markdown posts (paired by postSlug)
  data/site.ts            profile bio + "now" entries (not per-post content)
  styles/                 ported tokens + component CSS (global.css is the entry point)
  scripts/                small vanilla-JS islands (accent, theme, filters)
  components/             brand/ core/ content/ site/ — ported 1:1 from the design system
  layouts/BaseLayout.astro
  lib/                    routes.ts, posts.ts, base.ts, agentDoc.ts helpers
  pages/                  zh pages at root, en/ mirrors them, plus feed.xml.ts + llms.txt.ts
```

## Development

```sh
npm install
npm run dev       # http://localhost:4321/
npm run build     # -> dist/
npm run preview
```

## Deploying

`.github/workflows/deploy.yml` (at the **repo root**, one level up) builds and
publishes `dist/` to GitHub Pages on every push to `main`. Enable Pages →
"GitHub Actions" as the source in the repo settings once this is pushed.

## Known placeholders — please replace

- **Contact links**: the GitHub/Email links in the footer and About page are
  placeholders (`https://github.com/dull-bird`, `#`) — swap in your real
  profile and email.
- **Fonts**: still the Google Fonts substitutes noted in the design system's
  readme (Newsreader / Hanken Grotesk / IBM Plex Mono / Noto Serif+Sans SC) —
  swap `src/styles/fonts.css` if you license bespoke faces.

## Content model notes (a deliberate departure from the design prototype)

The Claude Design prototype stored each post as one JS object with both
languages inline and a single `translated` flag shown on *both* language
versions. Two changes made for the real site:

- Each language is its own Markdown file (`content/posts/zh/x.md` +
  `content/posts/en/x.md`), so posts are actually editable as prose, not JS
  block arrays.
- The "machine-translated, human-checked" notice only renders on the **English**
  article (since English actual is the translation of the Chinese original) —
  the prototype showed it on both.
