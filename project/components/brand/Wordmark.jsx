import React from "react";
import { BirdMark } from "./BirdMark.jsx";

/**
 * The dull-bird wordmark lockup: the dove + the site name.
 *   zh → 呆鸟小筑   ·   en → dull-bird
 */

const NAMES = { zh: "呆鸟小筑", en: "dull-bird" };

export function Wordmark({
  lang = "zh",
  size = 22,
  showMark = true,
  markVariant = "line",
  orientation = "horizontal",
  tagline,
  style,
  ...rest
}) {
  const label = NAMES[lang] || NAMES.zh;
  const isEn = lang === "en";
  const stacked = orientation === "stacked";

  const nameStyle = {
    fontFamily: isEn ? "var(--font-sans)" : "var(--font-serif)",
    fontSize: size,
    fontWeight: isEn ? "var(--weight-medium)" : "var(--weight-medium)",
    letterSpacing: isEn ? "-0.02em" : "0.04em",
    lineHeight: 1,
    color: "var(--text-heading)",
    whiteSpace: "nowrap",
  };

  const taglineStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: Math.max(10, size * 0.42),
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    lineHeight: 1,
    marginTop: stacked ? 6 : 3,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: showMark ? Math.round(size * 0.6) : 0,
        color: "var(--text-heading)",
        ...style,
      }}
      {...rest}
    >
      {showMark && <BirdMark variant={markVariant} size={Math.round(size * 1.9)} />}
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span style={nameStyle}>{label}</span>
        {tagline && <span style={taglineStyle}>{tagline}</span>}
      </span>
    </span>
  );
}
