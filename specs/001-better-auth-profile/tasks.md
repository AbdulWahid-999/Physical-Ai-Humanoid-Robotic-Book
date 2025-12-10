---

description: "Task list for Bonus-Point Signup & Signin with Better-Auth & Profile Personalization feature implementation"
---

# Tasks: Bonus-Point Signup & Signin with Better-Auth & Profile Personalization

**Input**: Design documents from `/specs/001-better-auth-profile/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The spec does not explicitly request TDD or test generation tasks, but the plan includes testing setup and strategy. Basic setup tasks for testing frameworks will be included in the Foundational phase. Functional test tasks will be integrated into the respective user stories where applicable, but not detailed test cases themselves.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths below follow this convention.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize FastAPI project in `backend/`
- [x] T002 Configure Python virtual environment and basic dependencies in `backend/`
- [x] T003 [P] Initialize Docusaurus project in `frontend/`
- [x] T004 [P] Configure Node.js dependencies for Docusaurus in `frontend/`
- [x] T005 Create `backend/.env.example` with placeholders for Better-Auth and Neon Postgres credentials
- [x] T006 Create `frontend/.env.example` for any frontend environment variables (if needed)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Setup database connection and ORM (e.g., SQLAlchemy) configuration in `backend/src/database.py`
- [ ] T008 Implement basic database migration setup (e.g., Alembic) in `backend/migrations/`
- [ ] T009 Create base `UserProfile` model structure (Pydantic schema and SQLAlchemy model) in `backend/src/models/user_profile.py`
- [ ] T010 [P] Configure FastAPI application (`main.py`) with basic routing and dependency injection in `backend/src/main.py`
- [ ] T011 [P] Setup logging configuration for backend in `backend/src/logging_config.py`
- [ ] T012 [P] Configure `pytest` for backend unit and integration tests in `backend/tests/`
- [ ] T013 [P] Configure frontend testing framework (e.g., Jest/React Testing Library) in `frontend/`
- [ ] T014 [P] Implement CORS middleware in `backend/src/middleware/cors.py`
- [ ] T015 [P] Implement Better-Auth client configuration (client ID, secret, redirect URI) in `backend/src/config.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Secure Signup and Profile Creation (Priority: P1) 🎯 MVP

**Goal**: Enable users to sign up via Better-Auth and provide their personalization profile data, ensuring secure storage and consent.

**Independent Test**: A new user can successfully complete the signup process, provide all required profile fields, and have their data securely stored and linked to their Better-Auth account. This includes testing the scenario where a user declines personalization data.

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create FastAPI endpoint for Better-Auth callback (`/auth/callback`) to handle successful authentication and initial profile data submission in `backend/src/api/auth.py`
- [ ] T017 [P] [US1] Implement service logic for handling Better-Auth token exchange and user creation/lookup in `backend/src/services/auth_service.py`
- [ ] T018 [P] [US1] Implement service logic for creating and storing initial `UserProfile` data, including consent tracking, in `backend/src/services/user_profile_service.py`
- [ ] T019 [US1] Design and implement frontend Signup page/component with Better-Auth initiation and personalization data form in `frontend/src/pages/signup.tsx`
- [ ] T020 [US1] Implement frontend API calls to backend for profile submission post-Better-Auth callback in `frontend/src/services/api.ts`
- [ ] T021 [US1] Add basic validation and error handling for profile data submission on frontend in `frontend/src/components/SignupForm.tsx`
- [ ] T022 [US1] Implement redirection logic post-signup to a success or profile page in `frontend/src/services/auth.ts`
- [ ] T023 [US1] Update `UserProfile` model to include all specified attributes from `data-model.md` in `backend/src/models/user_profile.py`
- [ ] T024 [US1] Create database migration for `UserProfile` table creation in `backend/migrations/`

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Secure Signin and Profile Retrieval (Priority: P1)

**Goal**: Enable existing users to sign in via Better-Auth and have their personalization profile retrieved for tailored content.

**Independent Test**: An existing user can successfully sign in via Better-Auth, and their previously stored profile data is correctly associated and retrievable by the system.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Extend FastAPI endpoint for Better-Auth callback (`/auth/callback`) to handle existing user signin and profile retrieval in `backend/src/api/auth.py`
- [ ] T026 [P] [US2] Implement logic for retrieving `UserProfile` data linked to Better-Auth user ID in `backend/src/services/user_profile_service.py`
- [ ] T027 [US2] Design and implement frontend Signin page/component with Better-Auth initiation in `frontend/src/pages/signin.tsx`
- [ ] T028 [US2] Implement frontend logic to display retrieved profile data (for personalization) post-signin in `frontend/src/components/ProfileDisplay.tsx`
- [ ] T029 [US2] Implement mechanism to allow limited access/cached sign-in for existing sessions during Better-Auth outage (FR-017) in `backend/src/services/auth_service.py`

