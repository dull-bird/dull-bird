import React from "react";

export interface LangToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Active language. @default "zh" */
  value?: "zh" | "en";
  /** Called with the newly selected language. */
  onChange?: (lang: "zh" | "en") => void;
  /** Button labels. @default { zh: "中", en: "EN" } */
  labels?: { zh: string; en: string };
}

/**
 * The 中 / EN pill switch for bilingual pages.
 *
 * @dsCard group="Components"
 */
export function LangToggle(props: LangToggleProps): JSX.Element;
