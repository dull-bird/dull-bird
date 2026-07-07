---
paperSlug: deep-learning-enhanced-index-tracking
lang: zh
title: Deep learning for enhanced index tracking
shortTitle: 深度学习如何做增强指数跟踪
venue: Quantitative Finance
date: 2024-06-07
year: 2024
reading: 15
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

## 这篇论文在解决什么问题

论文研究的是 enhanced index tracking，增强指数跟踪。它和普通指数复制的区别是：普通指数复制只要求组合尽量贴近指数；增强指数跟踪还希望在控制跟踪误差的同时获得正的超额收益。

论文里不是让模型自由选全市场股票，而是先按市值从指数成分股里选出 top-$n$ 大盘股，然后研究如何动态分配这些股票和现金的权重。也就是说，难点主要在动态调权，而不是股票池挖掘。

这篇论文把问题写成随机控制问题，用深度学习近似动态再平衡策略。模型需要同时处理四件事：跟踪误差、超额收益、CVaR 下行风险约束，以及交易成本。

<figure>
  <img src="/assets/papers/eit-loss.svg" alt="增强指数跟踪训练目标由跟踪误差、超额收益、CVaR 惩罚和交易成本组成" />
  <figcaption>根据论文问题设定重绘的示意图。主目标是 tracking error 和 excess return；CVaR 用作下行风险约束；交易成本直接进入组合权重动态和收益。</figcaption>
</figure>

## Loss 和约束

设指数收益为 $r_{I,t}$，组合收益为 $r_{P,t}$。普通指数复制对应 tracking error：

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

所以 EIT 的目标函数写成：

$$
L_{\mathrm{EIT}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}},
\qquad \lambda \ge 0.
$$

其中 $\lambda\ge 0$。当 $\lambda=0$ 时，问题退化为普通指数复制；当 $\lambda>0$ 时，目标函数开始奖励超额收益。

论文实验中 EIT 使用 $\lambda=20$。原因不是任意放大超额收益，而是 IT 实验显示日频 tracking error 在 $10^{-3}$ 量级，日频 excess return 在 $10^{-4}$ 量级。为了让两项目标在训练时量级可比，需要相对较大的 $\lambda$，同时论文也说明这个取值不会低估 tracking objective。

<figure>
  <img src="/assets/papers/original/eit-large-lambda-wealth-comparison.jpg" alt="论文原图：λ=20 的增强指数跟踪实验中不同策略的财富路径对比" />
  <figcaption>论文 PDF 原图，Figure 5(b) 的 EIT 结果。该实验使用 λ=20。论文结论是：NN-ISR 在 MER、Sharpe ratio 和 CR 上表现最好；但 EIT 本身没有显式控制风险，所以所有策略的 95%-CVaR 都比指数更高，MDD 也可能较大。</figcaption>
</figure>

组合由 $n$ 只股票和现金组成。调仓前权重是 $\boldsymbol w_t$，调仓后权重是 $\tilde{\boldsymbol w}_t$。交易成本为比例成本 $\rho$，预算约束为：

$$
1-\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|
=
\sum_{i=0}^{n}\tilde w_{i,t}.
$$

不做空、不加杠杆的可行域是：

$$
\left\{
\tilde{\boldsymbol w}_{S,t}\in\mathbb R^n:
1-\sum_{i=1}^n \tilde w_{i,t}\ge 0,
\tilde w_{i,t}\ge 0
\right\}.
$$

组合下一期收益为：

$$
r_{P,t+1}
=
\sum_{i=0}^{n}\tilde w_{i,t} r_{i,t+1}
-
\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|.
$$

因此，交易成本不是事后才扣除，而是在权重动态和收益定义里直接出现。

论文进一步加入 CVaR 约束 $\mathrm{CVaR}_\alpha(r_{P,t})\le c$。由于 ReLU 型罚项在约束满足区域梯度为零，并且在边界附近不够平滑，论文用 Softplus 近似：

$$
g_\beta(x)
=
\frac{\log(1+\exp(\beta x))}{\beta}.
$$

