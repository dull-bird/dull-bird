/* @ds-bundle: {"format":4,"namespace":"DullBirdDesignSystem_6473ec","components":[{"name":"BirdMark","sourcePath":"components/brand/BirdMark.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Callout","sourcePath":"components/content/Callout.jsx"},{"name":"PostMeta","sourcePath":"components/content/PostMeta.jsx"},{"name":"Prose","sourcePath":"components/content/Prose.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"LangToggle","sourcePath":"components/site/LangToggle.jsx"},{"name":"SiteFooter","sourcePath":"components/site/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/site/SiteHeader.jsx"}],"sourceHashes":{"assets/accent.js":"97cdef8e20ab","components/brand/BirdMark.jsx":"a46db7fe664f","components/brand/Wordmark.jsx":"67c987f7166e","components/content/Callout.jsx":"f3aab9f452e2","components/content/PostMeta.jsx":"8a1da42d9183","components/content/Prose.jsx":"b3c545190865","components/core/Button.jsx":"9ff502910284","components/core/Card.jsx":"1208d45a0bda","components/core/Tag.jsx":"0e45eef5eb34","components/core/TextLink.jsx":"52c7b0bd022b","components/site/LangToggle.jsx":"664276a23c02","components/site/SiteFooter.jsx":"f0caf552006c","components/site/SiteHeader.jsx":"a5cc2e57517c","ui_kits/personal-site/About.jsx":"0e0a4fe66a8c","ui_kits/personal-site/AgentView.jsx":"9321a64cbd5b","ui_kits/personal-site/Article.jsx":"e3a6f412817c","ui_kits/personal-site/Home.jsx":"7cd043dd6a74","ui_kits/personal-site/Writing.jsx":"78c80d2a7f15","ui_kits/personal-site/data.js":"acb3b9b4fb82"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DullBirdDesignSystem_6473ec = window.DullBirdDesignSystem_6473ec || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/accent.js
try { (() => {
/* ============================================================
   dull-bird 呆鸟小筑 — Accent engine
   The signature "random变色": the accent HUE shifts smoothly on
   interaction. Because --accent-h is a registered @property, the
   change animates on its own — we just set a new number.

   Usage:
     <script src="/assets/accent.js"></script>
     dullbirdAccent.init();                 // auto-wires a,button,[data-accent-shift]
     dullbirdAccent.shift();                // advance one stop
     dullbirdAccent.set(150);               // jump to a hue
   ============================================================ */
(function (global) {
  // Curated, harmonious hue stops (deg). Not fully random — a
  // considered spectrum so every state still looks intentional.
  var STOPS = [24, 68, 150, 194, 255, 322]; // coral marigold jade teal cobalt plum
  var idx = 0;
  var root = document.documentElement;
  function ensureTransition() {
    // Declare the transition once so hue changes drift smoothly.
    if (document.getElementById("db-accent-t")) return;
    var s = document.createElement("style");
    s.id = "db-accent-t";
    s.textContent = ":root{transition:--accent-h var(--dur-accent,700ms) var(--ease-organic,cubic-bezier(.22,1,.36,1));}";
    document.head.appendChild(s);
  }
  function set(hue) {
    root.style.setProperty("--accent-h", hue);
  }
  function shift() {
    idx = (idx + 1) % STOPS.length;
    set(STOPS[idx]);
    return STOPS[idx];
  }
  function random() {
    // Pick a different stop than the current one.
    var next = idx;
    while (next === idx && STOPS.length > 1) {
      next = Math.floor(Math.random() * STOPS.length);
    }
    idx = next;
    set(STOPS[idx]);
    return STOPS[idx];
  }
  function init(opts) {
    opts = opts || {};
    ensureTransition();
    var selector = opts.selector || "a, button, [data-accent-shift]";
    var mode = opts.mode || "next"; // "next" | "random"
    var doShift = mode === "random" ? random : shift;

    // Hover previews the next hue; this reads as playful but calm.
    document.addEventListener("pointerenter", function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(selector)) doShift();
    }, true);
    // A click commits a fresh hue too (touch / keyboard friendly).
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(selector)) doShift();
    });
    if (opts.startHue != null) set(opts.startHue);
    return api;
  }
  var api = {
    init: init,
    shift: shift,
    random: random,
    set: set,
    STOPS: STOPS
  };
  global.dullbirdAccent = api;
})(window);
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/accent.js", error: String((e && e.message) || e) }); }

// components/brand/BirdMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The dull-bird dove. A single flowing line — the core of the brand.
 * Three cuts of the same bird: "line" (primary), "solid" (avatars /
 * favicons), "stroke" (a minimal single-stroke swoosh for small sizes).
 */

