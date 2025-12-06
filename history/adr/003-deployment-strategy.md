# 003-deployment-strategy.md

**Title**: Deployment Strategy
**Status**: Proposed
**Date**: 2025-12-03

## Context
The project aims for a free-tier friendly deployment model for both the static Docusaurus frontend and the dynamic FastAPI/RAG backend.

## Decision
GitHub Pages for hosting the Docusaurus static site. A serverless platform (e.g., Vercel, Render free tier) or a containerized service (e.g., Docker on a free-tier cloud VM) for the FastAPI/RAG backend.

## Consequences
- Pros: Cost-effective for personal projects and prototypes. Simplifies CI/CD with GitHub integrations. Scales dynamically with serverless options.
- Cons: Free-tier limits may be restrictive for high traffic. Potential for vendor lock-in with specific serverless providers.

## Alternatives
- Netlify/Cloudflare Pages for frontend
- AWS Lambda/Google Cloud Functions for serverless backend

## References
- specs/1-textbook-generation/plan.md
- specs/1-textbook-generation/spec.md