---
layout: page
title: "VibAlign: Learning Language-Aligned Signal Tokens"
description: Raw physical-signal tokenization for industrial diagnosis and robotic tactile perception.
img: assets/img/vibalign/fig1.png
importance: 1
category: current research
permalink: /projects/vibalign/
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

  .paper-figure > img,
  .paper-figure .figure-panel img {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .paper-figure--narrow > img {
    max-width: min(100%, 560px);
  }

  .paper-figure figcaption {
    margin-top: 0.8rem;
    font-size: 0.9rem;
    line-height: 1.5;
    text-align: left;
  }

  .figure-grid {
    display: grid;
    gap: 1.25rem;
    align-items: start;
  }

  .figure-grid--comparison {
    grid-template-columns: minmax(0, 0.48fr) minmax(0, 0.5fr);
  }

  .figure-grid--stacked {
    grid-template-columns: minmax(0, 1fr);
  }

  .figure-grid--ablation {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .figure-grid--thu {
    grid-template-columns: minmax(0, 0.31fr) minmax(0, 0.62fr);
  }

  .figure-panel--full {
    grid-column: 1 / -1;
  }

  .figure-panel-label {
    margin: 0.35rem 0 0;
    font-weight: 600;
    text-align: center;
  }

  @media (max-width: 767px) {
    article table {
      display: block;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }

    .figure-grid--comparison,
    .figure-grid--ablation,
    .figure-grid--thu {
      grid-template-columns: minmax(0, 1fr);
    }

    .figure-panel--full {
      grid-column: auto;
    }
  }
---

## Overview

VibAlign is a raw physical-signal-to-LLM framework for industrial diagnosis and robotic tactile perception.

It learns language-aligned signal tokens from one-dimensional vibration and tactile signals, enabling large language models to perform structured physical-signal recognition and signal-conditioned response generation.

This work represents my recent transition from signal-image-based multimodal adaptation toward direct physical-signal tokenization, with the goal of connecting raw vibration and tactile signals to language-based reasoning systems.

<hr class="section-divider">

## Motivation

Modern industrial and robotic systems continuously generate rich physical signals, including vibration, tactile, acoustic, force, and other sensor measurements. However, most existing foundation models are primarily designed for text, images, and videos, while continuous physical signals remain underrepresented in the current multimodal AI landscape.

Existing LLM/MLLM-based signal analysis methods often rely on intermediate representations such as signal descriptions, statistical features, spectrograms, or time-frequency images. These approaches can be useful, but they do not directly address a fundamental question:

How can raw one-dimensional physical signals be converted into LLM-compatible semantic tokens?

VibAlign aims to bridge this gap by learning compact signal tokens from raw vibration and tactile signals and aligning them with textual label semantics. The framework is designed for structured physical-signal understanding in both industrial fault diagnosis and robotic tactile material recognition.

<hr class="section-divider">

## Method

<figure class="paper-figure">
  <img src="{{ '/assets/img/vibalign/fig1.png' | relative_url }}" alt="Overall VibAlign architecture for fault diagnosis and tactile perception">
  <figcaption><strong>Figure 1.</strong> Overall architecture of VibAlign for fault diagnosis (FD) and tactile perception (TP). A BiMamba-based encoder transforms raw one-dimensional vibration segments into temporal representations, which the soft codebook connector maps to LLM-compatible signal tokens and concatenates with textual instructions. An auxiliary classifier and reconstruction decoder support Stage 1 encoder pretraining, while the LoRA-adapted LLM uses verbalizer supervision and candidate scoring to produce a legal-label prediction followed by a structured explanation.</figcaption>
</figure>

VibAlign consists of three main components:

- A BiMamba-based temporal signal encoder for extracting representations from raw one-dimensional physical signals
- A learnable soft codebook connector that converts signal representations into LLM-compatible signal-token embeddings
- A LoRA-adapted LLM trained with verbalizer-guided supervision for structured response generation

<figure class="paper-figure">
  <img src="{{ '/assets/img/vibalign/fig2.png' | relative_url }}" alt="Detailed architecture of the VibAlign vibration signal encoder">
  <figcaption><strong>Figure 2.</strong> Detailed architecture of the vibration signal encoder. A two-layer one-dimensional convolutional patch embedding module converts the raw signal into local representations, which are enriched with learnable position embeddings and physical-time embeddings. Stacked residual BiMamba blocks with RMSNorm model bidirectional temporal dependencies, and the representation MLP produces patch-level representations for the codebook connector and the Stage 1 auxiliary objectives.</figcaption>
</figure>

<figure class="paper-figure paper-figure--narrow">
  <img src="{{ '/assets/img/vibalign/fig3.png' | relative_url }}" alt="Detailed architecture of the VibAlign codebook-based connector">
  <figcaption><strong>Figure 3.</strong> Detailed architecture of the codebook-based connector. Patch-level signal representations are first projected into the codebook space and compressed by a learnable cross-attention resampler into a fixed number of token-level representations. Each resampled representation is softly assigned to the key codewords, and the assignment-weighted combination of the paired value codewords yields LLM-space signal token embeddings.</figcaption>
</figure>

The framework follows a three-stage training paradigm. First, the signal encoder is pretrained to learn discriminative and reconstructive signal representations. Second, the codebook connector is trained to align signal tokens with class-level textual semantics through contrastive learning. Third, the LLM is adapted with signal-conditioned instruction data and verbalizer-guided supervision.

During inference, VibAlign uses candidate scoring over the legal label set to improve label validity and response-format stability, followed by structured explanation generation.

<hr class="section-divider">

## Key Contributions

- A raw physical-signal-to-LLM framework for vibration and tactile signal understanding
- A BiMamba-based signal encoder for modeling temporal dependencies in one-dimensional physical signals
- A soft codebook-based connector for constructing compact LLM-compatible signal tokens
- A three-stage signal-language alignment pipeline combining signal encoder pretraining, signal-text contrastive alignment, and verbalizer-guided LLM adaptation
- Candidate scoring-based inference for stable and label-consistent physical-signal recognition
- Evaluation on both industrial rolling bearing fault diagnosis and robotic tactile material recognition tasks
- Additional inference studies, signal-embedding sanity checks, ablations, cross-dataset analysis, and real-world THU dataset analysis

<hr class="section-divider">

## Key Results

<figure class="paper-figure">
  <div class="figure-grid figure-grid--comparison">
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig4a_macro_f1_heatmap.png' | relative_url }}" alt="Macro-F1 heatmap across fault diagnosis and tactile perception datasets">
      <p class="figure-panel-label">(a)</p>
    </div>
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig4b_average_macro_f1_grouped_bar.png' | relative_url }}" alt="Public, real-world, and overall average F1 scores for fault diagnosis">
      <p class="figure-panel-label">(b)</p>
    </div>
    <div class="figure-panel figure-panel--full">
      <img src="{{ '/assets/img/vibalign/fig4c_mllm_comparison_with_cider.png' | relative_url }}" alt="Comparison of MLLM-based methods using accuracy, macro-F1, and CIDEr">
      <p class="figure-panel-label">(c)</p>
    </div>
  </div>
  <figcaption><strong>Figure 4.</strong> Overall comparison with baseline methods. (a) Macro-F1 heatmap across FD and TP datasets, where CWRU to THU-1300 correspond to FD datasets and FC corresponds to the TP dataset. (b) Public, real-world, and overall average F1 scores on the FD task. (c) MLLM-based original-protocol comparison on FD average metrics, including accuracy, macro-F1, and CIDEr.</figcaption>
</figure>

### Industrial Fault Diagnosis

VibAlign is evaluated on multiple rolling bearing fault diagnosis datasets, including public benchmark datasets and real-world THU vibration data.

The results show that VibAlign achieves strong within-dataset performance on public industrial vibration datasets and competitive performance compared with traditional discriminative classifiers and image-based MLLM diagnostic baselines under their respective original inference protocols.

These results suggest that raw physical-signal tokenization can serve as a promising alternative to signal-image-based MLLM adaptation for industrial fault diagnosis.

### MLLM-Based System-Level Comparison

VibAlign is compared with representative MLLM-based diagnostic systems that use image-based signal representations. Unlike these signal-image-based methods, VibAlign directly constructs signal tokens from raw one-dimensional signals.

The comparison is interpreted as a system-level comparison rather than a fully decoding-controlled representation comparison, because different MLLM methods may follow different original inference protocols.

<hr class="section-divider">

## Robotic Tactile Perception

In addition to industrial vibration diagnosis, VibAlign is evaluated on robotic tactile material recognition.

This setting is important because tactile vibration signals are generated through physical contact between a robot and external materials. By applying VibAlign to robotic tactile data, this work extends physical-signal-to-language modeling from industrial machinery diagnosis toward robotic perception and embodied physical sensing.

The tactile recognition results show that raw tactile vibration signals can also be converted into LLM-compatible signal tokens for structured material recognition.

<hr class="section-divider">

## Inference and Signal Embedding Analysis

VibAlign further studies different inference strategies and signal-embedding conditions.

The inference comparison shows that open-ended free generation is unstable for structured physical-signal prediction, while candidate scoring over legal labels substantially improves label validity and response-format stability.

The signal-embedding sanity study shows that replacing real signal embeddings with no signal, random noise, or shuffled mismatched embeddings leads to clear performance degradation. This indicates that VibAlign relies on the input physical signal rather than only memorizing textual priors or response templates.

<figure class="paper-figure">
  <div class="figure-grid figure-grid--stacked">
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig5a_inference_strategy_comparison.png' | relative_url }}" alt="Comparison of VibAlign inference strategies">
      <p class="figure-panel-label">(a)</p>
    </div>
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig5b_signal_embedding_sanity_study.png' | relative_url }}" alt="VibAlign signal embedding sanity study">
      <p class="figure-panel-label">(b)</p>
    </div>
  </div>
  <figcaption><strong>Figure 5.</strong> Results of inference strategy comparison and signal embedding sanity study. (a) Inference strategy comparison. (b) Signal embedding sanity study.</figcaption>
</figure>

<hr class="section-divider">

## Ablation Study

Ablation studies analyze the effects of several key components, including LLM adaptation, signal-text alignment, positional embedding, reconstruction regularization, the codebook connector, and verbalizer-guided supervision.

The results support the importance of signal-conditioned LLM adaptation, signal-text contrastive alignment, verbalizer loss, and codebook-based signal token construction for stable physical-signal-to-language modeling.

<figure class="paper-figure">
  <div class="figure-grid figure-grid--ablation">
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig6a_macro_f1_drop_relative_to_full.png' | relative_url }}" alt="Fault diagnosis average macro-F1 change relative to the full VibAlign model">
      <p class="figure-panel-label">(a)</p>
    </div>
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig6b_cider_drop_relative_to_full.png' | relative_url }}" alt="Fault diagnosis average CIDEr change relative to the full VibAlign model">
      <p class="figure-panel-label">(b)</p>
    </div>
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig6c_fc_macro_f1_ablation.png' | relative_url }}" alt="FC macro-F1 comparison across VibAlign ablation variants">
      <p class="figure-panel-label">(c)</p>
    </div>
  </div>
  <figcaption><strong>Figure 6.</strong> Results of ablation studies. (a) FD average macro-F1 change relative to the full model. (b) FD average CIDEr change relative to the full model. (c) FC macro-F1 comparison across ablation variants.</figcaption>
</figure>

<hr class="section-divider">

## Real-World THU Analysis

The real-world THU vibration dataset presents stronger dataset shift and more challenging signal conditions than standard public benchmarks.

Additional analysis shows that raw-signal-to-language modeling remains sensitive to severe dataset-level shifts. The THU experiments also suggest that longer temporal contexts can be beneficial for real-world vibration modeling, especially when fault-related patterns require more extended temporal information.

<figure class="paper-figure">
  <div class="figure-grid figure-grid--thu">
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig7a_thu300_strategy_trend.png' | relative_url }}" alt="Accuracy and macro-F1 trends under different THU-300 analysis settings">
      <p class="figure-panel-label">(a)</p>
    </div>
    <div class="figure-panel">
      <img src="{{ '/assets/img/vibalign/fig7bc_thu300_confusion_matrices.png' | relative_url }}" alt="THU-300 confusion matrices for the full VibAlign model and T-B2">
      <p class="figure-panel-label">(b)</p>
    </div>
  </div>
  <figcaption><strong>Figure 7.</strong> Analysis results on the real-world THU dataset. (a) Accuracy and macro-F1 trends under different THU-300 analysis settings. (b) Confusion matrices of the full VibAlign model and T-B2 with segment length 4,096.</figcaption>
</figure>

<hr class="section-divider">

## Paper and Code

- Paper: Coming soon
- Code: Coming soon
- Status: Manuscript coming soon

<hr class="section-divider">

## Notes

VibAlign is positioned as a physical-signal-to-language modeling framework rather than a conventional task-specific classifier.

Its main contribution lies in exploring how raw vibration and tactile signals can be converted into compact signal tokens and aligned with language semantics, providing a step toward physical-signal foundation models for industrial and robotic systems.
