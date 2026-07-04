The 中 / EN language switch for the bilingual site. Controlled — pass `value` and `onChange`; it renders the active state but leaves the actual content swap to the app.

```jsx
const [lang, setLang] = React.useState("zh");
<LangToggle value={lang} onChange={setLang} />
```

Sits in the header, usually next to the theme toggle. Presentational only.
