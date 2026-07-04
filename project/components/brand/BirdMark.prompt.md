The dull-bird dove — the brand's core mark, one flowing line. Use it wherever the brand signs itself: header, favicon, footer, loading states.

```jsx
<BirdMark variant="line" size={44} />
<BirdMark variant="solid" size={28} color="var(--accent)" />
<BirdMark variant="stroke" size={22} strokeWidth={5} />
<BirdMark variant="line" size={80} animate />   {/* self-draws on mount */}
```

Variants: `line` (primary outline dove) · `solid` (filled, for avatars/favicons) · `stroke` (single-swoosh, best ≤24px). The mark inherits `currentColor` by default — set `color="var(--accent)"` to let it ride the shifting accent. Keep clear space around it equal to the bird's head height.
