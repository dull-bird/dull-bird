import { getCollection } from 'astro:content';
import type { Lang } from './routes';

export async function getPapers(lang: Lang) {
  const all = await getCollection('papers', (entry) => entry.data.lang === lang);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPaperBySlug(lang: Lang, slug: string) {
  const papers = await getPapers(lang);
  return papers.find((p) => p.data.paperSlug === slug);
}
