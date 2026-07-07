---
paperSlug: deep-learning-quadratic-hedging
lang: en
title: Evaluation of Deep Learning Algorithms for Quadratic Hedging
shortTitle: Which neural network works best for quadratic hedging?
venue: The Journal of Derivatives
date: 2022-09-01
year: 2022
reading: 10
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

## The three architectures

The paper compares three choices.

**Multi-net** uses a separate neural network for each trading time. It is flexible, but its parameter count grows with the horizon. Longer maturity means more networks and a higher risk of overfitting.

**Single-net** uses one shared network and gives time as an input. It is like one trader who learns to adjust behavior depending on the date. It has far fewer parameters and trains faster.

**RNN** reads the history of returns. Its advantage is memory: it can infer hidden market state, such as changing volatility or correlations, from what happened recently.

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
