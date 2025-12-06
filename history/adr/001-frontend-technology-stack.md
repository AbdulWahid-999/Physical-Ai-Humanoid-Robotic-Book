# 001-frontend-technology-stack.md

**Title**: Frontend Technology Stack
**Status**: Proposed
**Date**: 2025-12-03

## Context
The project requires a modern, clean, and fast-building UI for an AI-native textbook.

## Decision
Docusaurus (React-based static site generator) for the frontend UI, with JavaScript/TypeScript as the primary language.

## Consequences
- Pros: Excellent documentation features, static site generation for fast loading, SEO friendly, active community, easy to integrate with React components.
- Cons: Learning curve for Docusaurus specifics, potentially less dynamic than a full SPA framework for complex interactive elements (though not a primary requirement here).

## Alternatives
- Next.js
- Gatsby
- Plain HTML/CSS/JS

## References
- specs/1-textbook-generation/plan.md
- specs/1-textbook-generation/spec.md