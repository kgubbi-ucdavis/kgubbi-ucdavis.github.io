/* ================================================
   Good Reads — curated catalog
   ------------------------------------------------
   This file contains data only. Rendering, search and
   filtering live in reading.js.

   To add a resource, copy an existing entry and edit it:
     id          stable, unique, lowercase-with-dashes
     title       exact title of the work
     authors     plain text, as credited
     year        year of the version linked (peer-reviewed
                 publication year when one exists)
     venue       journal, conference, publisher or site
     category    one of the category ids defined below
     type        paper | essay | talk | book | course |
                 tutorial | code | reference
     tags        optional: "Start Here", "Foundational",
                 "Recent", "Systems", "Research", "Tutorial",
                 "Survey", "Benchmark", "Open Source", ...
     difficulty  introductory | intermediate | advanced
     featured    true for a small number of entry points
     description one or two plain-text sentences
     url         original publisher, arXiv, DOI or
                 author-hosted source

   Descriptions are rendered as text, never as HTML.
   ================================================ */
(function () {
    'use strict';

    var categories = [
        {
            id: 'thinking',
            title: 'Thinking, Research & Entrepreneurship',
            short: 'Thinking & Research',
            intro: 'Essays and talks about choosing problems, judging evidence, and building things that matter. Most are short and can be read in an evening; their value comes from rereading them at different stages of a career.'
        },
        {
            id: 'ai-foundations',
            title: 'Foundations of AI & Deep Learning',
            short: 'AI Foundations',
            intro: 'A thread through modern machine learning: from formal models of neurons, to learning internal representations with backpropagation, to convolutional and residual networks, to attention and the Transformer. Pretrained language models followed, then the empirical study of scaling, alignment through human feedback, and work on making the computation itself cheaper.'
        },
        {
            id: 'agents',
            title: 'Agentic AI, Reasoning, Planning & Memory',
            short: 'Agents & Reasoning',
            intro: 'Work on language models that do more than answer a single prompt. These papers separate several distinct ideas: reasoning (producing intermediate steps), acting and tool use (calling external systems), planning and search (exploring alternatives), memory (managing information beyond the context window), feedback and verification (checking results), and benchmarking. Long-horizon reliability is still an open problem, and the evaluation papers here are as important as the methods.'
        },
        {
            id: 'science',
            title: 'AI for Scientific Discovery',
            short: 'AI for Science',
            intro: 'AlphaFold is the clearest example: given a protein\'s amino-acid sequence, it predicts the 3D structure the chain folds into, a problem that previously required months of laboratory work per protein. It is worth keeping three activities apart when reading this area: predicting structure or behavior, generating candidate hypotheses (new materials, algorithms, conjectures), and experimentally validating them. Models are strong at the first two; the third still depends on experiments and proofs.'
        },
        {
            id: 'neuroscience',
            title: 'Computational Neuroscience & Brain-Inspired Computing',
            short: 'Neuroscience',
            intro: 'Quantitative models of neurons and synapses, theories of how networks store and retrieve memories, and hardware that borrows ideas from biology. These models capture specific mechanisms well; how they combine into biological intelligence remains largely unexplained.'
        },
        {
            id: 'systems',
            title: 'Computer Architecture, Systems & AI Hardware',
            short: 'Systems & Architecture',
            intro: 'Large-scale AI is as much a systems problem as an algorithmic one. Training and serving models is bounded by compute, memory capacity, bandwidth, latency, energy, and the reliability of thousands of machines working together. Moving data often costs more time and energy than computing on it, which is why so much of the progress in this list comes from changes to architecture, dataflow and infrastructure.'
        },
        {
            id: 'chip-design',
            title: 'Semiconductor Design, VLSI & AI for EDA',
            short: 'Chips & EDA',
            intro: 'Device scaling set the pace of computing for decades; electronic design automation is how billions of transistors become a working chip. Recent machine-learning work on placement, RTL generation and verification is promising but early. A strong placement result or a benchmark score is not the same as a design that passes timing, power, physical and functional sign-off, and the replication studies below are worth reading alongside the headline papers.'
        },
        {
            id: 'hardware-security',
            title: 'Hardware Security, Cryptography & Systems Security',
            short: 'Security',
            intro: 'Trust in a computer depends on more than correct software. It rests on the compiler, the microarchitecture, the physical implementation that leaks timing and power, the supply chain that could insert malicious logic, and the verification that tries to rule all of this out. These papers show where each of those assumptions has failed.'
        },
        {
            id: 'courses',
            title: 'Courses, Books & Practical Resources',
            short: 'Courses & Tools',
            intro: 'Freely available material for learning by building: training neural networks from scratch, constructing a computer from logic gates, fuzzing software, reading a processor specification, or studying classic papers with other people.'
        }
    ];

    var resources = [

        /* ---------- Thinking, Research & Entrepreneurship ---------- */
        {
            id: 'hamming-you-and-your-research',
            title: 'You and Your Research',
            authors: 'Richard W. Hamming',
            year: 1986,
            venue: 'Talk at Bell Communications Research (transcript)',
            category: 'thinking',
            type: 'talk',
            tags: ['Start Here', 'Research'],
            difficulty: 'introductory',
            featured: true,
            description: 'Hamming asks why some scientists do important work and most do not. His answers are concrete: work on problems you believe are important, keep your door open, turn constraints into advantages, and let small daily differences in effort compound over years.',
            url: 'https://www.cs.virginia.edu/~robins/YouAndYourResearch.html'
        },
        {
            id: 'feynman-cargo-cult-science',
            title: 'Cargo Cult Science',
            authors: 'Richard P. Feynman',
            year: 1974,
            venue: 'Caltech commencement address; Engineering and Science 37(7)',
            category: 'thinking',
            type: 'talk',
            tags: ['Foundational', 'Research'],
            difficulty: 'introductory',
            featured: false,
            description: 'An argument for a kind of integrity that goes beyond not lying: reporting everything that might make your result wrong, and remembering that you are the easiest person to fool. Useful for anyone who designs experiments or reads benchmark tables.',
            url: 'https://calteches.library.caltech.edu/51/2/CargoCult.htm'
        },
        {
            id: 'graham-how-to-do-great-work',
            title: 'How to Do Great Work',
            authors: 'Paul Graham',
            year: 2023,
            venue: 'paulgraham.com',
            category: 'thinking',
            type: 'essay',
            tags: ['Start Here'],
            difficulty: 'introductory',
            featured: true,
            description: 'A long essay on choosing a field by curiosity and aptitude, working at the frontier of a topic until you notice gaps others overlook, and protecting the conditions that let ambitious work happen.',
            url: 'https://paulgraham.com/greatwork.html'
        },
        {
            id: 'graham-how-to-get-startup-ideas',
            title: 'How to Get Startup Ideas',
            authors: 'Paul Graham',
            year: 2012,
            venue: 'paulgraham.com',
            category: 'thinking',
            type: 'essay',
            tags: ['Entrepreneurship'],
            difficulty: 'introductory',
            featured: false,
            description: 'Argues that good startup ideas are usually noticed rather than invented: they come from problems you have yourself, often at the leading edge of a changing technology. Explains why ideas that sound plausible in a brainstorm are often the weakest.',
            url: 'https://paulgraham.com/startupideas.html'
        },
        {
            id: 'graham-do-things-that-dont-scale',
            title: 'Do Things That Don\'t Scale',
            authors: 'Paul Graham',
            year: 2013,
            venue: 'paulgraham.com',
            category: 'thinking',
            type: 'essay',
            tags: ['Entrepreneurship'],
            difficulty: 'introductory',
            featured: false,
            description: 'Early companies grow by recruiting users one at a time, serving them with unusual care, and doing manual work that would never make sense at scale. A practical counterweight to premature automation.',
            url: 'https://paulgraham.com/ds.html'
        },
        {
            id: 'naval-how-to-get-rich',
            title: 'How to Get Rich (without getting lucky)',
            authors: 'Naval Ravikant',
            year: 2018,
            venue: 'nav.al (originally a Twitter thread, later expanded as a podcast)',
            category: 'thinking',
            type: 'essay',
            tags: ['Entrepreneurship'],
            difficulty: 'introductory',
            featured: false,
            description: 'A compact framework for wealth creation built from a few ideas: specific knowledge that cannot easily be trained, accountability for outcomes, leverage through capital, labor, code and media, and playing long-term games with long-term people.',
            url: 'https://nav.al/rich'
        },
        {
            id: 'almanack-of-naval-ravikant',
            title: 'The Almanack of Naval Ravikant',
            authors: 'Eric Jorgenson (compiler), from the writing and talks of Naval Ravikant',
            year: 2020,
            venue: 'Book; free online edition at navalmanack.com',
            category: 'thinking',
            type: 'book',
            tags: ['Entrepreneurship'],
            difficulty: 'introductory',
            featured: false,
            description: 'A curated, organized collection of Naval\'s material on judgment, learning, luck, independent thinking and happiness, alongside the wealth essay. Easier to read straight through than the original threads and podcasts.',
            url: 'https://www.navalmanack.com/'
        },
        {
            id: 'sutton-bitter-lesson',
            title: 'The Bitter Lesson',
            authors: 'Richard S. Sutton',
            year: 2019,
            venue: 'incompleteideas.net',
            category: 'thinking',
            type: 'essay',
            tags: ['Start Here', 'Research'],
            difficulty: 'introductory',
            featured: true,
            description: 'A one-page argument from the history of AI: general methods that exploit growing computation, such as search and learning, have repeatedly overtaken approaches built on human domain knowledge. Worth reading alongside the scaling-law papers and critiques of them.',
            url: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html'
        },
        {
            id: 'thiel-zero-to-one',
            title: 'Zero to One: Notes on Startups, or How to Build the Future',
            authors: 'Peter Thiel with Blake Masters',
            year: 2014,
            venue: 'Crown Business',
            category: 'thinking',
            type: 'book',
            tags: ['Entrepreneurship'],
            difficulty: 'introductory',
            featured: false,
            description: 'Grew out of Thiel\'s 2012 Stanford startup course. Its central question is what valuable thing few people agree with you on, and it argues for building something new rather than competing in crowded markets.',
            url: 'https://www.penguinrandomhouse.com/books/234730/zero-to-one-by-peter-thiel-with-blake-masters/'
        },

        /* ---------- Foundations of AI & Deep Learning ---------- */
        {
            id: 'mcculloch-pitts-1943',
            title: 'A Logical Calculus of the Ideas Immanent in Nervous Activity',
            authors: 'Warren S. McCulloch, Walter Pitts',
            year: 1943,
            venue: 'Bulletin of Mathematical Biophysics 5',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'advanced',
            featured: false,
            description: 'Models neurons as binary threshold units and shows that networks of them can compute logical functions. The neuron model is far simpler than real biology, but it made the idea of a neural network precise enough to reason about.',
            url: 'https://doi.org/10.1007/BF02478259'
        },
        {
            id: 'rumelhart-hinton-williams-1986',
            title: 'Learning Representations by Back-Propagating Errors',
            authors: 'David E. Rumelhart, Geoffrey E. Hinton, Ronald J. Williams',
            year: 1986,
            venue: 'Nature 323',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Shows that propagating error gradients backward through a multi-layer network lets hidden units learn useful internal features. Backpropagation had earlier antecedents; this short paper is what made it widely understood as a way to learn representations.',
            url: 'https://doi.org/10.1038/323533a0'
        },
        {
            id: 'lecun-1998-gradient-based-learning',
            title: 'Gradient-Based Learning Applied to Document Recognition',
            authors: 'Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner',
            year: 1998,
            venue: 'Proceedings of the IEEE 86(11)',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Describes convolutional networks (LeNet-5) trained end-to-end for handwriting recognition, plus a framework for training whole recognition pipelines with gradients. Convolution, weight sharing and pooling here are the template later vision models built on.',
            url: 'https://doi.org/10.1109/5.726791'
        },
        {
            id: 'krizhevsky-2012-alexnet',
            title: 'ImageNet Classification with Deep Convolutional Neural Networks',
            authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton',
            year: 2012,
            venue: 'NeurIPS 2012',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational', 'Systems'],
            difficulty: 'intermediate',
            featured: false,
            description: 'AlexNet cut the ImageNet error rate by a wide margin using a large convolutional network, ReLU activations, dropout and training split across two GPUs. A reminder that the deep-learning shift depended on data and hardware as much as on new ideas.',
            url: 'https://proceedings.neurips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html'
        },
        {
            id: 'he-2016-resnet',
            title: 'Deep Residual Learning for Image Recognition',
            authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun',
            year: 2016,
            venue: 'CVPR 2016 (arXiv, December 2015)',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Adding identity shortcut connections lets each block learn a residual correction, which made networks with over a hundred layers trainable. Residual connections are now standard in almost every deep architecture, including Transformers.',
            url: 'https://arxiv.org/abs/1512.03385'
        },
        {
            id: 'vaswani-2017-attention',
            title: 'Attention Is All You Need',
            authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin',
            year: 2017,
            venue: 'NeurIPS 2017',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Start Here', 'Foundational'],
            difficulty: 'intermediate',
            featured: true,
            description: 'Introduces the Transformer, which replaces recurrence with self-attention so every position in a sequence can attend to every other in parallel. The change made training on very large datasets practical on GPUs and TPUs and underlies most current language models.',
            url: 'https://arxiv.org/abs/1706.03762'
        },
        {
            id: 'radford-2018-gpt',
            title: 'Improving Language Understanding by Generative Pre-Training',
            authors: 'Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever',
            year: 2018,
            venue: 'OpenAI technical report',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Pretrains a Transformer decoder to predict the next token on unlabeled text, then fine-tunes it on individual tasks. This pretrain-then-adapt recipe became the default way to build language systems.',
            url: 'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf'
        },
        {
            id: 'devlin-2019-bert',
            title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
            authors: 'Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova',
            year: 2019,
            venue: 'NAACL 2019 (arXiv, October 2018)',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Pretrains a bidirectional Transformer encoder by predicting masked words, giving representations that use context on both sides of each token. It set the pattern for encoder models used in search, classification and retrieval.',
            url: 'https://arxiv.org/abs/1810.04805'
        },
        {
            id: 'radford-2019-gpt2',
            title: 'Language Models are Unsupervised Multitask Learners',
            authors: 'Alec Radford, Jeffrey Wu, Rewon Child, David Luan, Dario Amodei, Ilya Sutskever',
            year: 2019,
            venue: 'OpenAI technical report (GPT-2)',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Shows that a larger language model trained on a broad web corpus can attempt tasks such as summarization and translation with no task-specific training, simply by being prompted. An early sign that scale changes what a model can do.',
            url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf'
        },
        {
            id: 'brown-2020-gpt3',
            title: 'Language Models are Few-Shot Learners',
            authors: 'Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, et al.',
            year: 2020,
            venue: 'NeurIPS 2020',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'GPT-3, a 175-billion-parameter model, learns new tasks from a few examples placed in the prompt (in-context learning). The paper is also candid about limitations, data contamination and societal risks, which are worth reading as carefully as the results.',
            url: 'https://arxiv.org/abs/2005.14165'
        },
        {
            id: 'kaplan-2020-scaling-laws',
            title: 'Scaling Laws for Neural Language Models',
            authors: 'Jared Kaplan, Sam McCandlish, Tom Henighan, Tom B. Brown, et al.',
            year: 2020,
            venue: 'arXiv preprint',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Research'],
            difficulty: 'advanced',
            featured: false,
            description: 'Measures how language-model loss falls as a smooth power law in parameters, data and compute across many orders of magnitude. Turned model sizing into something that could be planned from small experiments.',
            url: 'https://arxiv.org/abs/2001.08361'
        },
        {
            id: 'hoffmann-2022-chinchilla',
            title: 'Training Compute-Optimal Large Language Models',
            authors: 'Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch, et al.',
            year: 2022,
            venue: 'NeurIPS 2022',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Research'],
            difficulty: 'advanced',
            featured: false,
            description: 'Revisits the scaling analysis and finds that, for a fixed compute budget, many large models were undertrained: parameters and training tokens should grow roughly in proportion. Chinchilla (70B) outperformed much larger models trained on less data.',
            url: 'https://arxiv.org/abs/2203.15556'
        },
        {
            id: 'ouyang-2022-instructgpt',
            title: 'Training Language Models to Follow Instructions with Human Feedback',
            authors: 'Long Ouyang, Jeff Wu, Xu Jiang, et al.',
            year: 2022,
            venue: 'NeurIPS 2022',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'InstructGPT fine-tunes GPT-3 with human demonstrations, then with reinforcement learning against a reward model trained on human preference rankings (RLHF). Labelers preferred a 1.3B-parameter tuned model over the original 175B model, showing how much behavior depends on post-training.',
            url: 'https://arxiv.org/abs/2203.02155'
        },
        {
            id: 'dao-2022-flashattention',
            title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
            authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
            year: 2022,
            venue: 'NeurIPS 2022',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Systems'],
            difficulty: 'advanced',
            featured: false,
            description: 'Shows that the cost of attention on GPUs is dominated by reads and writes to high-bandwidth memory, not arithmetic. Tiling the computation to stay in on-chip SRAM gives exact attention that is faster and uses linear memory in sequence length.',
            url: 'https://arxiv.org/abs/2205.14135'
        },
        {
            id: 'hu-2022-lora',
            title: 'LoRA: Low-Rank Adaptation of Large Language Models',
            authors: 'Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen',
            year: 2022,
            venue: 'ICLR 2022 (arXiv, June 2021)',
            category: 'ai-foundations',
            type: 'paper',
            tags: ['Systems'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Freezes the pretrained weights and learns small low-rank update matrices instead, cutting the trainable parameters for fine-tuning by orders of magnitude. The reason domain adaptation of large models is feasible on modest hardware.',
            url: 'https://arxiv.org/abs/2106.09685'
        },

        /* ---------- Agentic AI, Reasoning, Planning & Memory ---------- */
        {
            id: 'wei-2022-chain-of-thought',
            title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
            authors: 'Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, et al.',
            year: 2022,
            venue: 'NeurIPS 2022',
            category: 'agents',
            type: 'paper',
            tags: ['Start Here', 'Reasoning'],
            difficulty: 'introductory',
            featured: true,
            description: 'Prompting a model with worked examples that include intermediate steps improves performance on arithmetic and multi-step problems, mainly in large models. Raises a question still debated: how faithfully the written steps reflect how the answer was produced.',
            url: 'https://arxiv.org/abs/2201.11903'
        },
        {
            id: 'yao-2023-react',
            title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
            authors: 'Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao',
            year: 2023,
            venue: 'ICLR 2023 (arXiv, October 2022)',
            category: 'agents',
            type: 'paper',
            tags: ['Start Here', 'Tool Use'],
            difficulty: 'introductory',
            featured: true,
            description: 'Interleaves reasoning traces with actions such as search queries, and feeds observations back into the next step. The thought-action-observation loop is the basic structure of most tool-using agents today.',
            url: 'https://arxiv.org/abs/2210.03629'
        },
        {
            id: 'schick-2023-toolformer',
            title: 'Toolformer: Language Models Can Teach Themselves to Use Tools',
            authors: 'Timo Schick, Jane Dwivedi-Yu, Roberto Dessì, Roberta Raileanu, Maria Lomeli, Luke Zettlemoyer, Nicola Cancedda, Thomas Scialom',
            year: 2023,
            venue: 'NeurIPS 2023',
            category: 'agents',
            type: 'paper',
            tags: ['Tool Use'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Rather than prompting for tool use, the model learns it: it annotates its own training text with candidate API calls (calculator, search, translation) and keeps only those that reduce prediction loss.',
            url: 'https://arxiv.org/abs/2302.04761'
        },
        {
            id: 'yao-2023-tree-of-thoughts',
            title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models',
            authors: 'Shunyu Yao, Dian Yu, Jeffrey Zhao, Izhak Shafran, Thomas L. Griffiths, Yuan Cao, Karthik Narasimhan',
            year: 2023,
            venue: 'NeurIPS 2023',
            category: 'agents',
            type: 'paper',
            tags: ['Planning'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Treats reasoning as search: the model proposes several partial solutions, evaluates them, and explores or backtracks with breadth- or depth-first search. A clear example of planning as distinct from producing a single chain of steps.',
            url: 'https://arxiv.org/abs/2305.10601'
        },
        {
            id: 'shinn-2023-reflexion',
            title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
            authors: 'Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao',
            year: 2023,
            venue: 'NeurIPS 2023',
            category: 'agents',
            type: 'paper',
            tags: ['Feedback'],
            difficulty: 'intermediate',
            featured: false,
            description: 'After a failed attempt, the agent writes a short reflection on what went wrong and stores it for the next try, improving results on coding and decision tasks without updating weights. Works best when there is a reliable external signal, such as unit tests, to say an attempt failed.',
            url: 'https://arxiv.org/abs/2303.11366'
        },
        {
            id: 'park-2023-generative-agents',
            title: 'Generative Agents: Interactive Simulacra of Human Behavior',
            authors: 'Joon Sung Park, Joseph C. O\'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein',
            year: 2023,
            venue: 'UIST 2023',
            category: 'agents',
            type: 'paper',
            tags: ['Memory'],
            difficulty: 'introductory',
            featured: false,
            description: 'Simulates a small town of language-model characters, each with a memory stream, a retrieval rule based on recency, importance and relevance, and periodic reflection. A readable study of memory architecture for agents.',
            url: 'https://arxiv.org/abs/2304.03442'
        },
        {
            id: 'wang-2023-voyager',
            title: 'Voyager: An Open-Ended Embodied Agent with Large Language Models',
            authors: 'Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar',
            year: 2023,
            venue: 'arXiv preprint',
            category: 'agents',
            type: 'paper',
            tags: ['Memory', 'Feedback'],
            difficulty: 'intermediate',
            featured: false,
            description: 'An agent in Minecraft that proposes its own curriculum, writes code to accomplish tasks, refines it using execution feedback, and saves working programs in a reusable skill library. Shows how code can serve as long-term procedural memory.',
            url: 'https://arxiv.org/abs/2305.16291'
        },
        {
            id: 'wu-2023-autogen',
            title: 'AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation',
            authors: 'Qingyun Wu, Gagan Bansal, Jieyu Zhang, Yiran Wu, et al.',
            year: 2023,
            venue: 'arXiv preprint',
            category: 'agents',
            type: 'paper',
            tags: ['Open Source'],
            difficulty: 'introductory',
            featured: false,
            description: 'A framework for building applications as conversations among several configurable agents, human participants and tools. Useful for seeing how multi-agent designs are structured in practice; whether multiple agents beat one well-designed agent depends heavily on the task.',
            url: 'https://arxiv.org/abs/2308.08155'
        },
        {
            id: 'packer-2023-memgpt',
            title: 'MemGPT: Towards LLMs as Operating Systems',
            authors: 'Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez',
            year: 2023,
            venue: 'arXiv preprint',
            category: 'agents',
            type: 'paper',
            tags: ['Memory', 'Systems'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Borrows virtual memory from operating systems: the model manages a small main context and explicitly pages information to and from external storage. A systems view of how agents can work with more information than fits in a context window.',
            url: 'https://arxiv.org/abs/2310.08560'
        },
        {
            id: 'jimenez-2024-swe-bench',
            title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?',
            authors: 'Carlos E. Jimenez, John Yang, Alexander Wettig, Shunyu Yao, Kexin Pei, Ofir Press, Karthik Narasimhan',
            year: 2024,
            venue: 'ICLR 2024 (arXiv, October 2023)',
            category: 'agents',
            type: 'paper',
            tags: ['Benchmark'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Builds tasks from real GitHub issues in Python repositories; a solution counts only if the project\'s own tests pass. Moved coding evaluation from isolated functions to navigating and editing large codebases.',
            url: 'https://arxiv.org/abs/2310.06770'
        },
        {
            id: 'lightman-2024-lets-verify',
            title: 'Let\'s Verify Step by Step',
            authors: 'Hunter Lightman, Vineet Kosaraju, Yura Burda, Harri Edwards, Bowen Baker, Teddy Lee, Jan Leike, John Schulman, Ilya Sutskever, Karl Cobbe',
            year: 2024,
            venue: 'ICLR 2024 (arXiv, May 2023)',
            category: 'agents',
            type: 'paper',
            tags: ['Verification'],
            difficulty: 'advanced',
            featured: false,
            description: 'Compares reward models that judge only the final answer with ones that judge each reasoning step, and finds step-level (process) supervision selects correct math solutions more reliably. Introduces the PRM800K dataset of step-level human labels.',
            url: 'https://arxiv.org/abs/2305.20050'
        },
        {
            id: 'yao-2024-tau-bench',
            title: 'τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains',
            authors: 'Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan',
            year: 2024,
            venue: 'arXiv preprint',
            category: 'agents',
            type: 'paper',
            tags: ['Benchmark', 'Reliability'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Agents must follow a written policy while using tools and talking to a simulated user. Introduces pass^k, the probability of succeeding on the same task in all k trials, which exposes how inconsistent agents are even when their average success looks reasonable.',
            url: 'https://arxiv.org/abs/2406.12045'
        },
        {
            id: 'kwa-2025-measuring-long-tasks',
            title: 'Measuring AI Ability to Complete Long Tasks',
            authors: 'Thomas Kwa, Ben West, et al. (METR)',
            year: 2025,
            venue: 'arXiv preprint (later versions retitled "... Long Software Tasks")',
            category: 'agents',
            type: 'paper',
            tags: ['Recent', 'Reliability'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Proposes measuring agents by the length of tasks, in human expert time, that they complete with 50% reliability, and tracks how that horizon has changed across models. The horizon is much shorter at higher reliability thresholds, which is the more relevant number for real deployments.',
            url: 'https://arxiv.org/abs/2503.14499'
        },

        /* ---------- AI for Scientific Discovery ---------- */
        {
            id: 'jumper-2021-alphafold',
            title: 'Highly Accurate Protein Structure Prediction with AlphaFold',
            authors: 'John Jumper, Richard Evans, Alexander Pritzel, et al.',
            year: 2021,
            venue: 'Nature 596',
            category: 'science',
            type: 'paper',
            tags: ['Start Here', 'Foundational'],
            difficulty: 'intermediate',
            featured: true,
            description: 'Describes AlphaFold 2, which predicts protein structures from sequence with accuracy often comparable to experimental methods, combining learned attention over evolutionary alignments with a geometric structure module. Predicted structures are hypotheses with confidence scores, and many applications still require experimental confirmation.',
            url: 'https://doi.org/10.1038/s41586-021-03819-2'
        },
        {
            id: 'abramson-2024-alphafold3',
            title: 'Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3',
            authors: 'Josh Abramson, Jonas Adler, Jack Dunger, et al.',
            year: 2024,
            venue: 'Nature 630',
            category: 'science',
            type: 'paper',
            tags: ['Recent'],
            difficulty: 'advanced',
            featured: false,
            description: 'Extends structure prediction from single proteins to complexes with DNA, RNA, small molecules and ions, replacing the structure module with a diffusion-based generator. Interactions are the part of biology most relevant to drug design.',
            url: 'https://doi.org/10.1038/s41586-024-07487-w'
        },
        {
            id: 'fawzi-2022-alphatensor',
            title: 'Discovering Faster Matrix Multiplication Algorithms with Reinforcement Learning',
            authors: 'Alhussein Fawzi, Matej Balog, Aja Huang, et al.',
            year: 2022,
            venue: 'Nature 610',
            category: 'science',
            type: 'paper',
            tags: ['Research'],
            difficulty: 'advanced',
            featured: false,
            description: 'AlphaTensor frames finding a matrix multiplication algorithm as a single-player game of decomposing a tensor, and discovers algorithms with fewer multiplications for some sizes. Here the output is an algorithm whose correctness can be checked exactly.',
            url: 'https://doi.org/10.1038/s41586-022-05172-4'
        },
        {
            id: 'sanchez-gonzalez-2020-learning-to-simulate',
            title: 'Learning to Simulate Complex Physics with Graph Networks',
            authors: 'Alvaro Sanchez-Gonzalez, Jonathan Godwin, Tobias Pfaff, Rex Ying, Jure Leskovec, Peter W. Battaglia',
            year: 2020,
            venue: 'ICML 2020',
            category: 'science',
            type: 'paper',
            tags: ['Research'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Represents fluids, sand and deformable materials as particles connected in a graph and trains a network to predict their next state. A clean example of learned simulation, including where errors accumulate over long rollouts.',
            url: 'https://arxiv.org/abs/2002.09405'
        },
        {
            id: 'merchant-2023-gnome',
            title: 'Scaling Deep Learning for Materials Discovery',
            authors: 'Amil Merchant, Simon Batzner, Samuel S. Schoenholz, Muratahan Aykol, Gowoon Cheon, Ekin Dogus Cubuk',
            year: 2023,
            venue: 'Nature 624',
            category: 'science',
            type: 'paper',
            tags: ['Recent'],
            difficulty: 'advanced',
            featured: false,
            description: 'GNoME uses graph networks and active learning to predict hundreds of thousands of crystal structures that are computationally stable. Later commentary from materials chemists questioned how many are genuinely novel or useful, a good case study in the gap between prediction and validated discovery.',
            url: 'https://doi.org/10.1038/s41586-023-06735-9'
        },
        {
            id: 'romera-paredes-2024-funsearch',
            title: 'Mathematical Discoveries from Program Search with Large Language Models',
            authors: 'Bernardino Romera-Paredes, Mohammadamin Barekatain, Alexander Novikov, et al.',
            year: 2024,
            venue: 'Nature 625',
            category: 'science',
            type: 'paper',
            tags: ['Recent'],
            difficulty: 'intermediate',
            featured: false,
            description: 'FunSearch pairs a language model that proposes programs with an automatic evaluator that scores them, and evolves the best candidates. It found new constructions for the cap set problem; the evaluator, not the language model, is what guarantees the results are correct.',
            url: 'https://doi.org/10.1038/s41586-023-06924-6'
        },

        /* ---------- Computational Neuroscience & Brain-Inspired Computing ---------- */
        {
            id: 'hodgkin-huxley-1952',
            title: 'A Quantitative Description of Membrane Current and Its Application to Conduction and Excitation in Nerve',
            authors: 'A. L. Hodgkin, A. F. Huxley',
            year: 1952,
            venue: 'The Journal of Physiology 117(4)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'advanced',
            featured: false,
            description: 'Builds a set of differential equations for voltage-dependent sodium and potassium currents in the squid giant axon that reproduce the action potential. Still the reference point for biophysical neuron models and a model of how to combine experiment and theory.',
            url: 'https://doi.org/10.1113/jphysiol.1952.sp004764'
        },
        {
            id: 'hebb-1949-organization-of-behavior',
            title: 'The Organization of Behavior: A Neuropsychological Theory',
            authors: 'Donald O. Hebb',
            year: 1949,
            venue: 'Wiley (reissued by Psychology Press, 2002)',
            category: 'neuroscience',
            type: 'book',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Proposes that a synapse strengthens when one cell repeatedly takes part in firing another, and that such changes build cell assemblies underlying perception and memory. The source of the Hebbian learning idea behind many later models.',
            url: 'https://doi.org/10.4324/9781410612403'
        },
        {
            id: 'hopfield-1982',
            title: 'Neural Networks and Physical Systems with Emergent Collective Computational Abilities',
            authors: 'J. J. Hopfield',
            year: 1982,
            venue: 'Proceedings of the National Academy of Sciences 79(8)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Start Here', 'Foundational'],
            difficulty: 'intermediate',
            featured: true,
            description: 'Shows that a network of symmetrically connected units has an energy function whose minima act as stored memories, so a partial cue settles into a complete pattern. Connected neural computation to statistical physics and shaped later work on associative memory.',
            url: 'https://doi.org/10.1073/pnas.79.8.2554'
        },
        {
            id: 'bi-poo-1998-stdp',
            title: 'Synaptic Modifications in Cultured Hippocampal Neurons: Dependence on Spike Timing, Synaptic Strength, and Postsynaptic Cell Type',
            authors: 'Guo-qiang Bi, Mu-ming Poo',
            year: 1998,
            venue: 'Journal of Neuroscience 18(24)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'advanced',
            featured: false,
            description: 'Measures how the sign and size of synaptic change depend on the millisecond-scale order of pre- and postsynaptic spikes, mapping out the spike-timing-dependent plasticity (STDP) window. STDP is the learning rule most often implemented in spiking and neuromorphic systems.',
            url: 'https://www.jneurosci.org/content/18/24/10464'
        },
        {
            id: 'maass-1997-spiking-neurons',
            title: 'Networks of Spiking Neurons: The Third Generation of Neural Network Models',
            authors: 'Wolfgang Maass',
            year: 1997,
            venue: 'Neural Networks 10(9)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'advanced',
            featured: false,
            description: 'Analyzes the computational power of networks that communicate with timed spikes rather than continuous values, and shows that spike timing can carry information efficiently. The theoretical motivation for spiking neural networks.',
            url: 'https://doi.org/10.1016/S0893-6080(97)00011-7'
        },
        {
            id: 'izhikevich-2003-simple-model',
            title: 'Simple Model of Spiking Neurons',
            authors: 'Eugene M. Izhikevich',
            year: 2003,
            venue: 'IEEE Transactions on Neural Networks 14(6)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Tutorial'],
            difficulty: 'intermediate',
            featured: false,
            description: 'A two-variable model that reproduces many firing patterns seen in cortical neurons (regular spiking, bursting, chattering) at a cost close to a simple integrate-and-fire neuron. Short, with code, and a good place to start simulating spiking networks.',
            url: 'https://doi.org/10.1109/TNN.2003.820440'
        },
        {
            id: 'davies-2018-loihi',
            title: 'Loihi: A Neuromorphic Manycore Processor with On-Chip Learning',
            authors: 'Mike Davies, Narayan Srinivasa, Tsung-Han Lin, et al.',
            year: 2018,
            venue: 'IEEE Micro 38(1)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Hardware'],
            difficulty: 'advanced',
            featured: false,
            description: 'Describes Intel\'s 14 nm digital spiking processor with 128 neuromorphic cores and programmable on-chip synaptic learning rules. Useful for seeing which biological ideas survive contact with real silicon constraints.',
            url: 'https://doi.org/10.1109/MM.2018.112130359'
        },
        {
            id: 'hassabis-2017-neuroscience-inspired-ai',
            title: 'Neuroscience-Inspired Artificial Intelligence',
            authors: 'Demis Hassabis, Dharshan Kumaran, Christopher Summerfield, Matthew Botvinick',
            year: 2017,
            venue: 'Neuron 95(2)',
            category: 'neuroscience',
            type: 'paper',
            tags: ['Survey', 'Start Here'],
            difficulty: 'introductory',
            featured: false,
            description: 'A review of ideas that moved between neuroscience and AI, including reinforcement learning, attention, episodic memory and continual learning, and of open questions where neuroscience may still offer guidance.',
            url: 'https://doi.org/10.1016/j.neuron.2017.06.011'
        },

        /* ---------- Computer Architecture, Systems & AI Hardware ---------- */
        {
            id: 'kung-1982-systolic',
            title: 'Why Systolic Architectures?',
            authors: 'H. T. Kung',
            year: 1982,
            venue: 'IEEE Computer 15(1)',
            category: 'systems',
            type: 'paper',
            tags: ['Foundational', 'Hardware'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Data flows rhythmically through a regular array of simple processing elements, so each value fetched from memory is reused many times. The matrix units in TPUs and many accelerators are systolic arrays.',
            url: 'https://doi.org/10.1109/MC.1982.1653825'
        },
        {
            id: 'wulf-mckee-1995-memory-wall',
            title: 'Hitting the Memory Wall: Implications of the Obvious',
            authors: 'Wm. A. Wulf, Sally A. McKee',
            year: 1995,
            venue: 'ACM SIGARCH Computer Architecture News 23(1)',
            category: 'systems',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'introductory',
            featured: false,
            description: 'A four-page argument that because processor speed was improving much faster than DRAM latency, average memory access time would come to dominate performance. The same pressure now drives HBM, on-chip SRAM and IO-aware algorithms.',
            url: 'https://doi.org/10.1145/216585.216588'
        },
        {
            id: 'dean-ghemawat-2004-mapreduce',
            title: 'MapReduce: Simplified Data Processing on Large Clusters',
            authors: 'Jeffrey Dean, Sanjay Ghemawat',
            year: 2004,
            venue: 'OSDI 2004',
            category: 'systems',
            type: 'paper',
            tags: ['Start Here', 'Systems'],
            difficulty: 'introductory',
            featured: true,
            description: 'Programmers write a map and a reduce function; the runtime handles partitioning, scheduling, data movement and machine failures across thousands of commodity servers. A lesson in choosing an abstraction narrow enough that the system can do the hard parts.',
            url: 'https://www.usenix.org/legacy/event/osdi04/tech/dean.html'
        },
        {
            id: 'chang-2006-bigtable',
            title: 'Bigtable: A Distributed Storage System for Structured Data',
            authors: 'Fay Chang, Jeffrey Dean, Sanjay Ghemawat, Wilson C. Hsieh, Deborah A. Wallach, Mike Burrows, Tushar Chandra, Andrew Fikes, Robert E. Gruber',
            year: 2006,
            venue: 'OSDI 2006',
            category: 'systems',
            type: 'paper',
            tags: ['Systems'],
            difficulty: 'intermediate',
            featured: false,
            description: 'A sparse, sorted, distributed map indexed by row, column and timestamp, built on a distributed file system and a lock service. Influenced a generation of wide-column stores and is a good study of designing for petabyte scale.',
            url: 'https://www.usenix.org/legacy/event/osdi06/tech/chang.html'
        },
        {
            id: 'dean-2012-distbelief',
            title: 'Large Scale Distributed Deep Networks',
            authors: 'Jeffrey Dean, Greg S. Corrado, Rajat Monga, Kai Chen, Matthieu Devin, Quoc V. Le, et al.',
            year: 2012,
            venue: 'NeurIPS 2012',
            category: 'systems',
            type: 'paper',
            tags: ['Systems'],
            difficulty: 'intermediate',
            featured: false,
            description: 'DistBelief trained networks with billions of parameters across thousands of CPU cores using model parallelism and asynchronous SGD with a parameter server (Downpour SGD). An early statement that deep learning progress would depend on distributed systems.',
            url: 'https://papers.nips.cc/paper/2012/hash/6aca97005c68f1206823815f66102863-Abstract.html'
        },
        {
            id: 'dean-barroso-2013-tail-at-scale',
            title: 'The Tail at Scale',
            authors: 'Jeffrey Dean, Luiz André Barroso',
            year: 2013,
            venue: 'Communications of the ACM 56(2)',
            category: 'systems',
            type: 'paper',
            tags: ['Start Here', 'Systems'],
            difficulty: 'introductory',
            featured: false,
            description: 'When a request fans out to hundreds of servers, rare slow responses become the common case. Describes techniques such as hedged and tied requests that make a system responsive even when its components are not.',
            url: 'https://doi.org/10.1145/2408776.2408794'
        },
        {
            id: 'horowitz-2014-energy',
            title: 'Computing\'s Energy Problem (and What We Can Do About It)',
            authors: 'Mark Horowitz',
            year: 2014,
            venue: 'IEEE ISSCC 2014',
            category: 'systems',
            type: 'paper',
            tags: ['Foundational', 'Hardware'],
            difficulty: 'introductory',
            featured: false,
            description: 'With Dennard scaling over, performance is limited by power. Its table of energy per operation, in which a DRAM access costs orders of magnitude more than an arithmetic operation, is one of the most cited justifications for specialized hardware.',
            url: 'https://doi.org/10.1109/ISSCC.2014.6757323'
        },
        {
            id: 'abadi-2016-tensorflow',
            title: 'TensorFlow: A System for Large-Scale Machine Learning',
            authors: 'Martín Abadi, Paul Barham, Jianmin Chen, et al.',
            year: 2016,
            venue: 'OSDI 2016',
            category: 'systems',
            type: 'paper',
            tags: ['Systems', 'Open Source'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Represents computation and mutable state as a dataflow graph that can be placed across CPUs, GPUs and TPUs. Explains the design choices behind moving from the DistBelief parameter-server model to a more flexible programming model.',
            url: 'https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi'
        },
        {
            id: 'jouppi-2017-tpu',
            title: 'In-Datacenter Performance Analysis of a Tensor Processing Unit',
            authors: 'Norman P. Jouppi, Cliff Young, Nishant Patil, David Patterson, et al.',
            year: 2017,
            venue: 'ISCA 2017',
            category: 'systems',
            type: 'paper',
            tags: ['Start Here', 'Hardware'],
            difficulty: 'intermediate',
            featured: true,
            description: 'Describes the first TPU, an inference accelerator built around a 256x256 systolic matrix unit, and compares it with contemporary CPUs and GPUs on production workloads. Unusually frank about what limited it: memory bandwidth bounded several of the workloads.',
            url: 'https://arxiv.org/abs/1704.04760'
        },
        {
            id: 'sze-2017-efficient-dnn',
            title: 'Efficient Processing of Deep Neural Networks: A Tutorial and Survey',
            authors: 'Vivienne Sze, Yu-Hsin Chen, Tien-Ju Yang, Joel S. Emer',
            year: 2017,
            venue: 'Proceedings of the IEEE 105(12)',
            category: 'systems',
            type: 'paper',
            tags: ['Tutorial', 'Survey', 'Hardware'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Explains DNN computation from a hardware perspective: dataflows such as weight-, output- and row-stationary, data reuse across the memory hierarchy, and how to evaluate accelerators fairly. A good bridge for ML readers entering architecture, and vice versa.',
            url: 'https://arxiv.org/abs/1703.09039'
        },
        {
            id: 'hennessy-patterson-2019-golden-age',
            title: 'A New Golden Age for Computer Architecture',
            authors: 'John L. Hennessy, David A. Patterson',
            year: 2019,
            venue: 'Communications of the ACM 62(2) (Turing Lecture)',
            category: 'systems',
            type: 'paper',
            tags: ['Start Here', 'Hardware'],
            difficulty: 'introductory',
            featured: true,
            description: 'Traces how the end of Dennard scaling and slowing Moore\'s law leave domain-specific architectures, domain-specific languages, open instruction sets such as RISC-V, and agile hardware development as the main paths to better performance.',
            url: 'https://doi.org/10.1145/3282307'
        },

        /* ---------- Semiconductor Design, VLSI & AI for EDA ---------- */
        {
            id: 'moore-1965-cramming',
            title: 'Cramming More Components onto Integrated Circuits',
            authors: 'Gordon E. Moore',
            year: 1965,
            venue: 'Electronics 38(8); reprinted in Proceedings of the IEEE 86(1), 1998',
            category: 'chip-design',
            type: 'paper',
            tags: ['Foundational', 'Start Here'],
            difficulty: 'introductory',
            featured: false,
            description: 'The original observation that the number of components per chip at minimum cost was doubling roughly every year, with a forecast of where that would lead. Short, and more economic than physical in its reasoning.',
            url: 'https://doi.org/10.1109/JPROC.1998.658762'
        },
        {
            id: 'dennard-1974-scaling',
            title: 'Design of Ion-Implanted MOSFET\'s with Very Small Physical Dimensions',
            authors: 'Robert H. Dennard, Fritz H. Gaensslen, Hwa-Nien Yu, V. Leo Rideout, Ernest Bassous, Andre R. LeBlanc',
            year: 1974,
            venue: 'IEEE Journal of Solid-State Circuits 9(5)',
            category: 'chip-design',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'advanced',
            featured: false,
            description: 'Derives the scaling rules under which shrinking dimensions and voltage together keep power density constant as transistors get smaller and faster. Its breakdown in the mid-2000s, as leakage stopped voltage scaling, is why clock frequencies stalled.',
            url: 'https://doi.org/10.1109/JSSC.1974.1050511'
        },
        {
            id: 'openroad',
            title: 'OpenROAD: Open-Source RTL-to-GDSII Flow',
            authors: 'The OpenROAD Project (Ajayi et al., DAC 2019)',
            year: 2019,
            venue: 'Open-source project; DAC 2019 paper',
            category: 'chip-design',
            type: 'code',
            tags: ['Open Source', 'Start Here'],
            difficulty: 'intermediate',
            featured: false,
            description: 'An open-source toolchain for floorplanning, placement, clock tree synthesis, routing and timing analysis, aimed at running a digital flow without manual intervention. The most practical way to run reproducible physical-design experiments outside a commercial tool.',
            url: 'https://github.com/The-OpenROAD-Project/OpenROAD'
        },
        {
            id: 'lin-2019-dreamplace',
            title: 'DREAMPlace: Deep Learning Toolkit-Enabled GPU Acceleration for Modern VLSI Placement',
            authors: 'Yibo Lin, Shounak Dhar, Wuxi Li, Haoxing Ren, Brucek Khailany, David Z. Pan',
            year: 2019,
            venue: 'DAC 2019',
            category: 'chip-design',
            type: 'code',
            tags: ['Open Source', 'Research'],
            difficulty: 'advanced',
            featured: false,
            description: 'Observes that analytical placement has the same structure as training a neural network and implements it on a deep-learning framework, running global placement an order of magnitude faster on GPUs with similar quality. The repository links the papers.',
            url: 'https://github.com/limbo018/DREAMPlace'
        },
        {
            id: 'mirhoseini-2021-graph-placement',
            title: 'A Graph Placement Methodology for Fast Chip Design',
            authors: 'Azalia Mirhoseini, Anna Goldie, Mustafa Yazgan, et al.',
            year: 2021,
            venue: 'Nature 594',
            category: 'chip-design',
            type: 'paper',
            tags: ['Research'],
            difficulty: 'advanced',
            featured: false,
            description: 'Uses reinforcement learning with a graph neural network to place macro blocks, reporting results comparable to or better than human experts in hours and use in Google TPU designs. Macro placement is one step of physical design; read it with the assessment study that follows.',
            url: 'https://doi.org/10.1038/s41586-021-03544-w'
        },
        {
            id: 'cheng-2023-rl-macro-placement-assessment',
            title: 'Assessment of Reinforcement Learning for Macro Placement',
            authors: 'Chung-Kuan Cheng, Andrew B. Kahng, Sayak Kundu, Yucheng Wang, Zhiang Wang',
            year: 2023,
            venue: 'ISPD 2023',
            category: 'chip-design',
            type: 'paper',
            tags: ['Research', 'Open Source'],
            difficulty: 'advanced',
            featured: false,
            description: 'Reimplements parts of the open-sourced Circuit Training flow, documents where it differs from the Nature paper, and compares it against simulated annealing and commercial placers on open benchmarks. A careful example of how a research community checks a high-profile claim.',
            url: 'https://arxiv.org/abs/2302.11014'
        },
        {
            id: 'timeloop-2019',
            title: 'Timeloop: A Systematic Approach to DNN Accelerator Evaluation',
            authors: 'Angshuman Parashar, Priyanka Raina, Yakun Sophia Shao, et al.',
            year: 2019,
            venue: 'ISPASS 2019',
            category: 'chip-design',
            type: 'paper',
            tags: ['Open Source', 'Design Space Exploration'],
            difficulty: 'advanced',
            featured: false,
            description: 'Describes accelerator architectures and workloads in a common format and searches over mappings to estimate performance and energy before building hardware. A practical framework for design space exploration, with an open-source implementation.',
            url: 'https://research.nvidia.com/publication/2019-03_timeloop-systematic-approach-dnn-accelerator-evaluation'
        },
        {
            id: 'liu-2023-verilogeval',
            title: 'VerilogEval: Evaluating Large Language Models for Verilog Code Generation',
            authors: 'Mingjie Liu, Nathaniel Pinckney, Brucek Khailany, Haoxing Ren',
            year: 2023,
            venue: 'ICCAD 2023',
            category: 'chip-design',
            type: 'paper',
            tags: ['Benchmark', 'Open Source'],
            difficulty: 'intermediate',
            featured: false,
            description: 'A benchmark of Verilog problems, drawn largely from HDLBits, with functional checks by simulation. Widely used to compare models; problems are small and self-contained, so strong scores say little about full-chip design.',
            url: 'https://arxiv.org/abs/2309.07544'
        },
        {
            id: 'liu-2023-chipnemo',
            title: 'ChipNeMo: Domain-Adapted LLMs for Chip Design',
            authors: 'Mingjie Liu, Teodor-Dumitru Ene, Robert Kirby, et al.',
            year: 2023,
            venue: 'arXiv preprint (NVIDIA)',
            category: 'chip-design',
            type: 'paper',
            tags: ['Research'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Adapts general language models to internal chip-design data through tokenizer changes, continued pretraining, instruction tuning and retrieval, then evaluates them on an engineering assistant, EDA script generation and bug summarization. Shows what domain adaptation does and does not buy.',
            url: 'https://arxiv.org/abs/2311.00176'
        },
        {
            id: 'zhang-2023-llm4dv',
            title: 'LLM4DV: Using Large Language Models for Hardware Test Stimuli Generation',
            authors: 'Zixi Zhang, Greg Chadwick, Hugo McNally, Yiren Zhao, Robert Mullins',
            year: 2023,
            venue: 'arXiv preprint',
            category: 'chip-design',
            type: 'paper',
            tags: ['Verification'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Uses language models, prompted with coverage feedback, to generate test stimuli for hardware designs and compares the result with constrained-random testing. It does well on simpler designs and less well on complex ones, which is a realistic picture of AI-assisted verification today.',
            url: 'https://arxiv.org/abs/2310.04535'
        },

        /* ---------- Hardware Security, Cryptography & Systems Security ---------- */
        {
            id: 'thompson-1984-trusting-trust',
            title: 'Reflections on Trusting Trust',
            authors: 'Ken Thompson',
            year: 1984,
            venue: 'Communications of the ACM 27(8) (Turing Award Lecture)',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Start Here', 'Foundational'],
            difficulty: 'introductory',
            featured: true,
            description: 'Shows how a compiler can be modified to insert a backdoor into the programs it compiles, including future copies of itself, leaving no trace in any source code. Three pages that apply just as well to hardware toolchains and supply chains.',
            url: 'https://doi.org/10.1145/358198.358210'
        },
        {
            id: 'diffie-hellman-1976',
            title: 'New Directions in Cryptography',
            authors: 'Whitfield Diffie, Martin E. Hellman',
            year: 1976,
            venue: 'IEEE Transactions on Information Theory 22(6)',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Introduces public-key cryptography and a key-exchange protocol that lets two parties agree on a secret over a public channel. The basis of secure communication between strangers on the internet.',
            url: 'https://doi.org/10.1109/TIT.1976.1055638'
        },
        {
            id: 'rsa-1978',
            title: 'A Method for Obtaining Digital Signatures and Public-Key Cryptosystems',
            authors: 'Ronald L. Rivest, Adi Shamir, Leonard Adleman',
            year: 1978,
            venue: 'Communications of the ACM 21(2)',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Foundational'],
            difficulty: 'intermediate',
            featured: false,
            description: 'The RSA cryptosystem, whose security rests on the difficulty of factoring large numbers, supporting both encryption and digital signatures. Short and readable with basic number theory.',
            url: 'https://doi.org/10.1145/359340.359342'
        },
        {
            id: 'kocher-1996-timing-attacks',
            title: 'Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems',
            authors: 'Paul C. Kocher',
            year: 1996,
            venue: 'CRYPTO 1996',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Foundational', 'Side Channels'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Shows that measuring how long private-key operations take can reveal the key, even when the mathematics is sound. Established that an implementation\'s physical behavior is part of its security.',
            url: 'https://doi.org/10.1007/3-540-68697-5_9'
        },
        {
            id: 'kocher-jaffe-jun-1999-dpa',
            title: 'Differential Power Analysis',
            authors: 'Paul Kocher, Joshua Jaffe, Benjamin Jun',
            year: 1999,
            venue: 'CRYPTO 1999',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Foundational', 'Side Channels'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Statistical analysis of many power traces from a device such as a smart card recovers secret keys from tiny data-dependent variations in current. Led to the field of side-channel countermeasures such as masking and hiding.',
            url: 'https://doi.org/10.1007/3-540-48405-1_25'
        },
        {
            id: 'tehranipoor-koushanfar-2010-trojans',
            title: 'A Survey of Hardware Trojan Taxonomy and Detection',
            authors: 'Mohammad Tehranipoor, Farinaz Koushanfar',
            year: 2010,
            venue: 'IEEE Design & Test of Computers 27(1)',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Survey', 'Hardware'],
            difficulty: 'introductory',
            featured: false,
            description: 'Classifies malicious circuit modifications by when they are inserted, how they are triggered and what they do, and reviews detection through testing and side-channel fingerprinting. A good starting map of supply-chain risk in chip design.',
            url: 'https://doi.org/10.1109/MDT.2010.7'
        },
        {
            id: 'kim-2014-rowhammer',
            title: 'Flipping Bits in Memory Without Accessing Them: An Experimental Study of DRAM Disturbance Errors',
            authors: 'Yoongu Kim, Ross Daly, Jeremie Kim, Chris Fallin, Ji Hye Lee, Donghyuk Lee, Chris Wilkerson, Konrad Lai, Onur Mutlu',
            year: 2014,
            venue: 'ISCA 2014',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Hardware'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Demonstrates on commodity DRAM modules that repeatedly activating one row can flip bits in neighboring rows (RowHammer). Later work turned this reliability problem into practical privilege-escalation attacks, showing how device physics can break isolation.',
            url: 'https://doi.org/10.1109/ISCA.2014.6853210'
        },
        {
            id: 'lipp-2018-meltdown',
            title: 'Meltdown: Reading Kernel Memory from User Space',
            authors: 'Moritz Lipp, Michael Schwarz, Daniel Gruss, Thomas Prescher, Werner Haas, Anders Fogh, Jann Horn, Stefan Mangard, Paul Kocher, Daniel Genkin, Yuval Yarom, Mike Hamburg',
            year: 2018,
            venue: 'USENIX Security 2018',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Side Channels', 'Hardware'],
            difficulty: 'advanced',
            featured: false,
            description: 'Out-of-order execution on affected processors could read kernel memory before the permission check took effect, leaving traces in the cache that a user program could recover. A case where an optimization invisible to the architecture leaked across a protection boundary.',
            url: 'https://www.usenix.org/conference/usenixsecurity18/presentation/lipp'
        },
        {
            id: 'kocher-2019-spectre',
            title: 'Spectre Attacks: Exploiting Speculative Execution',
            authors: 'Paul Kocher, Jann Horn, Anders Fogh, Daniel Genkin, Daniel Gruss, Werner Haas, Mike Hamburg, Moritz Lipp, Stefan Mangard, Thomas Prescher, Michael Schwarz, Yuval Yarom',
            year: 2019,
            venue: 'IEEE Symposium on Security and Privacy 2019 (arXiv, January 2018)',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Side Channels', 'Hardware'],
            difficulty: 'advanced',
            featured: false,
            description: 'Trains branch predictors so a victim speculatively executes instructions that access secrets, then recovers them through cache timing. Unlike Meltdown, it is a broad class of attacks rooted in speculation itself, and still shapes processor and compiler design.',
            url: 'https://arxiv.org/abs/1801.01203'
        },
        {
            id: 'clarke-emerson-sifakis-2009-model-checking',
            title: 'Model Checking: Algorithmic Verification and Debugging',
            authors: 'Edmund M. Clarke, E. Allen Emerson, Joseph Sifakis',
            year: 2009,
            venue: 'Communications of the ACM 52(11) (Turing Lecture)',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Foundational', 'Verification'],
            difficulty: 'intermediate',
            featured: false,
            description: 'The inventors of model checking explain how exhaustively exploring a system\'s state space against temporal-logic properties finds bugs that testing misses, and why the technique was adopted first in hardware verification.',
            url: 'https://doi.org/10.1145/1592761.1592781'
        },
        {
            id: 'kande-2023-security-assertions',
            title: '(Security) Assertions by Large Language Models',
            authors: 'Rahul Kande, Hammond Pearce, Benjamin Tan, Brendan Dolan-Gavitt, Shailja Thakur, Ramesh Karri, Jeyavijayan Rajendran',
            year: 2023,
            venue: 'arXiv preprint',
            category: 'hardware-security',
            type: 'paper',
            tags: ['Verification', 'Recent'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Studies whether language models can write SystemVerilog security assertions from natural-language descriptions, with a benchmark and evaluation framework. Accuracy depends strongly on how much context the prompt provides, a useful caution for assertion-generation tools.',
            url: 'https://arxiv.org/abs/2306.14027'
        },

        /* ---------- Courses, Books & Practical Resources ---------- */
        {
            id: 'karpathy-zero-to-hero',
            title: 'Neural Networks: Zero to Hero',
            authors: 'Andrej Karpathy',
            year: 2022,
            venue: 'Video lecture series with code',
            category: 'courses',
            type: 'course',
            tags: ['Start Here', 'Tutorial'],
            difficulty: 'introductory',
            featured: true,
            description: 'Builds backpropagation, language models and a GPT-style Transformer from scratch in Python, one line at a time. Probably the most direct way to understand what happens inside modern models.',
            url: 'https://karpathy.ai/zero-to-hero.html'
        },
        {
            id: 'mit-6s191',
            title: 'MIT 6.S191: Introduction to Deep Learning',
            authors: 'Alexander Amini, Ava Amini (MIT)',
            year: 2025,
            venue: 'MIT course, updated annually',
            category: 'courses',
            type: 'course',
            tags: ['Tutorial'],
            difficulty: 'introductory',
            featured: false,
            description: 'A short, fast-paced course with free lectures and software labs covering the foundations of deep learning and current applications. Good for a broad overview before going deeper.',
            url: 'https://introtodeeplearning.com/'
        },
        {
            id: 'fastai-course',
            title: 'Practical Deep Learning for Coders',
            authors: 'Jeremy Howard, fast.ai',
            year: 2022,
            venue: 'fast.ai',
            category: 'courses',
            type: 'course',
            tags: ['Tutorial'],
            difficulty: 'introductory',
            featured: false,
            description: 'Top-down teaching: train working models first, then open up the details. Free, and assumes programming experience rather than advanced mathematics.',
            url: 'https://course.fast.ai/'
        },
        {
            id: 'nand2tetris',
            title: 'Nand2Tetris: The Elements of Computing Systems',
            authors: 'Noam Nisan, Shimon Schocken',
            year: 2021,
            venue: 'Course and book (2nd edition, MIT Press)',
            category: 'courses',
            type: 'course',
            tags: ['Start Here', 'Tutorial'],
            difficulty: 'introductory',
            featured: false,
            description: 'Build a working computer starting from NAND gates: logic, ALU, CPU, assembler, virtual machine, compiler and operating system. Every layer is something you implement and test yourself.',
            url: 'https://www.nand2tetris.org/'
        },
        {
            id: 'mutlu-lectures',
            title: 'Computer Architecture and Digital Design Lectures',
            authors: 'Onur Mutlu (ETH Zürich)',
            year: 2024,
            venue: 'Recorded lectures and course materials',
            category: 'courses',
            type: 'course',
            tags: ['Hardware'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Full recorded courses on digital design and computer architecture, including memory systems, processing-in-memory and hardware security topics such as RowHammer, with links to slides and readings.',
            url: 'https://www.youtube.com/OnurMutluLectures'
        },
        {
            id: 'riscv-international',
            title: 'RISC-V Specifications and Learning Resources',
            authors: 'RISC-V International',
            year: 2024,
            venue: 'riscv.org',
            category: 'courses',
            type: 'reference',
            tags: ['Open Source', 'Hardware'],
            difficulty: 'intermediate',
            featured: false,
            description: 'The official home of the open RISC-V instruction set, with the ratified specifications and pointers to courses, simulators and open-source cores. A practical starting point for building or verifying a processor.',
            url: 'https://riscv.org/'
        },
        {
            id: 'fuzzing-book',
            title: 'The Fuzzing Book',
            authors: 'Andreas Zeller, Rahul Gopinath, Marcel Böhme, Gordon Fraser, Christian Holler',
            year: 2024,
            venue: 'Interactive online book (CISPA)',
            category: 'courses',
            type: 'book',
            tags: ['Tutorial', 'Security'],
            difficulty: 'intermediate',
            featured: false,
            description: 'Teaches automated test generation through runnable Python: random and grammar-based fuzzing, coverage guidance, mutation and symbolic techniques. The same ideas underlie much of today\'s hardware fuzzing research.',
            url: 'https://www.fuzzingbook.org/'
        },
        {
            id: 'papers-we-love',
            title: 'Papers We Love',
            authors: 'Community repository and meetups',
            year: 2014,
            venue: 'GitHub',
            category: 'courses',
            type: 'reference',
            tags: ['Research'],
            difficulty: 'introductory',
            featured: false,
            description: 'A community-curated collection of computer science papers organized by topic, with local meetups where people present and discuss them. A good way to find classic papers outside your own field.',
            url: 'https://github.com/papers-we-love/papers-we-love'
        },
        {
            id: 'cwe-hardware-design',
            title: 'CWE-1194: Hardware Design',
            authors: 'MITRE Common Weakness Enumeration',
            year: 2024,
            venue: 'cwe.mitre.org',
            category: 'courses',
            type: 'reference',
            tags: ['Security', 'Hardware'],
            difficulty: 'intermediate',
            featured: false,
            description: 'A catalog of known classes of hardware security weakness, such as debug-access, locking, access-control and side-channel flaws, with examples in RTL. Helpful vocabulary for anyone writing security checks or assertions for hardware.',
            url: 'https://cwe.mitre.org/data/definitions/1194.html'
        }
    ];

    var paths = [
        {
            id: 'path-thinking',
            title: 'Thinking, Research & Entrepreneurship',
            blurb: 'How to choose problems, keep yourself honest, and build something people want.',
            steps: ['hamming-you-and-your-research', 'feynman-cargo-cult-science', 'graham-how-to-do-great-work', 'naval-how-to-get-rich', 'graham-how-to-get-startup-ideas'],
            categories: ['thinking']
        },
        {
            id: 'path-modern-ai',
            title: 'Understanding Modern AI',
            blurb: 'From building a network by hand to the Transformer, scaling and post-training.',
            steps: ['karpathy-zero-to-hero', 'vaswani-2017-attention', 'brown-2020-gpt3', 'hoffmann-2022-chinchilla', 'ouyang-2022-instructgpt'],
            categories: ['ai-foundations', 'courses']
        },
        {
            id: 'path-agents-science',
            title: 'Agents, Reasoning & Scientific Discovery',
            blurb: 'Reasoning, acting and feedback, how agents are evaluated, and what AI has added to science.',
            steps: ['wei-2022-chain-of-thought', 'yao-2023-react', 'shinn-2023-reflexion', 'yao-2024-tau-bench', 'jumper-2021-alphafold'],
            categories: ['agents', 'science']
        },
        {
            id: 'path-computing',
            title: 'Computing, Chips & Security',
            blurb: 'Why architecture matters again, what ML can and cannot do for chip design, and where trust breaks.',
            steps: ['hennessy-patterson-2019-golden-age', 'jouppi-2017-tpu', 'mirhoseini-2021-graph-placement', 'cheng-2023-rl-macro-placement-assessment', 'thompson-1984-trusting-trust'],
            categories: ['systems', 'chip-design', 'hardware-security']
        }
    ];

    var people = [
        {
            name: 'Naval Ravikant',
            role: 'Entrepreneur and investor; co-founder of AngelList.',
            themes: ['Leverage', 'Specific knowledge', 'Judgment', 'Long-term games'],
            links: [
                { label: 'How to Get Rich', url: 'https://nav.al/rich' },
                { label: 'nav.al', url: 'https://nav.al/' },
                { label: 'The Almanack (free)', url: 'https://www.navalmanack.com/' }
            ]
        },
        {
            name: 'Jeff Dean',
            role: 'Chief Scientist at Google; co-founder of Google Brain. Co-designed MapReduce, Bigtable and early large-scale deep-learning systems.',
            themes: ['Distributed systems', 'Infrastructure', 'Large-scale ML'],
            links: [
                { label: 'MapReduce (OSDI 2004)', url: 'https://www.usenix.org/legacy/event/osdi04/tech/dean.html' },
                { label: 'The Tail at Scale', url: 'https://doi.org/10.1145/2408776.2408794' },
                { label: 'Google Research profile', url: 'https://research.google/people/jeff/' }
            ]
        },
        {
            name: 'Richard Hamming',
            role: 'Mathematician who spent three decades at Bell Labs and later taught at the Naval Postgraduate School. Known for error-correcting codes; 1968 Turing Award.',
            themes: ['Coding theory', 'Numerical methods', 'How to do research'],
            links: [
                { label: 'You and Your Research', url: 'https://www.cs.virginia.edu/~robins/YouAndYourResearch.html' },
                { label: 'Error Detecting and Error Correcting Codes (1950)', url: 'https://doi.org/10.1002/j.1538-7305.1950.tb00463.x' },
                { label: 'The Art of Doing Science and Engineering', url: 'https://press.stripe.com/the-art-of-doing-science-and-engineering' }
            ]
        },
        {
            name: 'Paul Graham',
            role: 'Computer scientist, essayist, and co-founder of Y Combinator.',
            themes: ['Startup ideas', 'Independent thinking', 'Doing great work'],
            links: [
                { label: 'Essays', url: 'https://paulgraham.com/articles.html' },
                { label: 'How to Do Great Work', url: 'https://paulgraham.com/greatwork.html' }
            ]
        },
        {
            name: 'Richard Sutton',
            role: 'Reinforcement learning researcher; co-author of the standard RL textbook and co-recipient, with Andrew Barto, of the 2024 ACM Turing Award.',
            themes: ['Temporal-difference learning', 'General methods', 'Scaling with computation'],
            links: [
                { label: 'The Bitter Lesson', url: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html' },
                { label: 'Reinforcement Learning: An Introduction', url: 'http://incompleteideas.net/book/the-book-2nd.html' },
                { label: 'incompleteideas.net', url: 'http://incompleteideas.net/' }
            ]
        },
        {
            name: 'Geoffrey Hinton',
            role: 'Neural-network researcher; Emeritus Professor at the University of Toronto. 2018 Turing Award (with Bengio and LeCun) and 2024 Nobel Prize in Physics (with Hopfield).',
            themes: ['Backpropagation', 'Representation learning', 'Deep learning'],
            links: [
                { label: 'Back-propagating errors (1986)', url: 'https://doi.org/10.1038/323533a0' },
                { label: 'AlexNet (2012)', url: 'https://proceedings.neurips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html' },
                { label: 'Home page', url: 'https://www.cs.toronto.edu/~hinton/' }
            ]
        },
        {
            name: 'David Patterson',
            role: 'Professor Emeritus at UC Berkeley. Co-led the RISC and RAID projects; co-author with John Hennessy of the standard architecture textbooks; 2017 Turing Award with Hennessy.',
            themes: ['RISC', 'Domain-specific architectures', 'Open instruction sets'],
            links: [
                { label: 'A New Golden Age for Computer Architecture', url: 'https://doi.org/10.1145/3282307' },
                { label: 'TPU performance analysis', url: 'https://arxiv.org/abs/1704.04760' },
                { label: 'Berkeley faculty page', url: 'https://www2.eecs.berkeley.edu/Faculty/Homepages/patterson.html' }
            ]
        },
        {
            name: 'Andrej Karpathy',
            role: 'AI researcher and educator; a founding member of OpenAI and former Director of AI at Tesla.',
            themes: ['Teaching from first principles', 'Language models', 'Practical deep learning'],
            links: [
                { label: 'Neural Networks: Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html' },
                { label: 'nanoGPT', url: 'https://github.com/karpathy/nanoGPT' },
                { label: 'karpathy.ai', url: 'https://karpathy.ai/' }
            ]
        },
        {
            name: 'John Hopfield',
            role: 'Physicist and neuroscientist, Professor Emeritus at Princeton. 2024 Nobel Prize in Physics (with Hinton).',
            themes: ['Associative memory', 'Energy-based networks', 'Physics of computation'],
            links: [
                { label: 'Hopfield networks (PNAS 1982)', url: 'https://doi.org/10.1073/pnas.79.8.2554' },
                { label: 'Neurons with graded response (PNAS 1984)', url: 'https://doi.org/10.1073/pnas.81.10.3088' }
            ]
        },
        {
            name: 'Farinaz Koushanfar',
            role: 'Professor of Electrical and Computer Engineering at UC San Diego, working on hardware security and trustworthy machine learning.',
            themes: ['Hardware Trojans', 'IP protection', 'Secure and private ML'],
            links: [
                { label: 'Hardware Trojan survey (2010)', url: 'https://doi.org/10.1109/MDT.2010.7' },
                { label: 'UC San Diego profile', url: 'https://jacobsschool.ucsd.edu/faculty/profile?id=407' }
            ]
        }
    ];

    window.GoodReadsData = Object.freeze({
        lastUpdated: 'October 2026',
        categories: categories,
        resources: resources,
        paths: paths,
        people: people
    });
})();
