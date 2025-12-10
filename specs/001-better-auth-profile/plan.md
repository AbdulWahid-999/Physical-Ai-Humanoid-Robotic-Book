# Implementation Plan: Bonus-Point Signup & Signin with Better-Auth & Profile Personalization

**Branch**: `001-better-auth-profile` | **Date**: 2025-12-09 | **Spec**: specs/001-better-auth-profile/spec.md
**Input**: Feature specification from `/specs/001-better-auth-profile/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation of a Bonus-Point Signup & Signin system, integrating with Better-Auth for user authentication and collecting personalized software/hardware profile data. The system will ensure secure storage, user consent, and enable profile management (view, edit, delete). The technical approach involves a Docusaurus frontend deployed on GitHub Pages, a FastAPI backend, Neon Postgres for data storage, and integration with Better-Auth. Key architectural decisions and a phased research and testing strategy are detailed.

## Technical Context

**Language/Version**: Python 3.11+ (for FastAPI backend), JavaScript/TypeScript (for Docusaurus frontend)
**Primary Dependencies**: FastAPI, Docusaurus, Better-Auth client libraries, Neon Postgres client, Qdrant client, OpenAI Agents client
**Storage**: Neon Postgres (for user profile data), Qdrant (for RAG-related vector storage if applicable, though not directly in this feature's scope)
**Testing**: pytest (for backend), Playwright/Cypress (for frontend E2E), Jest/React Testing Library (for frontend unit/component)
**Target Platform**: Web (Docusaurus on GitHub Pages, FastAPI on Vercel or similar serverless platform)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Max response time < 1.5 seconds (p90) for critical user operations (signup, signin, profile save).
**Constraints**: Must use Better-Auth for authentication, collect non-sensitive technical PII only, all background questions opt-in, data securely encrypted, minimal testable implementation, complete within 1 week.
**Scale/Scope**: Support up to 100,000 user profiles within the first year.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Alignment:
- **Security & Privacy**: ✅ Aligned. Plan includes Better-Auth for authentication, secure storage (encrypted at rest & in transit), explicit consent (FR-004), and soft/hard deletion on consent revocation (FR-013). PII avoidance (FR-011) is a core constraint.
- **Minimality**: ✅ Aligned. Plan focuses solely on collecting technical profile data required for personalization, explicitly avoiding sensitive PII.
- **Transparency & Control**: ✅ Aligned. Plan mandates informing users why data is collected, requiring opt-in (FR-004), and providing mechanisms to view, edit, and delete profile data (FR-008, FR-009).
- **Verifiable Implementation**: ✅ Aligned. Testing strategy includes functional tests for signup, onboarding, consent, and personalization behavior. SC-006 emphasizes demonstrability.

### Key Standards Alignment:
- **Better-Auth Integration**: ✅ Aligned. Core of the plan, with Better-Auth used for all signup/signin.
- **Signup Data Collection**: ✅ Aligned. Plan details collecting the specified fields during signup (FR-002, FR-003).
- **Data Sensitivity Exclusion**: ✅ Aligned. FR-011 explicitly prohibits sensitive PII collection.
- **Secure Data Storage**: ✅ Aligned. FR-005 mandates encrypted storage.
- **Profile Management Endpoints**: ✅ Aligned. FR-008, FR-009 address viewing, editing, and deleting profiles.
- **Documentation**: ⚠ Pending. A README will be included as part of the overall implementation deliverables. (Will be addressed in tasks phase)

### Constraints Alignment:
- **Better-Auth Dependency**: ✅ Aligned. Integration is mandatory; no custom credential handling.
- **Optional Personalization Data**: ✅ Aligned. FR-010 ensures system functions with default personalization if user declines.
- **Data Retention and Deletion**: ✅ Aligned. FR-012 (retain as necessary, user-initiated deletion) and FR-013 (soft/hard deletion on consent revoke).
- **PII Avoidance**: ✅ Aligned. FR-011 strictly prohibits sensitive PII.
- **Bonus Point Verification**: ✅ Aligned. Success criteria and testing strategy are geared towards verifiable functionality for bonus points.

## Project Structure

### Documentation (this feature)

```text
specs/001-better-auth-profile/
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
│   ├── models/           # For Pydantic models/schemas (User Profile, Better-Auth integration)
│   ├── services/         # Business logic, Better-Auth API calls, profile management
│   └── api/              # FastAPI endpoints (signup, signin callback, profile CRUD)
└── tests/                # Unit, integration, and contract tests for backend

