---
paperSlug: deep-learning-quadratic-hedging
lang: zh
title: Evaluation of Deep Learning Algorithms for Quadratic Hedging
shortTitle: 用深度学习做二次对冲，哪种网络更靠谱？
venue: The Journal of Derivatives
date: 2022-09-01
year: 2022
reading: 15
translated: false
lede: 这篇论文不是发明一个新对冲模型，而是系统比较 Multi-net、Single-net 和 RNN 三种深度学习架构在动态对冲里的表现，回答高维、长期限场景下该选哪种网络。
authors:
  - Zhiwen Dai
  - Lingfei Li
  - Gongqiu Zhang
keywords:
  - deep learning
  - quadratic hedging
  - derivatives
  - RNN
  - benchmark
doi: 10.3905/jod.2022.1.165
links:
  - label: DOI
    url: https://doi.org/10.3905/jod.2022.1.165
  - label: CUHK research record
    url: https://research.cuhk.edu.hk/en/publications/evaluation-of-deep-learning-algorithms-for-quadratic-hedging-2/
  - label: SSRN page
    url: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4062101
---

## 先说人话

买了期权以后，交易员常常会用标的资产来对冲风险。最理想的情况是：期权到期时，对冲组合刚好抵消期权的损益。但现实市场不完美，尤其是资产很多、时间很长、波动率和相关性都在变的时候，经典公式并不总能给出最好的实际策略。

二次对冲要做的事情很直接：让到期时的对冲误差平方尽量小。平方的意思是，大错会被惩罚得更重。

这篇论文问的是：如果用神经网络来学动态对冲策略，哪种网络结构更靠谱？

<figure>
  <img src="/assets/papers/qh-loss-grid.svg" alt="二次对冲论文的 benchmark 设计：资产维度、期限、市场模型和网络架构" />
  <figcaption>这篇论文的重点是 benchmark：不只看一个简单例子，而是系统扫过资产维度、期限、市场模型和网络结构。图为根据实验设计重绘的示意图。</figcaption>
</figure>

## 二次对冲的 loss

设有 $d$ 个标的资产，价格向量为 $\boldsymbol S_t\in\mathbb R^d$。对冲策略在时刻 $t$ 持有数量 $\boldsymbol q_t\in\mathbb R^d$。初始资金为 $v$。到期时，对冲组合价值是：

$$
V_T
=
v
+
\sum_{t=0}^{T-1}
\boldsymbol q_t^\top
(\boldsymbol S_{t+1}-\boldsymbol S_t).
$$

论文测试的 payoff 是一篮子欧式看涨期权：

$$
F_T
=
\left(
  \sum_{j=1}^{d} S_{j,T}
  -
  dK
\right)^+.
$$

二次对冲的目标就是让 $V_T$ 尽量接近 $F_T$：

$$
\min_{v,\boldsymbol q_0,\ldots,\boldsymbol q_{T-1}}
\mathbb E
\left[
  (V_T-F_T)^2
\right].
$$

如果用神经网络参数 $\theta$ 输出每一期的对冲量，可以写成：

$$
\boldsymbol q_t
=
f_\theta(X_t),
$$

其中 $X_t$ 是模型在时刻 $t$ 能看到的状态。训练时把期望换成样本平均：

$$
\widehat L(\theta)
=
\frac{1}{M}
\sum_{m=1}^{M}
\left(
  v_\theta
  +
  \sum_{t=0}^{T-1}
  f_\theta(X_t^{(m)})^\top
  \Delta \boldsymbol S_{t+1}^{(m)}
  -
  F_T^{(m)}
\right)^2.
$$

这就是整篇论文的核心 loss。所有网络结构都在解同一个目标，区别只在于它们如何表示 $\boldsymbol q_t$。

## 三种网络有什么区别

论文比较了三种做法。

