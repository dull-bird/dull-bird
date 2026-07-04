import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    postSlug: z.string(),
    lang: z.enum(['zh', 'en']),
    title: z.string(),
    topic: z.string(),
    date: z.coerce.date(),
    reading: z.number(),
    translated: z.boolean().default(false),
    lede: z.string(),
  }),
});

export const collections = { posts };
