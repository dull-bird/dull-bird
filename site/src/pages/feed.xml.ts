import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { getPapers } from '../lib/papers';
import { postHref, paperHref } from '../lib/routes';
import { withBase } from '../lib/base';

export async function GET(context: APIContext) {
  const zh = await getPosts('zh');
  const en = await getPosts('en');
  const zhPapers = await getPapers('zh');
  const enPapers = await getPapers('en');
  const items = [
    ...zh.map((item) => ({ kind: 'post' as const, item })),
    ...en.map((item) => ({ kind: 'post' as const, item })),
    ...zhPapers.map((item) => ({ kind: 'paper' as const, item })),
    ...enPapers.map((item) => ({ kind: 'paper' as const, item })),
  ].sort((a, b) => b.item.data.date.valueOf() - a.item.data.date.valueOf());

  return rss({
    title: '呆鸟小筑 · dull-bird',
    description: '在公开处思考技术与 AI · thinking about tech & AI, in the open',
    site: new URL(withBase('/'), context.site!),
    items: items.map(({ kind, item }) => ({
      title: item.data.title,
      description: item.data.lede,
      pubDate: item.data.date,
      link: kind === 'post'
        ? postHref(item.data.lang, item.data.postSlug)
        : paperHref(item.data.lang, item.data.paperSlug),
      categories: kind === 'post' ? [item.data.topic] : item.data.keywords,
      customData: `<language>${item.data.lang}</language>`,
    })),
  });
}
