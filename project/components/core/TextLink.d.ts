import React from "react";

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  /** Start in muted color (still turns accent on hover). @default false */
  muted?: boolean;
  children?: React.ReactNode;
}

/**
 * Inline text link with the animated accent underline.
 * @dsCard group="Components"
 */
export function TextLink(props: TextLinkProps): JSX.Element;
