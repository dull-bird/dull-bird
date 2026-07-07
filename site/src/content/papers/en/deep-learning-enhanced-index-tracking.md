---
paperSlug: deep-learning-enhanced-index-tracking
lang: en
title: Deep learning for enhanced index tracking
shortTitle: Deep learning for enhanced index tracking
venue: Quantitative Finance
date: 2024-06-07
year: 2024
reading: 13
translated: true
lede: How can a fund stay close to an index, try to earn a little extra return, and still respect risk and trading costs? This paper turns that tension into a dynamic decision problem.
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

## In plain language

A normal index fund tries to behave like an index. If the index rises 1%, the fund should rise about 1% too. Enhanced index tracking adds a harder ambition: stay close to the index, but earn a little more if possible.

That is harder than it sounds. Extra return usually requires deviating from the index. Deviate too much, and tracking error grows. Trade too often, and transaction costs eat the gains. Take too much risk, and the fund may look good in calm markets but fail exactly when investors need protection.

This paper asks whether a deep learning model can learn a dynamic rebalancing rule that balances all of these goals at once.

<figure>
  <img src="/assets/papers/eit-loss.svg" alt="Enhanced index tracking loss components: tracking error, excess return, CVaR penalty, and trading cost" />
  <figcaption>Enhanced index tracking is not a single-objective problem. This redrawn figure shows the four tensions behind the training objective.</figcaption>
</figure>

## The loss function

Let $r_{I,t}$ be the index return and $r_{P,t}$ be the portfolio return. Plain index tracking focuses on tracking error:

$$
L_{\mathrm{TE}}
=
\sqrt{
  \frac{1}{T}\sum_{t=1}^{T}
  (r_{P,t}-r_{I,t})^2
}.
$$

Enhanced index tracking also tries to produce positive average excess return:

$$
L_{\mathrm{ER}}
=
\frac{1}{T}\sum_{t=1}^{T}(r_{P,t}-r_{I,t}).
$$

The basic objective is therefore:

$$
L_{\mathrm{EIT}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}},
\qquad \lambda \ge 0.
$$

The first term should be small: the portfolio should remain close to the index. The second term has a minus sign: higher excess return lowers the loss. The parameter $\lambda$ controls how much tracking error the model may tolerate in exchange for extra return.

## Constraints from real trading

The portfolio contains $n$ stocks plus cash. Let $\boldsymbol w_t$ be the pre-trade weights and $\tilde{\boldsymbol w}_t$ be the post-trade weights. With proportional transaction cost $\rho$, the budget constraint is:

$$
1-\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|
=
\sum_{i=0}^{n}\tilde w_{i,t}.
$$

The next-period portfolio return is:

$$
r_{P,t+1}
=
\sum_{i=0}^{n}\tilde w_{i,t} r_{i,t+1}
-
\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|.
$$

This is why the model needs memory: if the new allocation is far from the current allocation, the cost appears directly in realized return.

The paper also adds a downside-risk constraint through CVaR. To make the penalty differentiable, it uses a softplus approximation:

$$
g_\beta(x)
=
\frac{\log(1+\exp(\beta x))}{\beta}.
$$

<figure>
  <img src="/assets/papers/original/eit-softplus-approximation.jpg" alt="Original paper figure: Softplus approximations to a ReLU penalty under different beta values" />
  <figcaption>Original figure extracted from the paper PDF. The blue curve is the nonsmooth ReLU penalty. The green, orange, and red curves are Softplus approximations. A larger β makes Softplus closer to ReLU; a smaller β gives a smoother training signal.</figcaption>
</figure>

When CVaR exceeds a threshold $c$, the penalty is:

$$
P_{\mathrm{CVaR}}
=
\gamma\,
g_\beta\left(
  \mathrm{CVaR}_\alpha(r_{P,t}) - c
\right).
$$

The final objective becomes:

$$
L_{\mathrm{EIT-CVaR}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}}
+
P_{\mathrm{CVaR}}.
$$

In nontechnical terms, every rebalance pays four bills: benchmark deviation, missed excess return, tail risk, and turnover.

## The four-block architecture

The network is intentionally structured, not just made large.

