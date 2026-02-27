---
title: "Reconstructing Modern Reinforcement Learning"
description: "A structured roadmap to reinforcement learning, tracing the path from bandits and Q-learning to DQN, PPO, SAC, and offline RL by studying the failures each algorithm was designed to fix."
thumbnail: /images/placeholder-project.svg
tags: [reinforcement-learning, deep-rl, dqn, ppo, sac, offline-rl, rl-theory]
featured: true
toc: true
series: "Reconstructing Reinforcement Learning"
slug: "reconstructing-modern-reinforcement-learning"
---




Reinforcement learning papers often present a misleading picture of the field.
Algorithms appear as independent inventions — DQN, PPO, SAC, HER — each with its own notation, diagrams, and benchmarks. From a distance this looks like steady progress. From close up it feels like memorizing a zoo.

This series takes a different position:

Modern reinforcement learning is not a sequence of new ideas.
It is a sequence of *repairs*.

Every major algorithm exists because a simpler learning rule failed under a specific violated assumption. Once you identify the assumption that broke, the algorithm becomes obvious. Once you don’t, the field looks mysterious.

The goal of this project is to reconstruct the field by retracing those failures.

We will not begin with MuJoCo robots or large neural networks. We begin with the smallest possible setting — bandits — and gradually remove the assumptions that make learning easy. Each time learning stops working, we examine the failure empirically, diagnose what mathematical property was violated, and introduce the minimal mechanism required to fix it.

The series therefore follows a single causal chain:

---

### 1. Value Learning Foundations

**Online interaction → bandits → tabular MDPs → Q-learning → DQN**
When we combine function approximation, bootstrapping, and off-policy data, value learning becomes unstable. This instability motivates deep Q-networks.

---

### 2. Stabilizing Q-Learning

**DQN → target networks → replay buffers → Double/Dueling/PER → Rainbow**
We discover that DQN itself only works because of several hidden stabilizers. These mechanisms are not improvements — they are patches for divergence in bootstrapped learning.

---

### 3. Continuous Action Spaces

**Discrete argmax → continuous control → policy gradients → actor–critic**
Q-learning requires maximizing over actions. In continuous spaces this becomes intractable, forcing us to learn policies directly.

---

### 4. Unstable Policy Updates

**REINFORCE → advantage estimation → TRPO → PPO**
Direct policy optimization turns out to be violently unstable because small parameter updates can induce large distribution shifts. PPO emerges as a practical constraint on how fast a policy is allowed to change.

---

### 5. Off-Policy Continuous Control

**Replay + actor networks → DDPG → overestimated Q-values → TD3**
When actor-critic methods inherit bootstrapping, they inherit Q-learning’s bias as well. Twin critics appear as a correction for systematic value overestimation.

---

### 6. Exploration

**Deterministic policies → poor exploration → entropy regularization → SAC**
Many failures attributed to optimization are actually failures of exploration. Maximum-entropy RL reframes learning as probabilistic inference and produces stable behavior in complex environments.

---

### 7. Sparse Rewards

**Reward rarely observed → no gradient → goal relabeling → HER**
Even a correct algorithm cannot learn without signal. Hindsight experience replay shows that sometimes the problem is not optimization, but the definition of success.

---

### 8. Partial Observability

**State aliasing → memory → recurrent policies**
Real environments are not Markov. Agents must infer hidden state from history, turning reinforcement learning into a representation learning problem.

---

### 9. Offline Reinforcement Learning

**Fixed datasets → distribution shift → value extrapolation → CQL/IQL**
Most RL algorithms assume data comes from the current policy. When that assumption breaks, value functions hallucinate. Offline RL introduces conservative learning objectives to handle this shift.

---

### 10. Sample Inefficiency

**Interaction cost → learned dynamics → planning → world models**
Model-free methods trade computation for data. Model-based reinforcement learning closes this gap by learning to imagine experience instead of collecting it.

---

## How the series will work

Each article in the series follows the same structure:

1. We implement the simplest possible learner.
2. We show a concrete failure (training curves, value estimates, policy collapse).
3. We identify the violated assumption in the Bellman update or policy objective.
4. We introduce the minimal mechanism that fixes the problem.
5. We verify the fix empirically.

The emphasis is not on reproducing benchmarks.
It is on understanding *why an algorithm needed to be invented at all*.

By the end, DQN, PPO, and SAC should no longer look like separate algorithms. They should look like different responses to a single question:

**How do you make learning stable when an agent must learn from its own predictions while acting in an uncertain world?**

This is what we mean by *reconstructing* reinforcement learning.
