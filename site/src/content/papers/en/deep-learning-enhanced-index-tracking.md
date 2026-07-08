---
paperSlug: deep-learning-enhanced-index-tracking
lang: en
title: Deep learning for enhanced index tracking
shortTitle: Deep learning for enhanced index tracking
venue: Quantitative Finance
date: 2024-06-07
year: 2024
reading: 17
translated: true
lede: "This paper formulates enhanced index tracking as a dynamic rebalancing problem: select large index constituents, then let a structured neural network allocate weights under tracking-error, excess-return, CVaR, and transaction-cost considerations."
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

## The Problem

Index-related funds include two related but different tasks. Index tracking minimizes tracking error relative to a benchmark. Enhanced index tracking tries to obtain excess return while controlling tracking error.

The article studies enhanced index tracking and treats ordinary index tracking as a special case. The portfolio trades index constituents and cash. The workflow has two steps: stock selection and weight allocation. For stock selection, the method uses a transparent criterion: select large constituents of the S&P 500 by free-float market capitalization. The main research problem is the second step, how to dynamically allocate weights among selected stocks and cash.

Conventional weight allocation is usually formulated as a single-period optimization problem. It uses recent one- or two-year returns and periodically re-optimizes. The drawback is that such a policy may not catch up with regime switches. The proposed alternative is a neural-network-generated dynamic rebalancing policy.

## Why Not A Large Black Box

The paper identifies three concerns for neural-network policies in this problem.

First, real market data are limited compared with other deep learning domains, so overly sophisticated models can overfit. Second, scalability matters: directly feeding $O(n)$ stock features into a standard FNN creates a large network when the number of stocks grows. Third, an investment policy needs some interpretability.

The contribution is therefore not a larger network. It is a small structured architecture with four blocks: main, score, gate, and memory. These blocks use different features, share parameters where possible, and incorporate transaction cost, no-short-selling, no-leverage, and CVaR control.

<figure>
  <img src="/assets/papers/eit-loss.svg" alt="Enhanced index tracking loss components: tracking error, excess return, CVaR penalty, and trading cost" />
  <figcaption>A redrawn diagram following the paper's formulation. Tracking error, excess return, downside risk, and transaction cost are handled inside one dynamic rebalancing framework.</figcaption>
</figure>

## Control Variables And State Dynamics

Suppose $n$ stocks have been selected. The pre-trade weight vector at time $t$ is:

$$
\boldsymbol w_t=(w_{0,t},w_{1,t},\ldots,w_{n,t}),
$$

where $w_{0,t}$ is the cash weight. The post-trade weight vector is:

$$
\tilde{\boldsymbol w}_t=(\tilde w_{0,t},\tilde w_{1,t},\ldots,\tilde w_{n,t}).
$$

The current portfolio value is normalized to 1. With proportional transaction cost ratio $\rho$, post-trade weights satisfy:

$$
\sum_{i=0}^n \tilde w_{i,t}
=
1-\rho\sum_{i=1}^n
\left|\tilde w_{i,t}-w_{i,t}\right|
\le 1.
$$

The control variable is the stock-weight vector $\tilde{\boldsymbol w}_{S,t}$, subject to no short selling and no leverage:

$$
\left\{
\tilde{\boldsymbol w}_{S,t}\in\mathbb R^n:
\tilde w_{i,t}\ge 0,\ i=1,\ldots,n,\quad
\sum_{i=1}^n \tilde w_{i,t}\le 1
\right\}.
$$

The next-period portfolio return is:

$$
r_{P,t+1}
=
\sum_{i=0}^{n}\tilde w_{i,t}r_{i,t+1}
-
\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|.
$$

Transaction cost is therefore not an after-the-fact deduction. It directly enters realized return and the state transition. The state $X_t$ is the initial weight at $t=0$ and then includes portfolio return and current weights.

## The EIT Objective

The paper assumes that portfolio and index returns are stationary. The first objective is the root mean squared tracking error of daily returns:

$$
L_{\mathrm{TE}}
=
\sqrt{
\mathbb E\left[
(r_{P,t}-r_{I,t})^2
\right]
}.
$$

The second objective is mean daily excess return:

$$
L_{\mathrm{ER}}
=
\mathbb E[r_{P,t}-r_{I,t}].
$$

The EIT objective is:

$$
L_{\mathrm{EIT}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}},
\qquad \lambda\ge 0.
$$

When $\lambda=0$, the problem becomes ordinary index tracking. In the experiments, IT uses $\lambda=0$ and EIT uses $\lambda=20$. This value is chosen because daily tracking error is around the $10^{-3}$ scale while daily excess return is around the $10^{-4}$ scale; without a relatively large $\lambda$, the excess-return term would be underweighted.

