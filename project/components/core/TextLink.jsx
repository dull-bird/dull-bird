import React from "react";

/** An inline text link with the brand's animated accent underline. */
export function TextLink({ href = "#", muted = false, children, className, ...rest }) {
  return (
    <a
      href={href}
      className={["db-link", className].filter(Boolean).join(" ")}
      data-muted={muted ? "true" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
