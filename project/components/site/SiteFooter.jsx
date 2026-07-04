import React from "react";
import { BirdMark } from "../brand/BirdMark.jsx";

/**
 * The site footer: a bird mark, the William Gibson line the brand is
 * built on, small nav columns, and a machine-readable hint for agents.
 */
export function SiteFooter({
  lang = "zh",
  quote,
  columns,
  agentHref = "/llms.txt",
  className,
  ...rest
}) {
  const line = quote || (lang === "zh"
    ? "未来已来，只是分布不均。"
    : "The future is already here — it's just not evenly distributed.");

  const defaultCols = lang === "zh"
    ? [
        { title: "站内", links: [["文章", "#/writing"], ["关于", "#/about"], ["此刻", "#/now"]] },
        { title: "订阅", links: [["RSS", "/feed.xml"], ["邮件", "#/subscribe"]] },
        { title: "别处", links: [["GitHub", "#"], ["给 AI 读", agentHref]] },
      ]
    : [
        { title: "Site", links: [["Writing", "#/writing"], ["About", "#/about"], ["Now", "#/now"]] },
        { title: "Follow", links: [["RSS", "/feed.xml"], ["Email", "#/subscribe"]] },
        { title: "Elsewhere", links: [["GitHub", "#"], ["For agents", agentHref]] },
      ];
  const cols = columns || defaultCols;

  return (
    <footer className={["db-footer", className].filter(Boolean).join(" ")} {...rest}>
      <div className="db-footer__inner db-container">
        <div className="db-footer__brand">
          <BirdMark variant="line" size={40} />
          <p className="db-footer__quote">{line}</p>
          <p className="db-footer__cite">— William Gibson</p>
        </div>

        <div className="db-footer__cols">
          {cols.map((col) => (
            <div key={col.title} className="db-footer__col">
              <div className="db-footer__coltitle db-eyebrow">{col.title}</div>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} className="db-footer__link db-link" data-muted="true">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="db-footer__base db-container">
        <span>© {new Date().getFullYear()} 呆鸟小筑 · dull-bird</span>
        <span className="db-footer__built">笨鸟先飞 · built in the open</span>
      </div>
    </footer>
  );
}
