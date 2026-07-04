import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  /** @default "default" */
  variant?: "default" | "accent" | "bare";
  /** Render as a link to a topic archive. */
  href?: string;
  /** Small glyph before the label. */
  iconLeft?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Mono topic / metadata pill. `accent` tints it with the live hue;
 * `bare` drops the chip for an inline mono label.
 *
 * @dsCard group="Components"
 */
export function Tag(props: TagProps): JSX.Element;