<figure>
  <img src="/assets/papers/original/eit-large-lambda-wealth-comparison.jpg" alt="Original paper figure: wealth paths in the enhanced index tracking experiment with lambda equal to 20" />
  <figcaption>Original figure extracted from the paper PDF, Figure 5(b). This is the EIT experiment with λ=20. NN-ISR performs best in MER, Sharpe ratio, and CR, but EIT does not explicitly control risk: all policies have higher 95%-CVaR than the index, and MDD can be large.</figcaption>
</figure>

## CVaR Control

The paper then controls downside risk. Given the return distribution $\Phi$, VaR and CVaR are defined as:

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

Adding $\mathrm{CVaR}_\alpha(r_{P,t})\le c$ directly is difficult in deep learning, so the paper converts it to a penalty:

$$
\gamma(\mathrm{CVaR}_\alpha(r_{P,t})-c)^+.
$$

Instead of a ReLU penalty, the paper uses the Softplus function:

$$
g_\beta(x)=\frac{\log(1+e^{\beta x})}{\beta}.
$$

<figure>
  <img src="/assets/papers/original/eit-softplus-approximation.jpg" alt="Original paper figure: Softplus approximations to a ReLU penalty under different beta values" />
  <figcaption>Original figure extracted from the paper PDF, Figure 1. A larger β makes Softplus closer to ReLU. Since Softplus stays above ReLU near zero, it imposes a stricter and smoother penalty.</figcaption>
</figure>

The EIT-CVaR objective is:

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

For the S&P 500 experiments, the paper sets $\lambda=20$, $c=3\%$, $\alpha=5\%$, $\gamma=10^6$, and $\beta=2000$. The value $c=3\%$ corresponds to the pre-test historical 95%-CVaR level of S&P 500 daily returns.

## Features

The network uses four classes of features.

The first feature is the index regime probability. The paper fits a two-state HMM for the index and uses the forward algorithm to filter:

$$
p_{I,t}=P(q_{I,t}=1\mid r_{I,1:t}).
$$

The second feature is stock regime probability:

$$
p_{i,t}=P(q_{i,t}=1\mid r_{i,1:t}),\qquad i=1,\ldots,n.
$$

These probabilities are smoothed by recent averages, giving $\bar p_{I,t}$ and $\bar{\boldsymbol p}_{S,t}$.

The third feature class contains short-term features: recent mean, volatility, and beta for each stock, plus recent mean and volatility for the index. The fourth feature is the current stock-weight vector $\boldsymbol w_{S,t}$, used for transaction-cost control.

<figure>
  <img src="/assets/papers/original/eit-sp500-long-history.jpg" alt="Original paper figure: long-run S&P 500 path with market-regime background shading" />
  <figcaption>Original figure extracted from the paper PDF. Background colors show regime information filtered from price data and later used as input features.</figcaption>
</figure>

## Four Network Blocks

The key architecture consists of four blocks: main, score, gate, and memory.

<figure>
  <img src="/assets/papers/eit-network.svg" alt="Four-block enhanced index tracking network: main, score, gate, and memory" />
  <figcaption>A redrawn schematic of the paper's architecture. The main block uses index regime; the score block uses short-term features; the gate block uses stock regime; the memory block uses the distance between proposed and current weights.</figcaption>
</figure>

**The main block** learns a bull allocation and a bear allocation. It obtains $\tilde{\boldsymbol w}_{\mathrm{bull}}$ and $\tilde{\boldsymbol w}_{\mathrm{bear}}$ through softmax, then mixes them using the bull-regime weight $\omega_{\mathrm{bull}}$:

$$
\tilde{\boldsymbol w}_{1,t}
=
\omega_{\mathrm{bull},t}\tilde{\boldsymbol w}_{\mathrm{bull}}
+
(1-\omega_{\mathrm{bull},t})
\tilde{\boldsymbol w}_{\mathrm{bear}}.
$$

**The score block** scores each stock using short-term features. Since its parameters are shared across stocks, network size does not grow excessively with the number of stocks. It produces $\tilde{\boldsymbol w}_{\mathrm{sc},t}$, then mixes it with the long-term allocation:

$$
\tilde{\boldsymbol w}_{2,t}
=
(1-\omega_1)\tilde{\boldsymbol w}_{\mathrm{sc},t}
+
\omega_1\tilde{\boldsymbol w}_{1,t}.
$$

**The gate block** uses stock regime probabilities to generate $\tilde g_{i,t}\in(0,1)$ and scale candidate weights stock by stock:

$$
\tilde{\boldsymbol w}_{3,t}
=
\tilde{\boldsymbol g}_t
\circ
\tilde{\boldsymbol w}_{2,t}.
$$

