import React from "react";

export interface BirdMarkProps extends React.SVGAttributes<SVGSVGElement> {
  /** Which cut of the dove. @default "line" */
  variant?: "line" | "solid" | "stroke";
  /** Rendered width in px (height derives from the mark's aspect). @default 40 */
  size?: number;
  /** Any CSS color; defaults to inheriting text color. @default "currentColor" */
  color?: string;
  /** Stroke weight for line/stroke variants. @default 5 */
  strokeWidth?: number;
  /** Self-draw the line on mount (line-bird animation). @default false */
  animate?: boolean;
  /** Accessible label / <title>. @default "dull-bird 呆鸟" */
  title?: string;
}

/**
 * The dull-bird dove mark — a single flowing line.
 *
 * @dsCard group="Brand"
 * @startingPoint section="Brand" subtitle="The dove mark, three cuts" viewport="240x160"
 */
export function BirdMark(props: BirdMarkProps): JSX.Element;
