The site's signature lockup — the dove plus the name. Use in the header, footer, and anywhere the brand signs off.

```jsx
<Wordmark lang="zh" size={22} />
<Wordmark lang="en" size={20} tagline="笨鸟先飞" />
<Wordmark lang="zh" orientation="stacked" size={30} tagline="dull-bird" />
<Wordmark showMark={false} lang="en" />
```

`lang="zh"` renders 呆鸟小筑 in serif; `lang="en"` renders `dull-bird` in lowercase sans. The mark scales from `size`. Optional `tagline` sets a small mono caps line (e.g. 笨鸟先飞 / the future is already here). Prefer the horizontal lockup in navigation; stacked for hero or splash.
