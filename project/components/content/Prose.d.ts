import React from "react";

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reading language — `zh` opens up line-height for Chinese. @default "zh" */
  lang?: "zh" | "en";
  /** Render an HTML string instead of children (e.g. rendered markdown). */
  html?: string;
  children?: React.ReactNode;
}

/**
 * Long-form reading container: serif body, accent links, blockquotes,
 * code, and CJK-aware leading. Wrap an article body in it.
 *
 * @dsCard group="Components"
 * @startingPoint section="Content" subtitle="Essay reading column" viewport="640x360"
 */
export function Prose(props: ProseProps): JSX.Element;
