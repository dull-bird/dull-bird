The reading container for essays. Wrap article HTML/JSX in it to get the brand's serif prose rhythm, accent links, blockquotes, code blocks, and CJK-aware line-height. Constrained to the reading measure.

```jsx
<Prose lang="zh">
  <p>未来已经到来，只是分布不均。</p>
  <h2>笨鸟先飞</h2>
  <p>与其……</p>
  <blockquote>The future is already here.</blockquote>
</Prose>

<Prose lang="en" html={renderedMarkdown} />
```

Pass rendered markdown as an HTML string via `html`, or nest JSX as children. Set `lang` to match the text so Chinese gets its wider leading.
