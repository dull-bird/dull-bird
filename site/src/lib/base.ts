// Prefixes a root-relative path (e.g. "/feed.xml") with the configured
// GitHub Pages `base` — for the handful of routes that live outside the
// i18n-prefixed tree and so can't use astro:i18n's getRelativeLocaleUrl.
export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
