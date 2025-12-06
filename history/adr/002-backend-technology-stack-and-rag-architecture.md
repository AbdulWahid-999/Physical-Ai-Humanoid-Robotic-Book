# 002-backend-technology-stack-and-rag-architecture.md

**Title**: Backend Technology Stack and RAG Architecture
**Status**: Proposed
**Date**: 2025-12-03

## Context
The project requires a robust and free-tier friendly backend to power a Retrieval-Augmented Generation (RAG) chatbot that answers questions based on textbook content.

## Decision
Python 3.11+ with FastAPI for the backend API, Qdrant as the vector database for embeddings, Neon (PostgreSQL) for RAG metadata and general data storage, and a lightweight embedding library (e.g., SentenceTransformers).

## Consequences
- Pros: Python/FastAPI is efficient for AI/ML workloads and API development. Qdrant is performant for vector search and has a free-tier option. Neon provides a scalable PostgreSQL with free-tier. Lightweight embeddings keep costs down.
- Cons: Managing multiple services (FastAPI, Qdrant, Neon) introduces complexity. Potential latency with cloud services if not optimized.

## Alternatives
- Flask/Django for backend
- Pinecone/Weaviate for vector database
- Other managed SQL databases

## References
- specs/1-textbook-generation/plan.md
- specs/1-textbook-generation/spec.md