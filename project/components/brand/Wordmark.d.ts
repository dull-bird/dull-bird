import React from "react";

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Name language: 呆鸟小筑 (zh) or dull-bird (en). @default "zh" */
  lang?: "zh" | "en";
  /** Type size in px for the name (mark scales with it). @default 22 */
  size?: number;
  /** Show the dove mark before the name. @default true */
  showMark?: boolean;
  /** Which cut of the dove to lock up. @default "line" */
  markVariant?: "line" | "solid" | "stroke";
  /** Lockup direction. @default "horizontal" */
  orientation?: "horizontal" | "stacked";
  /** Optional small mono tagline under the name. */
  tagline?: string;
}

/**
 * The dull-bird wordmark: dove + site name (呆鸟小筑 / dull-bird).
 *
 * @dsCard group="Brand"
 * @startingPoint section="Brand" subtitle="Wordmark lockup, zh / en" viewport="360x120"
 */
export function Wordmark(props: WordmarkProps): JSX.Element;
