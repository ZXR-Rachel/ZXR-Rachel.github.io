---
layout: page
title: "IADG-BiMamba: Imbalance-Aware Domain Generalization for Bearing Fault Diagnosis"
description: Raw-vibration diagnosis under class-imbalanced source data and unseen operating conditions.
img: assets/img/iadg-bimamba/architecture.svg
importance: 2
category: current research
permalink: /projects/iadg-bimamba/
_styles: |
  article img {
    display: block;
    width: auto;
    max-width: min(100%, 860px);
    height: auto;
    margin: 1.25rem auto;
  }

  article table {
    width: 100%;
    margin: 1.25rem 0;
    border: 1px solid #9a9a9a;
    border-collapse: collapse;
  }

  article th,
  article td {
    padding: 0.55rem 0.7rem;
    border: 1px solid #9a9a9a;
    vertical-align: top;
  }

  article th {
    font-weight: 600;
  }

  .paper-figure {
    margin: 1.75rem 0 2rem;
  }

  .paper-figure > a {
    display: block;
  }

  .paper-figure > a img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }

  .paper-figure--narrow > a img {
    max-width: min(100%, 620px);
  }

  .paper-figure figcaption {
    margin-top: 0.8rem;
    font-size: 0.9rem;
    line-height: 1.5;
    text-align: left;
  }

  @media (max-width: 767px) {
    article table {
      display: block;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
---

## Overview

IADG-BiMamba is an imbalance-aware domain-generalization framework for rolling bearing fault diagnosis from raw one-dimensional vibration signals. It addresses two challenges together: rare fault classes in the source data and changes in operating conditions at deployment.

The target operating condition is unavailable during training, validation, and model selection. The model must learn fault-discriminative features that transfer from the available source conditions to a completely unseen target condition.

<hr class="section-divider">

## Motivation

Class imbalance can bias a classifier toward frequently observed health states, while changes in speed or load can shift vibration distributions. Methods that address only one of these problems may still fail when both occur together. Domain adaptation methods also often require target-condition samples, which are unavailable in the strict domain-generalization setting studied here.

IADG-BiMamba combines class-dependent decision margins with source-domain adversarial regularization, allowing minority-class discrimination and operating-condition invariance to be optimized from source data alone.

<hr class="section-divider">

## Method

<figure class="paper-figure">
  <a href="{{ '/assets/img/iadg-bimamba/architecture-v2.pdf' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open original architecture PDF"><img src="{{ '/assets/img/iadg-bimamba/architecture.svg' | relative_url }}" alt="Convolutional patch embedding, bidirectional Mamba backbone, and dual-task prediction heads"></a>
  <figcaption><strong>Figure 1.</strong> Raw vibration segments become patch tokens, pass through stacked bidirectional Mamba blocks, and feed fault-classification and source-domain discrimination heads.</figcaption>
</figure>

The framework has three main components:

- **Patch embedding:** one-dimensional convolutions turn each vibration segment into a shorter sequence of local signal tokens.
- **Bidirectional Mamba backbone:** six stacked blocks model temporal dependencies in both directions, with residual connections and RMSNorm.
- **Dual-task prediction:** a label classifier uses label-distribution-aware margin (LDAM) loss, while a source-domain discriminator uses a gradient reversal layer to suppress condition-specific features.

Only labeled source-domain data are used for optimization and checkpoint selection. The target domain is held out until evaluation.

<hr class="section-divider">

## Experimental Setup

The study evaluates CWRU, Ottawa, and PU bearing datasets under moderate and severe class imbalance. Each dataset contributes four leave-one-operating-condition-out tasks, yielding **24 evaluation settings** across the two imbalance levels. Each configuration is repeated with three random seeds.

Baselines include CNN-C, CCDG, and CORAL for cross-condition diagnosis, plus Transformer, DLinear, BiLSTM, and unidirectional Mamba in the backbone comparison.

<hr class="section-divider">

## Key Results

<figure class="paper-figure">
  <a href="{{ '/assets/img/iadg-bimamba/fig2_bar.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open full-size results figure"><img src="{{ '/assets/img/iadg-bimamba/fig2_bar.jpg' | relative_url }}" alt="Macro-F1 comparison under moderate and severe imbalance and the change between them"></a>
  <figcaption><strong>Figure 2.</strong> Dataset-level Macro-F1 under moderate and severe imbalance, followed by the overall change as imbalance intensifies.</figcaption>
</figure>

IADG-BiMamba reaches **86.87% overall Macro-F1** under moderate imbalance and **85.88%** under severe imbalance, exceeding the strongest evaluated baseline by **1.03** and **1.89 percentage points**, respectively. Its overall Macro-F1 falls by only **0.99 points** as imbalance becomes more severe.

| Dataset | Moderate imbalance Macro-F1 | Severe imbalance Macro-F1 |
|---|---:|---:|
| CWRU | 93.80% | 93.04% |
| Ottawa | 97.08% | 95.75% |
| PU | 69.72% | 68.85% |
| Overall | **86.87%** | **85.88%** |

The backbone comparison shows the strongest aggregate performance for bidirectional Mamba, though another backbone performs best on PU in some settings. This illustrates that the advantage is not uniform across every dataset.

<hr class="section-divider">

## Ablation Study

<figure class="paper-figure paper-figure--narrow">
  <a href="{{ '/assets/img/iadg-bimamba/fig3.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open full-size ablation figure"><img src="{{ '/assets/img/iadg-bimamba/fig3.jpg' | relative_url }}" alt="Ablation heatmaps for LDAM and source-domain adversarial learning"></a>
  <figcaption><strong>Figure 3.</strong> Macro-F1 by dataset and overall for the ERM baseline, LDAM alone, source adversarial learning alone, and the full model.</figcaption>
</figure>

Both objectives contribute to aggregate robustness. Under moderate imbalance, the full model improves overall Macro-F1 from **84.93%** for the ERM baseline to **86.87%**. Under severe imbalance, it improves from **83.18%** to **85.88%**. The size of each component's contribution differs across datasets, but combining them gives the highest overall score at both imbalance levels.

<hr class="section-divider">

## Paper and Code

- IADG-BiMamba manuscript: Under review at *IEEE Sensors Journal*; full text is not publicly available
- Related paper: "Margin-Aware Bidirectional Mamba for Imbalanced Cross-Condition Bearing Fault Diagnosis," accepted at ICARCE 2026
- Code: Not publicly available
