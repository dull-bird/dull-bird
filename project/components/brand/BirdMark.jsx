import React from "react";

/**
 * The dull-bird dove. A single flowing line — the core of the brand.
 * Three cuts of the same bird: "line" (primary), "solid" (avatars /
 * favicons), "stroke" (a minimal single-stroke swoosh for small sizes).
 */

const BIRD = {
  line: {
    vb: "0 0 120 108",
    stroke: true,
    d: "M12 60 C 22 53 34 51 44 53 C 50 41 58 33 70 33 C 66 41 66 49 70 55 C 84 41 104 39 118 47 C 104 51 92 59 86 69 C 100 69 108 73 112 83 C 98 79 82 77 68 77 C 60 77 50 73 44 65 C 32 69 20 67 12 60 Z",
  },
  solid: {
    vb: "0 0 120 108",
    stroke: false,
    d: "M12 60 C 22 53 34 51 44 53 C 50 41 58 33 70 33 C 66 41 66 49 70 55 C 84 41 104 39 118 47 C 104 51 92 59 86 69 C 100 69 108 73 112 83 C 98 79 82 77 68 77 C 60 77 50 73 44 65 C 32 69 20 67 12 60 Z",
  },
  stroke: {
    vb: "0 0 120 100",
    stroke: true,
    d: "M8 62 C 30 58 46 54 58 44 C 64 39 68 32 66 24 C 74 30 76 40 74 50 C 88 44 104 44 116 52",
  },
};

export function BirdMark({
  variant = "line",
  size = 40,
  color = "currentColor",
  strokeWidth = 5,
  animate = false,
  title = "dull-bird 呆鸟",
  style,
  ...rest
}) {
  const cfg = BIRD[variant] || BIRD.line;
  const parts = cfg.vb.split(" ");
  const vbW = Number(parts[2]);
  const vbH = Number(parts[3]);
  const height = (size * vbH) / vbW;

  const pathStyle = animate
    ? {
        strokeDasharray: 640,
        strokeDashoffset: 640,
        animation: "db-draw var(--dur-draw, 1600ms) var(--ease-line, cubic-bezier(.65,.05,.36,1)) forwards",
      }
    : undefined;

  return (
    <svg
      viewBox={cfg.vb}
      width={size}
      height={height}
      role="img"
      aria-label={title}
      style={{ display: "block", overflow: "visible", ...style }}
      {...rest}
    >
      <title>{title}</title>
      <path
        d={cfg.d}
        fill={cfg.stroke ? "none" : color}
        stroke={cfg.stroke ? color : "none"}
        strokeWidth={cfg.stroke ? strokeWidth : 0}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={pathStyle}
      />
    </svg>
  );
}
