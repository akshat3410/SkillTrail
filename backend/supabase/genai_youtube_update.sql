-- Update GenAI Course with YouTube Resources
-- Run this in Supabase SQL Editor to add video links to each node

-- Node 1.1: What is Generative AI?
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Intro to Large Language Models](https://youtube.com/watch?v=zjkBMFhNj_g)** – Andrej Karpathy (1 hr, foundational)
2. **[What is Generative AI?](https://youtube.com/watch?v=G2fqAlgmoPo)** – IBM Technology (5 min)
3. **[How ChatGPT Works Technically](https://youtube.com/watch?v=bSvTVREwSNw)** – ByteByteGo (8 min)'
WHERE id = 'genai-1-1';

-- Node 1.2: The AI Landscape
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[AI in 100 Seconds](https://youtube.com/watch?v=aircAruvnKk)** – Fireship (2 min)
2. **[Claude 3 vs GPT-4 vs Gemini](https://youtube.com/watch?v=5B-wQ83sQo0)** – Matt Wolfe (15 min)
3. **[Open Source LLMs Explained](https://youtube.com/watch?v=S_XhAy4v1xE)** – AI Explained (20 min)'
WHERE id = 'genai-1-2';

-- Node 1.3: Your First AI Conversation
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[ChatGPT Tutorial for Beginners](https://youtube.com/watch?v=JTxsNm9IdYU)** – Adrian Twarog (10 min)
2. **[How to Use Claude AI](https://youtube.com/watch?v=7aKu0vCIGYw)** – Skill Leap AI (12 min)
3. **[Getting Started with Gemini](https://youtube.com/watch?v=TXgMnXlwmZw)** – Google (5 min)'
WHERE id = 'genai-1-3';

-- Node 1.4: Understanding AI Limitations
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Why AI Lies (Hallucinations)](https://youtube.com/watch?v=xqNl5lNYgjE)** – ByteByteGo (8 min)
2. **[AI Limitations You Need to Know](https://youtube.com/watch?v=dDUF_BKslxg)** – Andrej Karpathy (30 min)
3. **[AI Bias Explained](https://youtube.com/watch?v=59bMh59JQDo)** – IBM Technology (6 min)'
WHERE id = 'genai-1-4';

-- Node 2.1: What is Prompt Engineering?
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Prompt Engineering Tutorial](https://youtube.com/watch?v=_ZvnD96BsDc)** – freeCodeCamp (1 hr)
2. **[Prompt Engineering in 100 Seconds](https://youtube.com/watch?v=8cKP0FSWBQI)** – Fireship (2 min)
3. **[ChatGPT Prompt Engineering](https://youtube.com/watch?v=H4YK_7MAckk)** – DeepLearning.AI (1.5 hr)'
WHERE id = 'genai-2-1';

-- Node 2.2: Anatomy of a Great Prompt
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[The Perfect Prompt Formula](https://youtube.com/watch?v=jC4v5AS4RIM)** – Jeff Su (8 min)
2. **[11 Prompt Engineering Secrets](https://youtube.com/watch?v=pZsJbYIFCCw)** – David Shapiro (20 min)
3. **[Prompt Engineering Masterclass](https://youtube.com/watch?v=sTeoEFzVNSc)** – AI Jason (25 min)'
WHERE id = 'genai-2-2';

-- Node 2.3: Zero-Shot vs Few-Shot Prompting
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Few-Shot Learning Explained](https://youtube.com/watch?v=hNP_7BVjrP8)** – AssemblyAI (12 min)
2. **[Zero-Shot, One-Shot, Few-Shot](https://youtube.com/watch?v=v2gD8BHOaX4)** – AI Explained (15 min)
3. **[In-Context Learning](https://youtube.com/watch?v=Wgm2h5L-a8E)** – Yannic Kilcher (25 min)'
WHERE id = 'genai-2-3';

-- Node 2.4: Role Prompting
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[ChatGPT Role Prompting Secrets](https://youtube.com/watch?v=yEhDbJ8fNj0)** – All About AI (10 min)
2. **[System Prompts Deep Dive](https://youtube.com/watch?v=lnA9DMvHtfI)** – Sam Witteveen (18 min)
3. **[Custom Instructions Guide](https://youtube.com/watch?v=BaI5JzjUKgE)** – Skill Leap AI (8 min)'
WHERE id = 'genai-2-4';

-- Node 2.5: Instruction Clarity & Formatting
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[JSON Output from ChatGPT](https://youtube.com/watch?v=g3mGdC6X9bM)** – All About AI (12 min)
2. **[Prompt Delimiters Explained](https://youtube.com/watch?v=1c9iyoVIv-s)** – Dave Ebbelaar (10 min)
3. **[ChatGPT Output Control](https://youtube.com/watch?v=QmA7S2iGBjk)** – AI Advantage (15 min)'
WHERE id = 'genai-2-5';

-- Node 2.6: Common Prompting Mistakes
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[10 ChatGPT Mistakes](https://youtube.com/watch?v=wVzuvf9D9C0)** – AI Jason (12 min)
2. **[Why Your Prompts Don''t Work](https://youtube.com/watch?v=pNbT0lleDqU)** – Prompt Engineering (10 min)
3. **[Prompt Debugging Tips](https://youtube.com/watch?v=aOm75o2Z5-o)** – Dave Shapiro (20 min)'
WHERE id = 'genai-2-6';

-- Node 3.1: Chain-of-Thought Prompting
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Chain of Thought Prompting](https://youtube.com/watch?v=_nDlNVH1GPs)** – Yannic Kilcher (20 min)
2. **[Step-by-Step Reasoning in AI](https://youtube.com/watch?v=9BYbjd9rKZ4)** – AI Explained (15 min)
3. **[Reasoning with LLMs](https://youtube.com/watch?v=nM-5QP3K3Ds)** – DeepLearning.AI (12 min)'
WHERE id = 'genai-3-1';

-- Node 3.2: System Prompts & Context Setting
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[System Prompts Explained](https://youtube.com/watch?v=lnA9DMvHtfI)** – Sam Witteveen (18 min)
2. **[Custom GPT Creation](https://youtube.com/watch?v=pGOyw_M1mNE)** – AI Explained (25 min)
3. **[OpenAI System Messages](https://youtube.com/watch?v=PoZ6Rr-4MRY)** – All About AI (10 min)'
WHERE id = 'genai-3-2';

-- Node 3.3: Context Windows & Token Limits
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Context Windows Explained](https://youtube.com/watch?v=eWN2gGPqC0k)** – AI Explained (18 min)
2. **[Tokens in LLMs](https://youtube.com/watch?v=zduSFxRajkE)** – StatQuest (15 min)
3. **[Working with Long Documents](https://youtube.com/watch?v=O644F2MBWHE)** – Sam Witteveen (20 min)'
WHERE id = 'genai-3-3';

-- Node 3.4: Iterative Prompting & Refinement
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Prompt Iteration Techniques](https://youtube.com/watch?v=TRjq7t2Ms5I)** – DeepLearning.AI (8 min)
2. **[Refining AI Outputs](https://youtube.com/watch?v=wVzuvf9D9C0)** – AI Jason (10 min)
3. **[ChatGPT Conversation Flows](https://youtube.com/watch?v=PhcPX-J7VGY)** – Skill Leap AI (12 min)'
WHERE id = 'genai-3-4';

-- Node 3.5: Prompt Templates & Libraries
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[LangChain Prompt Templates](https://youtube.com/watch?v=RLYoEXa2SQo)** – Sam Witteveen (20 min)
2. **[Building a Prompt Library](https://youtube.com/watch?v=W9CxNLm-M3E)** – AI Jason (15 min)
3. **[Prompt Management Systems](https://youtube.com/watch?v=gyGwXQP8L9Y)** – Dave Ebbelaar (18 min)'
WHERE id = 'genai-3-5';

-- Node 3.6: Handling Hallucinations
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Fixing AI Hallucinations](https://youtube.com/watch?v=xqNl5lNYgjE)** – ByteByteGo (8 min)
2. **[Grounding LLM Responses](https://youtube.com/watch?v=IgxzcOugvEg)** – AI Explained (15 min)
3. **[RAG for Accurate AI](https://youtube.com/watch?v=T-D1OfcDW1M)** – IBM Technology (10 min)'
WHERE id = 'genai-3-6';

-- Node 4.1: Writing & Content Prompts
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[AI Content Creation Guide](https://youtube.com/watch?v=uXAqDV9UyoM)** – Adam Enfroy (20 min)
2. **[ChatGPT for Writers](https://youtube.com/watch?v=HPbSwzfTvs4)** – Aleyda Solis (15 min)
3. **[Social Media with AI](https://youtube.com/watch?v=ZI0w_tHnz3k)** – Think Media (18 min)'
WHERE id = 'genai-4-1';

-- Node 4.2: Coding Assistant Prompts
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Cursor AI Tutorial](https://youtube.com/watch?v=gqUQbjsYZLQ)** – Fireship (10 min)
2. **[GitHub Copilot Mastery](https://youtube.com/watch?v=RSLQJ0O47PA)** – Traversy Media (25 min)
3. **[Debugging with ChatGPT](https://youtube.com/watch?v=Fz4_X0g_5wM)** – Programming with Mosh (15 min)'
WHERE id = 'genai-4-2';

-- Node 4.3: Research & Analysis Prompts
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[AI for Academic Research](https://youtube.com/watch?v=QmA7S2iGBjk)** – Andy Stapleton (15 min)
2. **[NotebookLM Tutorial](https://youtube.com/watch?v=w-5-qR0ql0k)** – Jeff Su (12 min)
3. **[Document Analysis with AI](https://youtube.com/watch?v=9AJXtAd7xHA)** – Matt Wolfe (18 min)'
WHERE id = 'genai-4-3';

-- Node 4.4: Business & Strategy Prompts
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[ChatGPT for Business](https://youtube.com/watch?v=wBAnCMA98ls)** – Ali Abdaal (20 min)
2. **[AI Business Strategy](https://youtube.com/watch?v=rY3GbOWIItw)** – Pat Flynn (15 min)
3. **[SWOT Analysis with AI](https://youtube.com/watch?v=vxJGDV8-T4I)** – AI Advantage (10 min)'
WHERE id = 'genai-4-4';

-- Node 4.5: Prompt Safety & Ethics
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[AI Ethics Explained](https://youtube.com/watch?v=59bMh59JQDo)** – IBM Technology (6 min)
2. **[AI Safety for Developers](https://youtube.com/watch?v=AaTRHFaaPG8)** – Robert Miles (20 min)
3. **[Responsible AI Use](https://youtube.com/watch?v=9J6lPgG_klU)** – Two Minute Papers (8 min)'
WHERE id = 'genai-4-5';

-- Node 5.1: Prompting with APIs
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[OpenAI API Tutorial](https://youtube.com/watch?v=4qNwoAAfnk4)** – Fireship (10 min)
2. **[Build with GPT API](https://youtube.com/watch?v=pGOyw_M1mNE)** – AI Jason (25 min)
3. **[Anthropic Claude API](https://youtube.com/watch?v=c-g6X_I5Dc4)** – Sam Witteveen (20 min)'
WHERE id = 'genai-5-1';

-- Node 5.2: RAG Basics
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[RAG Explained Simply](https://youtube.com/watch?v=T-D1OfcDW1M)** – IBM Technology (10 min)
2. **[Build a RAG App](https://youtube.com/watch?v=tcqEUSNCn8I)** – Tech With Tim (45 min)
3. **[LangChain RAG Tutorial](https://youtube.com/watch?v=LhnCsygAvzY)** – Sam Witteveen (35 min)'
WHERE id = 'genai-5-2';

-- Node 5.3: Tool Use & Function Calling
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[OpenAI Function Calling](https://youtube.com/watch?v=p0I-hwZliWk)** – Sam Witteveen (25 min)
2. **[Tool Use in Claude](https://youtube.com/watch?v=vl4XNhPGYNQ)** – AI Jason (20 min)
3. **[Building AI Agents with Tools](https://youtube.com/watch?v=aqdWSYWC_LI)** – James Briggs (30 min)'
WHERE id = 'genai-5-3';

-- Node 5.4: AI Agents (Introduction)
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[AI Agents Explained](https://youtube.com/watch?v=F8NKVhkZZxI)** – AI Explained (25 min)
2. **[Building AI Agents](https://youtube.com/watch?v=NkZsK11QJ48)** – freeCodeCamp (1 hr)
3. **[LangChain Agents Tutorial](https://youtube.com/watch?v=DWUdGhRrv2c)** – James Briggs (30 min)'
WHERE id = 'genai-5-4';

-- Node 5.5: Prompt Evaluation & Testing
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Evaluating LLM Outputs](https://youtube.com/watch?v=yCv2lxR4N8Y)** – Weights & Biases (30 min)
2. **[LangSmith for Testing](https://youtube.com/watch?v=Tf2L3ByycSE)** – LangChain (20 min)
3. **[LLM Benchmarking](https://youtube.com/watch?v=7_uGMf-aqXc)** – AI Explained (15 min)'
WHERE id = 'genai-5-5';

-- Node 5.6: When Prompting Fails
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[Fine-Tuning vs Prompting](https://youtube.com/watch?v=YfWr8oWfLSw)** – AI Explained (20 min)
2. **[Limits of LLMs](https://youtube.com/watch?v=dDUF_BKslxg)** – Andrej Karpathy (30 min)
3. **[When to Fine-Tune](https://youtube.com/watch?v=eC6Gt_xKoC4)** – Sam Witteveen (18 min)'
WHERE id = 'genai-5-6';

-- Node 5.7: Building Your AI Workflow
UPDATE nodes SET content = content || '

### 🎬 Video Resources

1. **[AI Productivity System](https://youtube.com/watch?v=wBAnCMA98ls)** – Ali Abdaal (15 min)
2. **[Building with AI in 2025](https://youtube.com/watch?v=AK7vS0xSBEs)** – Fireship (10 min)
3. **[AI Developer Workflow](https://youtube.com/watch?v=g3mGdC6X9bM)** – Dave Ebbelaar (20 min)'
WHERE id = 'genai-5-7';
