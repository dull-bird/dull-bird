import React from "react";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "accent" */
  tone?: "accent" | "quiet";
  /** Bold lead line above the body. */
  title?: React.ReactNode;
  /** Show the bird stroke mark. @default true */
  mark?: boolean;
  children?: React.ReactNode;
}

/**
 * A tinted aside for essays, marked with the bird stroke.
 *
 * @dsCard group="Components"
 */
export function Callout(props: CalloutProps): JSX.Element;