const BIRD = {
  line: {
    vb: "0 0 120 108",
    stroke: true,
    d: "M12 60 C 22 53 34 51 44 53 C 50 41 58 33 70 33 C 66 41 66 49 70 55 C 84 41 104 39 118 47 C 104 51 92 59 86 69 C 100 69 108 73 112 83 C 98 79 82 77 68 77 C 60 77 50 73 44 65 C 32 69 20 67 12 60 Z"
  },
  solid: {
    vb: "0 0 120 108",
    stroke: false,
    d: "M12 60 C 22 53 34 51 44 53 C 50 41 58 33 70 33 C 66 41 66 49 70 55 C 84 41 104 39 118 47 C 104 51 92 59 86 69 C 100 69 108 73 112 83 C 98 79 82 77 68 77 C 60 77 50 73 44 65 C 32 69 20 67 12 60 Z"
  },
  stroke: {
    vb: "0 0 120 100",
    stroke: true,
    d: "M8 62 C 30 58 46 54 58 44 C 64 39 68 32 66 24 C 74 30 76 40 74 50 C 88 44 104 44 116 52"
  }
};
function BirdMark({
  variant = "line",
  size = 40,
  color = "currentColor",
  strokeWidth = 5,
  animate = false,
  title = "dull-bird 呆鸟",
  style,
  ...rest
}) {
  const cfg = BIRD[variant] || BIRD.line;
  const parts = cfg.vb.split(" ");
  const vbW = Number(parts[2]);
  const vbH = Number(parts[3]);
  const height = size * vbH / vbW;
  const pathStyle = animate ? {
    strokeDasharray: 640,
    strokeDashoffset: 640,
    animation: "db-draw var(--dur-draw, 1600ms) var(--ease-line, cubic-bezier(.65,.05,.36,1)) forwards"
  } : undefined;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: cfg.vb,
    width: size,
    height: height,
    role: "img",
    "aria-label": title,
    style: {
      display: "block",
      overflow: "visible",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("path", {
    d: cfg.d,
    fill: cfg.stroke ? "none" : color,
    stroke: cfg.stroke ? color : "none",
    strokeWidth: cfg.stroke ? strokeWidth : 0,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: pathStyle
  }));
}
Object.assign(__ds_scope, { BirdMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BirdMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The dull-bird wordmark lockup: the dove + the site name.
 *   zh → 呆鸟小筑   ·   en → dull-bird
 */

const NAMES = {
  zh: "呆鸟小筑",
  en: "dull-bird"
};
function Wordmark({
  lang = "zh",
  size = 22,
  showMark = true,
  markVariant = "line",
  orientation = "horizontal",
  tagline,
  style,
  ...rest
}) {
  const label = NAMES[lang] || NAMES.zh;
  const isEn = lang === "en";
  const stacked = orientation === "stacked";
  const nameStyle = {
    fontFamily: isEn ? "var(--font-sans)" : "var(--font-serif)",
    fontSize: size,
    fontWeight: isEn ? "var(--weight-medium)" : "var(--weight-medium)",
    letterSpacing: isEn ? "-0.02em" : "0.04em",
    lineHeight: 1,
    color: "var(--text-heading)",
    whiteSpace: "nowrap"
  };
  const taglineStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: Math.max(10, size * 0.42),
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    lineHeight: 1,
    marginTop: stacked ? 6 : 3
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: showMark ? Math.round(size * 0.6) : 0,
      color: "var(--text-heading)",
      ...style
    }
  }, rest), showMark && /*#__PURE__*/React.createElement(__ds_scope.BirdMark, {
    variant: markVariant,
    size: Math.round(size * 1.9)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: nameStyle
  }, label), tagline && /*#__PURE__*/React.createElement("span", {
    style: taglineStyle
  }, tagline)));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/content/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A gentle aside for essays: a tinted panel with a bird mark and an
 * optional title. `accent` tone rides the live hue; `quiet` is neutral.
 */
function Callout({
  tone = "accent",
  title,
  mark = true,
  children,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["db-callout", className].filter(Boolean).join(" "),
    "data-tone": tone !== "accent" ? tone : undefined
  }, rest), mark && /*#__PURE__*/React.createElement("span", {
    className: "db-callout__mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(__ds_scope.BirdMark, {
    variant: "stroke",
    size: 22,
    strokeWidth: 5
  })), /*#__PURE__*/React.createElement("div", {
    className: "db-callout__body"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "db-callout__title"
  }, title), /*#__PURE__*/React.createElement("div", null, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Callout.jsx", error: String((e && e.message) || e) }); }

// components/content/PostMeta.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The mono metadata line under a post title: date · reading time ·
 * optional lang badge. Dots separate the parts.
 */
function fmtDate(date, lang) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return String(date);
  if (lang === "zh") {
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function PostMeta({
  date,
  readingTime,
  lang = "zh",
  items = [],
  className,
  ...rest
}) {
  const parts = [];
  const dateText = fmtDate(date, lang);
  if (dateText) parts.push(dateText);
  if (readingTime) parts.push(lang === "zh" ? `${readingTime} 分钟` : `${readingTime} min read`);
  parts.push(...items);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["db-meta", className].filter(Boolean).join(" ")
  }, rest), parts.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    className: "db-meta__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, p))));
}
Object.assign(__ds_scope, { PostMeta });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PostMeta.jsx", error: String((e && e.message) || e) }); }

