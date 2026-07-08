---
paperSlug: deep-learning-enhanced-index-tracking
lang: zh
title: Deep learning for enhanced index tracking
shortTitle: 深度学习如何做增强指数跟踪
venue: Quantitative Finance
date: 2024-06-07
year: 2024
reading: 18
translated: false
lede: 这篇论文把增强指数跟踪写成一个动态再平衡问题：先按市值选出指数成分股，再让一个结构化神经网络在跟踪误差、超额收益、CVaR 风险和交易成本之间做权重分配。
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

## 论文从哪里开始

指数相关基金可以分成两类。第一类是 index tracking，也就是尽量复制指数、最小化跟踪误差。第二类是 enhanced index tracking，也就是在控制跟踪误差的同时争取超额收益。

这篇论文研究的是第二类问题，并把普通指数复制看作特殊情况。整个投资组合只交易指数成分股和现金，流程分两步：先选股，再做权重分配。论文在选股上采用传统且透明的准则：对 S&P 500 这类市值加权指数，按 free-float market capitalization 选择大盘成分股。真正要研究的是第二步，也就是这些股票和现金之间如何动态分配权重。

传统做法通常把权重分配写成单期优化问题：拿最近一两年的收益数据，定期重新优化一次。这个方法直接、可解释，但有一个问题：市场 regime 切换时，它可能追不上状态变化。因此论文提出用神经网络生成动态再平衡策略。

## 为什么不是随便套一个大网络

论文对 neural network policy 有三个顾虑。

第一，真实金融数据有限。和图像、语言任务相比，市场日频数据少得多，复杂网络很容易过拟合。第二，可扩展性很重要。如果把 $n$ 只股票的所有特征直接堆进标准 FNN，输入维度是 $O(n)$，股票数量一大网络就会变得很大。第三，金融投资需要一定可解释性，不能只是一个不知道为什么换仓的黑箱。

所以论文的 contribution 不是“用更大的网络”，而是设计一个小而结构化的网络：main、score、gate、memory 四个 block 分别处理不同信息；score 和 gate 在股票之间共享参数；同时把交易成本、不做空、不加杠杆、CVaR 约束放进问题里。

<figure>
  <img src="/assets/papers/eit-loss.svg" alt="增强指数跟踪训练目标由跟踪误差、超额收益、CVaR 惩罚和交易成本组成" />
  <figcaption>根据论文逻辑重绘的示意图。论文不是只优化收益，而是把跟踪误差、超额收益、下行风险和交易成本一起放进动态再平衡框架。</figcaption>
</figure>

## 控制变量和状态动态

假设已经选出 $n$ 只股票。时刻 $t$ 调仓前的权重为：

$$
\boldsymbol w_t=(w_{0,t},w_{1,t},\ldots,w_{n,t}),
$$

其中 $w_{0,t}$ 是现金权重，后面 $n$ 个分量是股票权重。调仓后的权重为：

$$
\tilde{\boldsymbol w}_t=(\tilde w_{0,t},\tilde w_{1,t},\ldots,\tilde w_{n,t}).
$$

论文把当前组合价值归一化为 1。若比例交易成本为 $\rho$，调仓后总权重满足：

$$
\sum_{i=0}^n \tilde w_{i,t}
=
1-\rho\sum_{i=1}^n
\left|\tilde w_{i,t}-w_{i,t}\right|
\le 1.
$$

控制变量是股票权重 $\tilde{\boldsymbol w}_{S,t}$，并满足不做空、不加杠杆：

$$
\left\{
\tilde{\boldsymbol w}_{S,t}\in\mathbb R^n:
\tilde w_{i,t}\ge 0,\ i=1,\ldots,n,\quad
\sum_{i=1}^n \tilde w_{i,t}\le 1
\right\}.
$$

下一期组合收益为：

$$
r_{P,t+1}
=
\sum_{i=0}^{n}\tilde w_{i,t}r_{i,t+1}
-
\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|.
$$

所以交易成本不是事后扣一下，而是直接进入收益和状态更新。状态 $X_t$ 在 $t=0$ 时是初始权重，之后包含组合收益和当前权重；神经网络的输出会通过状态转移函数影响下一期状态。

## EIT 的目标函数

