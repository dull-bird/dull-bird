import type { CollectionEntry } from 'astro:content';
import type { Lang } from './routes';
import { routes, postHref } from './routes';

export function llmsDoc(lang: Lang, bio: string, posts: CollectionEntry<'posts'>[], site: URL) {
  const r = routes(lang);
  const lines = [
    `# 呆鸟小筑 · dull-bird`,
    `> ${bio}`,
    '',
    lang === 'zh' ? '## 站内' : '## Site',
    `- [${lang === 'zh' ? '文章' : 'Writing'}](${new URL(r.writing, site)}): ${lang === 'zh' ? '关于技术、AI 与平等获取的文章' : 'essays on tech, AI, and equal access'}`,
    `- [${lang === 'zh' ? '关于' : 'About'}](${new URL(r.about, site)}): ${lang === 'zh' ? '呆鸟是谁 + 此刻在做什么' : 'who dull-bird is + what’s happening now'}`,
    '',
    lang === 'zh' ? '## 文章' : '## Writing',
    ...posts.map(
      (p) => `- [${p.data.title}](${new URL(postHref(lang, p.data.postSlug), site)}) — ${p.data.topic}, ${p.data.date.toISOString().slice(0, 10)}, ${p.data.reading}min`
    ),
    '',
    '## Meta',
    '- feed: /feed.xml',
    '- llms: /llms.txt',
    '- languages: zh (primary), en (AI-translated)',
    '- license: CC BY 4.0',
  ];
  return lines.join('\n');
}

export function jsonLdDoc(lang: Lang, bio: string, posts: CollectionEntry<'posts'>[], site: URL) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: '呆鸟小筑 · dull-bird',
      inLanguage: lang,
      author: { '@type': 'Person', name: 'dull-bird' },
      description: bio,
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.data.title,
        about: p.data.topic,
        datePublished: p.data.date.toISOString().slice(0, 10),
        timeRequired: `PT${p.data.reading}M`,
        url: new URL(postHref(lang, p.data.postSlug), site).toString(),
        translationOfWork: p.data.translated ? (lang === 'en' ? 'zh' : undefined) : undefined,
      })),
    },
    null,
    2
  );
}
