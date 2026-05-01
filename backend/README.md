# Project Management Backend

Express and MongoDB backend for the Project Management application. This API handles authentication, workspace collaboration, project and task management, profile management, and AI-powered summaries.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Zod validation with `zod-express-middleware`
- Nodemailer
- Google Gemini API

## Server Details

- Default port: `5000`
- Base API prefix: `/api/v1`
- Root health-style route: `GET /`

Example base URL:

```text
http://localhost:5000/api/v1
```

## Features

- User registration and login
- Email verification
- Password reset via email
- JWT-protected routes
- Workspace creation and membership management
- Workspace invite flow using generated tokens
- Project creation and deletion
- Task creation, assignment, comments, watchers, subtasks, archive flow, and activity history
- User profile update and password change
- AI-generated summaries for tasks, projects, and workspaces

## Folder Structure

```text
backend/
├── controllers/
├── libs/
├── middleware/
├── models/
├── routes/
├── index.js
└── package.json
```

## Data Models

### User
- `name`
- `email`
- `password`
- `profilePicture`
- `isEmailVerified`
- `lastLogin`

### Workspace
- `name`
- `description`
- `color`
- `owner`
- `members[]` with roles: `owner`, `admin`, `member`, `viewer`
- `projects[]`

### Project
- `title`
- `description`
- `workspace`
- `status`
- `startDate`
- `dueDate`
- `progress`
- `tasks[]`
- `members[]` with roles: `manager`, `contributor`, `viewer`
- `tags[]`
- `createdBy`
- `isArchived`

### Task
- `title`
- `description`
- `project`
- `status`
- `priority`
- `assignees[]`
- `watchers[]`
- `dueDate`
- `completedAt`
- `subtasks[]`
- `comments[]`
- `attachments[]`
- `createdBy`
- `isArchived`

### Additional Models
- `Comment`
- `ActivityLog`
- `Verification`
- `WorkspaceInvite`

## Environment Variables

Create a `.env` file inside `backend/`.

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=your_jwt_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_SERVICE=
SMTP_MAIL=your_email@example.com
SMTP_PASSWORD=your_email_password

GEMINI_API_KEY=your_gemini_api_key

