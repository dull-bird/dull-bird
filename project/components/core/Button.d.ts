import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as a link to this URL instead of a button. */
  href?: string;
  disabled?: boolean;
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Icon element rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * A pill button. `primary` rides the shifting accent; `secondary`
 * is an outlined paper button; `ghost` is text-only.
 *
 * @dsCard group="Components"
 * @startingPoint section="Core" subtitle="Pill buttons — 3 variants, 3 sizes" viewport="440x120"
 */
export function Button(props: ButtonProps): JSX.Element;
