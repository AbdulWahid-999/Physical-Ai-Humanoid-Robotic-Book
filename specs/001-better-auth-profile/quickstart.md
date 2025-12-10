# Quickstart Guide: Bonus-Point Signup & Signin with Better-Auth & Profile Personalization

**Feature Branch**: `001-better-auth-profile`
**Created**: 2025-12-09
**Associated Plan**: [link to plan.md](plan.md)
**Associated Spec**: [link to spec.md](spec.md)

This guide provides instructions to quickly set up, run, and test the Bonus-Point Signup & Signin feature with Better-Auth integration and user profile personalization.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Git
-   Python 3.11+
-   `pip` (Python package installer)
-   `node` (LTS version)
-   `npm` or `yarn` (Node.js package manager)
-   A Better-Auth account and application configured with appropriate redirect URIs for your local development. You will need your Better-Auth Client ID and Client Secret.
-   Access to a Neon Postgres instance (or a local PostgreSQL server with a database configured). You will need the database connection string.

## 1. Clone the Repository

```bash
git clone <repository_url>
cd <repository_name>
# If not already on the feature branch:
git checkout 001-better-auth-profile
```

## 2. Backend Setup (FastAPI)

1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    python -m venv .venv
    # On Windows
    .venv\Scripts\activate
    # On macOS/Linux
    source .venv/bin/activate
    ```
3.  Install backend dependencies:
    ```bash
    pip install -r requirements.txt # (assuming requirements.txt will be generated)
    ```
    *   **Note**: You will need to create a `requirements.txt` file with `fastapi`, `uvicorn`, `psycopg2-binary` (or `asyncpg`), `python-dotenv`, etc.
4.  Create a `.env` file in the `backend/` directory with your Better-Auth and Neon Postgres credentials:
    ```
    BETTER_AUTH_CLIENT_ID="your_better_auth_client_id"
    BETTER_AUTH_CLIENT_SECRET="your_better_auth_client_secret"
    BETTER_AUTH_REDIRECT_URI="http://localhost:8000/auth/callback" # Must match Better-Auth config
    DATABASE_URL="postgresql://user:password@host:port/database_name"
    SECRET_KEY="a_very_secret_key_for_jwt_and_encryption" # Generate a strong, random key
    ```
5.  Run database migrations (assuming a migration tool like Alembic will be set up):
    ```bash
    # Example: alembic upgrade head
    ```
6.  Start the FastAPI backend server:
    ```bash
    uvicorn main:app --reload
    ```
    The backend API will be running at `http://localhost:8000`.

## 3. Frontend Setup (Docusaurus)

1.  Navigate to the `frontend/` directory (from the project root):
    ```bash
    cd ../frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install # or yarn install
    ```
3.  Start the Docusaurus development server:
    ```bash
    npm start # or yarn start
    ```
    The frontend application will be running at `http://localhost:3000`.

## 4. Testing the Feature

### Signup Flow

1.  Open your browser to `http://localhost:3000`.
2.  Navigate to the signup page (e.g., `/signup` or click a "Sign Up" button).
3.  Initiate the signup process, which should redirect you to Better-Auth.
4.  Complete authentication with Better-Auth.
5.  Upon successful authentication, you should be redirected back to your application, prompted to provide the personalization profile data.
6.  Fill in the required profile fields and submit.
7.  Verify that your account is created and profile data is stored.

### Signin Flow

1.  Open your browser to `http://localhost:3000`.
2.  Navigate to the signin page (e.g., `/signin` or click a "Sign In" button).
3.  Initiate the signin process, which should redirect you to Better-Auth.
4.  Complete authentication with Better-Auth using your existing account.
5.  Upon successful authentication, you should be redirected back, and your profile data should be retrieved and associated with your session.

### Profile Management (View, Edit, Delete)

1.  While signed in, navigate to your profile page (e.g., `/profile`).
2.  **View**: Verify that your stored personalization data is displayed correctly.
3.  **Edit**: Modify some profile fields and save. Verify the changes are reflected upon refresh.
4.  **Delete/Revoke Consent**: Find the option to delete your profile data or revoke consent. Confirm the action. Verify that your profile data is no longer accessible for personalization (soft-deleted).

## Troubleshooting

-   **Backend not starting**: Check `.env` variables and ensure all dependencies are installed.
-   **Frontend not loading**: Check `npm install` output for errors.
-   **Better-Auth redirect issues**: Ensure your `BETTER_AUTH_REDIRECT_URI` in `.env` matches your Better-Auth application configuration exactly.
-   **Database connection errors**: Verify `DATABASE_URL` in `.env` is correct and your Neon Postgres instance is accessible.
