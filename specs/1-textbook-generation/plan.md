# Implementation Plan: Textbook Generation

**Branch**: `1-textbook-generation` | **Date**: 2025-12-03 | **Spec**: specs/1-textbook-generation/spec.md
**Input**: Feature specification from `specs/1-textbook-generation/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation for building an AI-native textbook with an integrated RAG chatbot. The primary objective is to create a fast, simple, and high-quality learning resource using Docusaurus for the textbook UI and a FastAPI backend with Qdrant and Neon for the RAG chatbot functionality. The system will support selecting text to query the AI, adhering to free-tier constraints and minimal embedding usage.

## Technical Context

**Language/Version**: Python 3.11+ (for FastAPI, RAG backend) and JavaScript/TypeScript (for Docusaurus frontend).
**Primary Dependencies**: Docusaurus (frontend framework), FastAPI (backend API), Qdrant (vector database), Neon (managed PostgreSQL), SentenceTransformers or similar lightweight embedding library.
**Storage**: Qdrant for storing vector embeddings of textbook content. Neon (PostgreSQL) for RAG metadata, potentially for managing textbook content or user-specific data (if personalization is implemented).
**Testing**: Jest and React Testing Library for Docusaurus components. Pytest for FastAPI backend APIs and RAG logic.
**Target Platform**: Web application deployed to GitHub Pages (for Docusaurus static site) and a serverless platform (e.g., Vercel, Render free tier) or containerized service for the FastAPI/RAG backend.
**Project Type**: Web application (frontend + backend).
**Performance Goals**: Fast build times for Docusaurus site. RAG chatbot response time under 2 seconds for typical queries. Efficient embedding generation for content updates.
**Constraints**: No heavy GPU usage for embeddings or RAG inference. Minimal embeddings to stay within free-tier limits and reduce storage/compute. Entire architecture must be free-tier friendly.
**Scale/Scope**: Initial deployment supporting 6 textbook chapters and individual/small group usage. Designed for ease of maintenance and content expansion.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicity**: The plan prioritizes straightforward technologies (Docusaurus, FastAPI) and a clear separation of concerns (frontend/backend). Adherence: ✅ Pass.
- **Accuracy**: The RAG chatbot is designed to only use book text, directly supporting the accuracy principle. Adherence: ✅ Pass.
- **Minimialism**: The choice of lightweight embeddings and free-tier architecture aligns with minimalism. Adherence: ✅ Pass.
- **Fast builds**: Docusaurus is known for fast static site generation. The backend aims for efficient deployment. Adherence: ✅ Pass.
- **Free-tier architecture**: All proposed technologies and deployment strategies target free-tier compatibility. Adherence: ✅ Pass.
- **RAG answers ONLY from book text**: This is a core functional requirement and a strict constraint on the RAG design. Adherence: ✅ Pass.

## Project Structure

### Documentation (this feature)

```text
specs/1-textbook-generation/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/           # Pydantic models for data, Qdrant payload schema
│   ├── services/         # RAG core logic, embedding generation, Qdrant interaction
│   ├── api/              # FastAPI endpoints for RAG queries
│   └── utils/            # Helper functions
└── tests/
    ├── unit/
    └── integration/

frontend/
├── src/
│   ├── components/       # React components for UI (chatbot widget, chapter view)
│   ├── pages/            # Docusaurus pages for chapters
│   ├── theme/            # Custom Docusaurus theme components
│   └── hooks/            # React hooks for RAG interaction
└── docs/                 # Markdown files for textbook chapters
└── docusaurus.config.js  # Docusaurus configuration
└── sidebars.js           # Docusaurus sidebar configuration

```

**Structure Decision**: A monorepo-like structure with `frontend/` for the Docusaurus application and `backend/` for the FastAPI RAG service. This separation clearly delineates concerns and supports independent development and deployment of the two primary components.

## Complexity Tracking

(No violations detected; complexity tracking not required at this stage.)