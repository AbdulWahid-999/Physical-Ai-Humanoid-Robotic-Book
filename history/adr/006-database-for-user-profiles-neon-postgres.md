# 006-database-for-user-profiles-neon-postgres.md

**Title**: Database for User Profiles (Neon Postgres)
**Status**: Accepted
**Date**: 2025-12-09

## Context
The project requires a persistent and scalable database solution for storing user personalization profiles collected during signup, linked to their Better-Auth user IDs. The data includes various structured attributes about programming background, hardware, and preferences.

## Decision
Neon Postgres will be used as the primary database for storing user personalization profiles.

## Consequences
- Pros: Leverages the reliability, ACID compliance, and rich feature set of PostgreSQL. Neon offers a serverless, managed Postgres with autoscaling and read-replica support, which aligns with anticipated scalability requirements (up to 100,000 user profiles). Its branching features can aid in development and testing.
- Cons: Introduces a managed cloud dependency. Potential for cold starts on very infrequent access if aggressively scaled down. Might be overkill for very small initial datasets but provides headroom for growth. Costs associated with a managed service.

## Alternatives
- Self-hosted PostgreSQL: More control but higher operational overhead.
- Other managed SQL databases (e.g., AWS RDS, Google Cloud SQL): Similar benefits but Neon's serverless/branching features are a differentiator.
- NoSQL databases (e.g., MongoDB, DynamoDB): Could offer schema flexibility but user profile data is relatively structured, making relational a good fit.

## References
- specs/001-better-auth-profile/plan.md
- specs/001-better-auth-profile/research.md
- specs/001-better-auth-profile/data-model.md
- specs/001-better-auth-profile/spec.md