**The memory block** is used only when $\rho>0$. It reads the distance between proposed and current weights and outputs $\omega_{p,t}$, canceling part of the proposed weight change:

$$
\tilde{\boldsymbol w}_{S,t}
=
(1-\omega_{p,t})\tilde{\boldsymbol w}_{3,t}
+
\omega_{p,t}\boldsymbol w_{S,t}.
$$

The networks are small: main, gate, and memory are $1\to5\to1$; the score block is $1\to5\to5\to1$. Hidden layers use GELU. The main, gate, and memory outputs use Sigmoid; the score output is real-valued.

## Experimental Setup

The S&P 500 experiment uses daily adjusted closing prices from January 3, 2000. The stock universe is the top-20 S&P 500 constituents by market cap before the test period, with stocks listed after January 3, 2000 filtered out. Cash return is assumed to be zero.

Training and testing follow a rolling scheme: train on 2000-2016 and test on 2017; train on 2000-2017 and test on 2018; continue through 2022. Each year, HMMs are refitted and neural-network policies are retrained.

There are three tasks: IT, EIT, and EIT-CVaR. There are two stock counts: top 5 and top 20. There are two transaction-cost settings: $\rho=0$ and $\rho=0.005$, or 50 basis points. The rebalancing period is $T_{\mathrm{rb}}=5$ trading days because it gives similar excess-return and CVaR performance to daily rebalancing with much lower transaction costs.

The paper compares five policies: four neural-network policies and one re-optimization benchmark.

| Policy | Features | Blocks |
|---|---|---|
| NN-ST | Short-term features, current weights | score, memory |
| NN-IR | Index regime, current weights | main, memory |
| NN-ISR | Index regime, stock regime, current weights | main, gate, memory |
| NN-All | Index regime, short-term features, stock regime, current weights | main, score, gate, memory |
| RO | Rolling recent-data optimization | conventional benchmark |

Performance metrics include TE, MER, IR, CR, Sharpe ratio, loss, 95%-CVaR, MDD, and ATC. The return measures are calculated after transaction costs.

## IT: Limited Neural-Network Advantage

For ordinary index tracking, all policies track the index trend over the long run. With five stocks, NN-ST has the smallest TE; with twenty stocks, RO is the best.

The paper's explanation is that IT is a regression-type problem. The RO baseline already constructs a strong tracking portfolio, so there is limited room for improvement by a more sophisticated model.

## EIT: Regime Features Become Important

When the excess-return objective is added, the conclusion changes. NN-ISR, which uses both index and stock regime probabilities, outperforms the others in MER, Sharpe ratio, and CR in all four S&P 500 cases. This indicates that regime information is more important for EIT.

NN-IR and NN-All also perform well in return measures, with NN-IR achieving the best IR in three out of four cases. By contrast, NN-ST, which only uses short-term features, performs poorly in returns and is the riskiest.

The weakness of EIT is also clear: it does not directly control risk. All policies have higher 95%-CVaR than the index, and MDD can be large. The paper therefore moves to EIT-CVaR.

<figure>
  <img src="/assets/papers/original/eit-eit-weights-nn-isr.jpg" alt="Original paper figure: NN-ISR rebalanced weights under EIT" />
  <figcaption>Original figure extracted from the paper PDF, Figure 7(c). Under EIT, NN-ISR concentrates in selected stocks and raises cash substantially during the 2020 crash. This is the flight-to-safety behavior discussed in the paper.</figcaption>
</figure>

## EIT-CVaR: Lower Risk At A Return Cost

After adding the CVaR constraint, all 95%-CVaR values are controlled below 3%. MDD also decreases relative to EIT, although it is not directly constrained.

The cost is lower return: smaller risk is paid for with smaller returns. RO becomes overly conservative in EIT-CVaR, holding too much cash for too long and producing poor return performance. NN-IR and NN-ST are also conservative. NN-ISR and NN-All still perform well in MER, IR, Sharpe ratio, and CR.

<figure>
  <img src="/assets/papers/original/eit-sp500-wealth-comparison.jpg" alt="Original paper figure: wealth paths for S&P 500 EIT-CVaR experiments" />
  <figcaption>Original figure extracted from the paper PDF, Figure 5(c). This is the EIT-CVaR wealth plot. CVaR control reduces risk relative to EIT, while NN-ISR and NN-All still outperform RO in return measures.</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-cvar-weights-nn-isr.jpg" alt="Original paper figure: NN-ISR rebalanced weights under EIT-CVaR" />
  <figcaption>Original figure extracted from the paper PDF, Figure 8(c). With CVaR control, NN-ISR becomes more diversified and still increases cash in 2020. The paper uses this to show the value of stock regimes and the gate block.</figcaption>
