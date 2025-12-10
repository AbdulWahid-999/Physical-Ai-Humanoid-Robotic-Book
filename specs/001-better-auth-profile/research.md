# Research Findings: Bonus-Point Signup & Signin with Better-Auth & Profile Personalization

**Feature Branch**: `001-better-auth-profile`
**Created**: 2025-12-09
**Associated Plan**: [link to plan.md](plan.md)

## Decisions Documented

### Auth Method: Better-Auth

-   **Decision**: Utilize Better-Auth as the exclusive authentication method for both signup and signin.
-   **Rationale**: This is a core requirement stipulated by the project. It leverages an existing, mature authentication service, thereby reducing development effort, security risks associated with custom credential storage, and maintenance overhead for authentication.
-   **Alternatives Considered**: Custom authentication system (rejected due to project constraint and security/development overhead), other third-party OAuth providers (rejected as Better-Auth is a hard requirement).

### Storage: Neon Postgres

-   **Decision**: Employ Neon Postgres for the persistent storage of user profile data.
-   **Rationale**: Neon Postgres offers a scalable, robust, and managed relational database solution. Its serverless architecture and branching capabilities align well with modern cloud deployments, providing both flexibility and performance for the anticipated user profile volume (up to 100,000 within the first year, FR-014).
-   **Alternatives Considered**: Other SQL databases (e.g., MySQL, SQLite - less scalable or managed), NoSQL databases (e.g., MongoDB, DynamoDB - rejected for simplicity of relational data for user profiles and potentially higher learning curve for the team).

### Frontend Deployment: Docusaurus on GitHub Pages

-   **Decision**: Deploy the Docusaurus-based frontend on GitHub Pages.
-   **Rationale**: GitHub Pages provides a straightforward, cost-effective, and well-integrated static site hosting solution for Docusaurus. This aligns with the "minimal, testable implementation" constraint and simplifies the deployment pipeline for the frontend.
-   **Alternatives Considered**: Netlify, Vercel, AWS Amplify (all viable but GitHub Pages is a simpler, free option for static content).

### Backend Deployment: FastAPI on Vercel

-   **Decision**: Deploy the FastAPI backend on Vercel.
-   **Rationale**: Vercel offers a serverless deployment platform that is highly compatible with Python/FastAPI applications. It provides automatic scaling, global distribution, and a streamlined developer experience, which aligns with the goal of a robust yet simple deployment for the API.
-   **Alternatives Considered**: AWS Lambda/API Gateway, Google Cloud Functions, Azure Functions (all viable serverless options but Vercel offers a more integrated and developer-friendly experience for many teams).

### RAG Database & LLM Provider (Future Considerations)

-   **Decision**: For potential future RAG (Retrieval Augmented Generation) capabilities, Qdrant is considered for vector storage and OpenAI Agents as the LLM provider.
-   **Rationale**: Qdrant offers high-performance vector search, which is crucial for RAG systems, and OpenAI Agents provide a powerful and versatile LLM. These selections are noted for their performance, flexibility, integration capabilities, and cost considerations, should RAG be integrated into the broader project scope.
-   **Alternatives Considered**: Other vector databases (e.g., Pinecone, Weaviate), other LLM providers (e.g., Anthropic, Google Gemini).

## Technical Details and Approach

-   **Writing Methodology**: The project will adopt a `research-concurrent` writing approach, emphasizing continuous research and documentation alongside development.
-   **Documentation Format**: All research and documentation will adhere to APA format for citations and referencing, ensuring academic rigor and consistency.
-   **Work Phases**: The implementation will proceed in distinct phases: Research, Foundation, Analysis, and Synthesis, allowing for structured development and iterative refinement.

## Quality Validation Approach

-   **Accuracy**: Ensuring all collected data is accurate and reflects user input.
-   **Clarity**: Maintaining clear and unambiguous documentation and code.
-   **Reproducibility**: Ensuring tests and deployments are reproducible across environments.
-   **Plagiarism-Free**: All content and code development will adhere to originality and proper attribution standards.
