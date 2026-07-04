---
name: dull-bird-design
description: Use this skill to generate well-branded interfaces and assets for dull-bird (呆鸟小筑) — a quiet, elegant, bilingual (中文/English) personal site for thinking about technology & AI in the open. Contains design guidelines, color/type/spacing tokens, the shifting-accent engine, the line-dove logo, and reusable UI kit components. Good for production code or throwaway prototypes/mocks/slides.
user-invocable: true
---

Read the `readme.md` file within this skill first — it is the full brand guide (content
fundamentals, visual foundations, iconography, component + file index). Then explore the
other files as needed.

## What's here
- `styles.css` — single CSS entry point; link it to inherit every token + webfont.
- `tokens/` — colors (incl. the oklch shifting accent + dark theme), typography, spacing,
  motion, effects.
- `assets/accent.js` — the signature "随机变色" engine: `dullbirdAccent.init()` makes the
  accent hue drift smoothly on hover/click.
- `components/` — React primitives (BirdMark, Wordmark, Button, TextLink, Tag, Card, Prose,
  Callout, PostMeta, SiteHeader, SiteFooter, LangToggle). Each has a `.prompt.md` with a
  usage snippet.
- `foundations/` — visual specimen cards.
- `ui_kits/personal-site/` — a full interactive bilingual site (home, blog index, article,
  about/now, and an AI-agent-friendly machine view) you can copy and adapt.

## How to use
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets you need and
  produce static HTML files for the user to view. Link `styles.css`, load `_ds_bundle.js`,
  and mount components from `window.DullBirdDesignSystem_6473ec`. Wire `assets/accent.js`
  for the shifting accent.
- **Production code:** copy assets and follow the rules in `readme.md` to design fluently in
  the brand. Keep Chinese primary, English AI-translated-and-labelled, no emoji, warm paper
  base, serif for reading, and the one shifting accent.

## Non-negotiables (the brand in one breath)
Quiet + elegant + whitespace. Warm paper, warm ink. ONE accent, hue always drifting. Serif
for reading, sans for UI, mono for meta/agents. The line-dove is the only icon. No emoji, no
gradients, no imagery. Motion is smooth and organic — never bouncy. Friendly to people **and**
AI agents. 笨鸟先飞.

If the user invokes this skill without other guidance, ask what they want to build, ask a few
focused questions, then act as an expert designer who outputs HTML artifacts *or* production
code depending on the need.
