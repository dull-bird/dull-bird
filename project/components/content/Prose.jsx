import React from "react";

/**
 * The reading container for long-form essays. Applies the brand's
 * prose rhythm (serif body, generous line-height, accent links) to
 * whatever HTML/JSX it wraps. Set `lang="zh"` to open up CJK leading.
 */
export function Prose({ lang = "zh", html, children, className, ...rest }) {
  const cls = ["db-prose", className].filter(Boolean).join(" ");
  if (html != null) {
    return (
      <div
        className={cls}
        data-lang={lang}
        dangerouslySetInnerHTML={{ __html: html }}
        {...rest}
      />
    );
  }
  return (
    <div className={cls} data-lang={lang} {...rest}>
      {children}
    </div>
  );
}
