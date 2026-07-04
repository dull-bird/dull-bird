import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { routes, postHref } from '../lib/routes';
import { profile } from '../data/site';

export async function GET(context: APIContext) {
  const site = context.site!;
  const zhPosts = await getPosts('zh');
  const enPosts = await getPosts('en');
  const zh = routes('zh');
  const en = routes('en');

  const lines = [
    '# 呆鸟小筑 · dull-bird',
    `> ${profile.en.bio}`,
    '',
    '## Site',
    `- Writing (zh): ${new URL(zh.writing, site)}`,
    `- Writing (en): ${new URL(en.writing, site)}`,
    `- About / now (zh): ${new URL(zh.about, site)}`,
    `- About / now (en): ${new URL(en.about, site)}`,
    `- Agent view (zh): ${new URL(zh.agents, site)}`,
    `- Agent view (en): ${new URL(en.agents, site)}`,
    '',
    '## Writing',
    ...zhPosts.map((zp) => {
      const ep = enPosts.find((e) => e.data.postSlug === zp.data.postSlug);
      const base = `- ${zp.data.title}${ep ? ` / ${ep.data.title}` : ''} — ${zp.data.topic}, ${zp.data.date.toISOString().slice(0, 10)}, ${zp.data.reading}min`;
      const zhUrl = `  zh: ${new URL(postHref('zh', zp.data.postSlug), site)}`;
      const enUrl = ep ? `  en: ${new URL(postHref('en', ep.data.postSlug), site)}` : undefined;
      return [base, zhUrl, enUrl].filter(Boolean).join('\n');
    }),
    '',
    '## Meta',
    '- feed: /feed.xml',
    '- llms: /llms.txt',
    '- languages: zh (primary, original), en (AI-translated, human-checked, marked per post)',
    '- license: CC BY 4.0',
  ];

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
