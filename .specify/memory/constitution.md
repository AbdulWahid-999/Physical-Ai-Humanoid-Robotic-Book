<!--
Sync Impact Report:
- Version change: 0.0.1 → 0.1.0
- List of modified principles:
  - Old: Principle 1 Name → New: Security & Privacy
  - Old: Principle 2 Name → New: Minimality
  - Old: Principle 3 Name → New: Transparency & Control
  - Added: Verifiable Implementation
- Added sections: All "Key Standards" and "Constraints" are new additions.
- Removed sections: None explicitly removed, but placeholders for previous generic principles/standards/constraints are replaced.
- Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending
  - .specify/templates/spec-template.md: ⚠ pending
  - .specify/templates/tasks-template.md: ⚠ pending
  - .specify/templates/commands/*.md: ⚠ pending
  - README.md: ⚠ pending
- Follow-up TODOs: None
-->
# Project Constitution: Bonus-point Signup & Signin implementation using Better-Auth

## Document Governance
- **Constitution Version:** 0.1.0
- **Ratification Date:** 2023-10-26
- **Last Amended Date:** 2025-12-09
- **Owner:** Project Team
- **Amendment Procedure:** Amendments require team consensus and must follow the versioning policy.
- **Versioning Policy:** Follow semantic versioning (MAJOR.MINOR.PATCH). MAJOR for backward-incompatible changes, MINOR for new principles/sections, PATCH for clarifications/typos.
- **Compliance Review:** Regular reviews will be conducted to ensure adherence to established principles and standards.

## Project Overview
- **Project Name:** Bonus-point Signup & Signin implementation using Better-Auth
- **Project Scope:** Implementation of a bonus-point Signup & Signin system integrating with Better-Auth for authentication, collecting user personalization data, and providing secure profile management capabilities.

## Core Principles

### 1. Security & Privacy
Authentication and collected profile data must be protected by default (encrypted at rest & in transit) and collected only with explicit consent.

### 2. Minimality
Collect only the software/hardware details required for personalization; avoid sensitive PII.

### 3. Transparency & Control
Users must be informed why data is collected, may edit or delete their profile, and must opt-in to personalization.

### 4. Verifiable Implementation
The signup/signin flow and data collection must be demonstrably working so bonus points can be awarded.

## Key Standards

### 1. Better-Auth Integration
Use https://www.better-auth.com/ for Signup and Signin (no custom password storage).

### 2. Signup Data Collection
During Signup prompt the user (required for personalization) with the following fields:
1. Primary programming languages (select / free text)
2. Years of programming experience (numeric / ranges)
3. Primary OS (Windows/macOS/Linux)
4. Primary development environment / IDE
5. Cloud / deployment experience (none / beginner / intermediate / advanced)
6. Hardware profile: CPU family, RAM size (GB), GPU present (yes/no + model)
7. Preferred learning format (reading / video / hands-on / mixed)
8. Any accessibility needs (optional)

### 3. Data Sensitivity Exclusion
Do NOT request sensitive personal data (SSN, national ID, exact address, financial info).

### 4. Secure Data Storage
Store collected answers securely (encrypted) and associate them with the user account provided by Better-Auth.

### 5. Profile Management Endpoints
Provide an endpoint or script that demonstrates reading a user’s profile (for personalization) and a mechanism to edit/delete profile data.

### 6. Documentation
Include a short README in the repo describing how to run and test the Signup/Signin flow and where profile data is stored.

## Constraints

### 1. Better-Auth Dependency
Must integrate with Better-Auth for authentication flows; do not implement custom credential storage.

### 2. Optional Personalization Data
Personalization data must be optional to share; if a user declines, the system must continue to function with default personalization.

### 3. Data Retention and Deletion
Retain profile data only as long as necessary; allow user-initiated deletion.

### 4. PII Avoidance
Implementation must avoid collecting any sensitive PII.

### 5. Bonus Point Verification
Bonus points (up to 50) are awarded only after verification: Signup & Signin work via Better-Auth, profile questions are asked and stored securely, and profile read/edit/delete are demonstrable.