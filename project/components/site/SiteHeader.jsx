import React from "react";
import { Wordmark } from "../brand/Wordmark.jsx";
import { LangToggle } from "./LangToggle.jsx";

/**
 * The site's top bar: wordmark on the left, nav + language / theme
 * controls on the right. Sticky, with a hairline that appears on scroll.
 */
export function SiteHeader({
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
    zh: [
      { label: "文章", href: "#/writing" },
      { label: "关于", href: "#/about" },
      { label: "此刻", href: "#/now" },
    ],
    en: [
      { label: "Writing", href: "#/writing" },
      { label: "About", href: "#/about" },
      { label: "Now", href: "#/now" },
    ],
  };
  const items = nav || defaultNav[lang] || defaultNav.zh;

  return (
    <header
      className={["db-header", className].filter(Boolean).join(" ")}
      data-sticky={sticky ? "true" : undefined}
      {...rest}
    >
      <div className="db-header__inner db-container">
        <a className="db-header__brand" href="#/" aria-label="呆鸟小筑 · dull-bird">
          <Wordmark lang={lang} size={19} markVariant="line" />
        </a>

        <nav className="db-header__nav" aria-label="Primary">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="db-header__link"
              data-active={active === it.href ? "true" : undefined}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="db-header__actions">
          <LangToggle value={lang} onChange={onLangChange} />
          <button
            type="button"
            className="db-header__theme"
            onClick={onThemeToggle}
            aria-label={theme === "dark" ? "切换到浅色 · Light" : "切换到深色 · Dark"}
            title={theme === "dark" ? "Light" : "Dark"}
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>
      </div>
    </header>
  );
}
