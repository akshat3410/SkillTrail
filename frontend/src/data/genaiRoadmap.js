/**
 * Generative AI & Prompt Engineering Roadmap Data
 * Frontend-first source of truth
 */

export const genaiRoadmap = {
    id: 'genai-prompting',
    title: 'Generative AI & Prompt Engineering',
    description: 'Master AI tools from basics to advanced prompting techniques.',
    created_at: new Date().toISOString()
}

export const genaiNodes = [
    // LEVEL 1: FOUNDATIONS
    {
        id: 'genai-1-1',
        roadmap_id: 'genai-prompting',
        title: 'What is Generative AI?',
        description: 'How AI generates text, images, and code — and why this changes everything.',
        order_index: 1,
        status: 'not_started',
        youtubeResources: [
            { title: 'Generative AI explained in 2 minutes', channel: 'IBM Technology', url: 'https://www.youtube.com/watch?v=G2fqAlgmoPo', type: 'conceptual' },
            { title: 'Intro to Large Language Models', channel: 'Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', type: 'deep-dive' }
        ],
        content: `
## What is Generative AI?

**What you'll learn:**
How AI generates text, images, and code — and why this changes everything.

**Key concepts:**
- Generative vs traditional AI (classification vs creation)
- Large Language Models (LLMs) — the engine behind ChatGPT
- How models "predict the next word"
- Foundation models: GPT, Claude, Gemini, Llama
- Why AI isn't "thinking" — it's pattern matching at scale

**Free resources:**
1) [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g) – Andrej Karpathy (1hr)
2) [What is Generative AI?](https://www.youtube.com/watch?v=G2fqAlgmoPo) – IBM Technology
3) [Generative AI Explained](https://cloud.google.com/use-cases/generative-ai) – Google Cloud Docs
`
    },
    {
        id: 'genai-1-2',
        roadmap_id: 'genai-prompting',
        title: 'The AI Landscape (2024–2025)',
        description: 'Which AI tools exist, what each is good for, and how to choose.',
        order_index: 2,
        status: 'not_started',
        youtubeResources: [
            { title: 'The AI Revolution: Google Gemini vs OpenAI GPT-4', channel: 'ColdFusion', url: 'https://www.youtube.com/watch?v=bZo6h72W8vM', type: 'conceptual' },
            { title: 'Top 10 AI Tools You Need To Know', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=wVzuvNvMYIE', type: 'practical' }
        ],
        content: `
## The AI Landscape (2024–2025)

**What you'll learn:**
Which AI tools exist, what each is good for, and how to choose.

**Key concepts:**
- ChatGPT, Claude, Gemini — differences and strengths
- Open-source vs closed-source models
- API access vs chat interfaces
- Multimodal AI (text + images + audio)
- The model "versions" game (GPT-4, Claude 3.5, etc.)

**Free resources:**
1) [AI Tools Comparison](https://www.youtube.com/watch?v=wVzuvNvMYIE) – Fireship
2) [Claude vs ChatGPT vs Gemini](https://www.youtube.com/watch?v=x3BZGfwHN5Q) – Matt Wolfe
3) [Hugging Face Model Hub](https://huggingface.co/models) – Explore models
`
    },
    {
        id: 'genai-1-3',
        roadmap_id: 'genai-prompting',
        title: 'Your First AI Conversation',
        description: 'How to use ChatGPT/Claude effectively from day one.',
        order_index: 3,
        status: 'not_started',
        youtubeResources: [
            { title: 'ChatGPT Tutorial for Beginners', channel: 'Corbin Brown', url: 'https://www.youtube.com/watch?v=nHP7b_gFY_U', type: 'practical' },
            { title: 'Claude 3 Tutorial', channel: 'AI Foundations', url: 'https://www.youtube.com/watch?v=gT8T5y3yZNU', type: 'practical' }
        ],
        content: `
## Your First AI Conversation

**What you'll learn:**
How to use ChatGPT/Claude effectively from day one.

**Key concepts:**
- Setting up free accounts (OpenAI, Anthropic, Google)
- The chat interface basics
- Why AI responses vary each time
- Temperature and creativity
- When AI is helpful vs when it fails

**Free resources:**
1) [OpenAI Playground](https://platform.openai.com/playground) – OpenAI
2) [Claude Free Tier](https://claude.ai) – Anthropic
3) [Google AI Studio](https://aistudio.google.com) – Google
`
    },
    {
        id: 'genai-1-4',
        roadmap_id: 'genai-prompting',
        title: 'Understanding AI Limitations',
        description: 'What AI can\'t do — and why this matters for prompting.',
        order_index: 4,
        status: 'not_started',
        youtubeResources: [
            { title: 'Why AI LLMs Hallucinate', channel: 'IBM Technology', url: 'https://www.youtube.com/watch?v=cf5fV6-4B8Y', type: 'conceptual' },
            { title: 'Large Language Models and The End of Truth', channel: 'Veritasium', url: 'https://www.youtube.com/watch?v=Ad9Q8r52q5l', type: 'deep-dive' }
        ],
        content: `
## Understanding AI Limitations

**What you'll learn:**
What AI can't do — and why this matters for prompting.

**Key concepts:**
- Hallucinations: AI confidently making things up
- Knowledge cutoffs: what AI doesn't know
- Math and logic failures
- No real-time data (unless using tools)
- Bias in training data
- Why "AI is always right" is dangerous

**Free resources:**
1) [AI Hallucinations Explained](https://www.youtube.com/watch?v=xqNl5lNYgjE) – ByteByteGo
2) [Limitations of LLMs](https://www.anthropic.com/news/claude-3-family) – Anthropic Blog
3) [AI Ethics Overview](https://ai.google/responsibility/responsible-ai-practices/) – Google AI
`
    },

    // LEVEL 2: PROMPT ENGINEERING FUNDAMENTALS
    {
        id: 'genai-2-1',
        roadmap_id: 'genai-prompting',
        title: 'What is Prompt Engineering?',
        description: 'Why how you ask matters more than what you ask.',
        order_index: 5,
        status: 'not_started',
        youtubeResources: [
            { title: 'Prompt Engineering Guide for Beginners', channel: 'All About AI', url: 'https://www.youtube.com/watch?v=_ZvnD96BsDP', type: 'conceptual' },
            { title: 'A Guide to Prompt Engineering', channel: 'IBM Technology', url: 'https://www.youtube.com/watch?v=T9aRN5Jkmq8', type: 'conceptual' }
        ],
        content: `
## What is Prompt Engineering?

**What you'll learn:**
Why how you ask matters more than what you ask.

**Key concepts:**
- A prompt is an instruction, not a question
- The "garbage in, garbage out" principle
- Prompt = task + context + format
- Why vague prompts get vague answers
- The mental shift from "searching" to "instructing"

**Free resources:**
1) [Prompt Engineering Guide](https://www.promptingguide.ai/) – DAIR.AI (comprehensive)
2) [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering) – OpenAI Docs
3) [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) – Anthropic Docs
`
    },
    {
        id: 'genai-2-2',
        roadmap_id: 'genai-prompting',
        title: 'Anatomy of a Great Prompt',
        description: 'The building blocks of prompts that actually work.',
        order_index: 6,
        status: 'not_started',
        youtubeResources: [
            { title: 'The Perfect Prompt Formula', channel: 'Jeff Su', url: 'https://www.youtube.com/watch?v=jC4v5AS4RIM', type: 'practical' },
            { title: 'Master Prompt Engineering', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=zdcC_W2B6J8', type: 'practical' }
        ],
        content: `
## Anatomy of a Great Prompt

**What you'll learn:**
The building blocks of prompts that actually work.

**Key concepts:**
- **Role**: Who should the AI act as?
- **Task**: What exactly should it do?
- **Context**: What background info is needed?
- **Format**: How should the output look?
- **Constraints**: What should it avoid?
- Examples of good vs bad prompts

**Free resources:**
1) [The Perfect Prompt Formula](https://www.youtube.com/watch?v=jC4v5AS4RIM) – Jeff Su
2) [Prompt Structure Deep Dive](https://www.promptingguide.ai/introduction/elements) – DAIR.AI
3) [Claude Prompt Library](https://docs.anthropic.com/en/prompt-library/library) – Anthropic
`
    },
    {
        id: 'genai-2-3',
        roadmap_id: 'genai-prompting',
        title: 'Zero-Shot vs Few-Shot Prompting',
        description: 'Teaching AI through examples — the most powerful technique.',
        order_index: 7,
        status: 'not_started',
        youtubeResources: [
            { title: 'Zero-Shot vs Few-Shot Prompting', channel: 'AI Explained', url: 'https://www.youtube.com/watch?v=v2gD8BHOaX4', type: 'conceptual' },
            { title: 'Prompt Engineering 101: Few Shot Learning', channel: 'DeepLearningAI', url: 'https://www.youtube.com/watch?v=5pH68y7tXgU', type: 'practical' }
        ],
        content: `
## Zero-Shot vs Few-Shot Prompting

**What you'll learn:**
Teaching AI through examples — the most powerful technique.

**Key concepts:**
- Zero-shot: just describe the task
- One-shot: give one example
- Few-shot: give 2–5 examples
- When to use which approach
- Creating effective examples
- The "show, don't tell" principle

**Free resources:**
1) [Few-Shot Prompting Explained](https://www.promptingguide.ai/techniques/fewshot) – DAIR.AI
2) [Zero-Shot vs Few-Shot](https://www.youtube.com/watch?v=v2gD8BHOaX4) – AI Explained
3) [OpenAI Examples](https://platform.openai.com/examples) – OpenAI
`
    },
    {
        id: 'genai-2-4',
        roadmap_id: 'genai-prompting',
        title: 'Role Prompting',
        description: 'Making AI adopt expertise through personas.',
        order_index: 8,
        status: 'not_started',
        youtubeResources: [
            { title: 'Role Prompting: The Secret to Better AI Answers', channel: 'AI Advantage', url: 'https://www.youtube.com/watch?v=482-6K4cQkU', type: 'practical' },
            { title: 'Act As... Prompting Technique', channel: 'Prompt Engineering', url: 'https://www.youtube.com/watch?v=yY1B1tXpX2Q', type: 'practical' }
        ],
        content: `
## Role Prompting

**What you'll learn:**
Making AI adopt expertise through personas.

**Key concepts:**
- "You are a..." — setting AI identity
- Expert roles: lawyer, doctor, developer, etc.
- Creative roles: writer, poet, comedian
- Character roles: historical figures, fictional
- Why roles change output quality
- Combining roles with tasks

**Free resources:**
1) [Role Prompting Examples](https://www.promptingguide.ai/techniques/roles) – DAIR.AI
2) [System Prompts Explained](https://www.youtube.com/watch?v=_ZvnD96BsDP) – All About AI
3) [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) – GitHub
`
    },
    {
        id: 'genai-2-5',
        roadmap_id: 'genai-prompting',
        title: 'Instruction Clarity & Formatting',
        description: 'Getting AI to output exactly what you need.',
        order_index: 9,
        status: 'not_started',
        youtubeResources: [
            { title: 'Getting Structured Output from LLMs', channel: 'Sam Witteveen', url: 'https://www.youtube.com/watch?v=bT8fOX0v8_M', type: 'practical' },
            { title: 'Prompt Engineering: Formatting Output', channel: 'Dave Ebbelaar', url: 'https://www.youtube.com/watch?v=H743jN3yCgw', type: 'practical' }
        ],
        content: `
## Instruction Clarity & Formatting

**What you'll learn:**
Getting AI to output exactly what you need.

**Key concepts:**
- Explicit format instructions (JSON, markdown, lists)
- Step-by-step output requests
- Word/character limits
- Tone and style instructions
- Using delimiters (""", ---, ###)
- Template-based prompting

**Free resources:**
1) [Output Formatting Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-delimiters) – Anthropic
2) [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) – OpenAI Docs
3) [Prompt Templates](https://www.youtube.com/watch?v=1c9iyoVIv-s) – Dave Ebbelaar
`
    },
    {
        id: 'genai-2-6',
        roadmap_id: 'genai-prompting',
        title: 'Common Prompting Mistakes',
        description: 'What breaks prompts — and how to fix them.',
        order_index: 10,
        status: 'not_started',
        youtubeResources: [
            { title: 'Why Your Prompts Suggest Bad Answers', channel: 'AI Jason', url: 'https://www.youtube.com/watch?v=wVzuvf9D9C0', type: 'practical' },
            { title: "Don't Make These ChatGPT Mistakes", channel: 'The AI Advantage', url: 'https://www.youtube.com/watch?v=sO-Uq2_sXh8', type: 'practical' }
        ],
        content: `
## Common Prompting Mistakes

**What you'll learn:**
What breaks prompts — and how to fix them.

**Key concepts:**
- Being too vague ("make it better")
- Overloading with too many tasks
- Missing context
- Contradictory instructions
- Not specifying format
- Assuming AI knows your intent

**Free resources:**
1) [Prompting Anti-Patterns](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct) – Anthropic
2) [Why Your Prompts Fail](https://www.youtube.com/watch?v=wVzuvf9D9C0) – AI Jason
3) [Debugging Prompts](https://www.promptingguide.ai/introduction/tips) – DAIR.AI
`
    },

    // LEVEL 3: INTERMEDIATE TECHNIQUES
    {
        id: 'genai-3-1',
        roadmap_id: 'genai-prompting',
        title: 'Chain-of-Thought Prompting',
        description: 'Making AI "think step by step" for complex problems.',
        order_index: 11,
        status: 'not_started',
        youtubeResources: [
            { title: 'Chain of Thought Prompting Explained', channel: 'AI Explained', url: 'https://www.youtube.com/watch?v=U36LzN50qDg', type: 'conceptual' },
            { title: 'Reasoning with Chain of Thought', channel: 'Yannic Kilcher', url: 'https://www.youtube.com/watch?v=ceb-h02Gfks', type: 'deep-dive' }
        ],
        content: `
## Chain-of-Thought Prompting

**What you'll learn:**
Making AI "think step by step" for complex problems.

**Key concepts:**
- Why "think step by step" works
- Breaking down complex reasoning
- CoT for math, logic, analysis
- Self-consistency: multiple reasoning paths
- When CoT helps vs when it's overkill

**Free resources:**
1) [Chain of Thought Paper (Simplified)](https://www.youtube.com/watch?v=_nDlNVH1GPs) – Yannic Kilcher
2) [CoT Prompting Guide](https://www.promptingguide.ai/techniques/cot) – DAIR.AI
3) [Step-by-Step Reasoning](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought) – Anthropic
`
    },
    {
        id: 'genai-3-2',
        roadmap_id: 'genai-prompting',
        title: 'System Prompts & Context Setting',
        description: 'The hidden layer that controls AI behavior.',
        order_index: 12,
        status: 'not_started',
        youtubeResources: [
            { title: 'System Prompts vs User Prompts', channel: 'OpenAI Developers', url: 'https://www.youtube.com/watch?v=KwlM8g2q9_k', type: 'conceptual' },
            { title: 'How System Prompts Control AI Behavior', channel: 'Dave Ebbelaar', url: 'https://www.youtube.com/watch?v=n5W9M7z6x6w', type: 'practical' }
        ],
        content: `
## System Prompts & Context Setting

**What you'll learn:**
The hidden layer that controls AI behavior.

**Key concepts:**
- System prompt vs user prompt
- Setting persistent behavior
- Company/product personas
- Safety guardrails
- System prompts in APIs
- When system prompts override user input

**Free resources:**
1) [System Prompt Examples](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) – Anthropic
2) [OpenAI System Messages](https://platform.openai.com/docs/guides/text-generation) – OpenAI Docs
3) [Building Custom GPTs](https://www.youtube.com/watch?v=pGOyw_M1mNE) – AI Explained
`
    },
    {
        id: 'genai-3-3',
        roadmap_id: 'genai-prompting',
        title: 'Context Windows & Token Limits',
        description: 'How much AI can "remember" and why it matters.',
        order_index: 13,
        status: 'not_started',
        youtubeResources: [
            { title: 'What are Tokens and Context Windows?', channel: 'IBM Technology', url: 'https://www.youtube.com/watch?v=IGu7ivuy1Ag', type: 'conceptual' },
            { title: 'Visualizing LLM Context Windows', channel: 'AI Explained', url: 'https://www.youtube.com/watch?v=eWN2gGPqC0k', type: 'conceptual' }
        ],
        content: `
## Context Windows & Token Limits

**What you'll learn:**
How much AI can "remember" and why it matters.

**Key concepts:**
- What is a context window (4K, 128K, 200K tokens)
- Tokens ≠ words (roughly 4 chars = 1 token)
- What happens when context overflows
- Strategies for long documents
- Cost implications of large contexts
- "Lost in the middle" problem

**Free resources:**
1) [Context Windows Explained](https://www.youtube.com/watch?v=eWN2gGPqC0k) – AI Explained
2) [OpenAI Tokenizer](https://platform.openai.com/tokenizer) – OpenAI Tool
3) [Long Context Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips) – Anthropic
`
    },
    {
        id: 'genai-3-4',
        roadmap_id: 'genai-prompting',
        title: 'Iterative Prompting & Refinement',
        description: 'Building complex outputs through conversation.',
        order_index: 14,
        status: 'not_started',
        youtubeResources: [
            { title: 'Iterative Prompt Development', channel: 'DeepLearningAI', url: 'https://www.youtube.com/watch?v=TRjq7t2Ms5I', type: 'practical' },
            { title: 'The Art of Refining Prompts', channel: 'Tiago Forte', url: 'https://www.youtube.com/watch?v=5e1w9k6Xy-E', type: 'practical' }
        ],
        content: `
## Iterative Prompting & Refinement

**What you'll learn:**
Building complex outputs through conversation.

**Key concepts:**
- Multi-turn conversations as refinement
- "Now improve X" patterns
- Critic-then-fix workflows
- Version control for prompts
- A/B testing prompt variations
- Knowing when to start fresh

**Free resources:**
1) [Iterative Prompt Development](https://www.youtube.com/watch?v=TRjq7t2Ms5I) – DeepLearning.AI
2) [Prompt Iteration Guide](https://www.promptingguide.ai/introduction/tips) – DAIR.AI
3) [Refining Outputs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/ask-for-rewrites) – Anthropic
`
    },
    {
        id: 'genai-3-5',
        roadmap_id: 'genai-prompting',
        title: 'Prompt Templates & Libraries',
        description: 'Reusable prompt patterns for common tasks.',
        order_index: 15,
        status: 'not_started',
        youtubeResources: [
            { title: 'Building Reusable Prompt Templates', channel: 'Sam Witteveen', url: 'https://www.youtube.com/watch?v=RLYoEXa2SQo', type: 'practical' },
            { title: 'LangChain Prompt Templates Crash Course', channel: 'James Briggs', url: 'https://www.youtube.com/watch?v=2xxzi10j-sU', type: 'practical' }
        ],
        content: `
## Prompt Templates & Libraries

**What you'll learn:**
Reusable prompt patterns for common tasks.

**Key concepts:**
- Template variables ({{name}}, {{context}})
- Building a personal prompt library
- Task-specific templates
- Prompt versioning
- Sharing prompts across team
- Tools: PromptBase, LangChain templates

**Free resources:**
1) [LangChain Prompt Templates](https://python.langchain.com/docs/concepts/prompt_templates/) – LangChain Docs
2) [Prompt Library Examples](https://github.com/brexhq/prompt-engineering) – Brex GitHub
3) [Building Reusable Prompts](https://www.youtube.com/watch?v=RLYoEXa2SQo) – Sam Witteveen
`
    },
    {
        id: 'genai-3-6',
        roadmap_id: 'genai-prompting',
        title: 'Handling Hallucinations',
        description: 'Detecting and reducing AI\'s confident mistakes.',
        order_index: 16,
        status: 'not_started',
        youtubeResources: [
            { title: 'Reducing Hallucinations in LLMs', channel: 'AI Explained', url: 'https://www.youtube.com/watch?v=IgxzcOugvEg', type: 'deep-dive' },
            { title: 'Constraint Prompting to Stop Lying', channel: 'AI Jason', url: 'https://www.youtube.com/watch?v=h5f_8uP7a5k', type: 'practical' }
        ],
        content: `
## Handling Hallucinations

**What you'll learn:**
Detecting and reducing AI's confident mistakes.

**Key concepts:**
- Why AI hallucinates (training patterns)
- Grounding responses with sources
- Asking AI to say "I don't know"
- Fact-checking workflows
- Citation requirements
- High-stakes vs low-stakes tolerance

**Free resources:**
1) [Reducing Hallucinations](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/reduce-hallucinations) – Anthropic
2) [Grounding Responses](https://www.promptingguide.ai/prompts/reduce-hallucination) – DAIR.AI
3) [AI Reliability](https://www.youtube.com/watch?v=IgxzcOugvEg) – AI Explained
`
    },

    // LEVEL 4: PRACTICAL APPLICATIONS
    {
        id: 'genai-4-1',
        roadmap_id: 'genai-prompting',
        title: 'Writing & Content Creation Prompts',
        description: 'Using AI for blogs, marketing, social media, and creative writing.',
        order_index: 17,
        status: 'not_started',
        youtubeResources: [
            { title: 'Humanizing AI Content', channel: 'Adam Enfroy', url: 'https://www.youtube.com/watch?v=uXAqDV9UyoM', type: 'practical' },
            { title: 'SEO Blogging with ChatGPT', channel: 'Income Stream Surfers', url: 'https://www.youtube.com/watch?v=aJZvZtJV8ZU', type: 'practical' }
        ],
        content: `
## Writing & Content Creation Prompts

**What you'll learn:**
Using AI for blogs, marketing, social media, and creative writing.

**Key concepts:**
- Tone and voice specification
- Audience-aware writing
- SEO content patterns
- Social media templates
- Editing and rewriting prompts
- Maintaining brand consistency

**Free resources:**
1) [AI for Content Marketing](https://www.youtube.com/watch?v=uXAqDV9UyoM) – Adam Enfroy
2) [Writing Prompts Library](https://docs.anthropic.com/en/prompt-library/copywriter) – Anthropic
3) [SEO Content with AI](https://www.youtube.com/watch?v=aJZvZtJV8ZU) – Income Stream Surfers
`
    },
    {
        id: 'genai-4-2',
        roadmap_id: 'genai-prompting',
        title: 'Coding Assistant Prompts',
        description: 'Using AI for debugging, writing, and explaining code.',
        order_index: 18,
        status: 'not_started',
        youtubeResources: [
            { title: 'Cursor AI Code Editor Review', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=gqUQbjsYZLQ', type: 'practical' },
            { title: "Don't code without AI anymore", channel: 'Beyond Fireship', url: 'https://www.youtube.com/watch?v=C_78DM8OBQs', type: 'practical' }
        ],
        content: `
## Coding Assistant Prompts

**What you'll learn:**
Using AI for debugging, writing, and explaining code.

**Key concepts:**
- Code generation best practices
- Debugging with AI
- Code review prompts
- Documentation generation
- Test case creation
- Language-specific patterns

**Free resources:**
1) [Cursor AI Tutorial](https://www.youtube.com/watch?v=gqUQbjsYZLQ) – Fireship
2) [GitHub Copilot Guide](https://docs.github.com/en/copilot) – GitHub Docs
3) [Coding with Claude](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/coding-agents) – Anthropic
`
    },
    {
        id: 'genai-4-3',
        roadmap_id: 'genai-prompting',
        title: 'Research & Analysis Prompts',
        description: 'Using AI for summarization, synthesis, and deep research.',
        order_index: 19,
        status: 'not_started',
        youtubeResources: [
            { title: 'Google NotebookLM Deep Dive', channel: 'Jeff Su', url: 'https://www.youtube.com/watch?v=w-5-qR0ql0k', type: 'practical' },
            { title: 'Analyze Documents with AI', channel: 'Andy Stapleton', url: 'https://www.youtube.com/watch?v=QmA7S2iGBjk', type: 'practical' }
        ],
        content: `
## Research & Analysis Prompts

**What you'll learn:**
Using AI for summarization, synthesis, and deep research.

**Key concepts:**
- Document summarization patterns
- Comparative analysis
- Literature review assistance
- Data interpretation
- Extraction and structuring
- Research limitations

**Free resources:**
1) [AI for Research](https://www.youtube.com/watch?v=QmA7S2iGBjk) – Andy Stapleton
2) [Summarization Prompts](https://www.promptingguide.ai/prompts/summarization) – DAIR.AI
3) [NotebookLM Tutorial](https://www.youtube.com/watch?v=w-5-qR0ql0k) – Jeff Su
`
    },
    {
        id: 'genai-4-4',
        roadmap_id: 'genai-prompting',
        title: 'Business & Strategy Prompts',
        description: 'AI for planning, analysis, and decision-making.',
        order_index: 20,
        status: 'not_started',
        youtubeResources: [
            { title: 'How I use AI to run my business', channel: 'Ali Abdaal', url: 'https://www.youtube.com/watch?v=wBAnCMA98ls', type: 'practical' },
            { title: 'ChatGPT for Business Strategy', channel: 'Pat Flynn', url: 'https://www.youtube.com/watch?v=rY3GbOWIItw', type: 'practical' }
        ],
        content: `
## Business & Strategy Prompts

**What you'll learn:**
AI for planning, analysis, and decision-making.

**Key concepts:**
- Business plan generation
- Market analysis prompts
- SWOT and competitive analysis
- Email and communication templates
- Meeting summaries and action items
- Strategic thinking frameworks

**Free resources:**
1) [AI for Business](https://www.youtube.com/watch?v=wBAnCMA98ls) – Ali Abdaal
2) [Business Prompts Library](https://docs.anthropic.com/en/prompt-library/brand-builder) – Anthropic
3) [ChatGPT for Entrepreneurs](https://www.youtube.com/watch?v=rY3GbOWIItw) – Pat Flynn
`
    },
    {
        id: 'genai-4-5',
        roadmap_id: 'genai-prompting',
        title: 'Prompt Safety & Ethics',
        description: 'Responsible AI usage and avoiding harm.',
        order_index: 21,
        status: 'not_started',
        youtubeResources: [
            { title: 'The Jailbreak Problem', channel: 'Computerphile', url: 'https://www.youtube.com/watch?v=4b7x8iS_z6k', type: 'conceptual' },
            { title: 'AI Safety and Alignment', channel: 'Robert Miles AI Safety', url: 'https://www.youtube.com/watch?v=pYOLd-XZgQM', type: 'deep-dive' }
        ],
        content: `
## Prompt Safety & Ethics

**What you'll learn:**
Responsible AI usage and avoiding harm.

**Key concepts:**
- Jailbreaking and why it matters
- Bias in outputs
- Privacy concerns (what AI remembers)
- Harmful content generation
- Enterprise safety requirements
- Building ethical guidelines

**Free resources:**
1) [AI Safety Guide](https://docs.anthropic.com/en/docs/build-with-claude/guardrails) – Anthropic
2) [Responsible AI](https://ai.google/responsibility/) – Google AI
3) [OpenAI Usage Policies](https://openai.com/policies/usage-policies/) – OpenAI
`
    },

    // LEVEL 5: ADVANCED & PRO
    {
        id: 'genai-5-1',
        roadmap_id: 'genai-prompting',
        title: 'Prompting with APIs',
        description: 'Using AI programmatically in applications.',
        order_index: 22,
        status: 'not_started',
        youtubeResources: [
            { title: 'OpenAI API for Beginners', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=4qNwoAAfnk4', type: 'practical' },
            { title: 'Building your first AI App', channel: 'Tech With Tim', url: 'https://www.youtube.com/watch?v=b-QeTThcI_U', type: 'practical' }
        ],
        content: `
## Prompting with APIs

**What you'll learn:**
Using AI programmatically in applications.

**Key concepts:**
- REST API basics for AI
- OpenAI API structure
- Anthropic Messages API
- Streaming responses
- Error handling
- Rate limits and costs

**Free resources:**
1) [OpenAI API Quickstart](https://platform.openai.com/docs/quickstart) – OpenAI Docs
2) [Anthropic API Guide](https://docs.anthropic.com/en/api/getting-started) – Anthropic Docs
3) [Build with APIs](https://www.youtube.com/watch?v=4qNwoAAfnk4) – Fireship
`
    },
    {
        id: 'genai-5-2',
        roadmap_id: 'genai-prompting',
        title: 'RAG Basics (Retrieval-Augmented Generation)',
        description: 'Giving AI access to your own data.',
        order_index: 23,
        status: 'not_started',
        youtubeResources: [
            { title: 'Retrieval Augmented Generation (RAG) Explained', channel: 'IBM Technology', url: 'https://www.youtube.com/watch?v=T-D1OfcDW1M', type: 'conceptual' },
            { title: 'LangChain RAG Tutorial', channel: 'Tech With Tim', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', type: 'practical' }
        ],
        content: `
## RAG Basics (Retrieval-Augmented Generation)

**What you'll learn:**
Giving AI access to your own data.

**Key concepts:**
- Why RAG exists (knowledge limitations)
- Vector databases (high-level)
- Embeddings explained simply
- Document chunking
- Retrieval + Generation flow
- When to use RAG vs fine-tuning

**Free resources:**
1) [RAG Explained Simply](https://www.youtube.com/watch?v=T-D1OfcDW1M) – IBM Technology
2) [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) – LangChain Docs
3) [Build a RAG App](https://www.youtube.com/watch?v=tcqEUSNCn8I) – Tech With Tim
`
    },
    {
        id: 'genai-5-3',
        roadmap_id: 'genai-prompting',
        title: 'Tool Use & Function Calling',
        description: 'Making AI interact with external systems.',
        order_index: 24,
        status: 'not_started',
        youtubeResources: [
            { title: 'Function Calling in OpenAI Explained', channel: 'Sam Witteveen', url: 'https://www.youtube.com/watch?v=p0I-hwZliWk', type: 'deep-dive' },
            { title: 'Giving LLMs Tools', channel: 'Dave Ebbelaar', url: 'https://www.youtube.com/watch?v=M9Y2d42tXgY', type: 'practical' }
        ],
        content: `
## Tool Use & Function Calling

**What you'll learn:**
Making AI interact with external systems.

**Key concepts:**
- What is function calling
- Defining tools for AI
- Web search, calculators, APIs
- Structured outputs for tools
- Error handling patterns
- OpenAI Functions vs Anthropic Tools

**Free resources:**
1) [Function Calling Guide](https://platform.openai.com/docs/guides/function-calling) – OpenAI Docs
2) [Claude Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) – Anthropic Docs
3) [Tool Use Tutorial](https://www.youtube.com/watch?v=p0I-hwZliWk) – Sam Witteveen
`
    },
    {
        id: 'genai-5-4',
        roadmap_id: 'genai-prompting',
        title: 'AI Agents (Introduction)',
        description: 'AI that plans, executes, and iterates autonomously.',
        order_index: 25,
        status: 'not_started',
        youtubeResources: [
            { title: 'What are AI Agents?', channel: 'AI Explained', url: 'https://www.youtube.com/watch?v=F8NKVhkZZxI', type: 'conceptual' },
            { title: 'Building Your First AI Agent', channel: 'IndyDevDan', url: 'https://www.youtube.com/watch?v=PqS1kZV8cT8', type: 'practical' }
        ],
        content: `
## AI Agents (Introduction)

**What you'll learn:**
AI that plans, executes, and iterates autonomously.

**Key concepts:**
- What is an AI agent
- Planning and reasoning loops
- Tools + memory + planning
- ReAct pattern
- Multi-agent systems (intro)
- Current limitations

**Free resources:**
1) [AI Agents Explained](https://www.youtube.com/watch?v=F8NKVhkZZxI) – AI Explained
2) [LangChain Agents](https://python.langchain.com/docs/concepts/agents/) – LangChain Docs
3) [Building Agents](https://docs.anthropic.com/en/docs/build-with-claude/agent-workflows) – Anthropic
`
    },
    {
        id: 'genai-5-5',
        roadmap_id: 'genai-prompting',
        title: 'Prompt Evaluation & Testing',
        description: 'Measuring prompt quality systematically.',
        order_index: 26,
        status: 'not_started',
        youtubeResources: [
            { title: 'Evaluating LLM Applications', channel: 'Weights & Biases', url: 'https://www.youtube.com/watch?v=yCv2lxR4N8Y', type: 'deep-dive' },
            { title: 'LLM Evaluation with LangSmith', channel: 'LangChain', url: 'https://www.youtube.com/watch?v=bE99J55hXwM', type: 'practical' }
        ],
        content: `
## Prompt Evaluation & Testing

**What you'll learn:**
Measuring prompt quality systematically.

**Key concepts:**
- Why evaluation matters
- Human evaluation frameworks
- Automated evaluation (LLM as judge)
- A/B testing prompts
- Regression testing
- Benchmarking outputs

**Free resources:**
1) [Evaluating LLM Outputs](https://docs.anthropic.com/en/docs/build-with-claude/develop-tests) – Anthropic
2) [LangSmith Evaluation](https://docs.smith.langchain.com/) – LangChain
3) [Prompt Evaluation](https://www.youtube.com/watch?v=yCv2lxR4N8Y) – Weights & Biases
`
    },
    {
        id: 'genai-5-6',
        roadmap_id: 'genai-prompting',
        title: 'When Prompting Fails',
        description: 'Understanding the limits and knowing when to go beyond prompts.',
        order_index: 27,
        status: 'not_started',
        youtubeResources: [
            { title: 'RAG vs Fine-Tuning', channel: 'AI Explained', url: 'https://www.youtube.com/watch?v=YfWr8oWfLSw', type: 'conceptual' },
            { title: 'The Limits of LLMs', channel: 'Andrej Karpathy', url: 'https://www.youtube.com/watch?v=dDUF_BKslxg', type: 'conceptual' }
        ],
        content: `
## When Prompting Fails

**What you'll learn:**
Understanding the limits and knowing when to go beyond prompts.

**Key concepts:**
- Tasks that need fine-tuning
- When RAG isn't enough
- Multi-modal limitations
- Speed and cost trade-offs
- Hybrid approaches
- The future of prompting

**Free resources:**
1) [Fine-Tuning vs Prompting](https://www.youtube.com/watch?v=YfWr8oWfLSw) – AI Explained
2) [Limits of LLMs](https://www.youtube.com/watch?v=dDUF_BKslxg) – Andrej Karpathy
3) [When to Fine-Tune](https://platform.openai.com/docs/guides/fine-tuning/when-to-use-fine-tuning) – OpenAI Docs
`
    }
]

export const getGenAiNode = (id) => {
    return genaiNodes.find(node => node.id === id)
}

export const getGenAiNodesSorted = () => {
    return [...genaiNodes].sort((a, b) => a.order_index - b.order_index)
}
