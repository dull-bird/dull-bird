import React from "react";

/**
 * The primary action. Renders a <button> by default, or an <a> when
 * `href` is set. Primary fills with the shifting accent.
 */
export function Button({
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
    ...rest,
  };
  if (href) {
    props.href = disabled ? undefined : href;
    props["aria-disabled"] = disabled || undefined;
  } else {
    props.disabled = disabled;
    props.type = rest.type || "button";
  }
  return (
    <Tag {...props}>
      {iconLeft}
      {children != null && <span>{children}</span>}
      {iconRight}
    </Tag>
  );
}
