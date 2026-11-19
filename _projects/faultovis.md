---
layout: page
title: "FaultOvis: A Domain-Generalized Vision-Language Model for Intelligent Bearing Fault Diagnosis"
description: Visual discriminative reinforcement for bearing diagnosis across unseen operating conditions.
img: assets/img/faultovis/paper-2026-fig2.png
importance: 3
category: current research
permalink: /projects/faultovis/
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

  .paper-figure > img {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
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

  .paper-figure--column > img,
  .paper-figure--column > a img {
    max-width: min(100%, 720px);
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

FaultOvis is a domain-generalized vision-language framework for cross-domain rolling bearing fault diagnosis under unseen working conditions.

It converts raw vibration signals into short-time Fourier transform (STFT) images and adapts a vision-language model for multimodal industrial fault diagnosis. Unlike purely generative VLM fine-tuning methods that may only learn diagnostic answer templates, FaultOvis introduces explicit visual-side supervision to improve fault-discriminative and domain-invariant representation learning.

This work represents my exploration of adapting multimodal foundation models to industrial sensor-image reasoning under domain shifts.

<hr class="section-divider">

## Motivation

Rolling bearings are widely used in rotating machinery, and their health condition directly affects industrial safety, reliability, and maintenance cost. Although deep learning methods have achieved strong results in closed-set fault diagnosis, their performance often drops when the training and testing data come from different working conditions.

Vision-language models offer new opportunities for interactive and explainable industrial diagnosis, because they can combine visual sensor representations with natural-language diagnostic prompts. However, directly adapting general-purpose VLMs to STFT images is not sufficient. Since these models are pretrained mainly on natural images and text, they may struggle to capture fine-grained time-frequency fault patterns in industrial signals.

A key issue is that standard visual instruction tuning mainly optimizes textual generation. The model may learn to produce diagnostic answer formats without learning robust visual representations that generalize across domains.

FaultOvis aims to address this problem by adding explicit visual-side supervision to the VLM adaptation process. The goal is to make the visual branch learn representations that are both fault-discriminative and more robust to unseen working conditions.

<figure class="paper-figure paper-figure--column">
  <img src="{{ '/assets/img/faultovis/paper-2026-fig1.png' | relative_url }}" alt="Motivation for domain-generalized vision-language bearing fault diagnosis">
  <figcaption><strong>Figure 1.</strong> Task-specific domain-generalization models provide fixed-label outputs; general-purpose VLMs offer language interaction but lack explicit visual constraints. FaultOvis combines language-based diagnosis with domain-generalized visual reinforcement.</figcaption>
</figure>

<hr class="section-divider">

## Method

<figure class="paper-figure">
  <img src="{{ '/assets/img/faultovis/paper-2026-fig2.png' | relative_url }}" alt="Overall architecture of FaultOvis">
  <figcaption><strong>Figure 2.</strong> STFT images and textual prompts pass through Ovis2-1B. Auxiliary classification and domain-aware contrastive heads reinforce fault discrimination and cross-condition consistency in the visual pathway.</figcaption>
</figure>

FaultOvis is built on Ovis2-1B and uses STFT images as visual representations of vibration signals. Each input sample is formulated as a multimodal diagnostic tuple containing an STFT image, a system prompt, a diagnostic question, and the corresponding fault label response.

The framework contains three main components:

- A vision-language backbone for multimodal diagnostic response generation
- An auxiliary classification head for explicit fault-category supervision
- A contrastive learning head for cross-domain feature alignment

The overall training objective combines three losses:

- Causal language modeling loss for diagnostic response generation
- Auxiliary classification loss for category-level visual discrimination
- Triplet contrastive loss for domain-invariant representation learning

### Visual-side Supervision

FaultOvis introduces two task-specific heads on the visual branch.

The auxiliary classification head supervises pooled visual features with fault-category labels. This encourages the visual representation to contain fault-discriminative information instead of relying only on the language modeling objective.

The contrastive learning head projects visual features into a metric space and applies hardest triplet mining. Same-class samples from different domains are pulled closer, while different-class samples, especially those from the same domain, are pushed apart. This design encourages the model to learn domain-invariant fault representations.

### Two-stage Training Strategy

FaultOvis uses a two-stage optimization strategy.

In the first stage, the model is trained for diagnostic format adaptation. The vision encoder is frozen, and language-side LoRA tuning is used to help the model generate fault diagnosis responses in the expected format.

In the second stage, FaultOvis activates visual-side discriminative reinforcement. LoRA adapters tune the ViT backbone, the visual head and embedding table are optimized, and the language model is frozen while the auxiliary classification and contrastive heads strengthen the visual pathway.

This staged design decouples diagnostic answer-format learning from visual representation reinforcement, making the optimization process more stable.

<hr class="section-divider">

## Key Contributions

- A domain-generalized vision-language framework for cross-domain rolling bearing fault diagnosis
- An STFT-image-based multimodal diagnostic formulation combining industrial sensor images and natural-language prompts
- Explicit visual-side supervision through an auxiliary classification head and a contrastive learning head
- A two-stage training strategy that separates diagnostic format adaptation from visual discriminative reinforcement
- Evaluation on 15 leave-one-operating-condition-out tasks across CWRU, Ottawa, PU, and THU bearing datasets
- Ablation studies validating the roles of auxiliary classification, contrastive alignment, visual-module optimization, and loss-weight settings

<hr class="section-divider">

## Key Results

<figure class="paper-figure">
  <a href="{{ '/assets/img/faultovis/group-comparatives.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open full-size comparison figure"><img src="{{ '/assets/img/faultovis/group-comparatives.jpg' | relative_url }}" alt="Accuracy and F1-score comparison of FaultOvis and baselines across Tasks T1 through T15"></a>
  <figcaption><strong>Figure 3.</strong> Accuracy and F1-score across 15 unseen-condition tasks for task-specific visual classifiers, general-purpose VLMs, and FaultOvis.</figcaption>
</figure>

FaultOvis is evaluated on four rolling bearing datasets: CWRU, Ottawa, PU, and THU. The 15 leave-one-operating-condition-out tasks cover speed, load, and radial-force variations, with target conditions unseen during training and model selection.

Across all 15 tasks, FaultOvis achieves **83.87% average accuracy** and **67.94% average F1-score**, exceeding the strongest competing average (ViT) by **4.45** and **9.73 percentage points**, respectively. It ranks first in both metrics on **12 of 15 tasks**.

Representative results include:

- Strong performance on all four Ottawa tasks and all four PU tasks
- Higher accuracy on 13 tasks and higher F1-score on 12 tasks
- A consistent gain from visual reinforcement over a matched Stage-I checkpoint

On the Ottawa benchmark, FaultOvis achieves particularly strong results:

- T5: **82.00% Acc. / 72.22% F1**
- T6: **99.33% Acc. / 99.00% F1**
- T7: **96.00% Acc. / 93.91% F1**
- T8: **79.33% Acc. / 67.27% F1**

Against its matched Stage-I checkpoint, Stage-II visual reinforcement improves average accuracy and F1-score by **5.23** and **10.87 percentage points**. This comparison isolates the gain from explicit visual-side supervision within the same augmented architecture.

<hr class="section-divider">

## Ablation Study

FaultOvis includes four ablation studies to analyze the contribution of each design choice.

### Visual-side Heads

The first ablation compares five variants:

- Baseline: language-side tuning only
- M1: with auxiliary classification head
- M2: with contrastive learning head
- M3: full visual reinforcement without Stage-I diagnostic-format adaptation
- FaultOvis: with both auxiliary and contrastive heads

The auxiliary head improves category discrimination, and the contrastive head strengthens cross-condition consistency. Their combination provides larger average gains than either objective alone. The complete two-stage schedule also exceeds M3 by **2.63 accuracy** and **5.38 F1** points on average.

<figure class="paper-figure">
  <a href="{{ '/assets/img/faultovis/group-ab1-bar.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open full-size ablation figure"><img src="{{ '/assets/img/faultovis/group-ab1-bar.jpg' | relative_url }}" alt="Visual reinforcement and training-stage ablations across Tasks T1 through T15"></a>
  <figcaption><strong>Figure 4.</strong> Visual reinforcement and Stage-I adaptation ablations across all 15 tasks.</figcaption>
</figure>

### Visual-module Optimization

The second ablation studies how different visual modules should be optimized under the auxiliary-head setting.

LoRA adaptation of the ViT backbone combined with full optimization of the visual head and embedding table gives the strongest average result across representative tasks T1, T5, T9, and T13. This reflects the importance of adapting the visual-to-language interface to industrial STFT images.

<figure class="paper-figure">
  <a href="{{ '/assets/img/faultovis/group-ab2-bar.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open full-size visual adaptation figure"><img src="{{ '/assets/img/faultovis/group-ab2-bar.jpg' | relative_url }}" alt="Visual-module adaptation results on representative tasks from four datasets"></a>
  <figcaption><strong>Figure 5.</strong> Visual-module adaptation strategies on representative tasks T1, T5, T9, and T13 from the four datasets.</figcaption>
</figure>

### Auxiliary Loss Weight

The third ablation studies the auxiliary classification loss weight. A moderate weight of **0.5** gives the strongest overall balance across representative tasks, reinforcing fault discrimination without overemphasizing the auxiliary objective.

### Triplet Loss Weight

The fourth ablation studies the triplet contrastive loss weight. Among the evaluated settings, **1.0** gives the best accuracy and F1-score on all four representative tasks.

<figure class="paper-figure">
  <a href="{{ '/assets/img/faultovis/group-ab34-line.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer" title="Open full-size loss-weight figure"><img src="{{ '/assets/img/faultovis/group-ab34-line.jpg' | relative_url }}" alt="Accuracy and F1-score sensitivity to auxiliary and triplet loss weights"></a>
  <figcaption><strong>Figure 6.</strong> Sensitivity to auxiliary-loss weight beta and triplet-loss weight gamma on T1, T5, T9, and T13.</figcaption>
</figure>

Overall, the ablation studies confirm that FaultOvis benefits from both category-discriminative and domain-invariant visual representation learning.

<hr class="section-divider">

## Notes

FaultOvis is not intended to be only a conventional bearing fault classifier. Its main purpose is to investigate how vision-language models can be adapted to domain-shifted industrial signal analysis.

The key finding is that purely generative VLM adaptation is insufficient for robust cross-domain fault diagnosis. To use VLMs effectively in industrial diagnosis, the visual representation space should be explicitly supervised and aligned with fault-discriminative, domain-invariant objectives.

This project serves as an intermediate step in my research trajectory from signal-image-based VLM adaptation to more general physical-signal foundation models.

<hr class="section-divider">

## Paper and Code

- Paper: Under review at *Applied Soft Computing*; full text is not publicly available
- Code: Coming soon