<figure>
  <img src="/assets/papers/original/eit-softplus-approximation.jpg" alt="论文原图：不同 beta 参数下 Softplus 对 ReLU 惩罚函数的近似" />
  <figcaption>论文 PDF 原图，Figure 1。β 越大，Softplus 越接近 ReLU；Softplus 总在 ReLU 上方，尤其在 0 附近更明显，因此用它近似会得到更严格的约束。</figcaption>
</figure>

罚项写成：

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

在 S&P 500 实验里，论文取 $c=3\%$、$\alpha=5\%$、$\gamma=10^6$、$\beta=2000$。$c=3\%$ 来自 2000-2016 年 S&P 500 日收益 95%-CVaR 的历史估计；$\gamma$ 和 $\beta$ 的选择是为了让罚项量级和 $\hat L_{\mathrm{EIT}}$ 可比，同时让约束足够严格。

## 网络结构和特征

论文的网络不是一个单纯的全连接黑箱，而是把特征和结构按金融含义拆开。输入特征包括四类：指数 regime 概率、个股 regime 概率、短期特征，以及当前权重。短期特征包括个股和指数的近期均值、波动、beta 等。当前权重用于让模型感知交易成本。

<figure>
  <img src="/assets/papers/eit-network.svg" alt="增强指数跟踪四模块网络结构：main, score, gate, memory" />
  <figcaption>根据论文网络结构重绘的示意图。四个 block 分别使用 regime、短期特征和当前持仓信息，最后输出股票权重。</figcaption>
</figure>

**main block** 学习两套长期基础权重：牛市权重 $\tilde{\boldsymbol w}_{\mathrm{bull}}$ 和熊市权重 $\tilde{\boldsymbol w}_{\mathrm{bear}}$，再根据指数 regime 概率混合：

$$
\tilde{\boldsymbol w}_{1,t}
=
\omega_{\mathrm{bull},t}\tilde{\boldsymbol w}_{\mathrm{bull}}
+
(1-\omega_{\mathrm{bull},t})\tilde{\boldsymbol w}_{\mathrm{bear}}.
$$

**score block** 对每只股票的短期特征打分，得到短期权重 $\tilde{\boldsymbol w}_{\mathrm{sc},t}$，再和 main block 的长期权重混合：

$$
\tilde{\boldsymbol w}_{2,t}
=
(1-\omega_1)\tilde{\boldsymbol w}_{\mathrm{sc},t}
+
\omega_1 \tilde{\boldsymbol w}_{1,t}.
$$

**gate block** 基于个股 regime 概率，对每只股票的建议权重做逐元素缩放：

$$
\tilde{\boldsymbol w}_{3,t}
=
\tilde{\boldsymbol g}_t
\circ
\tilde{\boldsymbol w}_{2,t}.
$$

**memory block** 使用候选权重和当前权重之间的距离，控制最终调仓幅度：

$$
\tilde{\boldsymbol w}_{S,t}
=
(1-\omega_{p,t})\tilde{\boldsymbol w}_{3,t}
+
\omega_{p,t}\boldsymbol w_{S,t}.
$$

<figure>
  <img src="/assets/papers/original/eit-transaction-cost-comparison.jpg" alt="论文原图：不同交易成本设定下模型和滚动优化基线的权重路径对比" />
  <figcaption>论文 PDF 原图。论文讨论 transaction costs 时指出，EIT 和 EIT-CVaR 中神经网络策略更容易频繁调仓，但 memory block 能让权重变化更平滑，从而控制交易成本。</figcaption>
</figure>

这些 block 都很小：main、gate、memory 只有一个隐藏层、5 个节点；score block 用两个隐藏层、每层 5 个节点。论文强调这种参数共享和小网络设计可以缓解数据不足，也让模型在资产数量增加时仍然可训练。

## 实验设计和主要结果

论文首先在 S&P 500 上比较 IT、EIT、EIT-CVaR 三个问题，股票数量取 $n=5$ 和 $n=20$，并分别考虑无交易成本和 $\rho=0.005$ 的情况。训练采用滚动扩窗：每年年初用历史数据重新估计 regime 和训练网络，再测试下一年。再平衡频率选为 5 个交易日，因为论文发现它在收益和 CVaR 控制上接近日频再平衡，但交易成本更低。

