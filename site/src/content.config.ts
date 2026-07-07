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

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    paperSlug: z.string(),
    lang: z.enum(['zh', 'en']),
    title: z.string(),
    shortTitle: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    year: z.number(),
    reading: z.number(),
    translated: z.boolean().default(false),
    lede: z.string(),
    authors: z.array(z.string()),
    keywords: z.array(z.string()).default([]),
    doi: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
  }),
});

export const collections = { posts, papers };
