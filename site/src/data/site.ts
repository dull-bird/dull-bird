// dull-bird 呆鸟小筑 — site-wide bilingual copy that isn't an article.
// Ported from the design handoff's ui_kits/personal-site/data.js.

export const profile = {
  zh: {
    name: '呆鸟小筑',
    handle: 'dull-bird',
    role: '在公开处思考技术与 AI',
    bio: '呆鸟是我的外号。笨鸟先飞，所以我想主动把一些关于新技术、尤其是 AI 的想法分享出来。我的理念很简单：让更多人能更平等地享受技术。',
  },
  en: {
    name: 'dull-bird',
    handle: 'dull-bird',
    role: 'thinking about tech & AI, in the open',
    bio: '"dull-bird" is a nickname of mine. The slow bird starts early — so I share my thinking about new technology, especially AI, out in the open. My belief is simple: help more people enjoy technology, more equally.',
  },
} as const;

export const now = {
  zh: [
    ['在读', '关于 agent 与人协作的几篇论文，和一本讲城市的书。'],
    ['在做', '把这个小站做得对人和 AI 都更友好，部署在 GitHub Pages。'],
    ['在想', '如果每个人都有一个称职的 AI 助手，什么会变得更平等？'],
  ],
  en: [
    ['Reading', 'A few papers on human–agent collaboration, and a book about cities.'],
    ['Building', 'Making this site friendlier to people and AI alike, hosted on GitHub Pages.'],
    ['Thinking', 'If everyone had a capable AI assistant, what becomes more equal?'],
  ],
} as const;

export type Lang = 'zh' | 'en';
