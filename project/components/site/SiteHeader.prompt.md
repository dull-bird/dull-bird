The site top bar: wordmark left, primary nav center-right, language + theme controls far right. Sticky by default.

```jsx
const [lang, setLang] = React.useState("zh");
const [theme, setTheme] = React.useState("light");
<SiteHeader
  lang={lang} onLangChange={setLang}
  theme={theme} onThemeToggle={() => setTheme(t => t === "dark" ? "light" : "dark")}
  active="#/writing"
/>
```

Pass `nav` to override the default 文章 / 关于 / 此刻 items. Set `active` to the current href for the accent underline. Applies `data-theme` yourself on `<html>` in response to `onThemeToggle`.
