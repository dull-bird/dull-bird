---
paperSlug: deep-learning-enhanced-index-tracking
lang: zh
title: Deep learning for enhanced index tracking
shortTitle: 深度学习如何做增强指数跟踪
venue: Quantitative Finance
date: 2024-06-07
year: 2024
reading: 14
translated: false
lede: 一只基金既想贴着指数走，又想多赚一点，难点在哪里？这篇论文把它写成一个动态决策问题，让神经网络学会在收益、风险、跟踪误差和交易成本之间取舍。
authors:
  - Zhiwen Dai
  - Lingfei Li
keywords:
  - deep learning
  - index tracking
  - portfolio selection
  - quantitative finance
doi: 10.1080/14697688.2024.2356239
links:
  - label: DOI
    url: https://doi.org/10.1080/14697688.2024.2356239
  - label: Publisher page
    url: https://www.tandfonline.com/doi/full/10.1080/14697688.2024.2356239
  - label: SSRN preprint
    url: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4461741
---

## 先说人话

指数基金的普通目标是“像指数”。比如指数涨 1%，基金也差不多涨 1%。增强指数基金多了一点野心：不要偏离指数太多，但最好能比指数多赚一点。

这听起来简单，实际很难。因为“多赚一点”通常意味着你要偏离指数；偏离越多，跟踪误差越大，也越可能在坏行情里赔得更快。更现实的是，每次调仓都有交易成本，模型如果天天换仓，纸面收益很容易被手续费吃掉。

这篇论文研究的就是这个取舍：能不能让深度学习模型学一个动态调仓规则，一边贴着指数，一边争取超额收益，还要管住下行风险和交易成本。

<figure>
  <img src="/assets/papers/eit-loss.svg" alt="增强指数跟踪训练目标由跟踪误差、超额收益、CVaR 惩罚和交易成本组成" />
  <figcaption>增强指数跟踪不是单目标问题。它同时关心“像不像指数”“有没有超额”“尾部风险大不大”“换仓贵不贵”。图为根据论文目标函数重绘的示意图。</figcaption>
</figure>

## 数学上到底在优化什么

设指数收益为 $r_{I,t}$，组合收益为 $r_{P,t}$。最朴素的指数跟踪只关心 tracking error：

$$
L_{\mathrm{TE}}
=
\sqrt{
  \frac{1}{T}\sum_{t=1}^{T}
  (r_{P,t}-r_{I,t})^2
}.
$$

增强指数跟踪还希望组合平均多赚一点：

$$
L_{\mathrm{ER}}
=
\frac{1}{T}\sum_{t=1}^{T}(r_{P,t}-r_{I,t}).
$$

所以基础目标可以写成：

$$
L_{\mathrm{EIT}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}},
\qquad \lambda \ge 0.
$$

这个式子很直观：第一项越小越好，说明组合贴近指数；第二项前面有负号，所以超额收益越大，loss 越小。$\lambda$ 控制“我愿意为了多赚一点，承受多少跟踪误差”。

## 真实交易里的约束

论文里组合由 $n$ 只股票和现金组成。调仓前权重是 $\boldsymbol w_t$，调仓后权重是 $\tilde{\boldsymbol w}_t$。如果每单位换手成本是 $\rho$，调仓预算约束可以写成：

$$
1-\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|
=
\sum_{i=0}^{n}\tilde w_{i,t}.
$$

右边是调仓后的总仓位，左边是扣掉交易成本以后真正剩下的钱。组合下一期收益写成：

$$
r_{P,t+1}
=
\sum_{i=0}^{n}\tilde w_{i,t} r_{i,t+1}
-
\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|.
$$

这就是为什么模型需要“记住当前仓位”：如果新仓位和旧仓位差太多，交易成本会直接进入收益。

论文还加入了 CVaR 下行风险约束。直接用不可导的惩罚项训练不稳定，所以使用 softplus 平滑：

$$
g_\beta(x)
=
\frac{\log(1+\exp(\beta x))}{\beta}.
$$

当组合的 CVaR 超过阈值 $c$ 时，惩罚项是：

$$
P_{\mathrm{CVaR}}
=
\gamma\,
g_\beta\left(
  \mathrm{CVaR}_\alpha(r_{P,t}) - c
\right).
$$

