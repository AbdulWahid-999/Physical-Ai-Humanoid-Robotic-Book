---
id: 0001
title: Update RAG Chatbot Constitution
stage: constitution
date: 2025-12-07
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: goku
command: /sp.phr
labels: ["constitution", "rag-chatbot", "project-setup"]
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

/sp.constitution

Project: Integration of a Retrieval-Augmented Generation (RAG) Chatbot into the
“Physical AI and Humanoid Robotics” Docusaurus Book

Core principles:
- High-fidelity, source-grounded answers derived strictly from book text
- Zero tolerance for hallucinations, especially in selection-only mode
- Maintainability and modularity across backend, vector DB, and Docusaurus frontend
- Reproducible, transparent architecture with versioned APIs and documented workflows
- Performance and usability optimized for real learners, researchers, and robotics students
- Secure handling of user interactions and strict limitations on stored data

Key standards:
- Retrieval pipeline must use OpenAI Agents/ChatKit SDKs + FastAPI + Qdrant Cloud Free Tier
- Two retrieval tiers required:
  1) Global book-wide RAG
  2) User-selected-text-only RAG mode (strict constraint)
- Embeddings must follow consistent dimensionality and project-wide configuration
- Chunking must preserve semantic boundaries (paragraph-safe)
- All backend code must be typed, documented, and include OpenAPI schema
- Docusaurus integration must use a dedicated plugin with ≤ +300 KB bundle size impact
- Design must include system prompts enforcing “no external knowledge beyond retrieved context”
- Retrieval results must provide metadata linking to exact chapters/sections of the book
- Logs, metrics, and latency monitoring must be implemented for reliability

Constraints:
- Qdrant Cloud Free Tier limits for memory and request throughput
- OpenAI Agents/ChatKit SDK rate-limit boundaries
- Frontend bundle growth ≤ +300 KB
- End-to-end answer latency ≤ 2 seconds average
- Only book content allowed in the vector store;
  no user-provided text may be stored beyond temporary TTL
- All documentation must be placed in `/docs/ai-rag/` following Docusaurus standards

Success criteria:
- Chatbot fully embedded in the published book with persistent widget access
- Ability to answer user questions using RAG from:
  a) Entire book
  b) Only user-selected text (strict mode, zero fallback)
- Retrieval accuracy ≥ 90% on evaluation dataset
- Strict hallucination prevention:
  - If no relevant chunk is retrieved: must answer “Insufficient information”
  - If selection-mode is active: cannot use global context
- Full re-index pipeline works when book content changes
- Passes automated tests (unit, integration, retrieval quality)
- Manual QA approval for UI integration, UX consistency, citation accuracy, and responsiveness
- Complete CI/CD workflow for backend + frontend + reindex pipeline

Non-functional requirements:
- Scalable architecture that can later support hybrid search (keyword + vector)
- Accessibility-compliant widget (ARIA labels, keyboard navigation)
- Responsive UI for mobile/tablet users
- Structured logs for debugging retrieval failures, latency spikes, and API issues
- Secure environment variable management for API keys and Qdrant tokens

Compliance & security:
- No PII stored; temporary embeddings deleted via TTL-based ephemeral collections
- Only authors/editors may run re-index commands (token-protected)
- Input sanitization required for queries and selection payloads
- Communication over HTTPS only
- API keys stored exclusively in environment variables

Deliverable policies:
- All backend APIs must be versioned (`/v1/...`)
- All frontend scripts/plugins must include TypeScript type definitions
- Documentation must include:
  - Architecture overview
  - Selection-mode technical explanation
  - Re-index instructions
  - Failure modes & how to recover
  - Deployment guide
- Codebase must be organized by:
  - `/backend`
  - `/frontend/plugins/rag-chatbot`
  - `/docs/ai-rag/`

Quality benchmarks:
- 0% hallucination tolerance in selection-only mode
- 95% citation correctness
- 90%+ relevance score in automated retrieval tests
- Smooth, seamless integration with Docusaurus (no layout shift or theme breakage)

## Response snapshot

The project constitution was updated to version 1.2.0, incorporating detailed principles, standards, constraints, and success criteria for the RAG Chatbot integration.

## Outcome

- ✅ Impact: The project constitution was successfully updated, reflecting the new requirements for the RAG Chatbot integration. This establishes a clear set of guidelines for future development.
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md was modified.
- 🔁 Next prompts: Manual review and update of dependent templates and command files to ensure consistency with the new constitution.
- 🧠 Reflection: The agent-native PHR creation fallback was successfully executed after the bash script was not found. This demonstrates resilience in documentation.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script was not found, requiring a fallback to agent-native PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Ensure the `create-phr.sh` script is available and executable in the environment, or improve the fallback mechanism to automatically detect and use the agent-native approach if the script is missing.
