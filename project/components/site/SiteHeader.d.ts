import React from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header language (wordmark + default nav labels). @default "zh" */
  lang?: "zh" | "en";
  /** Language switch handler. */
  onLangChange?: (lang: "zh" | "en") => void;
  /** Override the nav items. Defaults to 文章 / 关于 / 此刻. */
  nav?: NavItem[];
  /** Current theme, for the toggle glyph. @default "light" */
  theme?: "light" | "dark";
  /** Theme toggle handler. */
  onThemeToggle?: () => void;
  /** href of the active nav item (gets the accent underline). */
  active?: string;
  /** Stick to the top with a scroll hairline. @default true */
  sticky?: boolean;
}

/**
 * The site top bar — wordmark, primary nav, and language / theme controls.
 *
 * @dsCard group="Components"
 * @startingPoint section="Site" subtitle="Sticky header with nav + controls" viewport="900x80"
 */
export function SiteHeader(props: SiteHeaderProps): JSX.Element;