<figure>
  <img src="/assets/papers/original/eit-sp500-long-history.jpg" alt="论文原图：2000 年到 2022 年 S&P 500 指数的长期走势和市场状态背景" />
  <figcaption>论文 PDF 原图。背景色展示由价格数据滤波得到的 regime 信息。论文后续用这些 regime 概率作为神经网络输入。</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-sp500-wealth-comparison.jpg" alt="论文原图：S&P 500 实验中不同神经网络模型与滚动优化基线的财富路径对比" />
  <figcaption>论文 PDF 原图，Figure 5(c) 的 EIT-CVaR 结果。相比 EIT，CVaR 约束降低了风险；NN-ISR 和 NN-All 仍然在 MER、IR、Sharpe ratio、CR 等收益指标上优于 RO。</figcaption>
</figure>

论文的 S&P 500 结论分三层：

**IT。** 普通指数复制更像 regression-type problem。RO 基线已经能直接构造较好的跟踪组合，所以神经网络相对 RO 的提升空间有限。

**EIT。** NN-ISR，也就是同时使用 index regime 和 stock regime 的策略，在 MER、Sharpe ratio 和 CR 上表现最好。论文同时指出，EIT 没有控制风险，因此虽然能产生 impressive excess returns，但所有策略的 95%-CVaR 都比指数更高，部署时存在风险。

**EIT-CVaR。** 加入 CVaR 约束后，所有策略的 95%-CVaR 都被控制在 3% 以下，MDD 也显著低于 EIT。以 5 只股票、$\rho=0.005$ 的案例为例，NN-ISR 或 NN-All 的 MDD 约为 19%，低于 S&P 500 的 33.9%。代价是 MER 和 CR 下降。论文把这解释为用部分收益换取风险控制。

## 特征重要性和交易成本

论文的特征重要性结论是：IT 中短期特征最有用；EIT 和 EIT-CVaR 中，index regime 和 stock regime 都很重要。NN-ISR 在多数收益指标上表现最好，且相对只使用 index regime 的 NN-IR 有明显改善。

论文特别讨论了 2020 年 3 月的市场下跌。NN-ISR 比 NN-IR 持有更多现金，因为它不仅识别到指数处于熊市，还通过 stock regime 看到个股表现恶化，并通过 gate block 进一步降低股票仓位。这是论文用来说明 stock regime 重要性的核心例子。

交易成本方面，论文指出所有神经网络策略的平均每笔交易成本最多只有几个 basis points。EIT 和 EIT-CVaR 中策略调仓更频繁，因此交易成本影响明显；但使用合适特征的神经网络策略仍然优于 RO，说明 memory block 能有效控制交易成本。论文还指出，收益表现最好的 NN-ISR 并不是成本最高的策略。

## 跨市场结果

论文进一步在 S&P 100、FTSE 100、Nikkei 225 上测试 EIT-CVaR + 交易成本，股票数量取 $n=5,20,40$。训练期从 2003 年开始，测试期为 2019-2023，CVaR 约束分别设置为 3%、2.7%、3.3%，接近各指数训练期的 95%-CVaR 估计。

结果是：除 FTSE 100 和 Nikkei 225 的 5 只股票案例外，NN-ISR 在 9 个案例中的 7 个取得更低 test loss 和更高 CR、Sharpe ratio；MER 和 IR 在 8 个案例中优于 RO。论文据此认为 NN-ISR 相对 RO 的改善对指数和股票数量变化具有一定稳健性。

论文也明确指出 Nikkei 225 是反例：NN-ISR 和 RO 都没有产生相对指数的 excess CR。原因有两个：第一，按市值选出的 Nikkei 225 大盘股本身表现较差；第二，CVaR 约束让策略更保守，会牺牲部分收益。因此，论文最后说后续还需要改进 stock selection，特别是在大盘股表现不好的市场里。

## 我的讨论

我自己的理解放在这里，而不是混进论文结论里：这篇论文最值得迁移的地方，是把 regime、下行风险和交易成本显式放进动态资产配置框架。它不是在证明“深度学习一定产生超额”，而是在展示一个结构化、可解释、成本感知的增强指数跟踪框架。真正的风险点也很清楚：regime 实时识别有噪声，按市值选股会受市场风格影响，超额收益仍然依赖被选股票本身是否有足够表现。
