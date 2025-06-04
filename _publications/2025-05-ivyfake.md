---
title: "Ivy-Fake: A Unified Explainable Framework and Benchmark for Image and Video AIGC Detection"
collection: publications
category: manuscripts
permalink: /publication/2025-05-31-ivy-fake
excerpt: 'This paper presents Ivy-Fake, a unified framework and benchmark for the explainable detection of AI-generated images and videos, addressing current gaps in AIGC explainability and unified datasets by creating a new benchmark. [cite: 2, 3]'
date: 2025-05-31
venue: 'NeurIPS 2025 (In Submission) [cite: 1, 2]'
slidesurl: ''
paperurl: 'https://arxiv.org/abs/2506.00979 [cite: 3]'
bibtexurl: ''
citation: 'Jiang, Changjiang, et al. (2025). &quot;Ivy-Fake: A Unified Explainable Framework and Benchmark for Image and Video AIGC Detection.&quot; <i>arXiv:2506.00979 and NeurIPS 2025 (In Submission)</i>.'
---

This paper introduces Ivy-Fake, which focuses on the explainable classification and detection of AI-generated content (AIGC), particularly for images and videos. It addresses two primary issues: the lack of explainability in current AIGC-generated video content and the shortage of unified datasets for AIGC detection across both images and videos.

Key contributions and findings include:
* Distillation of a new benchmark dataset comprising 100K images and 100K videos with explainable AIGC detection data. This was achieved by using Gemini 2.5 Pro to distill Long COT (Chain-of-Thought) explanations along 12 sub-dimensions across spatial and temporal aspects, with data quality assessed by spatial and temporal reward models.
* Demonstrated the effectiveness of the distilled explainable data by fine-tuning Qwen2.5-VL-7B on 100K image data, which improved the F1 score on a 10K test set from 83% to 95%.
* A 3B parameter model, trained in multiple stages (general knowledge, AIGC classification data, explainable data) based on Llava-next, achieved SOTA on multiple benchmarks, notably outperforming the AIDE model by approximately 15% ACC on the Chameleon 2024 benchmark.
* The project has a dedicated webpage: [https://pi3ai.github.io/IvyFake](https://pi3ai.github.io/IvyFake).
* This work is currently in submission to NeurIPS 2025, with Jiang Changjiang as a co-first author.