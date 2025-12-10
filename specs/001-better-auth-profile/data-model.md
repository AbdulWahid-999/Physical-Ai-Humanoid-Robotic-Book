# Data Model: User Profile for Bonus-Point Signup & Signin

**Feature Branch**: `001-better-auth-profile`
**Created**: 2025-12-09
**Associated Plan**: [link to plan.md](plan.md)
**Associated Spec**: [link to spec.md](spec.md)

## Entity: UserProfile

Represents the personalization data collected from a user, linked to their authentication identity provided by Better-Auth.

### Attributes:

-   **`betterAuthUserId`** (String, UUID/Unique Identifier):
    -   **Description**: Unique identifier provided by Better-Auth for the user. Serves as the primary key and foreign key to link profile data with the authentication system.
    -   **Required**: Yes
    -   **Validation**: Must be a valid UUID or Better-Auth's specific user ID format.
    -   **Notes**: Immutable once set.

-   **`programmingLanguages`** (Array of Strings):
    -   **Description**: List of primary programming languages the user identifies with (e.g., "Python", "JavaScript", "Rust").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Each string should be a non-empty name of a programming language.
    -   **Notes**: Free text or selection from a predefined list.

-   **`yearsOfExperience`** (String, Range/Enum):
    -   **Description**: User's programming experience level (e.g., "0-1 year", "1-3 years", "3-5 years", "5+ years").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Must be one of the predefined range values.

-   **`primaryOs`** (String, Enum):
    -   **Description**: User's primary operating system (e.g., "Windows", "macOS", "Linux").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Must be one of the predefined OS values.

-   **`primaryIde`** (String):
    -   **Description**: User's primary development environment or IDE (e.g., "VS Code", "IntelliJ IDEA", "Vim").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Non-empty string.
    -   **Notes**: Free text.

-   **`cloudExperience`** (String, Enum):
    -   **Description**: User's familiarity level with cloud/deployment (e.g., "None", "Beginner", "Intermediate", "Advanced").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Must be one of the predefined experience levels.

-   **`hardwareProfileCpuFamily`** (String):
    -   **Description**: User's CPU family (e.g., "Intel Core i7", "AMD Ryzen 9").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Non-empty string.

-   **`hardwareProfileRamGb`** (Integer):
    -   **Description**: User's RAM size in Gigabytes.
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Positive integer.

-   **`hardwareProfileGpuPresent`** (Boolean):
    -   **Description**: Indicates if a GPU is present.
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: True or False.

-   **`hardwareProfileGpuModel`** (String, Optional):
    -   **Description**: Model of the GPU if present (e.g., "NVIDIA GeForce RTX 3080").
    -   **Required**: No (only if `hardwareProfileGpuPresent` is true)
    -   **Validation**: Non-empty string if present.

-   **`preferredLearningFormat`** (Array of Strings/Enum):
    -   **Description**: User's preferred learning style (e.g., "Reading", "Video", "Hands-on", "Mixed").
    -   **Required**: Yes (for opted-in users)
    -   **Validation**: Must be one or more of the predefined format values.

-   **`accessibilityNeeds`** (String, Optional):
    -   **Description**: Any stated accessibility requirements or preferences.
    -   **Required**: No
    -   **Validation**: Free text.

-   **`isConsentRevoked`** (Boolean):
    -   **Description**: Flag indicating if the user has revoked consent for personalization data. If true, the profile data is soft-deleted.
    -   **Required**: Yes
    -   **Validation**: True or False.
    -   **Default**: False
    -   **Notes**: On true, the record is marked for eventual hard-deletion (FR-013).

-   **`createdAt`** (Timestamp):
    -   **Description**: Timestamp when the profile was first created.
    -   **Required**: Yes
    -   **Validation**: Valid UTC timestamp.

-   **`updatedAt`** (Timestamp):
    -   **Description**: Timestamp when the profile was last updated.
    -   **Required**: Yes
    -   **Validation**: Valid UTC timestamp.

### Relationships:

-   **`UserProfile` 1:1 `Better-Auth User`**: Each user profile is uniquely identified and owned by a single Better-Auth user ID.

### Validation Rules (Summary from Spec):

-   All required fields must be present if the user opts-in for personalization.
-   No sensitive PII (FR-011) is permitted.
-   Data types and formats must match the definitions above.

### State Transitions (for `isConsentRevoked`):

-   **Initial State**: `isConsentRevoked = false` (upon initial signup with consent).
-   **Transition**: User revokes consent → `isConsentRevoked` becomes `true`.
-   **Action on Transition**: Profile data is immediately soft-deleted, and the record is marked for eventual hard-deletion (FR-013).
