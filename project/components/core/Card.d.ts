import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Make the whole card a link (adds hover lift). */
  href?: string;
  /** Drop background, border and padding — a bare content group. @default false */
  flat?: boolean;
  /** Show the hover lift without being a link. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * A soft-cornered paper surface with a hairline border. The main
 * container for post previews, notes, and grouped content.
 *
 * @dsCard group="Components"
 * @startingPoint section="Core" subtitle="Paper surface — hairline, soft radius" viewport="420x200"
 */
export function Card(props: CardProps): JSX.Element;
