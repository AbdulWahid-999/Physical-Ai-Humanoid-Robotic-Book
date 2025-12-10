---
id: 0003
title: Establish project constitution
stage: constitution
date: 2025-12-07
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: Muhammad Abdul Wahid
command: /sp.constitution /sp.constitution
labels: ["constitution", "initial-setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:

---

## Prompt

/sp.constitution /sp.constitution

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
- All backend APIs must be versioned
- All frontend scripts/plugins must include TypeScript type definitions
- Documentation must include:
  - Architecture overview
  - Selection-mode technical explanation
  - Re-index instructions
  - Failure modes & how to recover
  - Deployment guide

Quality benchmarks:
- 0% hallucination tolerance in selection-only mode
- 95% citation correctness
- 90%+ relevance score in automated retrieval tests
- Smooth, seamless integration with Docusaurus (no layout shift or theme breakage)

## Response snapshot

I have successfully updated the project constitution at `.specify/memory/constitution.md` with the provided information.

**Summary of Changes:**

*   **New Version:** `1.0.0`
*   **Version Bump Rationale:** This update establishes the initial comprehensive project constitution, transforming a generic template into a detailed, project-specific document for the RAG chatbot. This foundational change warrants a `MAJOR` version increment for its initial release.
*   **Files Flagged for Manual Follow-up:**
    *   `.specify/templates/plan-template.md`
    *   `.specify/templates/spec-template.md`
    *   `.specify/templates/tasks-template.md`
    *   `.specify/templates/adr-template.md`
    *   `.specify/templates/checklist-template.md`
    *   `.specify/templates/agent-file-template.md`
    *   `.specify/templates/phr-template.prompt.md`
    *   All files within `.specify/templates/commands/`
    *   `README.md`
    These files should be reviewed and updated to align with the new constitution's principles and standards.
*   **Suggested Commit Message:** `docs: establish project constitution v1.0.0 for RAG chatbot`

## Outcome

- ✅ Impact: Successfully updated the project constitution with detailed principles, standards, and requirements.
- 🧪 Tests: N/A - Constitution update, no code tests run.
- 📁 Files: Updated `.specify/memory/constitution.md`.
- 🔁 Next prompts: User to review constitution and potentially request further template updates.
- 🧠 Reflection: Initial attempt to use `create-phr.sh` failed due to OS incompatibility (Windows vs. Bash). Fallback to agent-native PHR creation was successful. Resolved ambiguity regarding 'proceed' by re-attempting `git` command.

## Evaluation notes (flywheel)

- Failure modes observed: Shell script incompatibility on Windows, ambiguous user instruction.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