// components/content/Prose.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The reading container for long-form essays. Applies the brand's
 * prose rhythm (serif body, generous line-height, accent links) to
 * whatever HTML/JSX it wraps. Set `lang="zh"` to open up CJK leading.
 */
function Prose({
  lang = "zh",
  html,
  children,
  className,
  ...rest
}) {
  const cls = ["db-prose", className].filter(Boolean).join(" ");
  if (html != null) {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: cls,
      "data-lang": lang,
      dangerouslySetInnerHTML: {
        __html: html
      }
    }, rest));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    "data-lang": lang
  }, rest), children);
}
Object.assign(__ds_scope, { Prose });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Prose.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * The primary action. Renders a <button> by default, or an <a> when
 * `href` is set. Primary fills with the shifting accent.
 */
function Button({
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  children,
  className,
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const props = {
    className: ["db-btn", className].filter(Boolean).join(" "),
    "data-variant": variant,
    "data-size": size,
    "data-full": fullWidth ? "true" : undefined,
    "data-disabled": disabled ? "true" : undefined,
    ...rest
  };
  if (href) {
    props.href = disabled ? undefined : href;
    props["aria-disabled"] = disabled || undefined;
  } else {
    props.disabled = disabled;
    props.type = rest.type || "button";
  }
  return /*#__PURE__*/React.createElement(Tag, props, iconLeft, children != null && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A warm paper surface. Renders an <a> when `href` is set (the whole
 * card becomes a hover-lifting link), otherwise a <div>.
 */
function Card({
  href,
  flat = false,
  interactive = false,
  children,
  className,
  ...rest
}) {
  const Tag = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    className: ["db-card", className].filter(Boolean).join(" "),
    "data-flat": flat ? "true" : undefined,
    "data-interactive": interactive ? "true" : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A small topic / metadata pill in mono. Renders a <span> by default,
 * or an <a> when `href` is set (topics that link to an archive).
 */
function Tag({
  variant = "default",
  href,
  iconLeft,
  children,
  className,
  ...rest
}) {
  const Tag = href ? "a" : "span";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    className: ["db-tag", className].filter(Boolean).join(" "),
    "data-variant": variant !== "default" ? variant : undefined
  }, rest), iconLeft, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** An inline text link with the brand's animated accent underline. */
function TextLink({
  href = "#",
  muted = false,
  children,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: ["db-link", className].filter(Boolean).join(" "),
    "data-muted": muted ? "true" : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/site/LangToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The 中 / EN language switch. Controlled: pass `value` and `onChange`.
 * Purely presentational — the app decides what switching means.
 */
function LangToggle({
  value = "zh",
  onChange,
  labels = {
    zh: "中",
    en: "EN"
  },
  className,
  ...rest
}) {
  const order = ["zh", "en"];
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["db-langtoggle", className].filter(Boolean).join(" "),
    role: "group",
    "aria-label": "Language"
  }, rest), order.map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    "data-active": value === k ? "true" : undefined,
    "aria-pressed": value === k,
    onClick: () => onChange && onChange(k)
  }, labels[k])));
}
Object.assign(__ds_scope, { LangToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/LangToggle.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The site footer: a bird mark, the William Gibson line the brand is
 * built on, small nav columns, and a machine-readable hint for agents.
 */
function SiteFooter({
  lang = "zh",
  quote,
  columns,
  agentHref = "/llms.txt",
  className,
  ...rest
}) {
  const line = quote || (lang === "zh" ? "未来已来，只是分布不均。" : "The future is already here — it's just not evenly distributed.");
  const defaultCols = lang === "zh" ? [{
    title: "站内",
    links: [["文章", "#/writing"], ["关于", "#/about"], ["此刻", "#/now"]]
  }, {
    title: "订阅",
    links: [["RSS", "/feed.xml"], ["邮件", "#/subscribe"]]
  }, {
    title: "别处",
    links: [["GitHub", "#"], ["给 AI 读", agentHref]]
  }] : [{
    title: "Site",
    links: [["Writing", "#/writing"], ["About", "#/about"], ["Now", "#/now"]]
  }, {
    title: "Follow",
    links: [["RSS", "/feed.xml"], ["Email", "#/subscribe"]]
  }, {
    title: "Elsewhere",
    links: [["GitHub", "#"], ["For agents", agentHref]]
  }];
  const cols = columns || defaultCols;
  return /*#__PURE__*/React.createElement("footer", _extends({
    className: ["db-footer", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "db-footer__inner db-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-footer__brand"
  }, /*#__PURE__*/React.createElement(__ds_scope.BirdMark, {
    variant: "line",
    size: 40
  }), /*#__PURE__*/React.createElement("p", {
    className: "db-footer__quote"
  }, line), /*#__PURE__*/React.createElement("p", {
    className: "db-footer__cite"
  }, "\u2014 William Gibson")), /*#__PURE__*/React.createElement("div", {
    className: "db-footer__cols"
  }, cols.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    className: "db-footer__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-footer__coltitle db-eyebrow"
  }, col.title), col.links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: href,
    className: "db-footer__link db-link",
    "data-muted": "true"
  }, label)))))), /*#__PURE__*/React.createElement("div", {
    className: "db-footer__base db-container"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " \u5446\u9E1F\u5C0F\u7B51 \xB7 dull-bird"), /*#__PURE__*/React.createElement("span", {
    className: "db-footer__built"
  }, "\u7B28\u9E1F\u5148\u98DE \xB7 built in the open")));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The site's top bar: wordmark on the left, nav + language / theme
 * controls on the right. Sticky, with a hairline that appears on scroll.
 */
