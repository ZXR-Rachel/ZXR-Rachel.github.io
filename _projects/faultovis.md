---
layout: page
title: "FaultOvis: Domain-Generalized VLM for Fault Diagnosis"
description: Domain-generalized vision-language adaptation for rolling bearing diagnosis under unseen working conditions.
img: assets/img/faultovis/architecture.png
importance: 2
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

  .paper-figure--column > img {
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
  <img src="{{ '/assets/img/faultovis/paper2-fig1-background-v4.png' | relative_url }}" alt="Background and motivation for MLLM-enabled cross-domain fault diagnosis">
  <figcaption><strong>Figure 1.</strong> Background and motivation. (a) Conventional DL-based cross-domain fault diagnosis. (b) General multimodal understanding capability of MLLMs. (c) A conceptual paradigm of MLLM-enabled cross-domain fault diagnosis.</figcaption>
</figure>

<hr class="section-divider">

## Method

<figure class="paper-figure">
  <img src="{{ '/assets/img/faultovis/architecture.png' | relative_url }}" alt="Overall architecture of FaultOvis">
  <figcaption><strong>Figure 2.</strong> Overall architecture of FaultOvis. Vibration-derived STFT representations and textual prompts are processed by Ovis2-1B, while auxiliary classification and contrastive heads reinforce fault discrimination and cross-condition invariance in the visual pathway. The right panel illustrates the visual-vocabulary lookup and textual embedding processes.</figcaption>
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

In the second stage, FaultOvis activates visual-side discriminative reinforcement. The visual branch is further adapted with the auxiliary classification head and contrastive learning head, while the model continues to preserve its multimodal diagnostic response ability.

This staged design decouples diagnostic answer-format learning from visual representation reinforcement, making the optimization process more stable.

<hr class="section-divider">

## Key Contributions

- A domain-generalized vision-language framework for cross-domain rolling bearing fault diagnosis
- An STFT-image-based multimodal diagnostic formulation combining industrial sensor images and natural-language prompts
- Explicit visual-side supervision through an auxiliary classification head and a contrastive learning head
- A two-stage training strategy that separates diagnostic format adaptation from visual discriminative reinforcement
- Leave-one-domain-out evaluation on CWRU and Ottawa bearing datasets under unseen working conditions
- Ablation studies validating the roles of auxiliary classification, contrastive alignment, visual-module optimization, and loss-weight settings

<hr class="section-divider">

## Key Results

<figure class="paper-figure paper-figure--column">
  <img src="{{ '/assets/img/faultovis/group-comparatives-bar.png' | relative_url }}" alt="Grouped-bar comparison of unseen-condition diagnostic performance on Tasks T1 through T8">
  <figcaption><strong>Figure 3.</strong> Comparison of unseen-condition diagnostic performance on Tasks T1-T8. Grouped bars report the accuracy and F1-score of the evaluated image classifiers, general-purpose VLMs, and FaultOvis.</figcaption>
</figure>

FaultOvis is evaluated on two rolling bearing fault diagnosis benchmarks: CWRU and Ottawa. Both datasets are organized into four domains corresponding to different operating conditions, and the experiments follow a leave-one-domain-out domain generalization protocol.

Across eight cross-domain tasks, FaultOvis achieves the best overall performance on most unseen target domains compared with fine-tuned VLM baselines and conventional image classifiers.

Representative results include:

- Best or highly competitive performance on most CWRU tasks
- Strong performance on all Ottawa tasks
- Clear improvement over the base Ovis2-1B model
- More stable cross-domain generalization than purely generative VLM fine-tuning

On the Ottawa benchmark, FaultOvis achieves particularly strong results:

- T5: **82.00% Acc. / 72.22% F1**
- T6: **99.33% Acc. / 99.00% F1**
- T7: **96.00% Acc. / 93.91% F1**
- T8: **79.33% Acc. / 67.27% F1**

Compared with the base Ovis2-1B, FaultOvis substantially improves the F1-score on several difficult domain-shift tasks, showing that explicit visual-side supervision is important for VLM-based industrial diagnosis.

<hr class="section-divider">

## Ablation Study

FaultOvis includes four ablation studies to analyze the contribution of each design choice.

### Visual-side Heads

The first ablation compares four variants:

- Baseline: language-side tuning only
- M1: with auxiliary classification head
- M2: with contrastive learning head
- FaultOvis: with both auxiliary and contrastive heads

The results show that the auxiliary head improves fault-category separability, while the contrastive head strengthens cross-domain feature alignment. The full model achieves the best overall performance, indicating that these two objectives are complementary.

<figure class="paper-figure paper-figure--column">
  <img src="{{ '/assets/img/faultovis/group-ab1-bar.png' | relative_url }}" alt="Effect of visual discriminative reinforcement on Tasks T1 through T8">
  <figcaption><strong>Figure 4.</strong> Effect of visual discriminative reinforcement on Tasks T1-T8. The Stage-I Baseline uses diagnostic-format adaptation only, whereas M1, M2, and FaultOvis progressively introduce category-level and cross-domain visual supervision.</figcaption>
</figure>

### Visual-module Optimization

The second ablation studies how different visual modules should be optimized under the auxiliary-head setting.

The results show that fully fine-tuning the visual head and visual embedding table leads to better performance than freezing or only partially adapting them. This suggests that the visual-to-language alignment modules in Ovis2 are sensitive to the distribution shift from natural images to industrial STFT images.

<figure class="paper-figure paper-figure--column">
  <img src="{{ '/assets/img/faultovis/group-ab2-bar.png' | relative_url }}" alt="Comparison of visual-module adaptation strategies on Tasks T1 and T5">
  <figcaption><strong>Figure 5.</strong> Comparison of visual-module adaptation strategies under the M1 configuration on representative Tasks T1 and T5.</figcaption>
</figure>

### Auxiliary Loss Weight

The third ablation studies the effect of the auxiliary classification loss weight. Small auxiliary-loss weights provide insufficient category-level supervision, while overly large weights may harm cross-domain generalization. A moderate setting provides a better trade-off between generative learning and visual discrimination.

### Triplet Loss Weight

The fourth ablation studies the effect of the triplet contrastive loss weight. Stronger contrastive supervision improves domain robustness by clustering same-class cross-domain samples and suppressing domain-specific variations.

<figure class="paper-figure paper-figure--column">
  <img src="{{ '/assets/img/faultovis/group-ab34-line.png' | relative_url }}" alt="Sensitivity to auxiliary-loss and triplet-loss weights on Tasks T1 and T5">
  <figcaption><strong>Figure 6.</strong> Sensitivity of cross-condition diagnostic performance to the auxiliary-loss weight beta and triplet-loss weight gamma on representative Tasks T1 and T5.</figcaption>
</figure>

Overall, the ablation studies confirm that FaultOvis benefits from both category-discriminative and domain-invariant visual representation learning.

<hr class="section-divider">

## Notes

FaultOvis is not intended to be only a conventional bearing fault classifier. Its main purpose is to investigate how vision-language models can be adapted to domain-shifted industrial signal analysis.

The key finding is that purely generative VLM adaptation is insufficient for robust cross-domain fault diagnosis. To use VLMs effectively in industrial diagnosis, the visual representation space should be explicitly supervised and aligned with fault-discriminative, domain-invariant objectives.

This project serves as an intermediate step in my research trajectory from signal-image-based VLM adaptation to more general physical-signal foundation models.

<hr class="section-divider">

## Paper and Code

- Paper: Coming soon
- Code: Coming soon
- Status: Manuscript under review
