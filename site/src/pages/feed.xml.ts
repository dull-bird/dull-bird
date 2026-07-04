import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { postHref } from '../lib/routes';
import { withBase } from '../lib/base';

export async function GET(context: APIContext) {
  const zh = await getPosts('zh');
  const en = await getPosts('en');
  const items = [...zh, ...en].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: '呆鸟小筑 · dull-bird',
    description: '在公开处思考技术与 AI · thinking about tech & AI, in the open',
    site: new URL(withBase('/'), context.site!),
    items: items.map((post) => ({
      title: post.data.title,
      description: post.data.lede,
      pubDate: post.data.date,
      link: postHref(post.data.lang, post.data.postSlug),
      categories: [post.data.topic],
      customData: `<language>${post.data.lang}</language>`,
    })),
  });
}