function SiteHeader({
  lang = "zh",
  onLangChange,
  nav,
  theme = "light",
  onThemeToggle,
  active,
  sticky = true,
  className,
  ...rest
}) {
  const defaultNav = {
    zh: [{
      label: "文章",
      href: "#/writing"
    }, {
      label: "关于",
      href: "#/about"
    }, {
      label: "此刻",
      href: "#/now"
    }],
    en: [{
      label: "Writing",
      href: "#/writing"
    }, {
      label: "About",
      href: "#/about"
    }, {
      label: "Now",
      href: "#/now"
    }]
  };
  const items = nav || defaultNav[lang] || defaultNav.zh;
  return /*#__PURE__*/React.createElement("header", _extends({
    className: ["db-header", className].filter(Boolean).join(" "),
    "data-sticky": sticky ? "true" : undefined
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "db-header__inner db-container"
  }, /*#__PURE__*/React.createElement("a", {
    className: "db-header__brand",
    href: "#/",
    "aria-label": "\u5446\u9E1F\u5C0F\u7B51 \xB7 dull-bird"
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    lang: lang,
    size: 19,
    markVariant: "line"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "db-header__nav",
    "aria-label": "Primary"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.href,
    href: it.href,
    className: "db-header__link",
    "data-active": active === it.href ? "true" : undefined
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    className: "db-header__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.LangToggle, {
    value: lang,
    onChange: onLangChange
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "db-header__theme",
    onClick: onThemeToggle,
    "aria-label": theme === "dark" ? "切换到浅色 · Light" : "切换到深色 · Dark",
    title: theme === "dark" ? "Light" : "Dark"
  }, theme === "dark" ? "☾" : "☀"))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/personal-site/About.jsx
try { (() => {
/* About & Now — who I am + a dated snapshot of right now. */
function About({
  lang,
  go
}) {
  const {
    BirdMark,
    Tag,
    TextLink
  } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const t = lang === "zh" ? {
    eyebrow: "关于 · About",
    title: "呆鸟是谁",
    now: "此刻",
    nowSub: "一份会过时的快照 · 更新于 2026 年 6 月",
    contact: "找到我",
    agent: "给 AI agent 读 →"
  } : {
    eyebrow: "About · 关于",
    title: "Who is dull-bird",
    now: "Now",
    nowSub: "A snapshot that will age · updated June 2026",
    contact: "Find me",
    agent: "For AI agents →"
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "db-reading",
    style: {
      paddingTop: "var(--space-9)",
      paddingBottom: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(BirdMark, {
    variant: "line",
    size: 72,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow",
    style: {
      marginBottom: 6
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-3xl)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, t.title))), /*#__PURE__*/React.createElement("div", {
    className: "db-prose",
    "data-lang": lang,
    style: {
      marginBottom: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("p", null, D.profile.bio[lang]), /*#__PURE__*/React.createElement("p", null, lang === "zh" ? "我相信技术最好的样子，是让更多人平等地用上它。所以我把学习和思考公开出来——写得不完美也没关系，先飞起来再说。" : "I believe technology is at its best when more people can use it, equally. So I keep my learning and thinking in the open — imperfect is fine, the point is to take off first.")), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      marginBottom: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-2xl)"
    }
  }, t.now), /*#__PURE__*/React.createElement("span", {
    className: "db-eyebrow"
  }, t.nowSub)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, D.now[lang].map(([label, body], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: "var(--space-5)",
      padding: "var(--space-5) 0",
      borderTop: "1px solid var(--border-hairline)",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--accent-ink)",
      flex: "0 0 84px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "var(--text-md)",
      color: "var(--text-body)",
      lineHeight: 1.6
    }
  }, body))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-5)",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "var(--space-6)",
      background: "var(--surface-well)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow",
    style: {
      marginBottom: 8
    }
  }, t.contact), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    href: "#"
  }, "GitHub"), /*#__PURE__*/React.createElement(TextLink, {
    href: "#"
  }, "Email"), /*#__PURE__*/React.createElement(TextLink, {
    href: "#"
  }, "RSS"))), /*#__PURE__*/React.createElement(TextLink, {
    onClick: () => go("#/agents"),
    style: {
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--accent-ink)"
    }
  }, t.agent)));
}
window.About = About;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/personal-site/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/personal-site/AgentView.jsx
try { (() => {
/* AgentView — the machine-readable view: a site meant to be read by
   AI agents as easily as by people. Renders an /llms.txt-style doc
   with a toggle to a JSON representation. */
function AgentView({
  lang,
  go
}) {
  const {
    BirdMark,
    Button
  } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const [fmt, setFmt] = React.useState("llms");
  const t = lang === "zh" ? {
    eyebrow: "机器可读 · For agents",
    title: "给 AI agent 的视图",
    sub: "同样的内容，为自动化读者整理。稳定链接、清晰语义、可直接抓取——主动兼容，而非被爬。"
  } : {
    eyebrow: "Machine-readable · 机器可读",
    title: "A view for AI agents",
    sub: "The same content, arranged for automated readers. Stable links, clean semantics, ready to parse — compatible by intent, not by scraping."
  };
  const llms = ["# 呆鸟小筑 · dull-bird", "> " + D.profile.bio.en, "", "## Site", "- [Writing](#/writing): essays on tech, AI, and equal access", "- [About](#/about): who dull-bird is", "- [Now](#/about): a dated snapshot of current focus", "", "## Writing", ...D.posts.map(p => `- [${p.title.en}](#/post/${p.slug}) — ${p.topic.en}, ${p.date}, ${p.reading}min`), "", "## Meta", "- feed: /feed.xml", "- llms: /llms.txt", "- languages: zh (primary), en (AI-translated)", "- license: CC BY 4.0"].join("\n");
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "呆鸟小筑 · dull-bird",
    inLanguage: ["zh", "en"],
    author: {
      "@type": "Person",
      name: "dull-bird"
    },
    description: D.profile.bio.en,
    blogPost: D.posts.map(p => ({
      "@type": "BlogPosting",
      headline: p.title.en,
      about: p.topic.en,
      datePublished: p.date,
      timeRequired: `PT${p.reading}M`,
      url: `#/post/${p.slug}`,
      translationOfWork: p.translated ? "zh" : undefined
    }))
  }, null, 2);
  const doc = fmt === "llms" ? llms : json;
  return /*#__PURE__*/React.createElement("main", {
    className: "db-container",
    style: {
      paddingTop: "var(--space-8)",
      paddingBottom: "var(--space-8)",
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-4)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(BirdMark, {
    variant: "stroke",
    size: 40,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow",
    style: {
      marginBottom: 6
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      letterSpacing: "var(--tracking-tight)",
      marginBottom: "var(--space-3)"
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "var(--text-md)",
      color: "var(--text-body)",
      lineHeight: 1.6,
      maxWidth: "60ch"
    }
  }, t.sub))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-langtoggle",
    role: "group",
    "aria-label": "Format"
  }, /*#__PURE__*/React.createElement("button", {
    "data-active": fmt === "llms" ? "true" : undefined,
    onClick: () => setFmt("llms")
  }, "llms.txt"), /*#__PURE__*/React.createElement("button", {
    "data-active": fmt === "json" ? "true" : undefined,
    onClick: () => setFmt("json")
  }, "JSON-LD")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--text-faint)"
    }
  }, fmt === "llms" ? "GET /llms.txt · 200 OK · text/markdown" : "GET / · <script type=application/ld+json>")), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      lineHeight: 1.7,
      color: "var(--text-body)",
      background: "var(--surface-well)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-6)",
      overflow: "auto",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word"
    }
  }, /*#__PURE__*/React.createElement("code", null, doc)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--text-faint)",
      marginTop: "var(--space-4)"
    }
  }, lang === "zh" ? "每个页面都带有语义 HTML 与 JSON-LD；agent 可跟随 #/ 链接抓取全文。" : "Every page ships semantic HTML + JSON-LD; agents can follow #/ links to the full text."));
}
window.AgentView = AgentView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/personal-site/AgentView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/personal-site/Article.jsx
try { (() => {
/* Article — a single essay reading view. */
function Article({
  lang,
  go,
  slug
}) {
  const {
    Prose,
    Callout,
    Tag,
    PostMeta,
    BirdMark,
    TextLink
  } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const idx = D.posts.findIndex(p => p.slug === slug);
  const post = D.posts[idx] || D.posts[0];
  const next = D.posts[(idx + 1) % D.posts.length];
  const t = lang === "zh" ? {
    back: "← 全部文章",
    trans: "本文由 AI 翻译，人工校对。",
    note: "呆鸟按",
    noteBody: "笨鸟先飞——与其等技术普及，不如现在就把想法分享出来。",
    nextUp: "下一篇"
  } : {
    back: "← All writing",
    trans: "Machine-translated, human-checked.",
    note: "dull-bird's note",
    noteBody: "The slow bird starts early — rather than wait for tech to spread, share the idea now.",
    nextUp: "Next"
  };
  const renderBlock = (b, i) => {
    if (b.t === "h2") return /*#__PURE__*/React.createElement("h2", {
      key: i
    }, b.c);
    if (b.t === "quote") return /*#__PURE__*/React.createElement("blockquote", {
      key: i
    }, b.c);
    const html = b.c.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "db-reading",
    style: {
      paddingTop: "var(--space-8)",
      paddingBottom: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    muted: true,
    onClick: () => go("#/writing"),
    style: {
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)"
    }
  }, t.back), /*#__PURE__*/React.createElement("header", {
    style: {
      margin: "var(--space-6) 0 var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "accent"
  }, post.topic[lang]), /*#__PURE__*/React.createElement(PostMeta, {
    date: post.date,
    readingTime: post.reading,
    lang: lang
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-3xl)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)",
      marginBottom: "var(--space-4)"
    }
  }, post.title[lang]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "var(--text-lg)",
      color: "var(--text-muted)",
      lineHeight: "var(--leading-snug)",
      fontStyle: "italic"
    }
  }, post.lede[lang])), post.translated && /*#__PURE__*/React.createElement(Callout, {
    tone: "quiet",
    mark: false,
    style: {
      marginBottom: "var(--space-6)"
    }
  }, t.trans), /*#__PURE__*/React.createElement(Prose, {
    lang: lang
  }, post.body[lang].map(renderBlock)), /*#__PURE__*/React.createElement(Callout, {
    title: t.note,
    style: {
      margin: "var(--space-8) 0"
    }
  }, t.noteBody), /*#__PURE__*/React.createElement("div", {
    onClick: () => go("#/post/" + next.slug),
    style: {
      cursor: "pointer",
      marginTop: "var(--space-8)",
      paddingTop: "var(--space-6)",
      borderTop: "1px solid var(--border-hairline)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(BirdMark, {
    variant: "stroke",
    size: 30,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow",
    style: {
      marginBottom: 4
    }
  }, t.nextUp), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      color: "var(--text-heading)"
    }
  }, next.title[lang]))));
}
window.Article = Article;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/personal-site/Article.jsx", error: String((e && e.message) || e) }); }