论文假设组合收益 $r_{P,t}$ 和指数收益 $r_{I,t}$ 是平稳的。两个基本目标是：

$$
L_{\mathrm{TE}}
=
\sqrt{
\mathbb E\left[
(r_{P,t}-r_{I,t})^2
\right]
},
$$

也就是日收益的 root mean squared tracking error；以及：

$$
L_{\mathrm{ER}}
=
\mathbb E[r_{P,t}-r_{I,t}],
$$

也就是平均日超额收益。EIT 的目标函数是二者的线性组合：

$$
L_{\mathrm{EIT}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}},
\qquad \lambda\ge 0.
$$

当 $\lambda=0$ 时，就是普通 index tracking。论文实验中，IT 取 $\lambda=0$，EIT 取 $\lambda=20$。这个取值来自实验尺度：日频 tracking error 大约在 $10^{-3}$，日频 excess return 大约在 $10^{-4}$。如果不放大超额收益项，训练时它容易被 tracking objective 淹没。

<figure>
  <img src="/assets/papers/original/eit-large-lambda-wealth-comparison.jpg" alt="论文原图：λ=20 的增强指数跟踪实验中不同策略的财富路径对比" />
  <figcaption>论文 PDF 原图，Figure 5(b)。这是 λ=20 的 EIT 实验。NN-ISR 在 MER、Sharpe ratio 和 CR 上表现最好，但 EIT 本身没有显式控制风险，因此所有策略的 95%-CVaR 都高于指数，MDD 也可能较大。</figcaption>
</figure>

## CVaR 约束

论文进一步考虑下行风险。对收益 $r$ 的分布 $\Phi$，$(1-\alpha)$-level VaR 和 CVaR 定义为：

$$
\mathrm{VaR}_\alpha(r)
=
-\inf\{u\in\mathbb R:\Phi(u)>\alpha\},
$$

$$
\mathrm{CVaR}_\alpha(r)
=
\mathbb E[-u\mid -u\ge \mathrm{VaR}_\alpha(r)].
$$

直接在深度学习里加入 $\mathrm{CVaR}_\alpha(r_{P,t})\le c$ 不方便。论文把它转成罚项：

$$
\gamma(\mathrm{CVaR}_\alpha(r_{P,t})-c)^+.
$$

但 ReLU 罚项不够平滑，所以用 Softplus：

$$
g_\beta(x)=\frac{\log(1+e^{\beta x})}{\beta}.
$$

<figure>
  <img src="/assets/papers/original/eit-softplus-approximation.jpg" alt="论文原图：不同 beta 参数下 Softplus 对 ReLU 惩罚函数的近似" />
  <figcaption>论文 PDF 原图，Figure 1。β 越大，Softplus 越接近 ReLU。Softplus 在 0 附近位于 ReLU 上方，因此作为罚项时约束会更严格，也更适合训练。</figcaption>
</figure>

EIT-CVaR 的目标函数是：

$$
L_{\mathrm{EIT-CVaR}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}}
+
\gamma g_\beta\left(
\mathrm{CVaR}_\alpha(r_{P,t})-c
\right).
$$

S&P 500 实验中，论文取 $\lambda=20$、$c=3\%$、$\alpha=5\%$、$\gamma=10^6$、$\beta=2000$。其中 $c=3\%$ 对应测试前 S&P 500 日收益 95%-CVaR 的历史水平。

## 四类特征

论文输入给网络的特征有四类。

第一类是指数 regime probability。论文对指数单独拟合一个两状态 HMM，用 EM 估计参数，用 forward algorithm 滤波得到：

$$
p_{I,t}=P(q_{I,t}=1\mid r_{I,1:t}).
$$

第二类是每只股票自己的 regime probability：

$$
p_{i,t}=P(q_{i,t}=1\mid r_{i,1:t}),\qquad i=1,\ldots,n.
$$

这些概率再用最近若干天平均进行 smoothing，得到 $\bar p_{I,t}$ 和 $\bar{\boldsymbol p}_{S,t}$。

第三类是短期特征，包括每只股票最近 $k$ 日均值、波动率、beta，以及指数最近 $k$ 日均值和波动率。第四类是当前股票权重 $\boldsymbol w_{S,t}$，用于控制交易成本。

