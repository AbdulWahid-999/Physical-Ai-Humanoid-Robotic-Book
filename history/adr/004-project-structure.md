# 004-project-structure.md

**Title**: Project Structure
**Status**: Proposed
**Date**: 2025-12-03

## Context
To manage the frontend (Docusaurus) and backend (FastAPI/RAG) components effectively, a clear and maintainable project structure is needed.

## Decision
A monorepo-like structure with a top-level `frontend/` directory for the Docusaurus application and a `backend/` directory for the FastAPI/RAG service.

## Consequences
- Pros: Clear separation of concerns, easier to manage related but distinct components, simplifies shared configurations/scripts if needed, better for independent deployment.
- Cons: Can introduce slightly more build complexity if not managed well (though Docusaurus and FastAPI are relatively independent).

## Alternatives
- Completely separate repositories for frontend and backend.

## References
- specs/1-textbook-generation/plan.md
- specs/1-textbook-generation/spec.md