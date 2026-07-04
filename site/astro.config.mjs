// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: this repo is dull-bird/dull-bird.github.io, a *user*
  // page, so it publishes at the root — no `base` needed.
  site: 'https://dull-bird.github.io',

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, // 中文在根路径，英文在 /en/
    },
  },
});
