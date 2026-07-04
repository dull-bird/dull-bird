import React from "react";

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
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function PostMeta({
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

  return (
    <span className={["db-meta", className].filter(Boolean).join(" ")} {...rest}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="db-meta__dot" aria-hidden="true" />}
          <span>{p}</span>
        </React.Fragment>
      ))}
    </span>
  );
}
