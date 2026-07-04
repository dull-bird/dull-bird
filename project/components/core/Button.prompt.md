A rounded pill button. Use `primary` for the single main action on a view, `secondary` for alternatives, `ghost` for low-emphasis actions. Set `href` to render a link.

```jsx
<Button>读一读 · Read</Button>
<Button variant="secondary" href="/about">关于</Button>
<Button variant="ghost" size="sm">取消</Button>
<Button variant="primary" iconRight={<BirdMark variant="stroke" size={18} color="currentColor" />}>
  订阅 · Follow
</Button>
```

Sizes `sm | md | lg`. The primary fill is `var(--accent)`, so it shifts hue with the rest of the page. Keep one primary per view.
