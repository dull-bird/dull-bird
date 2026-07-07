---
paperSlug: deep-learning-quadratic-hedging
lang: en
title: Evaluation of Deep Learning Algorithms for Quadratic Hedging
shortTitle: Which neural network works best for quadratic hedging?
venue: The Journal of Derivatives
date: 2022-09-01
year: 2022
reading: 14
translated: true
lede: "This is a benchmark paper rather than a new hedging trick: it compares Multi-net, Single-net, and RNN architectures for dynamic hedging across high-dimensional and long-horizon settings."
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

## In plain language

When a trader sells or holds an option, they often hedge it by trading the underlying assets. Ideally, the hedging portfolio offsets the option payoff at maturity. Real markets are messier: there may be many assets, long horizons, changing volatility, and changing correlations.

Quadratic hedging has a simple goal: minimize the squared hedging error at maturity. Squaring the error means large mistakes are punished heavily.

This paper asks a practical question: if we use neural networks to learn a dynamic hedging strategy, which architecture should we trust?

<figure>
  <img src="/assets/papers/qh-loss-grid.svg" alt="Quadratic hedging benchmark design over asset dimension, maturity, market model, and architecture" />
  <figcaption>The paper is a benchmark. It varies dimensionality, horizon, market dynamics, and neural architecture instead of relying on one easy case. This figure is redrawn from the experimental design.</figcaption>
</figure>

## The quadratic hedging loss

Let there be $d$ underlying assets with price vector $\boldsymbol S_t\in\mathbb R^d$. The hedging position at time $t$ is $\boldsymbol q_t\in\mathbb R^d$, and the initial capital is $v$. Terminal hedging wealth is:

$$
V_T
=
v
+
\sum_{t=0}^{T-1}
\boldsymbol q_t^\top
(\boldsymbol S_{t+1}-\boldsymbol S_t).
$$

The payoff used in the experiments is a European basket call:

$$
F_T
=
\left(
  \sum_{j=1}^{d} S_{j,T}
  -
  dK
\right)^+.
$$

Quadratic hedging minimizes the mean squared terminal hedging error:

$$
\min_{v,\boldsymbol q_0,\ldots,\boldsymbol q_{T-1}}
\mathbb E
\left[
  (V_T-F_T)^2
\right].
$$

If a neural network with parameters $\theta$ outputs each hedge, then:

$$
\boldsymbol q_t
=
f_\theta(X_t),
$$

where $X_t$ is the state observable at time $t$. Training uses sample average approximation:

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

All architectures solve this same objective. The difference is how they represent $\boldsymbol q_t$.

## The three architectures

<figure>
  <img src="/assets/papers/qh-architectures.svg" alt="Multi-net, Single-net, and RNN architectures for quadratic hedging" />
  <figcaption>A redrawn schematic of the three neural approximators compared in the paper: independent networks per time step, one shared time-aware network, and an RNN with memory.</figcaption>
</figure>

**Multi-net** uses a separate network for each time:

$$
\boldsymbol q_t
=
f_t(X_t;\theta_t).
$$

It is flexible, but its parameter count grows linearly with the horizon $T$. Longer maturity means more networks and a higher risk of overfitting.

**Single-net** uses one shared network and gives normalized time as an input:

$$
\boldsymbol q_t
=
f(X_t,t/T;\theta).
$$

It is like one trader who learns to adjust behavior depending on the date. It has far fewer parameters and trains faster.

**RNN** reads the history of returns. With log return $\boldsymbol\xi_t$ and hidden state $\boldsymbol z_t$:

$$
\boldsymbol z_t
=
\mathrm{GRU}(\boldsymbol\xi_t,\boldsymbol z_{t-1};\theta^R),
\qquad
\boldsymbol q_t
=
f^C(\boldsymbol z_t,\tilde X_t;\theta^C).
$$

For a non-specialist, Multi-net is many different traders, Single-net is one trader who knows the date, and RNN is one trader who remembers the path.

## Why RNN matters

In a simplified Black-Scholes world, current prices contain enough information for the next decision. In more realistic settings such as DCC-GARCH, volatility clusters and correlations evolve over time. The market state depends on history.

Those hidden states are not directly visible in real trading. RNNs are useful because they can extract part of that state from past returns.

The experiments show that RNNs usually have the lowest test loss in high-dimensional, long-horizon, and nonstationary settings. In DCC-GARCH experiments, the RNN can approach or even outperform networks that are given hidden covariance information directly. That is strong evidence that memory is doing real work.

## Why Single-net also matters

RNN is powerful, but Single-net is valuable as an engineering baseline. It is small, fast, stable, and often only slightly worse than RNN.

That matters in real systems. The most accurate research model is not always the first model you should deploy. If you need a robust baseline, Single-net is often the conservative starting point.

## What makes the benchmark useful

The study does not rely on one easy example. It tests asset dimensions from 1 to 100, maturities from roughly one month to one year, and both Black-Scholes and DCC-GARCH data-generating models.

It compares training loss, validation loss, test loss, speed, parameter count, overfitting, learned initial cost, and learned initial hedge. That is why the paper is best read as a systematic benchmark.

It also studies moving block bootstrap training data, a model-free way to resample historical paths. This part asks how much temporal dependence to preserve when generating training samples from limited market history.

## The most interesting result

In high dimensions, the learned initial cost and hedge can differ significantly from the classic risk-neutral price and delta hedge. That is not because the classic formulas are simply wrong. They solve a different target.

Delta hedging is about replication in a risk-neutral framework. This paper optimizes mean squared hedging error under the real-world probability measure. In incomplete, high-dimensional, changing markets, those objectives can diverge.

## Limitations

To isolate architecture effects, the main experiments omit transaction costs and position constraints. That is a reasonable simplification for a benchmark, but it also means the setup is not yet a full trading system.

My takeaway: the paper is not saying "RNN is always best." It shows that when the true state is only partially observable and changes through time, memory is itself a modeling advantage.
