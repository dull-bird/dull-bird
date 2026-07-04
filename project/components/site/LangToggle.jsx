import React from "react";

/**
 * The 中 / EN language switch. Controlled: pass `value` and `onChange`.
 * Purely presentational — the app decides what switching means.
 */
export function LangToggle({
  value = "zh",
  onChange,
  labels = { zh: "中", en: "EN" },
  className,
  ...rest
}) {
  const order = ["zh", "en"];
  return (
    <div
      className={["db-langtoggle", className].filter(Boolean).join(" ")}
      role="group"
      aria-label="Language"
      {...rest}
    >
      {order.map((k) => (
        <button
          key={k}
          type="button"
          data-active={value === k ? "true" : undefined}
          aria-pressed={value === k}
          onClick={() => onChange && onChange(k)}
        >
          {labels[k]}
        </button>
      ))}
    </div>
  );
}
