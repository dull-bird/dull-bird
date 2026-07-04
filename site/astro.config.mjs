// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: this repo is dull-bird/dull-bird, so unless it gets
  // renamed to dull-bird.github.io it will publish as a *project* page
  // at https://dull-bird.github.io/dull-bird/ — hence the base below.
  // If you rename the repo to <user>.github.io, remove `base`.
  site: 'https://dull-bird.github.io',
  base: '/dull-bird',

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, // 中文在根路径，英文在 /en/
    },
  },
});
