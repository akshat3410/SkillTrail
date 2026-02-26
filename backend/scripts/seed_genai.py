"""
Seed Script: Generative AI & Prompt Engineering Roadmap

Loads the GenAI roadmap content into Supabase database.
"""

import os
import sys
import json
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.core.supabase import init_supabase

# GenAI Roadmap Data (Matching frontend/src/data/genaiRoadmap.js)
ROADMAP_DATA = {
    "roadmap": {
        "id": "genai-prompting",
        "title": "Generative AI & Prompt Engineering",
        "description": "Master AI tools from basics to advanced prompting techniques."
    },
    "nodes": [
        # LEVEL 1: FOUNDATIONS
        {
            "id": "genai-1-1",
            "title": "What is Generative AI?",
            "short_summary": "How AI generates text, images, and code.",
            "order_index": 1,
            "youtube_resources": [
                { "title": "Generative AI explained in 2 minutes", "channel": "IBM Technology", "url": "https://www.youtube.com/watch?v=G2fqAlgmoPo", "type": "conceptual" },
                { "title": "Intro to Large Language Models", "channel": "Andrej Karpathy", "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g", "type": "deep-dive" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-1-2",
            "title": "The AI Landscape (2024–2025)",
            "short_summary": "Which AI tools exist and how to choose.",
            "order_index": 2,
            "youtube_resources": [
                { "title": "The AI Revolution: Google Gemini vs OpenAI GPT-4", "channel": "ColdFusion", "url": "https://www.youtube.com/watch?v=bZo6h72W8vM", "type": "conceptual" },
                { "title": "Top 10 AI Tools You Need To Know", "channel": "Fireship", "url": "https://www.youtube.com/watch?v=wVzuvNvMYIE", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-1-3",
            "title": "Your First AI Conversation",
            "short_summary": "How to use ChatGPT/Claude effectively.",
            "order_index": 3,
            "youtube_resources": [
                { "title": "ChatGPT Tutorial for Beginners", "channel": "Corbin Brown", "url": "https://www.youtube.com/watch?v=nHP7b_gFY_U", "type": "practical" },
                { "title": "Claude 3 Tutorial", "channel": "AI Foundations", "url": "https://www.youtube.com/watch?v=gT8T5y3yZNU", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-1-4",
            "title": "Understanding AI Limitations",
            "short_summary": "What AI can't do and why it lies.",
            "order_index": 4,
            "youtube_resources": [
                { "title": "Why AI LLMs Hallucinate", "channel": "IBM Technology", "url": "https://www.youtube.com/watch?v=cf5fV6-4B8Y", "type": "conceptual" },
                { "title": "Large Language Models and The End of Truth", "channel": "Veritasium", "url": "https://www.youtube.com/watch?v=Ad9Q8r52q5l", "type": "deep-dive" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-2-1",
            "title": "What is Prompt Engineering?",
            "short_summary": "Why how you ask matters.",
            "order_index": 5,
            "youtube_resources": [
                { "title": "Prompt Engineering Guide for Beginners", "channel": "All About AI", "url": "https://www.youtube.com/watch?v=_ZvnD96BsDP", "type": "conceptual" },
                { "title": "A Guide to Prompt Engineering", "channel": "IBM Technology", "url": "https://www.youtube.com/watch?v=T9aRN5Jkmq8", "type": "conceptual" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-2-2",
            "title": "Anatomy of a Great Prompt",
            "short_summary": "Task, Context, Format, and Persona.",
            "order_index": 6,
            "youtube_resources": [
                { "title": "The Perfect Prompt Formula", "channel": "Jeff Su", "url": "https://www.youtube.com/watch?v=jC4v5AS4RIM", "type": "practical" },
                { "title": "Master Prompt Engineering", "channel": "Fireship", "url": "https://www.youtube.com/watch?v=zdcC_W2B6J8", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-2-3",
            "title": "Zero-Shot vs Few-Shot Prompting",
            "short_summary": "Teaching AI through examples.",
            "order_index": 7,
            "youtube_resources": [
                { "title": "Zero-Shot vs Few-Shot Prompting", "channel": "AI Explained", "url": "https://www.youtube.com/watch?v=v2gD8BHOaX4", "type": "conceptual" },
                { "title": "Prompt Engineering 101: Few Shot Learning", "channel": "DeepLearningAI", "url": "https://www.youtube.com/watch?v=5pH68y7tXgU", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-2-4",
            "title": "Role Prompting",
            "short_summary": "Using personas to improve output.",
            "order_index": 8,
            "youtube_resources": [
                { "title": "Role Prompting: The Secret to Better AI Answers", "channel": "AI Advantage", "url": "https://www.youtube.com/watch?v=482-6K4cQkU", "type": "practical" },
                { "title": "Act As... Prompting Technique", "channel": "Prompt Engineering", "url": "https://www.youtube.com/watch?v=yY1B1tXpX2Q", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-2-5",
            "title": "Instruction Clarity & Formatting",
            "short_summary": "Getting structured data out of AI.",
            "order_index": 9,
            "youtube_resources": [
                { "title": "Getting Structured Output from LLMs", "channel": "Sam Witteveen", "url": "https://www.youtube.com/watch?v=bT8fOX0v8_M", "type": "practical" },
                { "title": "Prompt Engineering: Formatting Output", "channel": "Dave Ebbelaar", "url": "https://www.youtube.com/watch?v=H743jN3yCgw", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-2-6",
            "title": "Common Prompting Mistakes",
            "short_summary": "Anti-patterns to avoid.",
            "order_index": 10,
            "youtube_resources": [
                { "title": "Why Your Prompts Suggest Bad Answers", "channel": "AI Jason", "url": "https://www.youtube.com/watch?v=wVzuvf9D9C0", "type": "practical" },
                { "title": "Don't Make These ChatGPT Mistakes", "channel": "The AI Advantage", "url": "https://www.youtube.com/watch?v=sO-Uq2_sXh8", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-3-1",
            "title": "Chain-of-Thought Prompting",
            "short_summary": "Thinking step by step.",
            "order_index": 11,
            "youtube_resources": [
                { "title": "Chain of Thought Prompting Explained", "channel": "AI Explained", "url": "https://www.youtube.com/watch?v=U36LzN50qDg", "type": "conceptual" },
                { "title": "Reasoning with Chain of Thought", "channel": "Yannic Kilcher", "url": "https://www.youtube.com/watch?v=ceb-h02Gfks", "type": "deep-dive" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-3-2",
            "title": "System Prompts & Context Setting",
            "short_summary": "Controlling global behavior.",
            "order_index": 12,
            "youtube_resources": [
                { "title": "System Prompts vs User Prompts", "channel": "OpenAI Developers", "url": "https://www.youtube.com/watch?v=KwlM8g2q9_k", "type": "conceptual" },
                { "title": "How System Prompts Control AI Behavior", "channel": "Dave Ebbelaar", "url": "https://www.youtube.com/watch?v=n5W9M7z6x6w", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-3-3",
            "title": "Context Windows & Token Limits",
            "short_summary": "Understanding AI memory limits.",
            "order_index": 13,
            "youtube_resources": [
                { "title": "What are Tokens and Context Windows?", "channel": "IBM Technology", "url": "https://www.youtube.com/watch?v=IGu7ivuy1Ag", "type": "conceptual" },
                { "title": "Visualizing LLM Context Windows", "channel": "AI Explained", "url": "https://www.youtube.com/watch?v=eWN2gGPqC0k", "type": "conceptual" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-3-4",
            "title": "Iterative Prompting & Refinement",
            "short_summary": "Prompting is a conversation.",
            "order_index": 14,
            "youtube_resources": [
                { "title": "Iterative Prompt Development", "channel": "DeepLearningAI", "url": "https://www.youtube.com/watch?v=TRjq7t2Ms5I", "type": "practical" },
                { "title": "The Art of Refining Prompts", "channel": "Tiago Forte", "url": "https://www.youtube.com/watch?v=5e1w9k6Xy-E", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-3-5",
            "title": "Prompt Templates & Libraries",
            "short_summary": "Building reusable assets.",
            "order_index": 15,
            "youtube_resources": [
                { "title": "Building Reusable Prompt Templates", "channel": "Sam Witteveen", "url": "https://www.youtube.com/watch?v=RLYoEXa2SQo", "type": "practical" },
                { "title": "LangChain Prompt Templates Crash Course", "channel": "James Briggs", "url": "https://www.youtube.com/watch?v=2xxzi10j-sU", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-3-6",
            "title": "Handling Hallucinations",
            "short_summary": "Detecting and preventing lies.",
            "order_index": 16,
            "youtube_resources": [
                { "title": "Reducing Hallucinations in LLMs", "channel": "AI Explained", "url": "https://www.youtube.com/watch?v=IgxzcOugvEg", "type": "deep-dive" },
                { "title": "Constraint Prompting to Stop Lying", "channel": "AI Jason", "url": "https://www.youtube.com/watch?v=h5f_8uP7a5k", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-4-1",
            "title": "Writing & Content Creation Prompts",
            "short_summary": "SEO, blogs, and creative writing.",
            "order_index": 17,
            "youtube_resources": [
                { "title": "Humanizing AI Content", "channel": "Adam Enfroy", "url": "https://www.youtube.com/watch?v=uXAqDV9UyoM", "type": "practical" },
                { "title": "SEO Blogging with ChatGPT", "channel": "Income Stream Surfers", "url": "https://www.youtube.com/watch?v=aJZvZtJV8ZU", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-4-2",
            "title": "Coding Assistant Prompts",
            "short_summary": "Coding, debugging, and explaining.",
            "order_index": 18,
            "youtube_resources": [
                { "title": "Cursor AI Code Editor Review", "channel": "Fireship", "url": "https://www.youtube.com/watch?v=gqUQbjsYZLQ", "type": "practical" },
                { "title": "Don't code without AI anymore", "channel": "Beyond Fireship", "url": "https://www.youtube.com/watch?v=C_78DM8OBQs", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-4-3",
            "title": "Research & Analysis Prompts",
            "short_summary": "Summarization and synthesis.",
            "order_index": 19,
            "youtube_resources": [
                { "title": "Google NotebookLM Deep Dive", "channel": "Jeff Su", "url": "https://www.youtube.com/watch?v=w-5-qR0ql0k", "type": "practical" },
                { "title": "Analyze Documents with AI", "channel": "Andy Stapleton", "url": "https://www.youtube.com/watch?v=QmA7S2iGBjk", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-4-4",
            "title": "Business & Strategy Prompts",
            "short_summary": "Planning and decision making.",
            "order_index": 20,
            "youtube_resources": [
                { "title": "How I use AI to run my business", "channel": "Ali Abdaal", "url": "https://www.youtube.com/watch?v=wBAnCMA98ls", "type": "practical" },
                { "title": "ChatGPT for Business Strategy", "channel": "Pat Flynn", "url": "https://www.youtube.com/watch?v=rY3GbOWIItw", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-4-5",
            "title": "Prompt Safety & Ethics",
            "short_summary": "Jailbreaking, bias, and responsibility.",
            "order_index": 21,
            "youtube_resources": [
                { "title": "The Jailbreak Problem", "channel": "Computerphile", "url": "https://www.youtube.com/watch?v=4b7x8iS_z6k", "type": "conceptual" },
                { "title": "AI Safety and Alignment", "channel": "Robert Miles AI Safety", "url": "https://www.youtube.com/watch?v=pYOLd-XZgQM", "type": "deep-dive" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-5-1",
            "title": "Prompting with APIs",
            "short_summary": "Using OpenAI/Anthropic APIs.",
            "order_index": 22,
            "youtube_resources": [
                { "title": "OpenAI API for Beginners", "channel": "Fireship", "url": "https://www.youtube.com/watch?v=4qNwoAAfnk4", "type": "practical" },
                { "title": "Building your first AI App", "channel": "Tech With Tim", "url": "https://www.youtube.com/watch?v=b-QeTThcI_U", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-5-2",
            "title": "RAG Basics (Retrieval-Augmented Generation)",
            "short_summary": "Connecting AI to your data.",
            "order_index": 23,
            "youtube_resources": [
                { "title": "Retrieval Augmented Generation (RAG) Explained", "channel": "IBM Technology", "url": "https://www.youtube.com/watch?v=T-D1OfcDW1M", "type": "conceptual" },
                { "title": "LangChain RAG Tutorial", "channel": "Tech With Tim", "url": "https://www.youtube.com/watch?v=tcqEUSNCn8I", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-5-3",
            "title": "Tool Use & Function Calling",
            "short_summary": "AI using calculators and APIs.",
            "order_index": 24,
            "youtube_resources": [
                { "title": "Function Calling in OpenAI Explained", "channel": "Sam Witteveen", "url": "https://www.youtube.com/watch?v=p0I-hwZliWk", "type": "deep-dive" },
                { "title": "Giving LLMs Tools", "channel": "Dave Ebbelaar", "url": "https://www.youtube.com/watch?v=M9Y2d42tXgY", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-5-4",
            "title": "AI Agents (Introduction)",
            "short_summary": "Autonomous AI that plans.",
            "order_index": 25,
            "youtube_resources": [
                { "title": "What are AI Agents?", "channel": "AI Explained", "url": "https://www.youtube.com/watch?v=F8NKVhkZZxI", "type": "conceptual" },
                { "title": "Building Your First AI Agent", "channel": "IndyDevDan", "url": "https://www.youtube.com/watch?v=PqS1kZV8cT8", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-5-5",
            "title": "Prompt Evaluation & Testing",
            "short_summary": "Measuring prompt quality.",
            "order_index": 26,
            "youtube_resources": [
                { "title": "Evaluating LLM Applications", "channel": "Weights & Biases", "url": "https://www.youtube.com/watch?v=yCv2lxR4N8Y", "type": "deep-dive" },
                { "title": "LLM Evaluation with LangSmith", "channel": "LangChain", "url": "https://www.youtube.com/watch?v=bE99J55hXwM", "type": "practical" }
            ],
            "content": """
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
"""
        },
        {
            "id": "genai-5-6",
            "title": "When Prompting Fails",
            "short_summary": "Fine-tuning vs RAG.",
            "order_index": 27,
            "youtube_resources": [
                { "title": "RAG vs Fine-Tuning", "channel": "AI Explained", "url": "https://www.youtube.com/watch?v=YfWr8oWfLSw", "type": "conceptual" },
                { "title": "The Limits of LLMs", "channel": "Andrej Karpathy", "url": "https://www.youtube.com/watch?v=dDUF_BKslxg", "type": "conceptual" }
            ],
            "content": """
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
"""
        }
    ]
}


def seed_roadmap(supabase):
    """Insert or update the roadmap."""
    roadmap = ROADMAP_DATA["roadmap"]
    
    # Check if roadmap already exists
    existing = supabase.table("roadmaps").select("id").eq("id", roadmap["id"]).execute()
    
    if existing.data:
        print(f"Updating roadmap: {roadmap['title']}")
        supabase.table("roadmaps").update({
            "title": roadmap["title"],
            "description": roadmap["description"]
        }).eq("id", roadmap["id"]).execute()
    else:
        print(f"Creating roadmap: {roadmap['title']}")
        supabase.table("roadmaps").insert({
            "id": roadmap["id"],
            "title": roadmap["title"],
            "description": roadmap["description"]
        }).execute()
    
    return roadmap["id"]


def seed_nodes(supabase, roadmap_id):
    """Insert or update nodes for the roadmap."""
    nodes = ROADMAP_DATA["nodes"]
    
    for node in nodes:
        node_data = {
            "id": node["id"],
            "roadmap_id": roadmap_id,
            "title": node["title"],
            "short_summary": node.get("short_summary"),
            "order_index": node["order_index"],
            "youtube_resources": node.get("youtube_resources", []),  # This maps to our new JSONB column
            "content": node.get("content")
        }
        
        # Check if node exists
        existing = supabase.table("nodes").select("id").eq("id", node["id"]).execute()
        
        if existing.data:
            print(f"  Updating node: {node['title']}")
            supabase.table("nodes").update(node_data).eq("id", node["id"]).execute()
        else:
            print(f"  Creating node: {node['title']}")
            supabase.table("nodes").insert(node_data).execute()


def main():
    print("=" * 50)
    print("Seeding GenAI & Prompt Engineering Roadmap")
    print("=" * 50)
    
    # Initialize Supabase
    try:
        supabase = init_supabase()
        print("✓ Connected to Supabase")
    except Exception as e:
        print(f"✗ Failed to connect to Supabase: {e}")
        print("  Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in backend/.env")
        sys.exit(1)
    
    # Seed roadmap
    try:
        roadmap_id = seed_roadmap(supabase)
        print(f"✓ Roadmap ready: {roadmap_id}")
    except Exception as e:
        print(f"✗ Failed to seed roadmap: {e}")
        sys.exit(1)
    
    # Seed nodes
    try:
        seed_nodes(supabase, roadmap_id)
        print(f"✓ All {len(ROADMAP_DATA['nodes'])} nodes seeded")
    except Exception as e:
        print(f"✗ Failed to seed nodes: {e}")
        sys.exit(1)
    
    print("=" * 50)
    print("✓ Seeding complete!")
    print("=" * 50)


if __name__ == "__main__":
    main()