<figure>
  <img src="/assets/papers/original/eit-sp500-long-history.jpg" alt="论文原图：2000 年到 2022 年 S&P 500 指数的长期走势和市场状态背景" />
  <figcaption>论文 PDF 原图。背景色是由价格数据滤波得到的 regime 信息。论文后续把这类 regime probability 输入神经网络。</figcaption>
</figure>

## 四块网络结构

论文的 architecture 对应 PPT 里最核心的一页：main block、score block、gate block、memory block。

<figure>
  <img src="/assets/papers/eit-network.svg" alt="增强指数跟踪四模块网络结构：main, score, gate, memory" />
  <figcaption>根据论文网络结构重绘的示意图。main 用指数 regime；score 用短期特征；gate 用股票 regime；memory 用当前权重和候选权重差异。</figcaption>
</figure>

**main block** 学两套长期配置：bull allocation 和 bear allocation。它先通过 softmax 得到 $\tilde{\boldsymbol w}_{\mathrm{bull}}$ 和 $\tilde{\boldsymbol w}_{\mathrm{bear}}$，再根据指数 bull regime 的权重 $\omega_{\mathrm{bull}}$ 混合：

$$
\tilde{\boldsymbol w}_{1,t}
=
\omega_{\mathrm{bull},t}\tilde{\boldsymbol w}_{\mathrm{bull}}
+
(1-\omega_{\mathrm{bull},t})
\tilde{\boldsymbol w}_{\mathrm{bear}}.
$$

**score block** 对每只股票的短期特征打分。由于 score block 在股票之间共享参数，网络大小不会随股票数线性膨胀。得到短期权重 $\tilde{\boldsymbol w}_{\mathrm{sc},t}$ 后，再和长期权重混合：

$$
\tilde{\boldsymbol w}_{2,t}
=
(1-\omega_1)\tilde{\boldsymbol w}_{\mathrm{sc},t}
+
\omega_1\tilde{\boldsymbol w}_{1,t}.
$$

**gate block** 根据每只股票的 regime probability 生成 $\tilde g_{i,t}\in(0,1)$，逐股票缩放候选权重：

$$
\tilde{\boldsymbol w}_{3,t}
=
\tilde{\boldsymbol g}_t
\circ
\tilde{\boldsymbol w}_{2,t}.
$$

**memory block** 只在 $\rho>0$ 时使用。它读取候选权重和当前权重的距离，输出 $\omega_{p,t}$，抵消一部分 proposed weight changes：

$$
\tilde{\boldsymbol w}_{S,t}
=
(1-\omega_{p,t})\tilde{\boldsymbol w}_{3,t}
+
\omega_{p,t}\boldsymbol w_{S,t}.
$$

网络规模很小：main、gate、memory 都是 $1\to5\to1$，score block 是 $1\to5\to5\to1$。隐藏层使用 GELU；main、gate、memory 的输出用 Sigmoid，score 输出为实数。

## 实验设置

S&P 500 实验使用 2000-01-03 开始的日频 adjusted close。股票池是测试前按市值排序的 top-20 S&P 500 成分股，上市晚于 2000-01-03 的股票被过滤。现金收益设为 0。

训练和测试采用滚动方案：先用 2000-2016 训练，测试 2017；再用 2000-2017 训练，测试 2018；一直滚动到 2022。每年重新拟合 HMM 生成 regime probabilities，并重新训练 policy。

任务有三类：IT、EIT、EIT-CVaR。股票数量有两种：top 5 和 top 20。交易成本有两种：$\rho=0$ 和 $\rho=0.005$，后者是 50 basis points。再平衡周期取 $T_{\mathrm{rb}}=5$ 个交易日，因为它与日频再平衡在超额收益和 CVaR 控制上接近，但交易成本低得多。

论文比较五种 policy：四个神经网络策略和一个 re-optimization benchmark。

| Policy | 使用的特征 | 使用的 block |
|---|---|---|
| NN-ST | 短期特征、当前权重 | score、memory |
| NN-IR | 指数 regime、当前权重 | main、memory |
| NN-ISR | 指数 regime、股票 regime、当前权重 | main、gate、memory |
| NN-All | 指数 regime、短期特征、股票 regime、当前权重 | main、score、gate、memory |
| RO | 最近两年数据滚动再优化 | 传统优化基线 |

