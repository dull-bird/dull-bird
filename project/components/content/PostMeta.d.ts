import React from "react";

export interface PostMetaProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** ISO string or Date; formatted per `lang`. */
  date?: string | Date;
  /** Reading time in minutes. */
  readingTime?: number;
  /** Formatting + labels. @default "zh" */
  lang?: "zh" | "en";
  /** Extra pre-formatted parts appended after date + reading time. */
  items?: string[];
}

/**
 * Mono metadata line (date · reading time · …), dot-separated.
 *
 * @dsCard group="Components"
 */
export function PostMeta(props: PostMetaProps): JSX.Element;