最终训练目标变成：

$$
L_{\mathrm{EIT-CVaR}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}}
+
P_{\mathrm{CVaR}}.
$$

小白可以这样理解：模型不是单纯“追涨杀跌”，它每一次调仓都要付四张账单：偏离指数的账、没赚到超额的账、尾部风险的账、交易成本的账。

## 网络结构：四个模块各管一件事

模型不是一个黑箱大网络，而是分成四个有金融含义的模块。

<figure>
  <img src="/assets/papers/eit-network.svg" alt="增强指数跟踪四模块网络结构：main, score, gate, memory" />
  <figcaption>根据论文网络结构重绘的示意图。main 管长期 regime，score 管短期打分，gate 管风险缩放，memory 管换手成本。</figcaption>
</figure>

**main block 看长期市场状态。** 它先学习两套基础权重：牛市权重 $\tilde{\boldsymbol w}_{\mathrm{bull}}$ 和熊市权重 $\tilde{\boldsymbol w}_{\mathrm{bear}}$，再根据指数 regime 概率混合：

$$
\tilde{\boldsymbol w}_{1,t}
=
\omega_{\mathrm{bull},t}\tilde{\boldsymbol w}_{\mathrm{bull}}
+
(1-\omega_{\mathrm{bull},t})\tilde{\boldsymbol w}_{\mathrm{bear}}.
$$

**score block 看短期股票特征。** 它对每只股票近期均值、波动、beta 等特征打分，得到短期权重 $\tilde{\boldsymbol w}_{\mathrm{sc},t}$，再和长期权重混合：

$$
\tilde{\boldsymbol w}_{2,t}
=
(1-\omega_1)\tilde{\boldsymbol w}_{\mathrm{sc},t}
+
\omega_1 \tilde{\boldsymbol w}_{1,t}.
$$

**gate block 做风险门控。** 如果某只股票或市场状态更危险，gate 会把对应权重压低：

$$
\tilde{\boldsymbol w}_{3,t}
=
\tilde{\boldsymbol g}_t
\circ
\tilde{\boldsymbol w}_{2,t}.
$$

**memory block 控制换手。** 它根据候选仓位和当前仓位的距离，决定这次要不要真的大幅调仓：

$$
\tilde{\boldsymbol w}_{S,t}
=
(1-\omega_{p,t})\tilde{\boldsymbol w}_{3,t}
+
\omega_{p,t}\boldsymbol w_{S,t}.
$$

所以这篇论文的一个核心设计不是“网络越大越好”，而是把金融问题拆成几个可解释的小部件：长期状态、短期机会、风险控制、成本记忆。

## 结果怎么看

论文在 S&P 500、S&P 100、FTSE 100、Nikkei 225 等指数上做了样本外测试。整体结果支持一个结论：这个结构通常能比传统滚动优化基线更好地平衡跟踪误差、超额收益、下行风险和交易成本。

最值得注意的是 2020 年市场下跌阶段。模型会明显转向现金或更保守的仓位，这就是所谓 flight to safety。换句话说，模型的价值不只是“多赚一点”，还包括在极端时期少犯大错。

但这篇论文不应该被读成“深度学习保证跑赢指数”。超额收益本身是 modest 的，很多优势来自风险控制和成本控制。Nikkei 225 的实验也提醒我们：如果选出来的大盘股本身跑不赢指数，模型也不能凭空创造超额。

## 对非金融读者有什么启发

这篇论文背后的通用思想是：现实系统里，最难的不是预测一个点，而是在多个目标之间动态取舍。

在金融里，这几个目标是收益、风险、跟踪误差、交易成本。在机器人或 AI 系统里，可能变成精度、速度、稳定性、能耗、安全边界。好的模型不只是“更聪明”，而是知道自己在优化什么、牺牲什么、什么时候应该保守。

## 局限

模型依赖历史市场数据和 regime 估计，而 regime 在现实中有滞后和噪声。论文里的股票选择也主要按市值来做，这会让结果受当时市场风格影响。它更适合作为一个风险感知的动态资产配置框架，而不是一个稳赚不赔的选股机器。

我的理解是：这篇论文真正可迁移的价值，是把“隐藏市场状态”和“交易摩擦”显式写进模型架构，而不是假装它们不存在。