frontend/
├── src/
│   ├── components/       # React components (Signup form, Profile viewer/editor)
│   ├── pages/            # Docusaurus pages (e.g., /signup, /profile)
│   └── services/         # Frontend API calls to backend, Better-Auth UI integration
└── tests/                # Component, E2E tests for frontend
```

**Structure Decision**: The "Option 2: Web application" structure is chosen due to the clear separation of a Docusaurus frontend and a FastAPI backend, aligning with the architectural sketch. This structure facilitates independent development and deployment of frontend and backend components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
|           |            |                                     |

## Architecture Sketch

-   **Frontend**: Docusaurus (React/TypeScript) deployed on GitHub Pages.
-   **Backend**: FastAPI (Python) deployed on Vercel (or similar serverless platform).
-   **Database**: Neon Postgres for persistent storage of user profile data.
-   **Authentication**: Better-Auth for all signup and signin flows.
-   **Optional RAG/LLM Integration**: OpenAI Agents, Qdrant (Not directly in scope for this feature but noted for future extension or if existing RAG component is part of the broader project).

## Research Approach

-   **Methodology**: `research-concurrent` writing approach.
-   **Citation**: Apply APA format for all references and external information.
-   **Quality Validation**: Ensure accuracy, clarity, reproducibility, and plagiarism-free content.

## Decisions Needing Documentation (ADR candidates)

-   **RAG database**: Qdrant (performance vs flexibility). (Note: This is an existing decision or one for future extension, not primary to this feature's current scope)
-   **LLM provider**: OpenAI Agents (integration vs cost). (Note: Same as above for RAG database)
-   **Auth method**: Better-Auth (required vs maturity). (This is a core decision for *this* feature, driven by requirements)
-   **Storage**: Neon Postgres (scalability vs complexity).
-   **Deployment**: Docusaurus on GitHub Pages, API on Vercel.

## Testing Strategy

-   **Functional**:
    -   Signup flow: User registration via Better-Auth, successful collection of onboarding questions, proper consent tracking.
    -   Profile Management: Correct personalization behavior based on stored data.
-   **RAG (if applicable)**: Ensure answers only from book content + user-selected text. (Note: Not primary to this feature's current scope)
-   **Performance**:
    -   Profile load testing: Verify system behavior under anticipated load (FR-014: 100,000 user profiles).
    -   Latency: Confirm critical operations (signup, signin, profile save) meet FR-016 targets (<1.5s p90).
-   **Content Quality (if applicable)**: APA checks, readability checks, plagiarism-free.
-   **Safety**:
    -   Consent Revocation: Verify `consent revoke` action leads to `disable personalization` and soft/hard deletion (FR-013).
    -   PII Avoidance: Ensure no sensitive PII is collected (FR-011).
    -   Better-Auth Outage: Test fallback strategy (FR-017).

## Phased Work Breakdown

-   **Phase 0: Research**: Resolve any remaining unknowns, best practices for chosen technologies.
-   **Phase 1: Foundation**: Implement core Better-Auth integration, basic profile storage/retrieval, frontend signup/signin forms.
-   **Phase 2: Analysis**: Implement profile management features (view, edit, delete), consent mechanisms.
-   **Phase 3: Synthesis**: Integrate personalization logic (using profile data), comprehensive testing, deployment.