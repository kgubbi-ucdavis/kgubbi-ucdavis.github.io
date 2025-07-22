---
title: "From Prompt to Silicon: Designing a CNN-Based Keyword Spotting ASIC with Generative AI"
date: 2025-07-22T10:00:00-07:00
categories:
  - blog
tags:
  - ASIC
  - Keyword Spotting
  - Generative AI
  - Edge AI
  - Open Source Silicon
---

Voice interfaces are quickly becoming the dominant method of interaction across a broad range of devices—from smart speakers and wearables to appliances and automotive systems. At the center of this transformation is **Keyword Spotting (KWS)**, the task of detecting predefined wake words like “Hey Siri” or “OK Google” in continuous audio streams. Traditionally handled by cloud-based services or microcontrollers, keyword spotting is now migrating toward **edge-based, hardware-accelerated implementations**, offering major advantages in **latency, power efficiency, and privacy**.

This post describes the design and tapeout of a **CNN-based KWS accelerator ASIC** implemented on the Efabless Caravel SoC. The design was submitted as part of the “AI Wake Up Call” design challenge and selected for fabrication. What distinguishes this project is the **extensive use of Generative AI (ChatGPT-4o)** in generating RTL, refining architectural decisions, and assisting with testbench development. The result is a modular, synthesizable KWS accelerator tailored for edge deployment—fully compatible with open-source ASIC toolchains.

## Why Keyword Spotting at the Edge?

As the demand for voice-first interfaces grows, there is a shift from cloud-based inference to **on-device or “edge AI”** processing. This shift is driven by several technical and practical requirements:

- **Latency**: Cloud-based KWS introduces delay due to round-trip communication. Edge-based KWS enables near-instantaneous response.
- **Privacy**: Keeping audio data local to the device reduces exposure to external servers and mitigates data privacy concerns.
- **Power Consumption**: Wake-word detection must operate continuously in standby mode; cloud-based solutions or MCUs often consume too much power to sustain this efficiently.
- **Connectivity Independence**: Many devices operate in environments with unreliable or no internet access (e.g., industrial sites, rural homes). Edge AI eliminates this dependency.

These advantages are also reflected in commercial silicon efforts such as **PIMIC’s Listen™ chip**, a sub-millimeter ASIC that supports up to 32 wake words with only 50 microwatts of average power consumption. By integrating KWS directly into silicon, such chips can deliver **multi-month to multi-year battery life**, making them ideal for always-on wearables, home appliances, and remote IoT deployments.

## Project Overview

The CNN-based accelerator was designed to classify short audio inputs based on a quantized convolutional neural network architecture. The hardware is composed of key building blocks common in neural computation:

- **WeightBuffer and LineBuffer**: Register arrays for holding model weights and input audio frame data.
- **MACArray and AdderTree**: Perform multiply-accumulate operations across input channels, with reduction.
- **ReLU and Pooling Units**: Apply non-linearity and spatial downsampling.
- **ControlFSM**: Orchestrates data flow between the above modules and handles inference cycles.
- **CNN_Accelerator_Top**: Integrates all submodules and interfaces with the SoC via the `user_project_wrapper`.

The entire system is written in Verilog and designed to be compatible with the **OpenLane** ASIC flow, targeting the **SkyWater SKY130** process node. The design passes Efabless’ precheck criteria and was taped out via the **chipIgnite CI-2406 shuttle**.

## Generative AI in Hardware Design

A defining feature of this project was the **use of ChatGPT-4o** to assist with hardware development. The model was used to:

- Generate synthesizable Verilog for modules such as MAC arrays, pooling, and ReLU activation
- Produce structured control logic for FSM-based coordination of CNN layers
- Create testbenches and golden vectors for verification
- Suggest improvements for dataflow architecture and module parameterization
- Debug simulation mismatches and synthesis warnings