// ui_kits/personal-site/Home.jsx
try { (() => {
/* Home — the landing screen. */
function Home({
  lang,
  go
}) {
  const {
    BirdMark,
    Button,
    Tag,
    Card,
    PostMeta,
    TextLink
  } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const p = D.profile;
  const t = lang === "zh" ? {
    eyebrow: "在公开处思考 · Thinking in public",
    read: "读一读",
    about: "关于我",
    latest: "最新文章",
    all: "全部文章 →"
  } : {
    eyebrow: "Thinking in public · 在公开处思考",
    read: "Start reading",
    about: "About",
    latest: "Latest writing",
    all: "All writing →"
  };
  const posts = D.posts.slice(0, 3);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "db-container",
    style: {
      paddingTop: "var(--space-11)",
      paddingBottom: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-8)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 420px",
      minWidth: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow",
    style: {
      marginBottom: "var(--space-4)"
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-4xl)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)",
      marginBottom: "var(--space-5)"
    }
  }, lang === "zh" ? "呆鸟小筑" : "dull-bird"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "var(--text-lg)",
      lineHeight: lang === "zh" ? "var(--leading-cjk)" : "var(--leading-reading)",
      color: "var(--text-body)",
      maxWidth: "40ch",
      marginBottom: "var(--space-6)"
    }
  }, p.bio[lang]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go("#/writing")
  }, t.read), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go("#/about")
  }, t.about))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(BirdMark, {
    variant: "line",
    size: 260,
    strokeWidth: 4,
    color: "var(--accent)",
    animate: true
  })))), /*#__PURE__*/React.createElement("section", {
    className: "db-container",
    style: {
      paddingBottom: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-2xl)"
    }
  }, t.latest), /*#__PURE__*/React.createElement(TextLink, {
    muted: true,
    onClick: () => go("#/writing"),
    style: {
      cursor: "pointer"
    }
  }, t.all)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "var(--space-5)"
    }
  }, posts.map(post => /*#__PURE__*/React.createElement(Card, {
    key: post.slug,
    onClick: () => go("#/post/" + post.slug),
    style: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "accent"
  }, post.topic[lang]), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-xl)",
      lineHeight: "var(--leading-snug)"
    }
  }, post.title[lang]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-reading)",
      color: "var(--text-body)",
      fontSize: "var(--text-base)",
      lineHeight: 1.6,
      margin: 0
    }
  }, post.lede[lang]), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(PostMeta, {
    date: post.date,
    readingTime: post.reading,
    lang: lang
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-well)",
      borderTop: "1px solid var(--border-hairline)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-reading",
    style: {
      paddingTop: "var(--space-9)",
      paddingBottom: "var(--space-9)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(BirdMark, {
    variant: "stroke",
    size: 40,
    color: "var(--accent)",
    style: {
      margin: "0 auto var(--space-5)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-heading)",
      marginBottom: "var(--space-3)"
    }
  }, lang === "zh" ? "未来已来，只是分布不均。" : "The future is already here — it's just not evenly distributed."), /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow"
  }, "William Gibson"))));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/personal-site/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/personal-site/Writing.jsx
