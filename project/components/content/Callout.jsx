import React from "react";
import { BirdMark } from "../brand/BirdMark.jsx";

/**
 * A gentle aside for essays: a tinted panel with a bird mark and an
 * optional title. `accent` tone rides the live hue; `quiet` is neutral.
 */
export function Callout({
  tone = "accent",
  title,
  mark = true,
  children,
  className,
  ...rest
}) {
  return (
    <div
      className={["db-callout", className].filter(Boolean).join(" ")}
      data-tone={tone !== "accent" ? tone : undefined}
      {...rest}
    >
      {mark && (
        <span className="db-callout__mark" aria-hidden="true">
          <BirdMark variant="stroke" size={22} strokeWidth={5} />
        </span>
      )}
      <div className="db-callout__body">
        {title && <div className="db-callout__title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