Prompting methodologies used included “Chain of Thought” for breaking down multi-step control problems and “Persona” prompting to guide the model into acting as a hardware engineer. This enabled high-quality, AI-assisted co-design with minimal manual intervention.

## Architectural Optimizations

To meet the stringent area and power requirements of edge AI workloads, the design incorporates multiple optimizations:

- **Integer Arithmetic**: All arithmetic is performed in fixed-point (INT16) representation to minimize resource usage.
- **Weight-Stationary Dataflow**: The design fixes weights in local buffers during computation, maximizing data reuse and minimizing memory bandwidth usage.
- **Look-Up Tables (LUTs)**: Used to accelerate non-linear functions (e.g., logarithms) and reduce computation latency.
- **Pipeline-Friendly Layout**: Modules are pipelined to allow concurrent computation and maximize throughput.
- **Pruning and Quantization Support**: While not implemented in this version, the architecture is extensible to support sparsity-based pruning and lower-precision quantization.

This mirrors techniques found in commercial KWS chips such as PIMIC’s Listen™, where fixed-point arithmetic and LUTs are central to reducing power and improving inference latency.

## ASIC vs. Microcontroller-Based KWS

A natural question arises: why not use a general-purpose microcontroller or DSP core for keyword spotting?

While MCUs are versatile and familiar to embedded developers, they are not optimal for the continuous, high-efficiency signal processing required for always-on wake-word detection. Specifically:

- **MCUs consume more active power**, especially when running convolutional layers or MFCC extraction.
- **Standby energy is higher**, requiring complex sleep/wake scheduling to conserve power.
- **Real-time response is limited** by software stack overheads and memory bottlenecks.
- **Security and reliability** may suffer from additional firmware dependencies.

In contrast, a dedicated KWS ASIC like the one developed here or PIMIC's Listen™ chip offers:

- Hardware-level parallelism for convolution and fully connected layers
- Minimal memory movement due to local buffer reuse
- Deep integration into SoC buses and power domains
- Predictable real-time performance and deterministic latency

By co-designing the accelerator with the application in mind, ASIC-based KWS systems achieve **10x to 100x improvements in performance-per-watt** compared to MCU-based solutions.

## Verification and Silicon Validation

All modules were verified using SystemVerilog testbenches. These were generated with LLM assistance and tested across a range of data patterns. Simulation was performed using Synopsys VCS, and coverage was verified through waveform inspection and directed assertions.

The project passed the tapeout precheck and has been fabricated on the Efabless chipIgnite shuttle. Post-silicon testing will be performed using a Terasic DE10-Lite FPGA, where input vectors will be streamed over GPIO and output predictions will be validated against golden outputs. Bitbanging and on-chip debug features will be used to verify module behavior and response latency.

## Looking Ahead

This project lays the groundwork for further research into low-power neural hardware at the edge. Immediate next steps include:

- Integrating a fixed-point MFCC extraction pipeline for full end-to-end audio inference
- Supporting multiple wake-word classes via deeper CNNs or DS-CNN architectures
- Benchmarking against commercial chips (e.g., Listen™, Syntiant NDP120, Google EdgeTPU)
- Exploring design-space tradeoffs in activation precision, pruning levels, and MAC array topology

Beyond KWS, the architecture is extensible to other edge audio tasks, such as emotion recognition, speaker identification, and command classification.

## Conclusion

As edge computing becomes central to modern electronics, dedicated silicon for keyword spotting will be indispensable for enabling real-time, private, and low-power voice interfaces. This project demonstrates that it is not only feasible—but efficient—to co-design such systems with the assistance of Generative AI. The resulting ASIC provides a lightweight, customizable, and reproducible platform for exploring future edge AI applications.

The use of LLMs in digital design, as demonstrated here, is no longer experimental. It represents a new methodology for rapidly prototyping, verifying, and deploying domain-specific accelerators—pushing the boundaries of what’s possible in academic, industrial, and open-source silicon development.
