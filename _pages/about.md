---
layout: about
title: About Me
permalink: /

profile:
  align: left
  image: xinran-zhang.jpg
  image_circular: true
  more_info: >
    <p class="profile-name">Xinran Zhang</p>

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 4

latest_posts:
  enabled: false
  scrollable: false
  limit: 3
---

I am currently a Master's student in **Mechanical Engineering at Tsinghua University**, working on **physical-signal foundation models for industrial and robotic systems**.

My research explores how non-text physical signals, such as **vibration, tactile, and acoustic signals**, can be represented, aligned, and reasoned over by **large language models and multimodal foundation models**, with applications in **industrial diagnosis, robotic perception, and intelligent operation and maintenance**.

<!-- about-intro-end -->

<hr class="section-divider">

## Education
{: #education }

<div class="education-list">
  <div class="education-entry">
    <img src="{{ '/assets/img/education/thu.png' | relative_url }}" alt="Tsinghua University logo">
    <div>
      <strong>Tsinghua University</strong><br>
      M.S. in Mechanical Engineering<br>
      Sept. 2024 - Jun. 2027 (expected)<br>
      GPA: <strong>4.0 / 4.0</strong>, Rank: <strong>1 / 74</strong>
    </div>
  </div>

  <div class="education-entry">
    <img src="{{ '/assets/img/education/hnu.png' | relative_url }}" alt="Hunan University logo">
    <div>
      <strong>Hunan University</strong><br>
      B.S. in Vehicle Engineering<br>
      Sept. 2020 - Jun. 2024<br>
      GPA: <strong>3.91 / 4.0</strong>, Rank: <strong>1 / 123 for three consecutive academic years</strong>
    </div>
  </div>
</div>

<hr class="section-divider">

## Research Vision
{: #research-vision }

Modern industrial and robotic systems continuously generate rich physical signals, including vibration, tactile, acoustic, force, and other sensor measurements. However, most existing foundation models are primarily designed for text, images, or videos, while physical signals remain underrepresented in the current multimodal AI landscape.

My long-term research goal is to develop **foundation-model-based physical signal intelligence**: building unified representations, cross-modal alignment methods, and reliable reasoning frameworks that connect physical signals with **language, vision, and action spaces**.

I am particularly interested in three directions:

- **Physical-signal foundation models** for vibration, tactile, and acoustic signal understanding
- **Robot tactile perception and embodied physical-signal modeling**
- **Industrial AI agents**, intelligent maintenance, and digital-twin systems powered by LLMs

<hr class="section-divider">

## Research Interests
{: #research-interests }

- Physical Signal Foundation Models
- Multimodal Large Language Models for Industrial and Robotic Systems
- Signal-Language, Signal-Vision, and Signal-Action Alignment
- Vibration, Tactile, and Acoustic Signal Understanding
- Domain Generalization and Representation Learning
- Prognostics and Health Management (PHM)
- Industrial AI Agents and Intelligent Operation and Maintenance

My current and earlier work is collected on the [projects page]({{ '/projects/' | relative_url }}). A full record of my education, awards, teaching, and research skills is available on the [CV page]({{ '/cv/' | relative_url }}).

<hr class="section-divider">

<!-- generated-sections-end -->

## Earlier Research Experience
{: #earlier-research-experience }

### Vision-based Local Map Construction for Autonomous Driving

**This undergraduate thesis explored end-to-end local HD map construction for autonomous driving by transforming multi-view camera images into bird's-eye-view map representations.**

I reproduced and implemented a deep-learning-based BEV map construction framework using NuScenes surround-view camera images. The pipeline includes image feature extraction, BEV view transformation, map-element decoding, and vectorized reconstruction of lane dividers, pedestrian crossings, and road boundaries with piecewise Bezier curves.

**Highlights:** autonomous driving &middot; BEV perception &middot; local HD map construction &middot; Transformer &middot; Swin Transformer &middot; BiFPN &middot; Mask2Former &middot; piecewise Bezier curve

**Results:** trained and evaluated on NuScenes; achieved **42.6 mAP@HARD** and **61.4 mAP@EASY** over three static map-element categories; showed higher average AP than IPM, LSS, VPN, and HDMapNet baselines under the same 30-epoch evaluation setting.

**Status:** Undergraduate thesis &middot; Awarded Excellent Undergraduate Thesis at Hunan University

<hr class="section-divider">

## Awards & Social Activities
{: #awards-social-activities }

### Selected Awards

- University First-Class Scholarship, Tsinghua University, 2025
- National Scholarship, 2021, 2022, 2023
- Honorable Mention, Mathematical Contest in Modeling, 2023
- National First Prize, National English Competition for College Students, 2023
- National Third Prize, Chinese Mathematics Competition for College Students, 2023
- Second Prize, Hunan Provincial Mechanics Competition, 2022

### Teaching & Leadership

- Teaching Assistant, **Fundamentals of Engineering Drawing**, Tsinghua University
- Leader, Peer Learning Support Group, Hunan University

<hr class="section-divider">

## Tech Stack
{: #tech-stack }

### Programming & Research Tools

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![LaTeX](https://img.shields.io/badge/LaTeX-008080?style=for-the-badge&logo=latex&logoColor=white)

### Research Skills

- LLM/VLM adaptation
- LoRA / PEFT
- Multimodal instruction tuning
- GRPO / RL-based refinement
- Contrastive learning
- Representation learning
- Vibration and tactile signal preprocessing
- STFT and envelope spectrum analysis
- Signal visualization and experimental evaluation
