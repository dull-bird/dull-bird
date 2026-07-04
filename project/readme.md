# 呆鸟小筑 · dull-bird — Design System

A design system for **dull-bird (呆鸟)** — a personal website for thinking about
technology and AI *in the open*. Quiet, elegant, whitespace-forward, bilingual
(中文优先 · English via AI translation), and friendly to both **people and AI agents**.

> 未来已来，只是分布不均。
> The future is already here — it's just not evenly distributed. — *William Gibson*

The brand's north star: **让技术能被更平等地享受** — help more people enjoy technology,
more equally. "呆鸟" (dull-bird) is the owner's nickname; **笨鸟先飞** (the slow bird
starts early) is the working ethos — share early, share often, in public.

## Sources

Built from scratch from the owner's brief — **no external codebase, Figma, or brand
files were provided.** Direction was set via a questions round:

- **Name:** 呆鸟小筑 (zh) · *dull-bird* (en). Bilingual, language-switchable.
- **Mood:** quiet, elegant, lots of whitespace; a touch playful (呆 = a little silly/cute).
- **Signature tech:** *随机变色* — a single accent color whose **hue shifts smoothly on
  interaction** (hover / click), implemented with a registered `@property`.
- **Logo:** a **line-drawn dove** in the spirit of Apple's "hello" single-line script and
  Picasso's peace dove — abstract, round, flowing.
- **Surfaces:** homepage, blog index + article, about / now, and an **AI-agent-friendly
  machine-readable view** (llms.txt + JSON-LD).
- **Hosting:** GitHub Pages (static, CDN fonts).

Everything visual here is original to this system.

---

## Content fundamentals

How dull-bird writes. Copy is the product — get this right first.

- **Voice:** first person, warm, unpretentious, reflective. "我" freely; addresses the
  reader as "你" occasionally, never salesy. Thinks out loud; comfortable being 60% sure.
- **Bilingual:** **Chinese is primary** (the owner writes in 中文); English versions are
  **AI-translated, human-checked** and labelled as such (译 · AI / "AI-tr"). Never pretend
  a translation is an original.
- **Tone:** calm and plainspoken, with the occasional wry, self-deprecating turn (呆鸟 /
  笨鸟). Earnest about the mission (equal access to tech), light about itself.
- **Casing:** English is **sentence case** everywhere, including the wordmark (`dull-bird`,
  lowercase, hyphenated). MONO CAPS are reserved for eyebrows/labels only.
- **Signature lines:** the Gibson quote; **笨鸟先飞**; **未来已来，只是分布不均**;
  **让技术更平等地被享受**. Use them as anchors, not decoration.
- **Punctuation:** Chinese uses full-width punctuation（，。「」）and em-dashes (——).
  English uses en/em dashes for asides.
- **Emoji:** **none.** The brand's warmth comes from type, the bird, and the shifting
  color — not from emoji. (See Iconography.)
- **Examples of the vibe:**
  - Title: 「未来已来，只是分布不均」 / "The future is here, unevenly"
  - Callout ("呆鸟按"): 「笨鸟先飞——与其等技术普及，不如现在就把想法分享出来。」
  - Meta line: `2026-06-18 · 6 分钟 · 译 AI`
  - Now entry: `在想 — 如果每个人都有一个称职的 AI 助手，什么会变得更平等？`

---

## Visual foundations

- **Base canvas:** warm paper, not pure white. `--paper #fbfaf7`, cards `#ffffff`,
  wells `#f2f0ea`. A warm near-black ink ramp (`--ink #1b1a18` → `--ink-faint #b7b1a5`).
  A full **warm dark theme** (`[data-theme="dark"]`) mirrors every surface.
- **The accent — the one special move.** A *single* accent color defined in **oklch**
  with an **animated hue** (`--accent-h`, a registered `@property`). It drifts smoothly
  between six curated stops on interaction: **coral 24 · marigold 68 · jade 150 ·
  teal 194 · cobalt 255 · plum 322**, all at fixed lightness/chroma so every state looks
  intentional (never a random clash). Driven by `assets/accent.js` →
  `dullbirdAccent.init()`. This is the brand's "随机变色".
- **Type:** a three-voice system — **Newsreader** (literary serif) for display **and**
  reading; **Hanken Grotesk** (warm humanist sans) for UI; **IBM Plex Mono** for code,
  metadata, and the agent view. Each stack falls back to **Noto Serif SC / Noto Sans SC**
  for Chinese. Serif-led is deliberate: this is a writer's site.
- **Type scale:** 12 → 88px. Headings are **regular-weight serif** (not bold) with tight
  tracking; body is 18px serif. **CJK gets extra leading** (`--leading-cjk 1.9` vs Latin
  `--leading-reading 1.72`) because Chinese needs more air.
- **Spacing:** 4px base, opening into generous editorial gaps (`--gap-section 96px`,
  `--gap-block 160px`). Layout frame: `--page-max 1160`, `--reading-max 680`, fluid
  `--gutter clamp(20px, 5vw, 64px)`.
- **Backgrounds:** flat warm paper. **No photographic imagery, no gradients, no textures,
  no patterns.** The only "image" is the line-bird. Section changes are signalled by a
  single well-tinted band (`--surface-well`) with hairline borders — nothing more.