</figure>

## Reading The Weights

The rebalanced-weight figures are central to the paper's interpretation.

For IT, policies tend to invest in stocks and cash more evenly and update weights slowly. The good performance of NN-ST is credited to the score block.

For EIT and EIT-CVaR, policies tend to concentrate on selected stocks. The CVaR penalty leads to more diversification, but AAPL still receives a large weight under NN-ISR and NN-All. NN-ISR and NN-All show flexibility: they hold more high-return stocks in bull markets and more cash in bear markets. The rise in cash weight during the 2020 market meltdown is the flight-to-safety behavior emphasized by the paper.

RO cannot fly to safety well in EIT. In EIT-CVaR, it can increase cash, but then remains heavily invested in cash long after the recovery. NN-IR uses only index regime and can also switch weights, but its flight to safety is less obvious than NN-ISR's. This shows why the gate block and stock regimes matter.

## What The Blocks Learn

The paper also plots input-output curves of the learned blocks.

<figure>
  <img src="/assets/papers/original/eit-main-switch.jpg" alt="Original paper figure: index regime probability versus bull allocation weight in the main block" />
  <figcaption>Original figure extracted from the paper PDF, Figure 9(b). The main block acts like a switch: only when the index bull-regime probability is sufficiently large does the model assign substantial weight to the bull allocation.</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-gate-curve.jpg" alt="Original paper figure: stock regime probability versus gate output" />
  <figcaption>Original figure extracted from the paper PDF, Figure 9(c). The gate block reduces proposed stock weight based on the stock's current state. The EIT-CVaR gate is more conservative because of risk control.</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-memory-curve.jpg" alt="Original paper figure: proposed weight change versus memory block cancellation ratio" />
  <figcaption>Original figure extracted from the paper PDF, Figure 9(d). ωp is the proportion of proposed weight change canceled. Small changes are moderated more; large changes are allowed when they likely reflect a significant regime shift.</figcaption>
</figure>

These curves support the paper's feature-importance conclusion: short-term features are most useful for IT, while both index and stock regime probabilities are important for EIT and EIT-CVaR.

## Transaction Costs

In IT, transaction costs are low because weights change slowly. In EIT and EIT-CVaR, neural-network policies change weights more dramatically and frequently, so transaction costs matter.

The conclusion is not that transaction costs destroy the neural-network policies. Policies with appropriate features still outperform RO, and the best-return policy, NN-ISR, is not the most costly one. This supports the role of the memory block.

<figure>
  <img src="/assets/papers/original/eit-cash-weight-memory.jpg" alt="Original paper figure: cash-weight paths for NN-ISR and RO under transaction costs" />
  <figcaption>Original figure extracted from the paper PDF, Figure 10(c). With transaction costs, the memory block smooths NN-ISR cash-weight changes; RO reacts more slowly.</figcaption>
</figure>

## Cross-Market Extension

The paper also tests EIT-CVaR with transaction costs on S&P 100, FTSE 100, and Nikkei 225, using $n=5,20,40$. Training starts in 2003, testing covers 2019-2023, and CVaR constraints are set to 3%, 2.7%, and 3.3%.

Except for the five-stock cases of FTSE 100 and Nikkei 225, NN-ISR has lower test loss and higher CR and Sharpe ratio than RO in 7 out of 9 cases. It also has higher MER and IR in 8 out of 9 cases. The paper therefore treats the improvement over RO as reasonably robust to changes in index and stock count.

The Nikkei 225 case is a warning. Both NN-ISR and RO fail to generate excess CR over the index. The paper gives two reasons: selected large-cap Nikkei stocks perform poorly, and the CVaR constraint makes the strategy more conservative. Further work is needed on stock selection when large-cap stocks do not perform well.

## Conclusion

The paper's conclusion can be summarized in five points.

First, it proposes a data-driven deep learning method for dynamic EIT rebalancing. Second, it introduces index and stock regimes as features and finds them key to investment performance. Third, it designs the architecture to be parsimonious, scalable, easy to train, and more interpretable. Fourth, empirical results verify the advantage over conventional RO. Fifth, the framework is flexible enough to incorporate additional features and constraints.

## Notes

From a reader's point of view, the paper is not about deep learning magically selecting stocks. Stock selection is still market-cap based. The innovation is in weight allocation: regime information, CVaR, transaction cost, and memory are built into a dynamic control framework.

The main reusable ideas are therefore regime-driven allocation, flight to safety in stressed markets, and transaction-cost-aware smoothing. The limitations are also explicit: regime identification is noisy in real time, market-cap stock selection depends on market environment, and excess return is not unconditional.
