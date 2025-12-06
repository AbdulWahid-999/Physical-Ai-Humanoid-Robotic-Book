---
id: 0001
title: Initialize Project Constitution
stage: constitution
date: 2025-12-05
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 1-textbook-generation
user: unknown
command: /sp.phr
labels: ["constitution", "initialization", "project setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

```
/sp.constitution

Project: AI-Native Book + Integrated RAG Chatbot

Core Principles

AI-Native First — System designed with AI as the core engine, not an add-on.

Accuracy & Source-Grounding — All explanations, summaries, and chatbot answers must be grounded only in the book’s content or user-selected text.

Transparency of Reasoning — All generative processes must keep traceable reasoning steps (PHRs, ADRs, logs).

User-Centric Learning — Content, UI, and chatbot interactions must enhance understanding, not overwhelm the user.

Reproducibility — Every AI-generated output should be regenerable from specs + source text.

Modularity — Book content, RAG pipeline, chatbot, and UI must act as separate, replaceable units.

Key Standards

Bonce artifacts must be stored in repo.

Constraints

Book Format:

Framework: Docusaurus

Output: Static site + embedded chatbot

Each chapter must stay under 2,000–3,000 words

Technical

Qdrant Cloud free tier limits must be respected (collections, vectors, size).

Chatbot must run without paid hosting requirements.

FastAPI backend must support streaming responses.

AI Limits

Chatbot cannot fabricate external facts.

Retrieval context capped at allowed token window.

Success Criteria

Book Criteria

Book builds successfully in Docusaurus with no broken links.

Each chapter passes clarity and consistency checks.

All factual claims have citations.

RAG Chatbot Criteria

Answers 9ok Content Standards

Written for general audience with tech curiosity (grade 9–12 reading level).

Factual claims must be traceable to sources with citations.

No hallucinations: AI must only use allowed context.

All chapters must include summaries, key concepts, and optional quizzes.

RAG System Standards

Vector DB: Qdrant Cloud (Free Tier).

Embeddings: OpenAI Embeddings API (latest available model).

Retrieval: Hybrid (semantic + keyword) when possible.

Chatbot must answer ONLY using:

book content

OR user-selected text

No external internet knowledge unless explicitly allowed.

Chatbot Architecture Standards

Built with OpenAI Agents SDK (backend agent logic).

UI built with ChatKit (React).

Backend served via FastAPI.

All requests must include content citations in final answers.

Development Standards

Must follow Spec-Driven Development (SDD-RI) workflows.

Every change requires:

/sp.spec

/sp.plan

/sp.tasks

/sp.impl

/sp.adr (when architecture decisions are affected)

All code and intellige5% of questions correctly based only on book content.

When user selects text, chatbot uses only that text for answers.

Provides citations to retrieved chunks.

Latency under 2 seconds (after first query).

Technical Completion

Full integration of:

Docusaurus

Qdrant

FastAPI backend

OpenAI Agents SDK

ChatKit UI

All endpoints tested and documented.

Workflow Completion
```

## Response snapshot

Initialized the project constitution with core principles, key standards, constraints, and success criteria for the AI-Native Book + Integrated RAG Chatbot project.

## Outcome

- ✅ Impact: Project constitution `/.specify/memory/constitution.md` updated to version 1.0.0.
- 🧪 Tests: none
- 📁 Files: 1 file modified: `.specify/memory/constitution.md`
- 🔁 Next prompts: Address pending template updates (plan-template.md, spec-template.md, tasks-template.md, and command files).
- 🧠 Reflection: The create-phr.sh script was not found, requiring manual PHR creation via agent-native tools.

## Evaluation notes (flywheel)

- Failure modes observed: The `.specify/scripts/bash/create-phr.sh` script was not found, preventing automated PHR creation.
- Graders run and results (PASS/FAIL): unspecified
- Prompt variant (if applicable): unspecified
- Next experiment (smallest change to try): Investigate why `create-phr.sh` is missing and ensure it is available or update the PHR creation process to be fully agent-native.
