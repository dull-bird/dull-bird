import { getCollection } from 'astro:content';
import type { Lang } from './routes';

export async function getPosts(lang: Lang) {
  const all = await getCollection('posts', (entry) => entry.data.lang === lang);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostBySlug(lang: Lang, slug: string) {
  const posts = await getPosts(lang);
  return posts.find((p) => p.data.postSlug === slug);
}
