The mono metadata line that sits under a post title — date, reading time, and any extra bits, dot-separated. Formats the date and labels for `zh` or `en`.

```jsx
<PostMeta date="2026-06-18" readingTime={6} lang="zh" />
<PostMeta date="2026-06-18" readingTime={6} lang="en" items={["译 · AI"]} />
```

Pass extra pre-formatted strings via `items`. Keep it to three or four parts.
