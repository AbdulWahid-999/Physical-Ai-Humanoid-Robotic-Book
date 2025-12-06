# Tasks: Textbook Generation

**Input**: Design documents from `/specs/1-textbook-generation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification does not explicitly request tests. Therefore, tests are included as 'Polish & Cross-Cutting Concerns' for basic functionality.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create base project directories: `frontend/`, `backend/`, `frontend/src/`, `backend/src/`, `frontend/docs/`
- [ ] T002 Initialize Docusaurus project in `frontend/`
- [ ] T003 Configure Docusaurus `docusaurus.config.js` and `sidebars.js` for auto-generated sidebar and initial chapters
- [ ] T004 Initialize Python project in `backend/` with FastAPI dependencies

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Implement initial FastAPI application in `backend/src/main.py`
- [ ] T006 Setup Qdrant client connection and collection initialization in `backend/src/services/qdrant_service.py`
- [ ] T007 Setup Neon (PostgreSQL) client connection in `backend/src/services/neon_service.py`
- [ ] T008 Configure lightweight embedding model loading in `backend/src/services/embedding_service.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Access Textbook and Query RAG Chatbot (Priority: P1) 🎯 MVP

**Goal**: Users can navigate the Docusaurus textbook, read chapters, and use the integrated RAG chatbot to ask questions specifically based on the book's content.

**Independent Test**: The Docusaurus site can be deployed and interacted with, and the RAG chatbot can be queried to verify answers are derived exclusively from the book's text.

### Implementation for User Story 1

- [ ] T009 [US1] Create initial Docusaurus content for "Introduction to Physical AI" in `frontend/docs/introduction-to-physical-ai.md`
- [ ] T010 [P] [US1] Create Docusaurus content for "Basics of Humanoid Robotics" in `frontend/docs/basics-of-humanoid-robotics.md`
- [ ] T011 [P] [US1] Create Docusaurus content for "ROS 2 Fundamentals" in `frontend/docs/ros-2-fundamentals.md`
- [ ] T012 [P] [US1] Create Docusaurus content for "Digital Twin Simulation (Gazebo + Isaac)" in `frontend/docs/digital-twin-simulation.md`
- [ ] T013 [P] [US1] Create Docusaurus content for "Vision-Language-Action Systems" in `frontend/docs/vision-language-action-systems.md`
- [ ] T014 [P] [US1] Create Docusaurus content for "Capstone: Simple AI-Robot Pipeline" in `frontend/docs/capstone-ai-robot-pipeline.md`
- [ ] T015 [US1] Implement content ingestion and embedding generation logic in `backend/src/services/rag_ingestion.py`
- [ ] T016 [US1] Create FastAPI endpoint for RAG queries in `backend/src/api/rag.py`
- [ ] T017 [P] [US1] Develop React component for RAG chatbot UI in `frontend/src/components/RAGChatbot.js`
- [ ] T018 [US1] Integrate RAG chatbot component into Docusaurus theme or pages in `frontend/src/theme/Layout/index.js` (or similar)
- [ ] T019 [US1] Implement "select-text → Ask AI" functionality in `frontend/src/hooks/useTextSelection.js` and integrate with RAG chatbot

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T020 Update Docusaurus navigation and styling for clean UI in `frontend/docusaurus.config.js` and `frontend/src/css/custom.css`
- [ ] T021 Configure deployment for Docusaurus to GitHub Pages via `frontend/.github/workflows/deploy.yml`
- [ ] T022 Configure deployment for FastAPI backend to a free-tier serverless platform
- [ ] T023 Implement basic logging and error handling for backend services
- [ ] T024 Add unit tests for core RAG logic in `backend/tests/unit/`
- [ ] T025 Add integration tests for RAG chatbot interaction in `frontend/tests/integration/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all content creation tasks for User Story 1 together:
Task: "Create Docusaurus content for \"Introduction to Physical AI\" in frontend/docs/introduction-to-physical-ai.md"
Task: "Create Docusaurus content for \"Basics of Humanoid Robotics\" in frontend/docs/basics-of-humanoid-robotics.md"
Task: "Create Docusaurus content for \"ROS 2 Fundamentals\" in frontend/docs/ros-2-fundamentals.md"
Task: "Create Docusaurus content for \"Digital Twin Simulation (Gazebo + Isaac)\" in frontend/docs/digital-twin-simulation.md"
Task: "Create Docusaurus content for \"Vision-Language-Action Systems\" in frontend/docs/vision-language-action-systems.md"
Task: "Create Docusaurus content for \"Capstone: Simple AI-Robot Pipeline\" in frontend/docs/capstone-ai-robot-pipeline.md"

# Launch parallel UI component development:
Task: "Develop React component for RAG chatbot UI in frontend/src/components/RAGChatbot.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence