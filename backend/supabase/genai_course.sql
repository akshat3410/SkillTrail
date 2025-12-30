-- Generative AI & Prompt Engineering Course
-- Run this in Supabase SQL Editor to add the course

-- Insert roadmap
INSERT INTO roadmaps (id, title, description) VALUES 
('genai-prompting', 'Generative AI & Prompt Engineering', 'From zero to advanced — learn to think with AI')
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description;

-- Insert all 28 nodes
INSERT INTO nodes (id, roadmap_id, title, short_summary, order_index, svg_x, svg_y, estimated_time, why_matters, content, common_mistakes, tldr) VALUES

-- LEVEL 1: FOUNDATIONS
('genai-1-1', 'genai-prompting', 'What is Generative AI?', 'Understanding how AI creates', 1, 50, 100, '15 min',
'This is where everything begins. Understanding what AI actually does (predicting, not thinking) will change how you use it.',
'## What is Generative AI?

Generative AI creates new content — text, images, code, music — by learning patterns from massive datasets.

### How It Works (Simply)

Large Language Models (LLMs) like GPT and Claude work by **predicting the next word**. Given "The cat sat on the...", the model calculates probabilities and picks "mat" or "floor" or "couch".

This simple mechanism, at massive scale (billions of parameters, trillions of words), produces remarkably intelligent-seeming output.

### Key Insight

**AI is pattern matching, not thinking.** It doesn''t "understand" like humans — it recognizes and reproduces patterns from training data.

### The Major Players

- **GPT-4** (OpenAI) — Most famous, multimodal
- **Claude** (Anthropic) — Strong reasoning, long context
- **Gemini** (Google) — Integrated with Google services
- **Llama** (Meta) — Open-source leader

### Resources
1. [Intro to LLMs](https://www.youtube.com/watch?v=zjkBMFhNj_g) – Andrej Karpathy
2. [What is Generative AI?](https://cloud.google.com/use-cases/generative-ai) – Google',
'Thinking AI "understands" like humans. It predicts patterns, not meaning.',
'AI generates content by predicting what comes next, trained on massive data.'),

('genai-1-2', 'genai-prompting', 'The AI Landscape (2024–2025)', 'Which AI tools exist and when to use each', 2, 150, 200, '12 min',
'Knowing which tool to use for which job saves hours of frustration.',
'## The AI Landscape

### Closed-Source Models (APIs/Chat)
- **ChatGPT** (OpenAI) — Best all-rounder, vision + voice
- **Claude** (Anthropic) — Best for writing, reasoning, safety
- **Gemini** (Google) — Best for Google integration

### Open-Source Models
- **Llama 3** (Meta) — Most capable open model
- **Mistral** — Fast, efficient
- **Phi** (Microsoft) — Small but powerful

### Which to Use When

| Task | Best Choice |
|------|------------|
| General Q&A | Any work well |
| Long documents | Claude (200K context) |
| Coding | GPT-4 or Claude |
| Creative writing | Claude |
| Quick tasks | Gemini or GPT-4o mini |

### Resources
1. [Hugging Face Models](https://huggingface.co/models) – Explore thousands
2. [AI Comparison](https://www.youtube.com/watch?v=wVzuvNvMYIE) – Fireship',
'Assuming one AI is best for everything. Each has strengths.',
'GPT for general use, Claude for writing/reasoning, Gemini for Google, Llama for open-source.'),

('genai-1-3', 'genai-prompting', 'Your First AI Conversation', 'Getting started with ChatGPT or Claude', 3, 50, 300, '10 min',
'The best way to learn is to start using it. Set up your accounts and experiment.',
'## Your First AI Conversation

### Getting Access (All Free Tiers)

1. **ChatGPT**: [chat.openai.com](https://chat.openai.com)
2. **Claude**: [claude.ai](https://claude.ai)
3. **Gemini**: [gemini.google.com](https://gemini.google.com)

### Your First Prompts to Try

```
Explain [complex topic] like I''m 10 years old.
```

```
I''m learning [skill]. Give me a 30-day practice plan.
```

```
Write a professional email asking for [thing] to [person].
```

### Why Responses Vary

AI has a "temperature" setting (randomness). Higher = more creative, Lower = more consistent. That''s why you get different answers each time.

### Resources
1. [OpenAI Playground](https://platform.openai.com/playground)
2. [Claude Free Tier](https://claude.ai)',
'Expecting identical answers every time. AI has built-in randomness.',
'Sign up for free tiers, try simple prompts, notice how responses vary.'),

('genai-1-4', 'genai-prompting', 'Understanding AI Limitations', 'What AI cannot do', 4, 150, 400, '12 min',
'Knowing limits prevents costly mistakes. AI is powerful but not infallible.',
'## AI Limitations

### 1. Hallucinations
AI confidently states false information. It doesn''t "know" it''s wrong.

**Example:** "The Eiffel Tower was built in 1823 by Gustav Eiffel." (Actually 1889)

### 2. Knowledge Cutoffs
Models are trained on data up to a certain date. They don''t know recent events.

### 3. Math & Logic Failures
LLMs are text predictors, not calculators. Complex math often fails.

### 4. No Real-Time Data
Unless using tools/plugins, AI can''t check current stock prices, weather, or news.

### 5. Bias
Training data contains human biases. Outputs can reflect these.

### The Golden Rule

**Never trust AI for:**
- Medical/legal/financial advice
- Factual claims without verification
- Recent events or statistics

### Resources
1. [AI Hallucinations](https://www.youtube.com/watch?v=xqNl5lNYgjE) – ByteByteGo
2. [Anthropic on Limitations](https://www.anthropic.com/news/claude-3-family)',
'Trusting AI output without verification, especially for important decisions.',
'AI hallucinates, has knowledge cutoffs, fails at math, and reflects biases.'),

-- LEVEL 2: PROMPT ENGINEERING FUNDAMENTALS
('genai-2-1', 'genai-prompting', 'What is Prompt Engineering?', 'Why how you ask matters', 5, 50, 500, '10 min',
'Prompt engineering is THE skill that makes AI useful. The same AI can be brilliant or useless depending on your prompts.',
'## What is Prompt Engineering?

**Prompt engineering** is the skill of crafting instructions that get useful, accurate, and relevant outputs from AI.

### The Mental Shift

❌ **Searching**: "weather new york"
✅ **Instructing**: "Give me today''s weather for New York City in a single sentence."

### Why It Matters

Same AI, different prompts, vastly different results:

**Bad prompt:** "Write about marketing"
**Good prompt:** "Write a 200-word LinkedIn post about B2B SaaS marketing for startup founders. Use a professional but approachable tone."

### The Core Formula

```
Prompt = Task + Context + Format + Constraints
```

### Resources
1. [Prompt Engineering Guide](https://www.promptingguide.ai/) – DAIR.AI
2. [OpenAI Prompt Docs](https://platform.openai.com/docs/guides/prompt-engineering)',
'Being vague and expecting AI to read your mind.',
'Prompt engineering is instructing, not searching. Specificity wins.'),

('genai-2-2', 'genai-prompting', 'Anatomy of a Great Prompt', 'The building blocks', 6, 150, 600, '15 min',
'Every great prompt has the same ingredients. Learn them once, use them forever.',
'## Anatomy of a Great Prompt

### The 5 Components

**1. Role** — Who should AI act as?
```
You are an experienced data scientist.
```

**2. Task** — What exactly to do?
```
Analyze this dataset and find patterns.
```

**3. Context** — Background information
```
This is sales data from a B2B company.
```

**4. Format** — How output should look
```
Present findings as bullet points.
```

**5. Constraints** — What to avoid
```
Keep it under 200 words. No technical jargon.
```

### Full Example

```
You are a senior copywriter. Write a product description for a wireless mouse targeted at gamers. Use energetic language. Format: headline + 3 bullet points + call to action. Keep under 100 words.
```

### Resources
1. [Prompt Elements](https://www.promptingguide.ai/introduction/elements) – DAIR.AI
2. [Claude Prompt Library](https://docs.anthropic.com/en/prompt-library/library)',
'Missing format specifications — you get unpredictable output lengths and styles.',
'Great prompts have: Role + Task + Context + Format + Constraints.'),

('genai-2-3', 'genai-prompting', 'Zero-Shot vs Few-Shot Prompting', 'Teaching AI by example', 7, 50, 700, '15 min',
'Few-shot prompting is one of the most powerful techniques. Show, don''t tell.',
'## Zero-Shot vs Few-Shot

### Zero-Shot (Just Describe)
```
Classify this review as positive or negative:
"The product arrived broken and customer service was unhelpful."
```

AI figures it out from instructions alone.

### One-Shot (One Example)
```
Classify reviews as positive or negative.

Example:
Review: "Love this product!"
Classification: Positive

Now classify:
Review: "Terrible experience."
Classification:
```

### Few-Shot (Multiple Examples)
```
Convert sentences to formal English.

Casual: "gonna grab lunch"
Formal: "I will obtain lunch."

Casual: "wanna come over?"
Formal: "Would you like to visit?"

Casual: "gotta run"
Formal:
```

### When to Use Each

| Situation | Approach |
|-----------|----------|
| Simple, clear tasks | Zero-shot |
| Specific format needed | Few-shot |
| Unusual or niche tasks | Few-shot (3-5 examples) |

### Resources
1. [Few-Shot Guide](https://www.promptingguide.ai/techniques/fewshot) – DAIR.AI
2. [OpenAI Examples](https://platform.openai.com/examples)',
'Giving inconsistent examples. AI learns from patterns in your examples.',
'Zero-shot = describe only. Few-shot = give examples. Examples teach format.'),

('genai-2-4', 'genai-prompting', 'Role Prompting', 'Making AI adopt expertise', 8, 150, 800, '12 min',
'A simple "You are..." changes AI output dramatically. Use this for expertise.',
'## Role Prompting

### The Technique
Assign AI an identity that shapes its responses:

```
You are a Stanford professor of economics.
```

```
You are a skeptical journalist fact-checking claims.
```

```
You are a patient kindergarten teacher.
```

### Why It Works
Roles activate relevant "knowledge patterns" from training. A "senior developer" role produces different code explanations than a "beginner tutor" role.

### Practical Examples

**For technical depth:**
```
You are a senior software architect with 15 years of experience.
```

**For simplicity:**
```
You are a teacher explaining concepts to curious 12-year-olds.
```

**For creativity:**
```
You are a creative director at a top advertising agency.
```

### Combining Roles with Tasks
```
You are a nutritionist. Create a 7-day meal plan for someone with diabetes. Focus on low glycemic foods.
```

### Resources
1. [Role Prompting](https://www.promptingguide.ai/techniques/roles) – DAIR.AI
2. [Awesome Prompts](https://github.com/f/awesome-chatgpt-prompts) – GitHub',
'Using generic roles. "You are an expert" is weaker than "You are a securities lawyer with 20 years at Goldman Sachs."',
'"You are [specific expert]" changes AI output. More specific = better results.'),

('genai-2-5', 'genai-prompting', 'Instruction Clarity & Formatting', 'Getting precise outputs', 9, 50, 900, '12 min',
'Tell AI exactly what format you want. Ambiguity kills usefulness.',
'## Instruction Clarity

### Format Specifications

**Markdown:**
```
Format your response using markdown with headers and bullet points.
```

**JSON:**
```
Return the data as valid JSON with keys: name, age, location.
```

**Numbered lists:**
```
Give me 5 ideas, numbered 1-5.
```

### Using Delimiters
Separate sections with clear markers:

```
Analyze the text between triple quotes.

"""
[Your text here]
"""
```

### Length Control
```
Keep response under 100 words.
```
```
Be comprehensive — aim for 500+ words.
```

### Tone Instructions
```
Use a professional but friendly tone.
```
```
Be concise and direct. No fluff.
```

### Template Example
```
Format your response as:

**Summary:** [2-3 sentences]

**Key Points:**
- Point 1
- Point 2

**Recommendation:** [1 sentence]
```

### Resources
1. [Delimiters Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-delimiters) – Anthropic
2. [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) – OpenAI',
'Not specifying format, then being frustrated by inconsistent outputs.',
'Specify format explicitly: JSON, markdown, lists, length, tone.'),

('genai-2-6', 'genai-prompting', 'Common Prompting Mistakes', 'What breaks prompts', 10, 150, 1000, '10 min',
'Learn what NOT to do. These mistakes waste time and produce garbage.',
'## Common Prompting Mistakes

### 1. Being Too Vague
❌ "Make this better"
✅ "Improve clarity, fix grammar, make it more persuasive"

### 2. Overloading
❌ "Write a blog post and summarize it and translate to Spanish and make an image prompt"
✅ One task per prompt, or clearly numbered steps

### 3. Missing Context
❌ "Respond to this email" [no email included]
✅ "Respond to this email: [paste email]"

### 4. Contradictory Instructions
❌ "Be brief. Explain in detail."
✅ Pick one: "Be concise" or "Explain thoroughly"

### 5. Assuming AI Remembers
AI doesn''t remember previous conversations (unless explicitly designed to). Include all needed context.

### 6. No Format Specification
❌ "List some marketing ideas"
✅ "List 5 marketing ideas as numbered bullet points"

### Quick Fix Checklist
- [ ] Is my task specific?
- [ ] Did I include necessary context?
- [ ] Did I specify format?
- [ ] Is there only one main task?

### Resources
1. [Anti-Patterns](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct) – Anthropic
2. [Prompting Tips](https://www.promptingguide.ai/introduction/tips) – DAIR.AI',
'All of the above. The most common: being vague and assuming AI understands context.',
'Be specific, one task at a time, include context, specify format.'),

-- LEVEL 3: INTERMEDIATE TECHNIQUES
('genai-3-1', 'genai-prompting', 'Chain-of-Thought Prompting', 'Making AI reason step by step', 11, 50, 1100, '15 min',
'For complex problems, asking AI to think step-by-step dramatically improves accuracy.',
'## Chain-of-Thought (CoT)

### The Technique
Add "Think step by step" or "Let me work through this" to complex problems.

### Example: Math Problem

**Without CoT:**
```
Roger has 5 tennis balls. He buys 2 cans of 3. How many total?
Answer: 11 ✅
```

**With CoT:**
```
Roger has 5 tennis balls. He buys 2 cans of 3. How many total?
Think step by step.

1. Roger starts with 5 balls
2. Each can has 3 balls
3. He buys 2 cans: 2 × 3 = 6 balls
4. Total: 5 + 6 = 11 balls ✅
```

### When to Use CoT

- Math and logic problems
- Multi-step analysis
- Complex reasoning
- Debugging code
- Decision-making

### The Magic Phrase
Simply add:
```
Let''s work through this step by step.
```

### Resources
1. [CoT Explained](https://www.promptingguide.ai/techniques/cot) – DAIR.AI
2. [Chain of Thought](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought) – Anthropic',
'Using CoT for simple tasks. It''s overkill for "write a tweet" but crucial for "solve this math problem."',
'"Think step by step" makes AI show reasoning, improving accuracy on complex tasks.'),

('genai-3-2', 'genai-prompting', 'System Prompts & Context Setting', 'The hidden control layer', 12, 150, 1200, '15 min',
'System prompts set AI behavior before the conversation starts. This is how products like ChatGPT are customized.',
'## System Prompts

### What Are They?
System prompts are instructions that run "behind the scenes" before user messages. They set:
- AI personality
- Behavioral rules
- Knowledge context
- Safety guardrails

### Example Structure
```
[SYSTEM]
You are a helpful customer service agent for TechCorp.
You are friendly, professional, and concise.
Never discuss competitors.
If asked about pricing, refer to techcorp.com/pricing.
Always end with "Is there anything else I can help with?"
```

### User Message vs System Message

| Type | Purpose |
|------|---------|
| System | Set behavior, rules, context |
| User | The actual question/task |
| Assistant | AI response |

### Using System Prompts in APIs
```python
messages = [
    {"role": "system", "content": "You are a helpful coding assistant."},
    {"role": "user", "content": "How do I sort a list in Python?"}
]
```

### Resources
1. [System Prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) – Anthropic
2. [OpenAI Messages](https://platform.openai.com/docs/guides/text-generation) – OpenAI',
'Putting behavioral rules in user messages instead of system messages. System prompts are more reliable.',
'System prompts control AI behavior before conversation. Use for personas, rules, context.'),

('genai-3-3', 'genai-prompting', 'Context Windows & Token Limits', 'How much AI can remember', 13, 50, 1300, '12 min',
'Understanding context limits helps you work with long documents and conversations.',
'## Context Windows

### What is Context?
The "context window" is how much text AI can process at once — including your prompt AND its response.

### Current Limits (2024)
- **GPT-4o**: 128K tokens (~300 pages)
- **Claude 3.5**: 200K tokens (~500 pages)
- **Gemini 1.5**: 1M tokens (~books!)

### Tokens ≠ Words
Roughly: **1 token ≈ 4 characters** or **100 tokens ≈ 75 words**

Check tokens: [OpenAI Tokenizer](https://platform.openai.com/tokenizer)

### What Happens When Exceeded?
- API: Error returned
- Chat: Earlier messages dropped

### The "Lost in the Middle" Problem
AI pays most attention to:
- Beginning of context
- End of context

Middle content may be missed. Put important info at start or end.

### Long Document Strategies
1. Summarize first, then analyze
2. Break into chunks
3. Use RAG (retrieval)

### Resources
1. [Context Windows](https://www.youtube.com/watch?v=eWN2gGPqC0k) – AI Explained
2. [Long Context Tips](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips) – Anthropic',
'Assuming AI remembers everything. Long contexts get fuzzy in the middle.',
'Context window = AI memory limit. Middle content often missed. Chunk long docs.'),

('genai-3-4', 'genai-prompting', 'Iterative Prompting & Refinement', 'Building outputs through conversation', 14, 150, 1400, '12 min',
'Great outputs often come from iteration, not one perfect prompt.',
'## Iterative Prompting

### The Process
Instead of one perfect prompt, build through conversation:

1. **Start broad**: Get a first draft
2. **Refine**: "Now make it more concise"
3. **Adjust**: "Add more technical detail to section 2"
4. **Polish**: "Fix any grammar issues"

### Refinement Phrases
```
"Now improve the introduction"
"Make this more persuasive"
"Add examples to each point"
"Shorten by 50%"
"Rewrite in a more professional tone"
```

### The Critic Pattern
```
You just wrote this. Now critique it harshly.
What''s weak? What''s missing?
```

Then:
```
Now rewrite addressing those issues.
```

### When to Start Fresh
If after 3-4 iterations you''re not getting closer, start a new conversation with a better initial prompt.

### Resources
1. [Iterative Development](https://www.youtube.com/watch?v=TRjq7t2Ms5I) – DeepLearning.AI
2. [Ask for Rewrites](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/ask-for-rewrites) – Anthropic',
'Trying to get perfect output in one prompt. Iteration is normal and expected.',
'Build outputs through conversation: draft → refine → adjust → polish.'),

('genai-3-5', 'genai-prompting', 'Prompt Templates & Libraries', 'Reusable prompt patterns', 15, 50, 1500, '12 min',
'Build once, use forever. Templates save hours of work.',
'## Prompt Templates

### Why Templates?
Stop rewriting prompts from scratch. Create reusable patterns.

### Template Variables
Use placeholders:

```
Write a {{length}} {{content_type}} about {{topic}} for {{audience}}.
Tone: {{tone}}
```

Filled in:
```
Write a 500-word blog post about remote work for startup founders.
Tone: Professional but conversational
```

### Building Your Library
**Categories to create:**
- Writing (emails, blogs, social)
- Analysis (summarize, compare, evaluate)
- Coding (debug, explain, generate)
- Creative (brainstorm, outline, improve)

### Tools for Templates
- Notion or Obsidian (personal)
- LangChain PromptTemplates (code)
- Team wiki (shared)

### Example Template: Email Reply
```
Context: {{brief_context}}
Their email: {{email}}
My goal: {{what_I_want}}
My tone: {{desired_tone}}

Write my reply.
```

### Resources
1. [LangChain Templates](https://python.langchain.com/docs/concepts/prompt_templates/) – Docs
2. [Brex Prompt Library](https://github.com/brexhq/prompt-engineering) – GitHub',
'Not saving good prompts. You''ll reinvent the wheel constantly.',
'Templates with variables save time. Build a personal library by category.'),

('genai-3-6', 'genai-prompting', 'Handling Hallucinations', 'Reducing AI mistakes', 16, 150, 1600, '15 min',
'AI will make confident mistakes. Learn to minimize and catch them.',
'## Handling Hallucinations

### Why AI Hallucinates
AI predicts likely text, not factual text. If trained data contains patterns that "look right," AI reproduces them — even if false.

### Strategies to Reduce

**1. Ask for Sources**
```
Cite your sources for each claim.
```
(Note: AI may hallucinate sources too, but it''s a starting point)

**2. Request Uncertainty**
```
If you''re unsure, say "I''m not certain" rather than guessing.
```

**3. Ground in Documents**
Provide the source material in your prompt:
```
Based ONLY on the following document, answer:
[paste document]
```

**4. Narrow the Scope**
```
Only use information from after 2020.
```

### Fact-Checking Workflow
1. Get AI output
2. Identify key claims
3. Verify with primary sources
4. Correct any errors

### High-Stakes Rules
Never trust AI alone for:
- Legal advice
- Medical decisions
- Financial recommendations
- Factual journalism

### Resources
1. [Reduce Hallucinations](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/reduce-hallucinations) – Anthropic
2. [Grounding Prompts](https://www.promptingguide.ai/prompts/reduce-hallucination) – DAIR.AI',
'Trusting AI for facts without verification, especially in professional contexts.',
'AI hallucinates. Mitigate: ask for sources, ground in documents, verify claims.'),

-- LEVEL 4: PRACTICAL APPLICATIONS
('genai-4-1', 'genai-prompting', 'Writing & Content Prompts', 'AI for blogs, marketing, social', 17, 50, 1700, '15 min',
'Content creation is where AI shines. Learn patterns that produce publish-ready content.',
'## Writing & Content Prompts

### Blog Post Template
```
Write a blog post about {{topic}}.

Audience: {{who}}
Length: {{words}} words
Tone: {{style}}
Structure: Hook → Problem → Solution → Examples → CTA

Include: specific examples, actionable tips
Avoid: generic advice, fluff
```

### Social Media Templates

**LinkedIn:**
```
Write a LinkedIn post about {{topic}}.
Hook in first line.
Use short paragraphs.
End with a question.
Professional but human tone.
```

**Twitter/X Thread:**
```
Write a 5-tweet thread about {{topic}}.
Tweet 1: Hook
Tweets 2-4: Key insights with examples
Tweet 5: Summary + CTA
```

### Email Templates
```
Write a cold email to {{recipient}} about {{purpose}}.
Keep under 150 words.
Clear ask in last paragraph.
Subject line options: give 3.
```

### Editing Prompts
```
Improve this text: [paste]
Make it more {{concise/persuasive/clear}}.
Keep my voice but fix issues.
```

### Resources
1. [Claude Copywriter](https://docs.anthropic.com/en/prompt-library/copywriter) – Anthropic
2. [AI Content](https://www.youtube.com/watch?v=uXAqDV9UyoM) – Adam Enfroy',
'Posting AI content without editing. Always add your perspective and voice.',
'Templates for blogs, social, emails. Specify audience, tone, structure, length.'),

('genai-4-2', 'genai-prompting', 'Coding Assistant Prompts', 'AI for developers', 18, 150, 1800, '15 min',
'AI is a powerful coding companion for debugging, explaining, and generating code.',
'## Coding Assistant Prompts

### Code Generation
```
Write a Python function that {{description}}.
Include:
- Type hints
- Docstring
- Error handling
- Example usage
```

### Debugging
```
This code has a bug: [paste code]
Error message: [paste error]

1. Explain what''s wrong
2. Show the fixed code
3. Explain the fix
```

### Code Review
```
Review this code for:
- Bugs
- Performance issues
- Security concerns
- Code style

[paste code]

Format: Issue → Location → Fix
```

### Explanation
```
Explain this code line by line as if I''m a junior developer:
[paste code]
```

### Test Generation
```
Write unit tests for this function using pytest:
[paste function]

Include edge cases.
```

### Translation
```
Convert this Python code to JavaScript:
[paste code]
```

### Resources
1. [Coding with Claude](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/coding-agents) – Anthropic
2. [GitHub Copilot](https://docs.github.com/en/copilot) – GitHub Docs',
'Copying AI code without understanding it. Always review and test.',
'AI for: generate, debug, review, explain, test code. Always verify output.'),

('genai-4-3', 'genai-prompting', 'Research & Analysis Prompts', 'AI for learning and synthesis', 19, 50, 1900, '15 min',
'AI accelerates research by summarizing, comparing, and synthesizing information.',
'## Research & Analysis Prompts

### Summarization
```
Summarize this document in:
1. One sentence (TL;DR)
2. 3 key takeaways
3. 200-word summary

[paste document]
```

### Comparative Analysis
```
Compare {{A}} and {{B}} across:
- Key features
- Pros and cons
- Best use cases
- Pricing (if applicable)

Format as a table.
```

### Literature Review
```
I''m researching {{topic}}.
Based on what you know, outline:
- Key concepts
- Major debates
- Open questions
- Suggested search terms for academic papers
```

### Data Interpretation
```
Here''s data from my survey: [paste]

Analyze:
- Key patterns
- Surprising findings
- Limitations
- Recommendations
```

### Explain Like I''m...
```
Explain {{concept}} at these levels:
1. For a 10-year-old
2. For a college student
3. For a domain expert
```

### Resources
1. [NotebookLM](https://notebooklm.google.com/) – Google
2. [Research with AI](https://www.youtube.com/watch?v=QmA7S2iGBjk) – Andy Stapleton',
'Using AI summaries as primary sources. They''re starting points, not citations.',
'AI for: summarize, compare, explain, analyze. Always verify against sources.'),

('genai-4-4', 'genai-prompting', 'Business & Strategy Prompts', 'AI for planning and decisions', 20, 150, 2000, '15 min',
'AI is a powerful thought partner for business strategy and planning.',
'## Business & Strategy Prompts

### Business Model Canvas
```
Create a Business Model Canvas for: {{idea}}

Cover all 9 blocks:
- Value Prop
- Customer Segments
- Channels
- Customer Relationships
- Revenue Streams
- Key Resources
- Key Activities
- Key Partners
- Cost Structure
```

### SWOT Analysis
```
Perform a SWOT analysis for {{company/product}}:
- Strengths
- Weaknesses
- Opportunities
- Threats

Be specific and actionable.
```

### Market Research
```
I''m launching {{product}} for {{audience}}.

Analyze:
- Target persona
- Competitors
- Positioning opportunities
- Potential challenges
```

### Meeting Summary
```
Summarize this meeting transcript:
[paste transcript]

Format:
- Decisions made
- Action items (with owners)
- Open questions
- Next meeting agenda
```

### Email Drafts
```
Draft an email to {{who}} about {{what}}.
Context: {{background}}
My ask: {{specific_request}}
Tone: {{formal/casual}}
```

### Resources
1. [Brand Builder](https://docs.anthropic.com/en/prompt-library/brand-builder) – Anthropic
2. [AI for Business](https://www.youtube.com/watch?v=wBAnCMA98ls) – Ali Abdaal',
'Treating AI strategy as final. Use it for first drafts and brainstorming, not decisions.',
'AI for: business plans, SWOT, market research, meeting notes. Use as input, not output.'),

('genai-4-5', 'genai-prompting', 'Prompt Safety & Ethics', 'Responsible AI usage', 21, 50, 2100, '12 min',
'Power comes with responsibility. Understand the ethical implications.',
'## Prompt Safety & Ethics

### Jailbreaking
Attempts to bypass AI safety. These exist, but using them:
- Violates Terms of Service
- May produce harmful content
- Risks account bans

### Bias in Outputs
AI reflects training data biases:
- Gender stereotypes
- Cultural assumptions
- Historical prejudices

**Mitigation:** Ask AI to consider diverse perspectives explicitly.

### Privacy Concerns
**What not to share:**
- Personal data (SSN, addresses)
- Company secrets
- Private conversations
- Unpublished code/content

Some models train on your inputs. Use enterprise tiers for sensitive work.

### Misuse Categories
- Misinformation generation
- Impersonation
- Harassment
- Academic dishonesty

### Building Guidelines
For teams, create an AI usage policy:
1. What''s allowed
2. What needs human review
3. What''s prohibited
4. Verification requirements

### Resources
1. [AI Guardrails](https://docs.anthropic.com/en/docs/build-with-claude/guardrails) – Anthropic
2. [Responsible AI](https://ai.google/responsibility/) – Google
3. [OpenAI Usage Policies](https://openai.com/policies/usage-policies/) – OpenAI',
'Assuming AI-generated content is safe to use without review.',
'Consider: privacy, bias, misuse, attribution. Create team guidelines.'),

-- LEVEL 5: ADVANCED & PRO
('genai-5-1', 'genai-prompting', 'Prompting with APIs', 'Using AI programmatically', 22, 50, 2200, '20 min',
'APIs let you integrate AI into applications and automate workflows.',
'## Prompting with APIs

### Why APIs?
- Automate AI tasks
- Build products
- Process bulk data
- Custom integrations

### OpenAI API (Python)
```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Explain APIs simply."}
    ]
)
print(response.choices[0].message.content)
```

### Anthropic API (Python)
```python
import anthropic
client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain APIs simply."}
    ]
)
print(message.content)
```

### Key Concepts
- **API Key:** Your credential (keep secret!)
- **Model:** Which AI to use
- **Messages:** System + User + Assistant
- **Max Tokens:** Response length limit
- **Temperature:** Creativity (0-1)

### Resources
1. [OpenAI Quickstart](https://platform.openai.com/docs/quickstart) – OpenAI
2. [Anthropic API](https://docs.anthropic.com/en/api/getting-started) – Anthropic
3. [Build Apps](https://www.youtube.com/watch?v=4qNwoAAfnk4) – Fireship',
'Exposing API keys in code. Use environment variables.',
'APIs enable automation. Use OpenAI or Anthropic SDKs. Protect your API key.'),

('genai-5-2', 'genai-prompting', 'RAG Basics', 'Giving AI your data', 23, 150, 2300, '20 min',
'RAG lets AI answer questions from YOUR documents, not just training data.',
'## RAG (Retrieval-Augmented Generation)

### The Problem
AI knows its training data but not YOUR data — company docs, recent info, private knowledge.

### The Solution: RAG
1. **Chunk** your documents into pieces
2. **Embed** chunks as vectors (numbers representing meaning)
3. **Store** in a vector database
4. **Retrieve** relevant chunks when asked
5. **Generate** answer using retrieved context

### Simple Diagram
```
User Question
     ↓
[Find relevant docs] ← Vector DB
     ↓
[Combine: docs + question]
     ↓
[Send to LLM]
     ↓
Answer grounded in YOUR data
```

### When to Use RAG
- Company knowledge bases
- Product documentation
- Legal/medical documents
- Research papers
- Any private/recent data

### Tools
- **LangChain** — Python framework
- **LlamaIndex** — Document-focused
- **Pinecone, Weaviate** — Vector databases

### Resources
1. [RAG Explained](https://www.youtube.com/watch?v=T-D1OfcDW1M) – IBM Technology
2. [LangChain RAG](https://python.langchain.com/docs/tutorials/rag/) – Docs
3. [Build RAG](https://www.youtube.com/watch?v=tcqEUSNCn8I) – Tech With Tim',
'Expecting RAG to work perfectly out of the box. Chunking and retrieval need tuning.',
'RAG = retrieve your docs + generate answer. Use for private/recent data.'),

('genai-5-3', 'genai-prompting', 'Tool Use & Function Calling', 'Connecting AI to the world', 24, 50, 2400, '18 min',
'Function calling lets AI interact with APIs, databases, and tools.',
'## Tool Use & Function Calling

### What Is It?
AI outputs a structured request to call an external function:

```
User: "What''s the weather in Paris?"
AI: [Call function: get_weather(location="Paris")]
System: [Returns: 18°C, sunny]
AI: "It''s 18°C and sunny in Paris."
```

### Why It Matters
AI gains abilities:
- Real-time data (weather, stocks)
- Take actions (send email, create event)
- Access databases
- Calculate precisely

### Defining Tools (OpenAI)
```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string"}
            }
        }
    }
}]
```

### Common Tool Types
- Web search
- Calculator
- Database queries
- API calls
- File operations

### Resources
1. [Function Calling](https://platform.openai.com/docs/guides/function-calling) – OpenAI
2. [Claude Tools](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) – Anthropic
3. [Tool Tutorial](https://www.youtube.com/watch?v=p0I-hwZliWk) – Sam Witteveen',
'Not handling tool errors. AI may call tools with wrong parameters.',
'Function calling lets AI use tools: search, calculate, call APIs. You implement the functions.'),

('genai-5-4', 'genai-prompting', 'AI Agents (Introduction)', 'Autonomous AI systems', 25, 150, 2500, '20 min',
'Agents are AI systems that plan, execute, and iterate toward goals.',
'## AI Agents

### What is an Agent?
An AI that:
1. **Plans** — Breaks down goals into steps
2. **Acts** — Uses tools to execute steps
3. **Observes** — Checks results
4. **Iterates** — Adjusts and continues

### The ReAct Pattern
```
Thought: I need to find current stock price
Action: search("AAPL stock price")
Observation: $178.50
Thought: Now I can answer
Answer: Apple stock is $178.50
```

### Agent Components
- **LLM** — The brain
- **Tools** — Actions it can take
- **Memory** — Context over time
- **Planning** — Breaking down tasks

### Current State (2024)
- Simple agents work well (search + answer)
- Complex multi-step agents are fragile
- Requires careful error handling
- Hallucination risks compound

### Tools for Building
- **LangChain Agents**
- **AutoGPT / BabyAGI** (experimental)
- **OpenAI Assistants API**

### Resources
1. [AI Agents](https://www.youtube.com/watch?v=F8NKVhkZZxI) – AI Explained
2. [LangChain Agents](https://python.langchain.com/docs/concepts/agents/) – Docs
3. [Agent Workflows](https://docs.anthropic.com/en/docs/build-with-claude/agent-workflows) – Anthropic',
'Deploying agents without guardrails. They can take unexpected actions.',
'Agents: plan + act + observe + iterate. Powerful but fragile. Use carefully.'),

('genai-5-5', 'genai-prompting', 'Prompt Evaluation & Testing', 'Measuring prompt quality', 26, 50, 2600, '15 min',
'Systematic evaluation separates amateur from professional prompt engineering.',
'## Prompt Evaluation

### Why Evaluate?
"Works for me" isn''t enough. You need:
- Consistency across inputs
- Quality measurement
- Regression detection

### Evaluation Types

**1. Human Evaluation**
- Rate outputs 1-5
- Compare A vs B
- Expert review

**2. LLM as Judge**
```
Rate this response from 1-10 on:
- Accuracy
- Clarity
- Completeness

Response: [AI output]
Expected: [What you wanted]
```

**3. Automated Metrics**
- BLEU, ROUGE (text similarity)
- Latency and cost
- Error rate

### A/B Testing Prompts
```
Prompt A: "Summarize this article."
Prompt B: "Summarize this article in 3 bullet points."

Test on 20 articles. Compare results.
```

### Prompt Regression Testing
When you change a prompt:
1. Run on test set
2. Compare to baseline
3. Ensure no degradation

### Resources
1. [Evaluation Guide](https://docs.anthropic.com/en/docs/build-with-claude/develop-tests) – Anthropic
2. [LangSmith](https://docs.smith.langchain.com/) – LangChain',
'Not testing prompts before deploying to production.',
'Evaluate prompts: human review, LLM-as-judge, A/B testing. Prevent regressions.'),

('genai-5-6', 'genai-prompting', 'When Prompting Fails', 'Knowing the limits', 27, 150, 2700, '15 min',
'Prompting has limits. Know when to go beyond.',
'## When Prompting Fails

### Signs You''ve Hit the Limit
- Consistent errors despite prompt refinement
- Task requires specialized knowledge
- Need for real-time data
- High-stakes decisions

### Alternative Approaches

**1. Fine-Tuning**
Train model on your specific data/format:
- Consistent style needed
- Domain-specific language
- Proprietary formats

**2. RAG (Retrieval)**
When you need:
- Private/recent information
- Verifiable sources
- Large knowledge base

**3. Multiple Models**
Use different models for different parts:
- GPT for creativity
- Claude for analysis
- Specialized models for specific tasks

**4. Human in the Loop**
Some tasks need human judgment:
- Legal/medical decisions
- Ethical concerns
- High-stakes actions

### The Future
- Prompting will remain important
- But it''s becoming one tool among many
- The skill is knowing which tool to use

### Resources
1. [Fine-Tuning vs Prompting](https://www.youtube.com/watch?v=YfWr8oWfLSw) – AI Explained
2. [When to Fine-Tune](https://platform.openai.com/docs/guides/fine-tuning/when-to-use-fine-tuning) – OpenAI
3. [Limits of LLMs](https://www.youtube.com/watch?v=dDUF_BKslxg) – Andrej Karpathy',
'Blaming the prompt when the task needs a different approach entirely.',
'Prompting has limits. Consider: fine-tuning, RAG, specialized models, human review.'),

('genai-5-7', 'genai-prompting', 'Building Your AI Workflow', 'Putting it all together', 28, 100, 2800, '15 min',
'You have the skills. Now build a sustainable practice.',
'## Building Your AI Workflow

### Daily Practice
1. **Default to AI** — Try AI first for new tasks
2. **Prompt → Refine → Save** — Build your library
3. **Stay Critical** — Verify, don''t trust blindly

### Your Personal System

**Prompt Library Structure:**
```
/prompts
  /writing
    - blog_post.md
    - social_media.md
  /coding
    - debug.md
    - review.md
  /analysis
    - summarize.md
    - compare.md
```

### Continuous Learning
- Follow @OpenAI, @AnthropicAI
- Read release notes for new features
- Join communities (r/PromptEngineering)
- Experiment with new tools

### Professional Development
- Build a portfolio of AI-enhanced work
- Document productivity gains
- Share learnings with team
- Consider certifications

### The Meta-Skill
The real skill isn''t memorizing techniques.
It''s **knowing how to think** when prompting:
- What does AI need to know?
- What format will be useful?
- How can I verify this?

### Resources
1. [Prompt Engineering Guide](https://www.promptingguide.ai/) – Complete reference
2. [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) – Code examples
3. [OpenAI Cookbook](https://cookbook.openai.com/) – Recipes',
'Learning techniques but not building a sustainable practice.',
'Build: prompt library, daily practice, continuous learning. The skill is thinking, not memorizing.')

ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    short_summary = EXCLUDED.short_summary,
    order_index = EXCLUDED.order_index,
    svg_x = EXCLUDED.svg_x,
    svg_y = EXCLUDED.svg_y,
    estimated_time = EXCLUDED.estimated_time,
    why_matters = EXCLUDED.why_matters,
    content = EXCLUDED.content,
    common_mistakes = EXCLUDED.common_mistakes,
    tldr = EXCLUDED.tldr;
