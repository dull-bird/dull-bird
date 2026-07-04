# 呆鸟小筑 · dull-bird

一个关于技术与 AI 的个人网站——安静、留白、双语（中文为主，英文由 AI 翻译、人工校对）。

> 笨鸟先飞——与其等一切准备妥当，不如现在就把想法分享出来。
> 未来已来，只是分布不均。 — William Gibson

## 这个仓库里有什么

- **[`site/`](site/)** — 用 [Astro](https://astro.build) 实现的正式网站，静态生成，托管在 GitHub Pages。这是唯一真正跑起来的东西。
- **[`project/`](project/)** — Claude Design 生成的设计系统交接文档：色彩、字体、间距、组件等所有视觉基础，`site/` 的样式都是从这里原样搬过去的。
- **[`chats/`](chats/)** — 和设计助手的原始对话记录，留作设计决策是怎么一步步定下来的存档。

## 开发

```sh
cd site
npm install
npm run dev
```

更多细节见 [site/README.md](site/README.md)。

## 部署

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 在每次 push 到 `main` 时构建 `site/` 并发布到 GitHub Pages。
