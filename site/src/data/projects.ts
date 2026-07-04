// dull-bird 呆鸟小筑 — selected projects, shown on the Projects page.

export interface Project {
  name: string;
  /** GitHub repo — always shown, as the secondary link when a homepage exists. */
  repo: string;
  /** GitHub Pages site — when present, this is the primary link. */
  homepage?: string;
  logo?: string;
  zh: string;
  en: string;
}

export const projects: Project[] = [
  {
    name: 'weread-vault',
    repo: 'https://github.com/dull-bird/weread-vault',
    homepage: 'https://dull-bird.github.io/weread-vault/',
    logo: '/projects/weread-vault-logo.png',
    zh: '微信读书的本地数据库，带一个 Agent Skill 的 CLI。把书架、划线、想法、阅读统计归档进本机 SQLite，可查询、可视化、可导出，AI 直接读，数据不上传。',
    en: 'A local database for WeChat Reading, with a CLI and an Agent Skill. Archives your bookshelf, highlights, notes, and reading stats into a local SQLite file — queryable, visualizable, exportable, readable by AI, never uploaded.',
  },
  {
    name: 'changde-dialect-skill',
    repo: 'https://github.com/dull-bird/changde-dialect-skill',
    homepage: 'https://dull-bird.github.io/changde-dialect-skill/',
    logo: '/projects/changde-dialect-skill-logo.png',
    zh: '一个让 AI agent 用常德方言（汉寿口音）对话的技能，基于常德方言词语汇 1000 条整理而成。',
    en: 'An agent skill that makes Claude Code / Codex / OpenClaw converse in the Changde dialect (Hanshou accent), built from a curated 1,000-entry Changde dialect vocabulary.',
  },
  {
    name: 'DeepOrbit',
    repo: 'https://github.com/dull-bird/DeepOrbit',
    zh: '一个连接大模型和 Obsidian 的 AI agent 系统，自动化深度研究和个人知识管理，帮助维持一个高速的学习闭环。',
    en: 'An AI-agent system that bridges LLMs with Obsidian to automate deep research and personal knowledge management. Helps maintain a high-velocity learning loop by automating the capture and synthesis of information.',
  },
  {
    name: 'C++ DebugMate',
    repo: 'https://github.com/dull-bird/cv_debug_mate_cpp',
    logo: '/projects/cv-debugmate-logo.png',
    zh: '一个面向计算机视觉工程师的 VS Code 插件，能在 C++ 调试过程中直接可视化 1D/2D/3D 数据结构，把抽象的内存缓冲区变成直观的图像和图表。',
    en: 'A VS Code extension for computer vision engineers. Visualizes 1D/2D/3D data structures directly during C++ debugging sessions, turning abstract memory buffers into intuitive images and plots.',
  },
  {
    name: 'PDF Table of Contents Generator',
    repo: 'https://github.com/dull-bird/PDF-Table-of-Contents-Generator',
    zh: '一个能自动生成并注入可点击目录的小工具，适合长篇技术报告或者重新排版的电子书。',
    en: 'A handy tool to automatically generate and inject clickable tables of contents into PDF documents. Perfect for long technical reports or reconstructed eBooks.',
  },
  {
    name: 'drqn_mazeworld',
    repo: 'https://github.com/dull-bird/drqn_mazeworld',
    zh: '一个深度强化学习项目，用 Deep Recurrent Q-Network（DRQN）学习在 MazeWorld 环境里导航求解。',
    en: 'A deep reinforcement learning project where a Deep Recurrent Q-Network (DRQN) learns to navigate and solve environments in MazeWorld.',
  },
];