指标包括 TE、MER、IR、CR、Sharpe ratio、loss、95%-CVaR、MDD 和 ATC。论文特别说明，所有收益指标都已经扣除交易成本。

## IT 结果：神经网络优势不明显

普通 index tracking 的结果比较直接。所有策略长期都能跟踪指数趋势。top 5 股票时，NN-ST 的 TE 最小；top 20 股票时，RO 最好。

论文对这个现象的解释是：IT 更像 regression-type problem。RO 的单期优化本来就能直接做回归式的跟踪组合构造，因此神经网络可以改进的空间不大。

## EIT 结果：regime 特征变得关键

EIT 的目标加入了超额收益。论文发现，NN-ISR 在四个 S&P 500 案例中都在 MER、Sharpe ratio 和 CR 上优于其他策略。它使用 index regime 和 stock regime，但不使用短期特征；这说明 regime 信息对 EIT 更关键。

NN-IR 和 NN-All 的收益表现也不错，NN-IR 在四个案例中的三个取得最高 IR。相反，只用短期特征的 NN-ST 在收益指标上较弱，并且风险最大。

但 EIT 的问题也很明确：它没有直接控制风险。所有策略的 95%-CVaR 都大于指数，MDD 也较大。因此论文并没有把 EIT 结果解读成可以直接部署的最终策略，而是进一步引入 EIT-CVaR。

<figure>
  <img src="/assets/papers/original/eit-eit-weights-nn-isr.jpg" alt="论文原图：EIT 中 NN-ISR 的再平衡权重" />
  <figcaption>论文 PDF 原图，Figure 7(c)。EIT 下 NN-ISR 会高度集中到某些股票，也会在 2020 年市场下跌时显著提高现金权重。PPT 将这里标注为 flight to safety。</figcaption>
</figure>

## EIT-CVaR 结果：用部分收益换风险控制

加入 CVaR 约束后，所有策略的 95%-CVaR 都控制在 3% 以下。MDD 也比 EIT 明显下降，虽然 MDD 并没有被直接放进约束。

代价是收益降低。论文的表述很直接：price for smaller risk is smaller returns。RO 在 EIT-CVaR 中变得过度保守，长期持有较多现金，导致收益表现差。NN-IR 和 NN-ST 也偏保守，跟踪误差较小但收益也较低。NN-ISR 和 NN-All 则仍然在 MER、IR、Sharpe ratio 和 CR 上表现较好。

<figure>
  <img src="/assets/papers/original/eit-sp500-wealth-comparison.jpg" alt="论文原图：S&P 500 EIT-CVaR 实验中不同策略的财富路径对比" />
  <figcaption>论文 PDF 原图，Figure 5(c)。这是 EIT-CVaR 的财富路径。相比 EIT，CVaR 约束降低了风险；NN-ISR 和 NN-All 仍然优于 RO 的收益指标。</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-cvar-weights-nn-isr.jpg" alt="论文原图：EIT-CVaR 中 NN-ISR 的再平衡权重" />
  <figcaption>论文 PDF 原图，Figure 8(c)。加入 CVaR 后，NN-ISR 更分散，也在 2020 年提高现金权重。论文用它说明 stock regime 和 gate block 对下行保护的重要性。</figcaption>
</figure>

## 从权重图看 policy

论文的权重图是理解模型的关键。

IT 中，各策略通常较均匀地配置股票和现金，并且权重变化较慢。NN-ST 表现好，主要来自 score block 对短期特征的使用。

EIT 和 EIT-CVaR 中，策略会更集中于某些股票；加入 CVaR 后会更分散，但 AAPL 在 NN-ISR 和 NN-All 中仍然占较大权重。NN-ISR 和 NN-All 的特点是灵活：牛市中更多持有高收益股票，熊市中减少股票并增加现金。2020 年市场下跌时，这种 cash weight 的上升就是 PPT 里强调的 flight to safety。

RO 在 EIT 中不能很好地 flight to safety；在 EIT-CVaR 中可以提高现金，但恢复后长时间重仓现金，因而过度保守。NN-IR 只用 index regime，也能随市场 regime 切换调整权重，但 flight to safety 不如 NN-ISR 明显。这说明 gate block 中的 stock regime 信息很重要。

## main、gate、memory 分别学到了什么

论文还展示了各个 block 的输入输出曲线。

