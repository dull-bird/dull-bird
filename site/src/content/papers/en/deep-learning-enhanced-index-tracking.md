---
paperSlug: deep-learning-enhanced-index-tracking
lang: en
title: Deep learning for enhanced index tracking
shortTitle: Deep learning for enhanced index tracking
venue: Quantitative Finance
date: 2024-06-07
year: 2024
reading: 14
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

## The Problem

The paper studies enhanced index tracking. Standard index tracking only asks a portfolio to stay close to a benchmark index. Enhanced index tracking adds a return objective: generate positive excess return while keeping tracking error under control.

The paper does not let the model freely search the whole market. It first selects the top-$n$ large-cap constituents of the index by market capitalization, then learns how to dynamically allocate weights among these stocks and cash. The main problem is dynamic weighting, not stock-universe discovery.

The problem is formulated as a stochastic control problem and solved by deep learning. The model must handle tracking error, excess return, a CVaR downside-risk constraint, and transaction costs.

<figure>
  <img src="/assets/papers/eit-loss.svg" alt="Enhanced index tracking loss components: tracking error, excess return, CVaR penalty, and trading cost" />
  <figcaption>A redrawn diagram of the paper's formulation. Tracking error and excess return define the main objective; CVaR enters as a downside-risk constraint; transaction cost enters the portfolio dynamics and realized return.</figcaption>
</figure>

## Loss And Constraints

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

The EIT objective is:

$$
L_{\mathrm{EIT}}
=
L_{\mathrm{TE}}
-
\lambda L_{\mathrm{ER}},
\qquad \lambda \ge 0.
$$

Here $\lambda\ge 0$. When $\lambda=0$, the problem becomes ordinary index tracking. When $\lambda>0$, the objective rewards excess return.

In the EIT experiments, the paper uses $\lambda=20$. This is not an arbitrary attempt to overemphasize excess return. The IT experiment shows that daily tracking error is around the $10^{-3}$ scale while daily excess return is around the $10^{-4}$ scale. A relatively large $\lambda$ is used to balance the two objectives without underweighting the tracking objective.

<figure>
  <img src="/assets/papers/original/eit-large-lambda-wealth-comparison.jpg" alt="Original paper figure: wealth paths in the enhanced index tracking experiment with lambda equal to 20" />
  <figcaption>Original figure extracted from the paper PDF, Figure 5(b). This is the EIT setting with λ=20. The paper's conclusion is that NN-ISR performs best in MER, Sharpe ratio, and CR. It also notes that EIT does not explicitly control risk: all policies have higher 95%-CVaR than the index, and MDD can be large.</figcaption>
</figure>

The portfolio contains $n$ stocks plus cash. Let $\boldsymbol w_t$ be the pre-trade weights and $\tilde{\boldsymbol w}_t$ be the post-trade weights. With proportional transaction cost $\rho$, the budget constraint is:

$$
1-\rho\sum_{i=1}^{n}
\left|\tilde w_{i,t}-w_{i,t}\right|
=
\sum_{i=0}^{n}\tilde w_{i,t}.
$$

The no-short-sale and no-leverage feasible set is:

$$
\left\{
\tilde{\boldsymbol w}_{S,t}\in\mathbb R^n:
1-\sum_{i=1}^n \tilde w_{i,t}\ge 0,
\tilde w_{i,t}\ge 0
\right\}.
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

Thus, transaction cost is not an after-the-fact adjustment. It appears directly in the portfolio dynamics and realized return.

The paper also adds the CVaR constraint $\mathrm{CVaR}_\alpha(r_{P,t})\le c$. Since a ReLU-type penalty has zero gradient when the constraint is satisfied and changes sharply near the boundary, the paper uses a Softplus approximation:

$$
g_\beta(x)
=
\frac{\log(1+\exp(\beta x))}{\beta}.
$$

<figure>
  <img src="/assets/papers/original/eit-softplus-approximation.jpg" alt="Original paper figure: Softplus approximations to a ReLU penalty under different beta values" />
  <figcaption>Original figure extracted from the paper PDF, Figure 1. A larger β makes Softplus closer to ReLU. Since Softplus stays above ReLU, especially near zero, the approximation imposes a stricter constraint.</figcaption>
</figure>

The penalty is:

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

For the S&P 500 experiments, the paper sets $c=3\%$, $\alpha=5\%$, $\gamma=10^6$, and $\beta=2000$. The threshold $c=3\%$ is chosen because the 95%-CVaR of S&P 500 daily returns from 2000 to 2016 is around 3.0%. The choices of $\gamma$ and $\beta$ make the penalty comparable to $\hat L_{\mathrm{EIT}}$ while keeping the constraint strict.

## Architecture And Features

The architecture is not a generic large feedforward network. It separates inputs and blocks according to financial meaning. The features include index regime probability, stock regime probability, short-term features, and current portfolio weights. Short-term features include recent means, volatilities, and beta-type information. Current weights allow the model to account for transaction cost.

<figure>
  <img src="/assets/papers/eit-network.svg" alt="Four-block enhanced index tracking network: main, score, gate, and memory" />
  <figcaption>A redrawn schematic of the paper's architecture. The four blocks use regime information, short-term features, and current holdings to output stock weights.</figcaption>
</figure>

**The main block** learns bull and bear base allocations and mixes them using the index regime probability:

$$
\tilde{\boldsymbol w}_{1,t}
=
\omega_{\mathrm{bull},t}\tilde{\boldsymbol w}_{\mathrm{bull}}
+
(1-\omega_{\mathrm{bull},t})\tilde{\boldsymbol w}_{\mathrm{bear}}.
$$