<figure>
  <img src="/assets/papers/eit-network.svg" alt="Four-block enhanced index tracking network: main, score, gate, and memory" />
  <figcaption>A redrawn schematic of the paper's architecture. The main block handles regimes, the score block handles short-term stock signals, the gate block shrinks risky exposure, and the memory block controls turnover.</figcaption>
</figure>

**The main block** learns bull and bear base allocations and mixes them using the index regime probability:

$$
\tilde{\boldsymbol w}_{1,t}
=
\omega_{\mathrm{bull},t}\tilde{\boldsymbol w}_{\mathrm{bull}}
+
(1-\omega_{\mathrm{bull},t})\tilde{\boldsymbol w}_{\mathrm{bear}}.
$$

**The score block** reads short-term stock features, produces a short-term allocation $\tilde{\boldsymbol w}_{\mathrm{sc},t}$, and mixes it with the long-run allocation:

$$
\tilde{\boldsymbol w}_{2,t}
=
(1-\omega_1)\tilde{\boldsymbol w}_{\mathrm{sc},t}
+
\omega_1 \tilde{\boldsymbol w}_{1,t}.
$$

**The gate block** reduces exposure when a stock or regime looks riskier:

$$
\tilde{\boldsymbol w}_{3,t}
=
\tilde{\boldsymbol g}_t
\circ
\tilde{\boldsymbol w}_{2,t}.
$$

**The memory block** smooths rebalancing by mixing the proposed allocation with the current one:

$$
\tilde{\boldsymbol w}_{S,t}
=
(1-\omega_{p,t})\tilde{\boldsymbol w}_{3,t}
+
\omega_{p,t}\boldsymbol w_{S,t}.
$$

<figure>
  <img src="/assets/papers/original/eit-transaction-cost-comparison.jpg" alt="Original paper figure: allocation paths under different transaction cost settings" />
  <figcaption>Original figure extracted from the paper PDF. The transaction cost ρ changes the decision problem: the model must ask not only which allocation looks best next, but whether moving from the current allocation is worth the cost.</figcaption>
</figure>

The key design choice is not "make the network bigger." It is to split the financial problem into interpretable roles: long-run regime, short-run opportunity, risk gating, and cost-aware memory.

## What the results mean

The paper tests the method on S&P 500, S&P 100, FTSE 100, and Nikkei 225 settings. Overall, the proposed structure often improves the trade-off among tracking error, excess return, downside risk, and transaction costs compared with rolling optimization baselines.

<figure>
  <img src="/assets/papers/original/eit-sp500-long-history.jpg" alt="Original paper figure: long-run S&P 500 path with market-regime background shading" />
  <figcaption>Original figure extracted from the paper PDF. The background colors mark different market regimes. This explains why regime information matters: the same index calls for different behavior in bull, bear, and unstable periods.</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-sp500-wealth-comparison.jpg" alt="Original paper figure: wealth paths for S&P 500 experiments across neural-network and rolling-optimization methods" />
  <figcaption>Original figure extracted from the paper PDF. The vertical axis can be read as how much one invested dollar becomes. The important question is not only which line ends highest, but also how much drawdown, benchmark deviation, and hidden risk it takes to get there.</figcaption>
</figure>

The most intuitive result appears around the 2020 market crash. The model shifts toward safer allocations, including cash-like exposure, instead of blindly staying aggressive. In other words, the value is not only "earning more"; it is also avoiding large mistakes in stressed regimes.

The result should not be read as "deep learning guarantees alpha." The excess return is modest, and the Nikkei 225 experiments are a useful warning: if the selected large-cap stocks themselves lag the index, the model cannot manufacture excess return from nowhere.

## Why it matters beyond finance

The transferable idea is dynamic trade-off management. In finance the trade-off is return, risk, tracking error, and trading cost. In robotics or AI systems, the same pattern may become accuracy, speed, stability, energy, and safety.

A useful model is not merely one that predicts better. It knows what it is optimizing, what it is sacrificing, and when it should become conservative.

## Limitations

The method depends on historical market data and regime estimates, which are noisy and delayed in real time. The stock selection procedure also depends on market style; it worked better in some markets than others.

My takeaway: the lasting value is not a promise of guaranteed outperformance. It is the decision to put hidden market state and trading friction inside the model design instead of pretending they do not exist.
