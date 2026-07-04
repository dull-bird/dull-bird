import React from "react";

/**
 * A warm paper surface. Renders an <a> when `href` is set (the whole
 * card becomes a hover-lifting link), otherwise a <div>.
 */
export function Card({
  href,
  flat = false,
  interactive = false,
  children,
  className,
  ...rest
}) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className={["db-card", className].filter(Boolean).join(" ")}
      data-flat={flat ? "true" : undefined}
      data-interactive={interactive ? "true" : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
