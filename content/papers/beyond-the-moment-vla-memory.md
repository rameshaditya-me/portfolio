---
page_title: "Beyond the Moment: Conditioning Frozen VLAs on Memory for Long-Horizon Manipulation Tasks"
title: "Beyond the Moment: Conditioning Frozen VLAs on Memory for Long-Horizon Manipulation Tasks"
description: "Aditya Ramesh, Jatin Chauhan, Akshay Govind Srinivasan, Shivam Bhardwaj, Manohar Kaul"
authors: "Aditya Ramesh, Jatin Chauhan, Akshay Govind Srinivasan, Shivam Bhardwaj, Manohar Kaul"
subtitle: "ICML Workshop on Multimodal AI Agents (SCALE) 2026 · Accepted"
abstract: Foundation robotics models, most popularly Vision Language Action (VLA) models, struggle on long-horizon tasks because they rely on immediate sensory input. We introduce Training-Free Memory Conditioned Action Generation, a retrieval-augmented framework that conditions a frozen VLA on historical expert trajectories—without fine-tuning—achieving up to 27% relative gains on task completion and up to 2× in real-world experiments.
hero_cover: true
hero_dark: true
cover_image: assets/figures/project-unsplash-5.jpg
links:
  - label: Paper
    url: "#"
    icon: paper
intro_heading: Abstract
---

Foundation robotics models, most popularly **Vision Language Action (VLA)** models, struggle to perform well over long-horizon tasks due to their reliance on immediate sensory input. This induces compounding errors over inference timesteps, further exacerbated by non-robust backbones.

To address this, we introduce *Training-Free Memory Conditioned Action Generation*, a non-parametric retrieval-augmented framework that conditions a **frozen VLA** on historical expert trajectories. Our approach:

1. Constructs a memory of expert demonstrations.
2. Uses a **state-centric retrieval** mechanism to guide action generation without any fine-tuning.

## Results

By performing extensive evaluation on **5 datasets** over SOTA models, we show relative gains of up to **27%** on task completion success.

As an additional contribution we extend the popular **CALVIN** benchmark to task horizons of 6 and beyond, showcasing relative gains of up to **30%**, while also demonstrating robustness to corrupted observations.

Real-world experiments on complex manipulation tasks further demonstrate performance gains of up to **2×**.