<figure>
  <img src="/assets/papers/qh-architectures.svg" alt="Multi-net、Single-net 和 RNN 三种二次对冲网络架构对比" />
  <figcaption>根据论文中三类网络近似器重绘的结构图。关键区别是：每期独立、跨期共享、还是用 RNN 记住历史。</figcaption>
</figure>

**Multi-net** 给每个交易时点都配一个独立网络：

$$
\boldsymbol q_t
=
f_t(X_t;\theta_t).
$$

它最自由，但参数量会随着期限 $T$ 线性增长。时间越长，网络越多，越容易过拟合。

**Single-net** 只用一个共享网络，把归一化时间也作为输入：

$$
\boldsymbol q_t
=
f(X_t,t/T;\theta).
$$

它像一个“通用对冲函数”：同一套参数处理不同时间点。参数少，训练快，稳定性好。

**RNN** 用循环神经网络读取历史收益序列。设对数收益为 $\boldsymbol\xi_t$，隐状态为 $\boldsymbol z_t$：

$$
\boldsymbol z_t
=
\mathrm{GRU}(\boldsymbol\xi_t,\boldsymbol z_{t-1};\theta^R),
\qquad
\boldsymbol q_t
=
f^C(\boldsymbol z_t,\tilde X_t;\theta^C).
$$

对小白来说，可以这样理解：Multi-net 是每一天请一个不同的交易员，Single-net 是一个交易员学会根据日期调整做法，RNN 是一个会记住过去行情的交易员。

## 为什么 RNN 重要

在 Black-Scholes 这类简化模型里，价格本身已经包含了足够信息。但真实市场更像 DCC-GARCH：波动率会聚集，相关性会变化，今天的风险状态和过去一段时间有关。

问题是，这些隐藏状态在真实交易中并不会直接写在屏幕上。RNN 的价值就在这里：它可以从历史收益中隐式提取这种状态。

论文结果显示，在高维、长期限、非平稳的设定下，RNN 通常测试误差最低。特别是在 DCC-GARCH 场景里，RNN 能接近甚至超过那些直接拿隐藏协方差状态做输入的网络。这说明它确实学到了一部分“用历史反推风险状态”的能力。

## Single-net 为什么也重要

RNN 表现强，但 Single-net 很有工程价值。它参数少、训练快、几乎不过拟合，在很多场景下只比 RNN 略差。

这对实际系统很重要。研究里最优的模型，不一定是工程里最值得先上的模型。如果资源有限、需要稳定基线，Single-net 往往是更稳妥的第一版。

## 实验设计严谨在哪里

论文不是只挑一个简单例子，而是在维度和期限上做了系统网格：资产数量从 1 到 100，期限从约 1 个月到 1 年，并分别在 Black-Scholes 和 DCC-GARCH 两类数据生成模型下测试。

它还比较训练误差、验证误差、测试误差、训练速度、参数量、过拟合程度，以及学出来的初始成本和初始对冲量。这使它更像一篇 benchmark 论文，而不是单点炫技。

另一个贡献是移动区块自助法，也就是不完全依赖参数模型，而是从历史路径中重采样生成训练数据。论文还讨论了区块长度怎么影响偏差和方差。

## 最有意思的结论

高维时，深度学习学出来的初始成本和初始对冲量会明显偏离经典风险中性价格和 delta 对冲。这个结果很有启发：经典公式不是错了，而是它优化的目标和这里的二次对冲目标不同。

当市场不完备、资产很多、真实测度下的风险结构复杂时，“最会复制期权”的策略不一定是“均方误差最小”的策略。

## 局限

论文为了聚焦网络结构比较，没有把交易成本和仓位约束放进主问题。这是合理简化，但也意味着它离真实交易系统还有一步距离。后来的增强指数跟踪论文就把交易成本和风险约束显式写进了目标函数，两篇论文放在一起看，会更完整。

我的理解是：这篇论文的价值不在于说“RNN 永远最好”，而在于展示了在部分可观测、状态会变化的系统里，历史记忆本身是一种建模能力。
