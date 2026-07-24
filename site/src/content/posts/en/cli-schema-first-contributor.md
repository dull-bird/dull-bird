---
postSlug: cli-schema-first-contributor
lang: en
title: "Becoming the First External Contributor to an \"OpenAPI for CLIs\": An AI-Assisted Open Source Practice"
topic: open source
date: 2026-07-24
reading: 8
translated: true
lede: "I stumbled onto CLI Schema, an open spec almost nobody has heard of — an 'OpenAPI for command-line programs.' Three things here: what it is, how I used AI to contribute, and what I learned about working with a maintainer who is rarely online."
---

## In plain terms: what is this project

When you ask an AI to do work for you, it usually ends up typing commands into a terminal. The problem: **command lines are built for humans**. `--help` output is prose. If an AI wants to know "is this command dangerous, will it delete things, do I need to log in first," it can only guess.

[CLI Schema](https://cli-schema.org/) aims to fix that: an open JSON specification for describing command-line programs. A CLI author ships a schema document alongside the binary that captures the command tree, parameters, defaults — and most importantly, safety semantics: whether a command is destructive, whether it requires confirmation, which flag skips confirmation (like `--yes`), which one does a dry run. An AI agent knows the consequences *before* executing, instead of guessing after the fact.

The analogy is direct: **OpenAPI for CLIs**. OpenAPI lets machines understand HTTP APIs; CLI Schema lets machines understand command lines.

The inevitable question: doesn't MCP cover this? No — they're complementary. MCP is a protocol for exposing *new* tool services to agents; CLI Schema describes the *hundreds of thousands of CLIs that already exist* — tools nobody will ever wrap in an MCP server.

## Why I jumped in

I build tools around AI agents operating command lines myself (e.g., a [skill for automating interactive CLIs with pexpect](https://github.com/dull-bird/pexpect-cli-automation-skill)). "Agents guessing flags" is the wall I hit every day. In late June I found this spec while browsing GitHub — less than two months old at the time, with **0 stars, 0 forks, and a single contributor**.

But reading the spec convinced me it was designed with real care. Two examples:

- **Two discovery mechanisms.** Run `mytool __schema` to print the document; or ship a `<binary>.cli-schema.json` file next to the binary. The latter means you can understand a CLI *without spawning the process* — a hard requirement for agents running in sandboxes.
- **Safety semantics are first-class**, not an afterthought. `destructive`, `requiresConfirmation`, `confirmationSkip`, and `dryRun` are all formal fields in the spec.

The spec is CC0 (public domain), and the author is Martijn Laarman, longtime lead of Elastic's official .NET client. Good design, no users, credible author — that's an early project worth betting on.

## What I built with AI

I've done two chunks of work so far, both pair-programmed with AI (Claude):

**1. A Python SDK (cli-schema-typer).** In late June I proposed a Python integration in [issue #6 of the spec repo](https://github.com/cli-schema/cli-schema/issues/6), then built a prototype: give existing Typer/Click CLIs a reserved `__schema` meta-command that exports the command tree and parameters from framework metadata. A pitfall surfaced immediately: adding a subcommand to a single-command Typer app changes its invocation shape, so the Typer integration intercepts `mytool __schema` in an entry-point wrapper rather than registering a real subcommand.

**2. Discovery wiring for the official JS SDK ([PR #3](https://github.com/cli-schema/cli-schema-js/pull/3)).** In early July the author created `cli-schema-js` himself with a Commander integration — but it could only *generate* the document; the CLI itself couldn't be *discovered*. I ported the lesson from the Python side and submitted an argv-interception implementation of the `__schema` meta-command plus a sidecar file writer, and rewrote the README section that had recommended the hidden-subcommand recipe, explaining why.

What the AI did: read the full spec, read someone else's codebase, write the implementation and tests, run builds and lint, draft issue replies and PR descriptions, even handle later promotional submissions. What I did: **every judgment call** — whether to bet on this project, how to name packages, which slice to PR first, when not to bother the author. The division of labor works: execution goes to AI, taste stays with the human.

## Working with a maintainer who is rarely online

This part may be the most useful takeaway for other open source participants. The author is friendly and enthusiastic, but he has a full-time job and comes online infrequently — my repository transfer request has been hanging for nearly two weeks.

What I learned:

**Compress your asks into a single click for them.** Don't send open-ended questions like "shall we discuss governance?" Send "create an empty cli-schema/py repo and make me maintainer, or I'll initiate a transfer and you click accept — either is one action." One visit from them unblocks everything on your side.

**Don't let governance block code.** The spec is CC0 and the `__schema` convention is public; continuing development under my own account is fully legitimate. Org hosting is a branding question. Code first; governance catches up.

**Trade work for permissions, not requests.** The best way to get collaborator rights is to land a high-quality PR first. Merging a PR is a much lower bar than repo governance operations — and asking for permissions *after* your first PR lands is a completely different conversation.

**The author's actions are newer than his words.** We had agreed in the issue that the repo would be called `cli-schema/typer`, but the next day he created `cli-schema-js`, a per-language monorepo — the de facto convention had changed. Follow his latest code, not the old verbal agreement.

## Status: worth joining, but not a mature tool

Honest assessment: this is a draft spec, v1 isn't frozen, breaking changes are possible; the whole project has 0 stars, and the JS SDK just got its first external PR (mine). The road of CLI description formats has a graveyard — Fig's autocomplete spec died after being acquired by Amazon, the most recent cautionary tale.

But this is how standards cold-start: llms.txt had zero adoption when it was proposed, and early believers pushed it past the tipping point. If you also build AI agents and think this direction deserves to exist, your marginal impact is highest right now — the spec isn't set in stone, and an external contributor's voice carries the most weight at exactly this moment.

- Spec & website: [github.com/cli-schema/cli-schema](https://github.com/cli-schema/cli-schema) · [cli-schema.org](https://cli-schema.org/)
- Official JS SDK: [github.com/cli-schema/cli-schema-js](https://github.com/cli-schema/cli-schema-js)
- My PR: [cli-schema-js#3](https://github.com/cli-schema/cli-schema-js/pull/3) (discovery mechanisms)
- Where it started: [issue #6](https://github.com/cli-schema/cli-schema/issues/6) (Python SDK proposal)