try { (() => {
/* Writing — the essay index. */
function Writing({
  lang,
  go
}) {
  const {
    Tag,
    PostMeta,
    TextLink
  } = window.DullBirdDesignSystem_6473ec;
  const D = window.DB_DATA;
  const [topic, setTopic] = React.useState("all");
  const t = lang === "zh" ? {
    eyebrow: "文章 · Writing",
    title: "在公开处思考",
    sub: "关于技术、AI，以及如何让它们更平等地被享受。",
    all: "全部"
  } : {
    eyebrow: "Writing · 文章",
    title: "Thinking in public",
    sub: "On technology, AI, and making them more evenly enjoyed.",
    all: "All"
  };
  const topics = ["all", ...Array.from(new Set(D.posts.map(p => p.topic.en)))];
  const topicLabel = en => {
    if (en === "all") return t.all;
    const p = D.posts.find(x => x.topic.en === en);
    return p ? p.topic[lang] : en;
  };
  const posts = topic === "all" ? D.posts : D.posts.filter(p => p.topic.en === topic);
  return /*#__PURE__*/React.createElement("main", {
    className: "db-reading",
    style: {
      paddingTop: "var(--space-9)",
      paddingBottom: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "db-eyebrow",
    style: {
      marginBottom: "var(--space-3)"
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-3xl)",
      letterSpacing: "var(--tracking-tight)",
      marginBottom: "var(--space-3)"
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "var(--text-md)",
      color: "var(--text-body)",
      marginBottom: "var(--space-6)"
    }
  }, t.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap",
      marginBottom: "var(--space-7)"
    }
  }, topics.map(en => /*#__PURE__*/React.createElement("button", {
    key: en,
    onClick: () => setTopic(en),
    className: "db-tag",
    "data-variant": topic === en ? "accent" : undefined,
    style: {
      cursor: "pointer"
    }
  }, topicLabel(en)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, posts.map((post, i) => /*#__PURE__*/React.createElement("article", {
    key: post.slug,
    onClick: () => go("#/post/" + post.slug),
    style: {
      cursor: "pointer",
      padding: "var(--space-6) 0",
      borderTop: i === 0 ? "none" : "1px solid var(--border-hairline)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "accent"
  }, post.topic[lang]), /*#__PURE__*/React.createElement(PostMeta, {
    date: post.date,
    readingTime: post.reading,
    lang: lang,
    items: post.translated ? [lang === "zh" ? "译 AI" : "AI-tr"] : []
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-xl)",
      lineHeight: "var(--leading-snug)"
    }
  }, post.title[lang]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-reading)",
      fontSize: "var(--text-base)",
      color: "var(--text-body)",
      lineHeight: 1.6,
      margin: 0,
      maxWidth: "56ch"
    }
  }, post.lede[lang])))));
}
window.Writing = Writing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/personal-site/Writing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/personal-site/data.js
try { (() => {
/* dull-bird 呆鸟小筑 — sample content for the UI kit.
   Bilingual: each post carries zh + en. Content is illustrative. */
window.DB_DATA = {
  profile: {
    zh: {
      name: "呆鸟小筑",
      handle: "dull-bird",
      role: "在公开处思考技术与 AI"
    },
    en: {
      name: "dull-bird",
      handle: "dull-bird",
      role: "thinking about tech & AI, in the open"
    },
    bio: {
      zh: "呆鸟是我的外号。笨鸟先飞，所以我想主动把一些关于新技术、尤其是 AI 的想法分享出来。我的理念很简单：让更多人能更平等地享受技术。",
      en: "\u201Cdull-bird\u201D is a nickname of mine. The slow bird starts early — so I share my thinking about new technology, especially AI, out in the open. My belief is simple: help more people enjoy technology, more equally."
    }
  },
  posts: [{
    slug: "uneven-future",
    topic: {
      zh: "未来",
      en: "the future"
    },
    date: "2026-06-18",
    reading: 6,
    translated: true,
    title: {
      zh: "未来已来，只是分布不均",
      en: "The future is here, unevenly"
    },
    lede: {
      zh: "Gibson 那句话被引用太多次了。但每次真正用上一个新工具，我都更相信它——差距不在时间，在于谁先伸手。",
      en: "Gibson's line is over-quoted. But every time I actually pick up a new tool, I believe it more — the gap isn't time, it's who reaches first."
    },
    body: {
      zh: [{
        t: "p",
        c: "未来已经到来，只是分布不均。这句话我以前当金句读，直到我开始每天用 AI 写代码、读论文、翻译文章。"
      }, {
        t: "h2",
        c: "差距不在时间"
      }, {
        t: "p",
        c: "同一个模型，有人用它十分钟就搭好了原型，有人还在纠结要不要注册。技术是公开的，但**伸手的意愿**不是。"
      }, {
        t: "quote",
        c: "The future is already here — it's just not evenly distributed."
      }, {
        t: "p",
        c: "笨鸟先飞。与其等技术自然普及，不如现在就把用法、把想法、把踩过的坑分享出来。"
      }, {
        t: "h2",
        c: "所以我做了这个小站"
      }, {
        t: "p",
        c: "它对人友好，也对 AI agent 友好——结构清晰、语义明确、附带机器可读的视图。你可以读，你的 agent 也可以读。"
      }],
      en: [{
        t: "p",
        c: "The future is already here, just unevenly distributed. I read that as a nice quote — until I started using AI every day to write code, read papers, translate essays."
      }, {
        t: "h2",
        c: "The gap isn't time"
      }, {
        t: "p",
        c: "Same model: one person ships a prototype in ten minutes, another is still deciding whether to sign up. The tech is public; the **willingness to reach** is not."
      }, {
        t: "quote",
        c: "The future is already here — it's just not evenly distributed."
      }, {
        t: "p",
        c: "The slow bird starts early. Rather than wait for tech to spread, share the uses, the ideas, the potholes now."
      }, {
        t: "h2",
        c: "So I built this little place"
      }, {
        t: "p",
        c: "Friendly to people, and friendly to AI agents — clean structure, clear semantics, a machine-readable view alongside. You can read it; so can your agent."
      }]
    }
  }, {
    slug: "slow-bird",
    topic: {
      zh: "方法",
      en: "method"
    },
    date: "2026-05-30",
    reading: 4,
    translated: true,
    title: {
      zh: "笨鸟先飞：把学习过程公开",
      en: "Slow bird: learning in public"
    },
    lede: {
      zh: "我不是最快的那只，但我可以是先起飞的那只。公开地笨拙，比私下地完美更有用。",
      en: "I'm not the fastest bird, but I can be the one that starts early. Publicly clumsy beats privately perfect."
    },
    body: {
      zh: [{
        t: "p",
        c: "把半成品的想法写下来，是一件需要勇气的事。但正是这些半成品，最能引出别人的补充。"
      }, {
        t: "p",
        c: "我给自己定了一条规矩：**想清楚 60% 就可以发**。剩下的 40%，交给读者和时间。"
      }],
      en: [{
        t: "p",
        c: "Writing down half-formed ideas takes nerve. But it's exactly the half-formed ones that invite others to finish the thought."
      }, {
        t: "p",
        c: "My rule: **60% clear is enough to publish**. The other 40% belongs to readers and to time."
      }]
    }
  }, {
    slug: "agent-friendly-web",
    topic: {
      zh: "AI agents",
      en: "AI agents"
    },
    date: "2026-05-11",
    reading: 7,
    translated: false,
    title: {
      zh: "为 agent 而写的网页",
      en: "Writing web pages for agents"
    },
    lede: {
      zh: "如果一个 AI agent 来读我的网站，它能顺利拿到它要的东西吗？我把这当成一条新的可访问性标准。",
      en: "If an AI agent visits my site, can it get what it needs? I treat this as a new axis of accessibility."
    },
    body: {
      zh: [{
        t: "p",
        c: "无障碍设计曾经是为屏幕阅读器。现在，读者名单里多了一类：自动化的 agent。"
      }, {
        t: "p",
        c: "我的做法：干净的语义 HTML、稳定的链接、一份 `/llms.txt`、以及一个结构化的机器视图。主动兼容，而不是被抓取。"
      }],
      en: [{
        t: "p",
        c: "Accessibility used to mean screen readers. Now the audience includes automated agents."
      }, {
        t: "p",
        c: "My approach: clean semantic HTML, stable links, an `/llms.txt`, and a structured machine view. Compatible by intent, not by scraping."
      }]
    }
  }, {
    slug: "tools-2026",
    topic: {
      zh: "工具",
      en: "tools"
    },
    date: "2026-04-02",
    reading: 3,
    translated: true,
    title: {
      zh: "此刻我在用的工具",
      en: "Tools I'm using now"
    },
    lede: {
      zh: "一份会过时的清单。正因为会过时，才值得记录——它是我此刻的切片。",
      en: "A list that will age. Which is exactly why it's worth keeping — a slice of right now."
    },
    body: {
      zh: [{
        t: "p",
        c: "清单略。重点不是工具本身，而是换工具的速度。"
      }],
      en: [{
        t: "p",
        c: "List omitted. The point isn't the tools; it's how fast I swap them."
      }]
    }
  }],
  now: {
    zh: [["在读", "关于 agent 与人协作的几篇论文，和一本讲城市的书。"], ["在做", "把这个小站做得对人和 AI 都更友好，部署在 GitHub Pages。"], ["在想", "如果每个人都有一个称职的 AI 助手，什么会变得更平等？"]],
    en: [["Reading", "A few papers on human–agent collaboration, and a book about cities."], ["Building", "Making this site friendlier to people and AI alike, hosted on GitHub Pages."], ["Thinking", "If everyone had a capable AI assistant, what becomes more equal?"]]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/personal-site/data.js", error: String((e && e.message) || e) }); }

__ds_ns.BirdMark = __ds_scope.BirdMark;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.PostMeta = __ds_scope.PostMeta;

__ds_ns.Prose = __ds_scope.Prose;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.LangToggle = __ds_scope.LangToggle;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
