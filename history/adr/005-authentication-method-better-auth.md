# 005-authentication-method-better-auth.md

**Title**: Authentication Method (Better-Auth)
**Status**: Accepted
**Date**: 2025-12-09

## Context
The project requires a secure and efficient authentication mechanism for user signup and signin, specifically to support the bonus-point requirement. Custom credential storage is to be avoided.

## Decision
Better-Auth will be used as the exclusive authentication method for all user signup and signin flows.

## Consequences
- Pros: Leverages an existing, mature, and secure authentication service. Reduces development effort and security risks associated with implementing custom authentication and credential storage. Streamlines compliance with common authentication best practices.
- Cons: Introduces an external dependency, meaning the project is reliant on Better-Auth's uptime, performance, and API stability. Potential for vendor lock-in. Integration might require adapting to Better-Auth's specific flow and data structures.

## Alternatives
- Implement a custom email/password authentication system.
- Utilize other third-party OAuth/OIDC providers (e.g., Google, GitHub, Auth0).

## References
- specs/001-better-auth-profile/plan.md
- specs/001-better-auth-profile/research.md
- specs/001-better-auth-profile/spec.md