- **Borders & elevation:** elevation is expressed by **whitespace + a single hairline**
  (`--line #e6e2d9`), not shadow. Soft warm shadows exist (`--shadow-xs…lg`, ink at very
  low alpha) but are **reserved for genuinely floating things** and hover lift only.
- **Corners:** soft and rounded, echoing the fluid bird — `xs 4 · sm 8 · md 12 · lg 18 ·
  xl 28 · 2xl 40 · pill`. Buttons and tags are **pills**; cards are `lg (18px)`.
- **Cards:** warm raised surface, 1px hairline, `lg` radius, `--space-6` padding, no shadow
  at rest; on hover they lift 2px with `--shadow-md` and an accent-tinted border.
- **Motion:** smooth, flowing, **organic** — `--ease-organic cubic-bezier(.22,1,.36,1)`,
  no bounces or overshoots. The bird can **self-draw** its stroke on mount
  (`--dur-draw 1600ms`, `--ease-line`). Content rises gently in (`db-rise`). Hue drifts
  over `--dur-accent 700ms`. All motion respects `prefers-reduced-motion`.
- **States:** *hover* → color shifts toward the accent + subtle 1–2px lift; *press* →
  settle back to 0 with a smaller shadow (no shrink). Links grow a 1px→2px accent
  underline. Focus is a soft 3px accent-soft ring (`--ring`).
- **Transparency / blur:** used only on the sticky header — a `backdrop-filter: blur`
  over a translucent paper, with a hairline that appears on scroll. Nowhere else.
- **Imagery color vibe:** N/A — the system is imagery-free by design. If photos are ever
  added, keep them warm and quiet to match the paper.

---

## Iconography

- **Emoji: not used.** Ever. The brand voice is warm through type and the bird, not emoji.
- **The bird is the only "icon" that matters.** `BirdMark` ships three cuts — `line`
  (primary outline dove), `solid` (filled, for avatars/favicons), `stroke` (a single
  swoosh for ≤24px and inline marks, e.g. inside `Callout`). It's an inline SVG that
  inherits `currentColor`, so it can ride the shifting accent.
- **UI glyphs are minimal and unicode-based**, in keeping with the quiet aesthetic: the
  theme toggle uses `☀ / ☾`; metadata uses mono middots (`·`) and a tiny dot separator.
  There is **no icon font and no icon set** — the design deliberately avoids UI chrome.
- **If an icon set is ever needed** (it shouldn't be for a personal site), reach for
  **Lucide** (via CDN) — its thin, round-capped stroke matches the bird. Flag any such
  addition here. *None is currently used.*

---

## Components

Reusable React primitives (`window.DullBirdDesignSystem_6473ec.<Name>`). All styling flows
from CSS custom properties in `components/components.css`.

**Brand** — `components/brand/`
- **BirdMark** — the line-dove mark; variants `line · solid · stroke`, optional self-draw.
- **Wordmark** — dove + name lockup (呆鸟小筑 / dull-bird), horizontal or stacked.

**Core** — `components/core/`
- **Button** — pill button; `primary` (rides the accent) · `secondary` · `ghost`; 3 sizes.
- **TextLink** — inline link with the animated accent underline.
- **Tag** — mono topic/metadata pill; `default · accent · bare`.
- **Card** — warm paper surface (hairline, soft radius); optional link + hover lift.

**Content** — `components/content/`
- **Prose** — long-form reading container; serif body, accent links, CJK-aware leading.
- **Callout** — bird-marked aside for essays; `accent · quiet` tones.
- **PostMeta** — mono metadata line (date · reading time · …), zh/en formatting.

**Site** — `components/site/`
- **SiteHeader** — sticky top bar: wordmark, nav, language + theme controls.
- **SiteFooter** — bird mark, the Gibson line, nav columns, "for agents" link.
- **LangToggle** — the 中 / EN switch.

*Intentional additions:* none beyond what the brief implies — every component maps to a
surface the site actually needs (writer's site + agent view).

---

## Index / manifest

Root files:
- **`styles.css`** — the single entry point consumers link (import list only).
- **`fonts/fonts.css`** — Google Fonts `@import` (Newsreader, Hanken Grotesk, IBM Plex
  Mono, Noto Serif/Sans SC). **Substitution note below.**
- **`tokens/`** — `colors · typography · spacing · motion · effects · base` CSS.
- **`assets/accent.js`** — the accent-hue engine (`dullbirdAccent.init/shift/set`).
- **`components/`** — `brand/ · core/ · content/ · site/` (`.jsx` + `.d.ts` + `.prompt.md`
  + one `@dsCard` per dir).
- **`foundations/`** — specimen cards for the Design System tab (Colors, Type, Spacing,
  Motion, Effects, Brand).
- **`ui_kits/personal-site/`** — the full interactive site: `index.html` + `data.js` +
  `Home / Writing / Article / About / AgentView` screens.
- **`SKILL.md`** — Agent-Skills-compatible entry for downloading/using this system.

### Font substitution — action needed

No bespoke brand fonts were provided, so the system uses **Google Fonts** (free, works on
GitHub Pages): **Newsreader**, **Hanken Grotesk**, **IBM Plex Mono**, and **Noto Serif/Sans
SC** for Chinese. These are curated matches for the intended feel, **not** a licensed brand
face. Swap the `@import` in `fonts/fonts.css` and the families in `tokens/typography.css` if
you license something bespoke. → *If you have preferred faces, send them and I'll wire them
in.*
