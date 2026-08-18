---
layout: page
title: Vision-based Local Map Construction for Autonomous Driving
description: End-to-end local HD map construction from multi-view camera images using BEV representations.
importance: 4
category: earlier research
permalink: /projects/autonomous-mapping/
---

**This undergraduate thesis explored end-to-end local HD map construction for autonomous driving by transforming multi-view camera images into bird's-eye-view map representations.**

I reproduced and implemented a deep-learning-based BEV map construction framework using NuScenes surround-view camera images. The pipeline includes image feature extraction, BEV view transformation, map-element decoding, and vectorized reconstruction of lane dividers, pedestrian crossings, and road boundaries with piecewise Bezier curves.

**Highlights:** autonomous driving · BEV perception · local HD map construction · Transformer · Swin Transformer · BiFPN · Mask2Former · piecewise Bezier curve

**Results:** trained and evaluated on NuScenes; achieved **42.6 mAP@HARD** and **61.4 mAP@EASY** over three static map-element categories; showed higher average AP than IPM, LSS, VPN, and HDMapNet baselines under the same 30-epoch evaluation setting.

**Status:** Undergraduate thesis · Awarded Excellent Undergraduate Thesis at Hunan University
