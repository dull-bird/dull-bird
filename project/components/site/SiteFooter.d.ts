import React from "react";

export interface FooterColumn {
  title: string;
  /** [label, href] pairs. */
  links: [string, string][];
}

export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer language. @default "zh" */
  lang?: "zh" | "en";
  /** Override the Gibson signature line. */
  quote?: React.ReactNode;
  /** Override the nav columns. */
  columns?: FooterColumn[];
  /** Link to the machine-readable / agent view. @default "/llms.txt" */
  agentHref?: string;
}

/**
 * The site footer — bird mark, the Gibson line, nav columns, and an
 * "for agents" link to the machine-readable view.
 *
 * @dsCard group="Components"
 * @startingPoint section="Site" subtitle="Footer with quote + nav columns" viewport="900x300"
 */
export function SiteFooter(props: SiteFooterProps): JSX.Element;
