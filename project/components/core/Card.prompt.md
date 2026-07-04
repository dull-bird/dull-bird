A soft-cornered paper surface with a hairline border — the default container for post previews and grouped content. Set `href` to make the whole card a hover-lifting link.

```jsx
<Card href="/posts/uneven-future">
  <Tag variant="accent">the future</Tag>
  <h3>未来已来，只是分布不均</h3>
  <PostMeta date="2026-06-18" readingTime={6} />
</Card>

<Card flat>{/* bare group, no chrome */}</Card>
```

Elevation is a hairline + whitespace; shadow appears only on hover. Use `flat` to group content without visible chrome, `interactive` for a non-link card that should still lift.
