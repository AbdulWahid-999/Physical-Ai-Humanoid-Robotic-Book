<!--
Version change: 1.0.0 -> 1.1.0
List of modified principles:
- AI-Native First (modified)
- Scientific Accuracy (new)
- Traceability (new)
- Educational Clarity (new)
- Reproducibility (modified)
- Modularity (removed, or implicitly replaced by new structure)
Added sections: None
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .specify/commands/sp.constitution.md: ⚠ pending
- .specify/commands/sp.spec.md: ⚠ pending
- .specify/commands/sp.plan.md: ⚠ pending
- .specify/commands/sp.tasks.md: ⚠ pending
- .specify/commands/sp.phr.md: ⚠ pending
- .specify/commands/sp.implement.md: ⚠ pending
- .specify/commands/sp.git.commit_pr.md: ⚠ pending
- .specify/commands/sp.clarify.md: ⚠ pending
- .specify/commands/sp.checklist.md: ⚠ pending
- .specify/commands/sp.analyze.md: ⚠ pending
- .specify/commands/sp.adr.md: ⚠ pending
Follow-up TODOs: None
-->
# Project: AI-Native Book — Physical AI & Humanoid Robotics + Integrated RAG Chatbot

## Core Principles

### AI-Native First
Book and platform designed around intelligent tooling, retrieval, and agent workflows.

### Scientific Accuracy
All explanations grounded in verifiable robotics, AI, and engineering sources.

### Traceability
All technical claims traceable to cited research or book content.

### Educational Clarity
Written for beginners to intermediate learners (grade 9–12 level).

### Reproducibility
Readers should be able to reproduce every AI-generated output from specs + source text.

### Modularity
Book content, RAG pipeline, chatbot, and UI must act as separate, replaceable units.

## Key Standards

### Book Content Standards

Written for general audience with tech curiosity (grade 9–12 reading level).
Factual claims must be traceable to sources with citations.
No hallucinations: AI must only use allowed context.
All chapters must include summaries, key concepts, and optional quizzes.

### RAG System Standards

Vector DB: Qdrant Cloud (Free Tier).
Embeddings: OpenAI Embeddings API (latest available model).
Retrieval: Hybrid (semantic + keyword) when possible.
Chatbot must answer ONLY using:
book content
OR user-selected text
No external internet knowledge unless explicitly allowed.

### Chatbot Architecture Standards

Built with OpenAI Agents SDK (backend agent logic).
UI built with ChatKit (React).
Backend served via FastAPI.
All requests must include content citations in final answers.

### Development Standards

Must follow Spec-Driven Development (SDD-RI) workflows.
Every change requires:
/sp.spec
/sp.plan
/sp.tasks
/sp.impl
/sp.adr (when architecture decisions are affected)
All code and intelligence artifacts must be stored in repo.

## Constraints

### Book Format

Framework: Docusaurus
Output: Static site + embedded chatbot
Each chapter must stay under 2,000–3,000 words

### Technical

Qdrant Cloud free tier limits must be respected (collections, vectors, size).
Chatbot must run without paid hosting requirements.
FastAPI backend must support streaming responses.

### AI Limits

Chatbot cannot fabricate external facts.
Retrieval context capped at allowed token window.

## Success Criteria

### Book Criteria

Book builds successfully in Docusaurus with no broken links.
Each chapter passes clarity and consistency checks.
All factual claims have citations.

### RAG Chatbot Criteria

Answers 95% of questions correctly based only on book content.
When user selects text, chatbot uses only that text for answers.
Provides citations to retrieved chunks.
Latency under 2 seconds (after first query).

### Technical Completion

Full integration of:
Docusaurus
Qdrant
FastAPI backend
OpenAI Agents SDK
ChatKit UI
All endpoints tested and documented.

### Workflow Completion

All features implemented through Spec-Kit:
/sp.spec
/sp.plan
/sp.tasks
/sp.impl
/sp.phr
/sp.adr
No step skipped.

## Governance

This Constitution supersedes all other project practices. Any amendments to this Constitution require a documented proposal, review, and approval process. All development work, code reviews, and architectural decisions must verify compliance with these principles.

**Version**: 1.1.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
