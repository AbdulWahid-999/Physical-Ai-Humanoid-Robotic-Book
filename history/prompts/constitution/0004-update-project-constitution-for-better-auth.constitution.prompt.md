---
id: 0004
title: Update project constitution for Better-Auth
stage: constitution
date: 2025-12-09
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: Muhammad Abdul Wahid
command: /sp.constitution
labels: ["constitution", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  -
---

## Prompt

/sp.constitution /sp.constitution

Project: Bonus-point Signup & Signin implementation using Better-Auth

Core principles:
- Security & Privacy: authentication and collected profile data must be protected by default (encrypted at rest & in transit) and collected only with explicit consent.
- Minimality: collect only the software/hardware details required for personalization; avoid sensitive PII.
- Transparency & Control: users must be informed why data is collected, may edit or delete their profile, and must opt-in to personalization.
- Verifiable Implementation: the signup/signin flow and data collection must be demonstrably working so bonus points can be awarded.

Key standards:
- Use https://www.better-auth.com/ for Signup and Signin (no custom password storage).
- During Signup prompt the user (required for personalization) with the following fields:
  1. Primary programming languages (select / free text)
  2. Years of programming experience (numeric / ranges)
  3. Primary OS (Windows/macOS/Linux)
  4. Primary development environment / IDE
  5. Cloud / deployment experience (none / beginner / intermediate / advanced)
  6. Hardware profile: CPU family, RAM size (GB), GPU present (yes/no + model)
  7. Preferred learning format (reading / video / hands-on / mixed)
  8. Any accessibility needs (optional)
- Do NOT request sensitive personal data (SSN, national ID, exact address, financial info).
- Store collected answers securely (encrypted) and associate them with the user account provided by Better-Auth.
- Provide an endpoint or script that demonstrates reading a user’s profile (for personalization) and a mechanism to edit/delete profile data.
- Include a short README in the repo describing how to run and test the Signup/Signin flow and where profile data is stored.

Constraints:
- Must integrate with Better-Auth for authentication flows; do not implement custom credential storage.
- Personalization data must be optional to share; if a user declines, the system must continue to function with default personalization.
- Retain profile data only as long as necessary; allow user-initiated deletion.
- Implementation must avoid collecting any sensitive PII.
- Bonus points (up to 50) are awarded only after verification: Signup & Signin work via Better-Auth, profile questions are asked and stored securely, and profile read/edit/delete are demonstrable.

Success criteria:
- Signup flow uses Better-Auth and collects the listed profile fields at signup (or immediately after signup) with user consent.
- Signin works via Better-Auth and maps to the stored profile.
- Collected profile data is retrievable by a documented, secure endpoint and can be edited/deleted by the user.
- Repo contains a README and a verification script or steps showing the signup, signin, and profile management (sufficient evidence to award up to 50 bonus points).
- No sensitive PII collected; privacy & consent flows documented.

## Response snapshot

Updated project constitution to version 0.1.0 with new principles, standards, and constraints related to Better-Auth signup/signin implementation. Identified files requiring manual follow-up.

## Outcome

- ✅ Impact: Project constitution updated with new principles, standards, and constraints.
- 🧪 Tests: No automated tests for constitution updates.
- 📁 Files: One file modified: .specify/memory/constitution.md. One file created: history/prompts/constitution/0004-update-project-constitution-for-better-auth.constitution.prompt.md
- 🔁 Next prompts: User needs to manually update related template files and README.
- 🧠 Reflection: The bash script for PHR creation failed on Windows, requiring manual PHR creation.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script not executable on Windows.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve PHR creation logic to be platform-agnostic or provide better error handling/guidance for script execution.
