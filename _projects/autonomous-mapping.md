---
layout: page
title: Vision-based Local Map Construction for Autonomous Driving
description: End-to-end local HD map construction from multi-view camera images using BEV representations.
importance: 5
category: earlier research
permalink: /projects/autonomous-mapping/
---

**This undergraduate thesis reproduced BeMapNet, an end-to-end camera-only local HD map construction framework for autonomous driving.**

Using six NuScenes surround-view cameras, I reconstructed lane dividers, pedestrian crossings, and road boundaries within a 60 m x 30 m perception range. The pipeline combines Swin Transformer feature extraction, BiFPN fusion, BEV view transformation, Mask2Former-style decoding, and piecewise Bezier curve prediction.

**Highlights:** autonomous driving · BEV perception · local HD map construction · Transformer · Swin Transformer · BiFPN · Mask2Former · piecewise Bezier curve

**Results:** trained the released Swin-T configuration on two RTX 2080 Ti GPUs for 184 hours; achieved **42.6 mAP@HARD** and **61.4 mAP@EASY**, within 1.1 mAP of the published BeMapNet results in both settings.

**Status:** Undergraduate thesis · Awarded Outstanding Undergraduate Thesis at Hunan University
