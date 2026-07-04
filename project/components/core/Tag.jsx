import React from "react";

/**
 * A small topic / metadata pill in mono. Renders a <span> by default,
 * or an <a> when `href` is set (topics that link to an archive).
 */
export function Tag({
  variant = "default",
  href,
  iconLeft,
  children,
  className,
  ...rest
}) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      href={href}
      className={["db-tag", className].filter(Boolean).join(" ")}
      data-variant={variant !== "default" ? variant : undefined}
      {...rest}
    >
      {iconLeft}
      {children}
    </Tag>
  );
}