<figure>
  <img src="/assets/papers/original/eit-main-switch.jpg" alt="论文原图：main block 中指数 regime 概率与 bull allocation 权重的关系" />
  <figcaption>论文 PDF 原图，Figure 9(b)。main block 像一个 switch：只有当指数 bull regime probability 足够高时，模型才给 bull allocation 显著权重。</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-gate-curve.jpg" alt="论文原图：gate block 中股票 regime 概率与 gate 权重的关系" />
  <figcaption>论文 PDF 原图，Figure 9(c)。gate block 会根据股票当前状态降低 proposed weight。EIT-CVaR 中 gate 更保守，这是风险控制的需要。</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-memory-curve.jpg" alt="论文原图：memory block 中权重变化幅度与取消调仓比例的关系" />
  <figcaption>论文 PDF 原图，Figure 9(d)。ωp 表示 proposed change 被取消的比例。小幅调仓更容易被 memory block 抑制；大幅调仓通常对应市场状态显著变化，因此不应完全被交易成本阻止。</figcaption>
</figure>

这三张图对应论文的 feature importance 结论：IT 中短期特征最有用；EIT 和 EIT-CVaR 中，index regime 和 stock regime 都重要。只考虑短期特征不能得到满意的 EIT 结果。

## 交易成本的影响

IT 中，各策略权重变化慢，所以交易成本低。EIT 和 EIT-CVaR 中，神经网络策略调仓更剧烈、更频繁，因此交易成本对收益影响明显。

但论文的结论不是“交易成本毁掉了神经网络策略”。相反，使用合适特征的神经网络策略仍然优于 RO。并且收益表现最好的 NN-ISR 并不是交易成本最高的策略。这说明 memory block 的设计确实起作用。

<figure>
  <img src="/assets/papers/original/eit-cash-weight-memory.jpg" alt="论文原图：交易成本下 NN-ISR 与 RO 的现金权重变化" />
  <figcaption>论文 PDF 原图，Figure 10(c)。有交易成本时，memory block 让 NN-ISR 的现金权重变化更平滑；RO 的现金权重变化更滞后。</figcaption>
</figure>

## 跨市场补充

论文还在 S&P 100、FTSE 100 和 Nikkei 225 上测试 EIT-CVaR + 交易成本，股票数量取 $n=5,20,40$。训练期从 2003 年开始，测试期为 2019-2023。CVaR 约束分别设置为 3%、2.7%、3.3%，接近各指数训练期的 95%-CVaR 估计。

结果是：除 FTSE 100 和 Nikkei 225 的 5 只股票案例外，NN-ISR 在 9 个案例中的 7 个取得更低 test loss 和更高 CR、Sharpe ratio；MER 和 IR 在 8 个案例中优于 RO。论文据此认为 NN-ISR 相对 RO 的改善对指数和股票数量变化具有一定稳健性。

Nikkei 225 是一个重要反例。NN-ISR 和 RO 都没有产生相对指数的 excess CR。论文给出两个原因：按市值选出的 Nikkei 225 大盘股本身表现较差；CVaR 约束让策略更保守，进一步牺牲收益。因此，论文最后指出后续需要改进 stock selection，特别是在大盘股表现不好的市场里。

## 论文结论

论文的结论可以按 PPT 的最后一页来概括。

第一，提出了一个 data-driven deep learning method，用于 EIT 的动态再平衡。第二，引入 index regime 和 stock regime 作为特征，并发现它们对提升 EIT 投资表现很关键。第三，网络结构被设计成 parsimonious、scalable、easy to train，并且有更好的 interpretability。第四，实证结果验证了该方法相对 conventional RO method 的优势。第五，框架本身是 flexible 的，可以继续加入更多特征和约束。

## 我的讨论

我自己的理解放在这里，而不是混进论文结论里。文章最核心的线索是：这不是“深度学习魔法选股”，而是一个结构化动态控制框架。选股仍然采用市值准则；真正的创新在于权重分配里显式利用 regime、CVaR 和交易成本。

因此它的优势主要来自两点：一是 regime-driven 的动态调仓，尤其是 2020 年那种 flight to safety；二是 memory block 对交易成本的控制。它也有清楚的边界：regime 实时识别有噪声，按市值选股依赖市场环境，超额收益不是无条件保证。
