---
title: "Welcome to Jekyll!"
date: 2019-04-18T15:34:30-04:00
categories:
  - blog
tags:
  - Jekyll
  - update
---
<!-- ---
title: "AI-Assisted ASIC Design for Keyword Spotting: Microarchitecture, Open-Source EDA, and Edge Intelligence"
date: 2025-07-22T20:29:27-07:00
categories:
  - blog
tags:
  - ASIC
  - Chip Design
  - Generative AI
  - OpenLane
  - Microarchitecture
  - Efabless
  - Keyword Spotting
  - Edge AI
--- -->


<style>
  {
  text-align: justify;
}
</style>

Voice interfaces are rapidly becoming the dominant method of interaction across a broad range of devices-from smart speakers and wearables to appliances and automotive systems. At the center of this transformation is Keyword Spotting (KWS), the task of detecting predefined wake words like “Hey Siri” or “OK Google” in continuous audio streams. Traditionally handled by cloud-based services or microcontrollers, keyword spotting is now migrating toward edge-based, hardware-accelerated implementations, offering major advantages in latency, power efficiency, and privacy.

This post describes the design and tapeout of a CNN-based KWS accelerator ASIC, built entirely with open-source tools and submitted to the [Efabless AI-Generated Design Challenge](https://efabless.com/genai/challenges/4-winners). What distinguishes this project is the extensive use of Generative AI (ChatGPT-4o) in generating RTL, refining architectural decisions, and assisting with testbench development. The result is a modular, synthesizable KWS accelerator tailored for edge deployment-fully compatible with open-source ASIC toolchains such as OpenLane and SkyWater SKY130.

## Keyword Spotting at the Edge

Keyword spotting systems must operate in always-on, low-power modes while delivering high accuracy under variable acoustic environments. Cloud-based solutions introduce latency and privacy risks, while MCU-based implementations consume excessive energy for real-time wake-word detection.

Commercial solutions like the [PIMIC Listen™ chip](https://www.pimic.ai/listen) and research innovations like the [ISSCC 2025 work by Lee et al.](https://ieeexplore.ieee.org/document/10904744) demonstrate what is possible when KWS is implemented in silicon. The Listen chip operates at 50µW and supports 32 keywords; meanwhile, the ISSCC 2025 KWS SoC achieves 92.2% accuracy on accented speech with on-chip training, consuming only 13.5µW.

Our design follows this trajectory by introducing a low-power ASIC with modular Verilog infrastructure, tailored for CNN-based audio inference.

## Project Overview

The architecture consists of:

- Weight and Line Buffers for audio input and parameter storage
- MAC Array and Adder Tree for convolution and reduction
- ReLU and Pooling units for activation and downsampling
- FSM-based control for sequencing operations
- Integration into Caravel’s user_project_wrapper with Wishbone interface

The system is written in Verilog, validated with SystemVerilog testbenches, and synthesized via OpenLane for SKY130.

## Generative AI in RTL Design

ChatGPT-4o supported:

- Module generation (MACs, ReLU, pooling, FSM)
- Prompt-guided testbench development
- Architecture exploration (pipeline scheduling, buffer reuse)
- Bug diagnosis and synthesis improvement

This AI-human co-design paradigm significantly reduced development time while increasing modularity and reproducibility.

## Inspired by State-of-the-Art Research

The ISSCC 2025 paper “A 13.5µW 35-Keyword End-to-End Keyword Spotting System Featuring Personalized On-Chip Training” [Lee et al.](https://ieeexplore.ieee.org/document/10904744) introduces user-specific training using only three audio samples per keyword. In this paper, only the FC layer is updated on-chip to reduce memory and MAC overhead, enabling accent-resilient models with 92.2% accuracy and low training energy (13.46µW).

This inspires several future directions for our work:

- Adding on-chip training for personalization
- Exploring sinc-convolution FEs for embedded MFCC extraction
- Compressing CNNs using depthwise separable layers and pruning

Our goal is to approach the flexibility and efficiency demonstrated in this work while leveraging open-source tools and generative co-design methodologies.

## Why Not Microcontrollers?

MCU-based KWS systems:

- Require full CPU wakeup for every inference
- Struggle with deterministic timing and power constraints
- Cannot offer hardware-level parallelism for convolution or softmax
- Rely on firmware and floating-point emulation for training

Dedicated silicon outperforms in every aspect: latency, power, area, and robustness-especially for always-on workloads.

## Verification and Fabrication

All RTL was verified with AI-assisted SystemVerilog testbenches and waveform analysis using VCS. The design passed tapeout precheck and was fabricated via Efabless’ CI-2406 shuttle.

Post-silicon testing will use GPIO-injected signals on a DE10-Lite board with Python-based data validation.

## Future Work

- Add MFCC pipeline (fixed-point FFT and Mel filterbanks)
- Support multiple classes with DS-CNN topology
- Benchmark power, latency, and area vs. Listen and ISSCC SoCs
- Train with accented datasets (GSCD) and explore gradient quantization
- Embed a trainable FC layer for end-user adaptation

## Conclusion

Keyword spotting at the edge is no longer a niche application-it is a core interface technology. As shown by the PIMIC Listen chip and ISSCC 2025 KWS SoC, ASICs are now leading the way in ultra-low power speech recognition. Our open-source CNN-based KWS accelerator demonstrates how generative AI can be harnessed to accelerate chip development, from prompt to silicon.

Advancements in Generative AI, combined with open-source EDA tools like [OpenROAD](https://theopenroadproject.org/), are transforming ASIC design by reducing entry barriers, enabling rapid prototyping, and empowering a broader community of engineers to participate in cutting-edge silicon development.