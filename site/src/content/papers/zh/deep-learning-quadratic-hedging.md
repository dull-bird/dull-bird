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

## 这篇论文在解决什么问题

这篇论文不是提出一个新的对冲算法，而是系统评估三种深度学习架构在 quadratic hedging 里的表现。论文关心的问题是：在高维、长期限、市场状态随时间变化的动态对冲任务里，Multi-net、Single-net 和 RNN 哪一种更可靠。

第二个贡献是研究 model-free 的 moving block bootstrap，也就是不完全依赖参数化市场模型，而是从历史路径中重采样生成训练数据，并讨论区块长度如何影响训练结果。

<figure>
  <img src="/assets/papers/qh-loss-grid.svg" alt="二次对冲论文的 benchmark 设计：资产维度、期限、市场模型和网络架构" />
  <figcaption>根据论文实验设计重绘的示意图。论文系统改变资产维度、期限、市场模型和网络架构，而不是只在一个简单例子上比较。</figcaption>
</figure>

## 问题设定和 loss

设有 $d$ 个标的资产，价格向量为 $\boldsymbol S_t\in\mathbb R^d$。对冲策略在时刻 $t$ 持有数量 $\boldsymbol q_t\in\mathbb R^d$，初始资金为 $v$。论文把无风险利率设为 0，对冲组合价值为：

$$
V_t
=
v
+
\sum_{i=0}^{t-1}
\boldsymbol q_i^\top
(\boldsymbol S_{i+1}-\boldsymbol S_i).
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

quadratic hedging 的目标是在真实测度 $\mathbb P$ 下最小化到期对冲误差的平方：

$$
\min_{v,\boldsymbol q_0,\ldots,\boldsymbol q_{T-1}}
\mathbb E
\left[
  (V_T-F_T)^2
\right].
$$

用神经网络输出每期对冲量：

$$
\boldsymbol q_t
=
f_\theta(X_t),
$$

其中 $X_t$ 是时刻 $t$ 可观测的状态。训练时用 sample average approximation 把期望换成有限样本均值：

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

所有网络结构都在解同一个目标，区别只在于如何表示 $\boldsymbol q_t$。论文为了聚焦网络架构比较，主问题不加入交易成本和仓位约束；这和后来的 enhanced index tracking 论文形成对照。

## 三种网络架构

论文比较的三类架构如下。

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

它对应每个时刻一个独立子网络，自由度最大，但参数量随期限 $T$ 线性增长。论文结果显示，这会在高维、长期限场景里带来明显过拟合和训练不稳定。

**Single-net** 只用一个共享网络，把归一化时间也作为输入：

$$
\boldsymbol q_t
=
f(X_t,t/T;\theta).
$$

它用同一个网络处理所有时点，并用 $t/T$ 告诉网络当前处于期限的哪个位置。参数量不随 $T$ 增长，是三者中参数最少、训练最快的结构。

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

论文使用 GRU，而不是 LSTM，因为实验中 LSTM 没有带来明显提升但更慢。一个关键细节是：RNN cell 的输入是对数收益 $\boldsymbol\xi_t$，不是价格 $\boldsymbol S_t$；随后再用一个 ControlNet 从隐状态和其他状态变量生成对冲量。

## 数据生成模型

论文用两类数据生成模型做实验。

**Black-Scholes。** 对数收益独立同分布，服从多元正态分布。这个设定下价格过程较简单，$\boldsymbol S_t$ 本身可以作为 Markov 状态。

**DCC-GARCH。** 该模型有时变波动率和时变相关性，可以生成波动率聚集、厚尾和相关性变化。此时仅看价格并不足以完全描述状态，隐藏的协方差状态在真实交易中也不可直接观测。

这正是 RNN 需要被比较的原因：如果市场状态依赖历史收益，RNN 可能从 $\boldsymbol\xi_{1:t}$ 中提取部分不可观测状态。

## 实验设计

论文做的是系统 benchmark：资产维度 $d\in\{1,10,100\}$，期限 $T\in\{20,60,120,250\}$，两类市场模型全交叉。每个组合下比较 Multi-net、Single-net 和 RNN。

训练使用 PyTorch、Adam、固定学习率、minibatch、梯度裁剪，并用验证集选择最佳 epoch。论文还做了若干训练稳定化处理：用 $\log(S_t)$ 而不是 $S_t$ 作为输入特征，对特征标准化，用 $v/d$ 替代 $v$ 作为训练参数，并把 loss 除以 $d^2$，以便同一套训练设置能跨维度使用。

论文还用风险中性价格 $p$ 和初始 delta $\Delta_0$ 作为参照，但明确说明：它们不是该 quadratic hedging 问题在真实测度和非完备市场下的标准答案，只是用来帮助理解学习到的 $v$ 和 $\boldsymbol q_0$。

## 主要发现

**低维时差别不大。** 当 $d=1$ 时，三种网络的训练和测试表现接近。架构差异主要在高维、长期限时显现。

**Multi-net 容易过拟合。** 它的参数量随 $T$ 增长。在 $d=100,T=250$ 时，Multi-net 参数量可以达到数百万级，验证 loss 和训练 loss 差距明显，DCC-GARCH 下训练曲线也更不稳定。

**RNN 通常测试 loss 最低。** 尤其在 DCC-GARCH 场景下，RNN 的优势更明显。论文的解释是：RNN 能从历史收益中提取不可观测的动态协方差状态，从而更适合处理非 Markov、部分可观测的市场。

**Single-net 是强基线。** 它参数量小、训练快、过拟合少，在很多场景下测试 loss 只比 RNN 略差。因此论文不是简单说 RNN 永远压倒性胜出，而是把 RNN 的精度优势和 Single-net 的效率稳定性放在一起比较。

**学习到的 $v$ 和 $\boldsymbol q_0$ 会偏离风险中性价格和 delta。** 高维时，深度学习解出的初始成本和初始对冲量与 $p$、$\Delta_0$ 的差距会变大。论文强调这不代表经典公式错了，而是因为风险中性定价 / delta 对冲和真实测度下的 quadratic hedging 优化目标不同。

## Moving Block Bootstrap

论文最后研究 model-free 训练数据生成。做法是从一条历史路径里抽取长度为 $b$ 的滑动区块，再有放回重采样并拼接成训练路径。

这里的核心问题是 $b$ 的选择。$b=1$ 退化为 IID bootstrap；$b$ 越大，保留的时间依赖越多，但可用区块数量和样本多样性会下降。论文用 DCC-GARCH 生成的路径作为实验环境，比较不同 $b$ 下 $v/d$ 和 $\boldsymbol q_0$ 的 bias、variance 和 RMSE。

论文的结论是，小区块，甚至 $b=1$，在 $v/d$ 和 $\boldsymbol q_0$ 的 RMSE 上表现最好；RNN 在小区块下的 $\boldsymbol q_0$ 估计误差明显小于 Single-net。Single-net 对 $b$ 更不敏感，但如果关心初始对冲量精度，RNN 更有优势。

## 我的讨论

我自己的理解放在最后：这篇论文的价值不是“提出一个新对冲器”，而是给出一个严谨的架构横向评估。它说明在部分可观测、状态随时间变化的金融系统里，历史记忆可以成为建模能力；同时也提醒我们，工程上 Single-net 这种简单稳定的基线仍然很重要。主问题没有加入交易成本和仓位约束，这是为了隔离架构差异，但也意味着它不是完整交易系统。