**Checkpoint**: User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Profile Management (Edit/Delete) (Priority: P2)

**Goal**: Allow users to view, edit, and delete their collected software and hardware background profile.

**Independent Test**: A signed-in user can access their profile, modify specific fields, save changes, and initiate deletion of their entire profile, with verification of changes/deletion.

### Implementation for User Story 3

- [ ] T030 [P] [US3] Create FastAPI endpoint for retrieving user's own profile (`GET /profile`) in `backend/src/api/user_profile.py`
- [ ] T031 [P] [US3] Create FastAPI endpoint for updating user's own profile (`PUT /profile`) in `backend/src/api/user_profile.py`
- [ ] T032 [P] [US3] Create FastAPI endpoint for revoking consent/deleting profile (`DELETE /profile/consent`) in `backend/src/api/user_profile.py`
- [ ] T033 [US3] Implement service logic for updating `UserProfile` data in `backend/src/services/user_profile_service.py`
- [ ] T034 [US3] Implement service logic for soft-deleting `UserProfile` data and marking for hard-deletion upon consent revocation (FR-013) in `backend/src/services/user_profile_service.py`
- [ ] T035 [US3] Design and implement frontend Profile View/Edit page/component in `frontend/src/pages/profile.tsx`
- [ ] T036 [US3] Implement frontend API calls for profile retrieval, update, and deletion in `frontend/src/services/api.ts`
- [ ] T037 [US3] Add frontend UI for consent revocation/profile deletion confirmation in `frontend/src/components/ProfileSettings.tsx`
- [ ] T038 [US3] Implement clear, actionable in-app messages for errors (FR-015) in `frontend/src/components/ErrorDisplay.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T039 Implement comprehensive unit tests for all backend services and models in `backend/tests/unit/`
- [ ] T040 Implement integration tests for backend API endpoints in `backend/tests/integration/`
- [ ] T041 Implement E2E tests for full signup/signin/profile management flows (using Playwright/Cypress) in `frontend/tests/e2e/`
- [ ] T042 [P] Review and refine all error handling and user messaging (FR-015) in `backend/src/api/`, `frontend/src/`
- [ ] T043 [P] Implement performance monitoring and metrics for critical operations to verify FR-016 targets in `backend/src/monitoring.py`
- [ ] T044 Create a `README.md` in the repository root describing how to run, test, and verify the Signup/Signin flow and profile data storage, as per Key Standards.
- [ ] T045 Create a `requirements.txt` file for the backend dependencies in `backend/requirements.txt`
- [ ] T046 Final code review and cleanup for both frontend and backend.
- [ ] T047 Run quickstart.md validation to ensure instructions are accurate and reproducible.

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

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Requires some User Story 1 components (user creation, profile storage) but is independently testable once these are stable.
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Requires User Story 1 and 2 components for authentication and profile existence.

### Within Each User Story

- Core implementation before integration.
- Story complete before moving to next priority.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational tasks marked [P] can run in parallel (within Phase 2).
- Once Foundational phase completes, User Story 1 can start.
- User Story 2 can start once User Story 1's foundational elements are stable.
- User Story 3 can start once User Story 1 and 2's foundational elements are stable.
- Within User Story 1: T016, T017, T018 can start in parallel.
- Within User Story 2: T025, T026, T027, T028, T029 are largely sequential or dependent on each other, but sub-components could be parallelized.
- Within User Story 3: T030, T031, T032 can start in parallel.
- All tasks in Phase 6 marked [P] can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Backend services and API endpoint for signup can be developed in parallel:
- [ ] T016 [P] [US1] Create FastAPI endpoint for Better-Auth callback (`/auth/callback`) to handle successful authentication and initial profile data submission in `backend/src/api/auth.py`
- [ ] T017 [P] [US1] Implement service logic for handling Better-Auth token exchange and user creation/lookup in `backend/src/services/auth_service.py`
- [ ] T018 [P] [US1] Implement service logic for creating and storing initial `UserProfile` data, including consent tracking, in `backend/src/services/user_profile_service.py`

# Frontend components for signup and profile data form can be developed in parallel:
- [ ] T019 [US1] Design and implement frontend Signup page/component with Better-Auth initiation and personalization data form in `frontend/src/pages/signup.tsx`
- [ ] T020 [US1] Implement frontend API calls to backend for profile submission post-Better-Auth callback in `frontend/src/services/api.ts`
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
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
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
