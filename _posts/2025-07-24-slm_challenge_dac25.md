---

title: "Winning the SLM Track at the ICLAD-DAC 2025 GenAI Chip Hackathon"
last_modified_at: 2025-07-22T21:00:00-07:00
categories:

* blog
  tags:
* ICLAD
* Hackathon
* SLM
* Generative AI
* ASIC
* RTL
* EDA
* Chip Design

---

### 🏆 ICLAD-DAC 2025 GenAI Chip Hackathon – SLM Track Winner

**Event:** ICLAD Hackathon @ DAC 2025
**Track:** Small Language Model (SLM) Challenge
**Award:** 🥇 1st Place, SLM Track
**Team:** Kevin Immanuel Gubbi (Team Lead), Pavan Kota, Jiheng Li

**Overview:**
The ICLAD-DAC 2025 GenAI Hackathon was a one-day, hands-on competition co-located with the Design Automation Conference (DAC). The event brought together teams to explore the capabilities of generative AI for chip design automation. It featured two tracks: the **Open Challenge**, using cloud-based large language models (LLMs), and the **SLM Challenge**, where teams operated small language models directly on Qualcomm X-Elite laptops.

**Our Focus:**
Our team competed in the **SLM Challenge**, targeting problems in RTL debugging, logic synthesis, and testbench generation. With no access to cloud compute, we optimized our solution pipeline to run fully on-device using resource-efficient open-source SLMs such as Qwen-2.5-Instruct-Verilog and TinyLlama.

**Technical Contributions:**

* Designed prompt strategies optimized for small models under strict latency constraints
* Developed Python wrappers and toolchains to interface SLM output with real-world EDA tools
* Successfully addressed challenges across multiple categories: Spec2Tapeout (ASU), Design Verification (Google), and Logic Synthesis (Qualcomm)

Our methods focused on practical GenAI integration: solving chip design problems without relying on heavy compute or expensive APIs, making hardware design more accessible and local.

**Why It Mattered:**
Winning the SLM track demonstrated the real-world feasibility of using smaller task specific small language models (SLMs) for chip design on edge devices. Our approach proved that even lightweight models can significantly assist in RTL verification and synthesis automation, making chip design workflows more scalable and democratized.

**Resources:**
[GenAI Chip Hackathon GitHub Site](https://github.com/ICLAD-Hackathon/ICLAD-Hackathon-2025)

Stay tuned for a deeper technical write-up on our solutions and pipelines.