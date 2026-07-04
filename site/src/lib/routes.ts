import { getRelativeLocaleUrl } from 'astro:i18n';

export type Lang = 'zh' | 'en';

export function routes(lang: Lang) {
  return {
    home: getRelativeLocaleUrl(lang, '/'),
    writing: getRelativeLocaleUrl(lang, '/writing/'),
    about: getRelativeLocaleUrl(lang, '/about/'),
    projects: getRelativeLocaleUrl(lang, '/projects/'),
    agents: getRelativeLocaleUrl(lang, '/agents/'),
  };
}

export function postHref(lang: Lang, slug: string) {
  return getRelativeLocaleUrl(lang, `/writing/${slug}/`);
}