# Optional
ARCJET_KEY=your_arcjet_key
```

## Installation

```bash
npm install
```

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## Scripts

```bash
npm run dev
npm start
```

## Authentication

Protected routes require a bearer token:

```http
Authorization: Bearer <jwt_token>
```

Tokens are issued after successful login.

## API Routes

### Auth Routes

#### `POST /api/v1/auth/register`
Register a new user and send an email verification link.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### `POST /api/v1/auth/login`
Log in a verified user and return a JWT token.

#### `POST /api/v1/auth/verify-email`
Verify a user account with a token.

#### `POST /api/v1/auth/reset-password-request`
Send a password reset email.

#### `POST /api/v1/auth/reset-password`
Reset password using a valid token.

### User Routes

#### `GET /api/v1/users/profile`
Get the authenticated user's profile.

#### `PUT /api/v1/users/profile`
Update the authenticated user's name and optional profile picture.

#### `PUT /api/v1/users/change-password`
Change the authenticated user's password.

### Workspace Routes

#### `POST /api/v1/workspaces`
Create a workspace.

#### `GET /api/v1/workspaces`
Get all workspaces for the authenticated user.

#### `GET /api/v1/workspaces/:workspaceId`
Get workspace details.

#### `GET /api/v1/workspaces/:workspaceId/projects`
Get workspace details plus visible projects for the authenticated user.

#### `GET /api/v1/workspaces/:workspaceId/stats`
Get workspace dashboard statistics for the authenticated user.

#### `PUT /api/v1/workspaces/:workspaceId`
Update workspace name, description, or color.

#### `DELETE /api/v1/workspaces/:workspaceId`
Delete a workspace.

#### `POST /api/v1/workspaces/:workspaceId/invite-member`
Invite a user to a workspace with a role.

Request body:

```json
{
  "email": "member@example.com",
  "role": "member"
}
```

#### `POST /api/v1/workspaces/:workspaceId/accept-generate-invite`
Generate or accept an invite workflow token for a workspace.

#### `POST /api/v1/workspaces/accept-invite-token`
Accept a workspace invite using a token.

Request body:

```json
{
  "token": "invite_token_here"
}
```

### Project Routes

#### `POST /api/v1/projects/:workspaceId/create-project`
Create a project inside a workspace.

Request body:

```json
{
  "title": "Website Redesign",
  "description": "New company website project",
  "status": "Planning",
  "startDate": "2026-04-01",
  "dueDate": "2026-04-30",
  "tags": "design,frontend",
  "members": [
    {
      "user": "user_id_here",
      "role": "manager"
    }
  ]
}
```

#### `GET /api/v1/projects/:projectId`
Get project details.

#### `GET /api/v1/projects/:projectId/tasks`
Get project details and all non-archived tasks.

#### `DELETE /api/v1/projects/:projectId`
Delete a project and its tasks.

### Task Routes

#### `POST /api/v1/tasks/:projectId/create-task`
Create a task inside a project.

Request body:

```json
{
  "title": "Build dashboard UI",
  "description": "Create the analytics dashboard page",
  "status": "To Do",
  "priority": "High",
  "dueDate": "2026-04-20",
  "assignees": ["user_id_here"]
}
```

#### `GET /api/v1/tasks/:taskId`
Get a task by ID with project membership context.

#### `PUT /api/v1/tasks/:taskId/title`
Update task title.

#### `PUT /api/v1/tasks/:taskId/description`
Update task description.

#### `PUT /api/v1/tasks/:taskId/status`
Update task status.

#### `PUT /api/v1/tasks/:taskId/priority`
Update task priority.

#### `PUT /api/v1/tasks/:taskId/assignees`
Update task assignees.

#### `POST /api/v1/tasks/:taskId/add-subtask`
Add a subtask.

Request body:

```json
{
  "title": "Design chart layout"
}
```

#### `PUT /api/v1/tasks/:taskId/update-subtask/:subTaskId`
Update subtask completion state.

Request body:

```json
{
  "completed": true
}
```

#### `POST /api/v1/tasks/:taskId/add-comment`
Add a comment to a task.

Request body:

```json
{
  "text": "This needs review before merge."
}
```

#### `GET /api/v1/tasks/:taskId/comments`
Get comments for a task.

#### `GET /api/v1/tasks/:resourceId/activity`
Get activity log entries for a resource.

#### `POST /api/v1/tasks/:taskId/watch`
Watch or unwatch a task.

#### `POST /api/v1/tasks/:taskId/achieved`
Archive or unarchive a task.

#### `GET /api/v1/tasks/my-tasks`
Get tasks assigned to the authenticated user.

#### `DELETE /api/v1/tasks/:taskId`
Delete a task.

### AI Routes

#### `POST /api/v1/ai/summarize`
Generate an AI summary for tasks, projects, or a workspace.

Request body:

```json
{
  "type": "tasks",
  "timeRange": "week",
  "workspaceId": "optional_workspace_id"
}
```

Accepted values:
- `type`: `tasks`, `projects`, `workspace`
- `timeRange`: `today`, `week`, `month`

## Validation Rules

The backend validates request payloads using Zod. A few important enums:

- Workspace invite roles: `admin`, `member`, `viewer`
- Project status: `Planning`, `In Progress`, `On Hold`, `Completed`, `Cancelled`
- Project member roles: `manager`, `contributor`, `viewer`
- Task status: `To Do`, `In Progress`, `Done`
- Task priority: `Low`, `Medium`, `High`

## Permission Model

- All protected endpoints require authentication.
- Workspace owners and admins can create projects and invite members.
- Project managers can create tasks.
- Contributors can edit some task fields only when assigned to the task.
- Managers have broader control over task assignment and priority changes.

## AI Summarizer Notes

- Uses Google Gemini through `@google/generative-ai`
- Supports summaries for user tasks, projects, and workspace activity
- Includes a simple in-memory limit of 10 summary requests per user per day
- Rate limit resets if the server restarts

## Notes

- MongoDB is required for normal backend operation.
- Email flows require valid SMTP credentials.
- AI summaries require a valid `GEMINI_API_KEY`.
- Arcjet is present in the codebase, but some protection calls are currently commented out in authentication flow.

## Testing

There are currently no automated tests configured in `package.json`.