**The score block** reads short-term stock features, produces a short-term allocation $\tilde{\boldsymbol w}_{\mathrm{sc},t}$, and mixes it with the main block output:

$$
\tilde{\boldsymbol w}_{2,t}
=
(1-\omega_1)\tilde{\boldsymbol w}_{\mathrm{sc},t}
+
\omega_1 \tilde{\boldsymbol w}_{1,t}.
$$

**The gate block** uses stock regime probabilities to scale proposed stock weights element by element:

$$
\tilde{\boldsymbol w}_{3,t}
=
\tilde{\boldsymbol g}_t
\circ
\tilde{\boldsymbol w}_{2,t}.
$$

**The memory block** uses the distance between proposed and current weights to control the final rebalancing size:

$$
\tilde{\boldsymbol w}_{S,t}
=
(1-\omega_{p,t})\tilde{\boldsymbol w}_{3,t}
+
\omega_{p,t}\boldsymbol w_{S,t}.
$$

<figure>
  <img src="/assets/papers/original/eit-transaction-cost-comparison.jpg" alt="Original paper figure: allocation paths under different transaction cost settings" />
  <figcaption>Original figure extracted from the paper PDF. In the paper's transaction-cost discussion, EIT and EIT-CVaR policies tend to rebalance more frequently, but the memory block smooths weight changes and helps control transaction costs.</figcaption>
</figure>

All blocks are small. The main, gate, and memory blocks have one hidden layer with five nodes; the score block has two hidden layers with five nodes each. The paper emphasizes this parsimonious and shared-parameter design as a way to reduce data insufficiency and keep training scalable.

## Experiments And Results

The paper first evaluates IT, EIT, and EIT-CVaR on S&P 500, with $n=5$ and $n=20$ selected stocks, both without transaction cost and with $\rho=0.005$. It uses rolling expanding-window training: at the beginning of each year, regime models and neural networks are retrained on historical data and then tested for the next year. The rebalancing frequency is set to five trading days because it gives similar return and CVaR performance to daily rebalancing while reducing transaction costs.

<figure>
  <img src="/assets/papers/original/eit-sp500-long-history.jpg" alt="Original paper figure: long-run S&P 500 path with market-regime background shading" />
  <figcaption>Original figure extracted from the paper PDF. The background colors show regime information filtered from price data, which is later used as an input feature.</figcaption>
</figure>

<figure>
  <img src="/assets/papers/original/eit-sp500-wealth-comparison.jpg" alt="Original paper figure: wealth paths for S&P 500 experiments across neural-network and rolling-optimization methods" />
  <figcaption>Original figure extracted from the paper PDF, Figure 5(c), for EIT-CVaR. Compared with EIT, the CVaR constraint reduces risk. NN-ISR and NN-All still outperform RO in return measures such as MER, IR, Sharpe ratio, and CR.</figcaption>
</figure>

The S&P 500 findings are layered.

**IT.** Plain index tracking is a regression-type problem. The RO baseline already constructs a strong tracking portfolio, so the room for improvement from neural networks is limited.

**EIT.** NN-ISR, which uses both index and stock regime probabilities, performs best in MER, Sharpe ratio, and CR. The paper also notes that EIT does not control risk: all policies have higher 95%-CVaR than the index, and MDD can be large.

**EIT-CVaR.** With the CVaR constraint, all policies keep 95%-CVaR below 3%, and MDD decreases substantially relative to EIT. In the five-stock case with transaction costs, the MDD of NN-ISR or NN-All is around 19%, much lower than S&P 500's 33.9%. This risk reduction comes at the cost of lower MER and CR.

## Features And Transaction Costs

The paper's feature-importance conclusion is direct: short-term features matter most for IT, while both index and stock regime probabilities are important for EIT and EIT-CVaR. NN-ISR is best in most return measures, and its improvement over NN-IR shows the value of stock regime information.

The paper highlights the March 2020 market crash. NN-ISR holds considerably more cash than NN-IR. NN-IR perceives the bear market through the index regime, but NN-ISR also observes worsening stock regimes through the gate block and further reduces stock exposure. This is the paper's main example for why stock regimes matter.

For transaction costs, every neural-network policy has average transaction cost per trade of at most several basis points. EIT and EIT-CVaR policies rebalance more dramatically and frequently, so costs matter. But the neural-network policies using appropriate features still outperform RO, confirming that the memory block can effectively control transaction costs. The best-return policy, NN-ISR, is not the most costly one.

## Cross-Market Results

The paper further tests EIT-CVaR with transaction costs on S&P 100, FTSE 100, and Nikkei 225, with $n=5,20,40$. Training starts from 2003, testing covers 2019-2023, and the 95%-CVaR constraints are set to 3%, 2.7%, and 3.3%, respectively.

Except for the five-stock cases of FTSE 100 and Nikkei 225, NN-ISR has lower test loss and higher CR and Sharpe ratio than RO. NN-ISR also has higher MER and IR in 8 out of 9 cases. The paper therefore argues that the improvement over RO is reasonably robust to changes in index and number of stocks.

The Nikkei 225 case is the important warning. Both NN-ISR and RO fail to generate excess CR over the index. The paper gives two reasons: the selected large-cap Nikkei stocks perform poorly, and the CVaR constraint makes the strategy more conservative. The paper concludes that further work is needed on stock selection when large-cap stocks do not perform well.

## My Discussion

My own interpretation belongs here, separate from the paper's claims. The most reusable part of the paper is the explicit treatment of regime, downside risk, and transaction cost inside a dynamic allocation framework. It does not claim that deep learning guarantees excess return. The main risks are also clear: real-time regime identification is noisy, market-cap stock selection depends on market style, and excess return still depends on whether the selected stocks have enough performance.
