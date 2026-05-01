# Project Management App

A full-stack project management platform for organizing work across workspaces, projects, and tasks. The app includes authentication, role-based collaboration, analytics dashboards, and AI-powered task summaries.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Tailwind CSS
- shadcn/ui
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Zod request validation
- Nodemailer
- Google Gemini API

## Key Features

- User registration and login
- Email verification flow
- Forgot-password and reset-password flow
- Workspace creation and workspace member management
- Role-based access across workspaces and projects
- Project creation inside workspaces
- Task creation, assignment, status updates, priority updates, subtasks, comments, and watchers
- Personal dashboard with workspace statistics and charts
- "My Tasks" view for user-specific task tracking
- AI summarizer for productivity insights
- User profile update and password change

## Project Structure

```text
ProjectManagement/
├── frontend/   # React + TypeScript client
└── backend/    # Express + MongoDB API
```

## Architecture Overview

The frontend is a single-page application built with React Router. It uses React Query for server-state management and Axios for API communication. Authentication state is stored in `localStorage` and injected into API requests through an Axios interceptor.

The backend exposes a REST API under `/api/v1`. It uses JWT-based authentication, Zod-based request validation, and Mongoose models for persistence. Core entities are `User`, `Workspace`, `Project`, `Task`, `Comment`, `ActivityLog`, `Verification`, and `WorkspaceInvite`.

## Data Model Summary

### User
- Basic identity: `name`, `email`, `password`
- Profile fields: `profilePicture`
- Account state: `isEmailVerified`, `lastLogin`

### Workspace
- Owned by a user
- Contains members with roles: `owner`, `admin`, `member`, `viewer`
- Contains projects

### Project
- Belongs to a workspace
- Has members with roles: `manager`, `contributor`, `viewer`
- Tracks status, dates, tags, progress, and tasks

### Task
- Belongs to a project
- Tracks status, priority, assignees, watchers, subtasks, comments, due date, and archive state

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ProjectManagement
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

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

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:5000`.

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Frontend Routes

### Public
- `/`
- `/home`
- `/features`
- `/about`

### Authentication
- `/login`
- `/signup`
- `/verify-email`
- `/forgot-password`
- `/reset-password`

### Dashboard
- `/dashboard`
- `/workspaces`
- `/workspaces/:workspaceId`
- `/workspaces/:workspaceId/projects/:projectId`
- `/workspaces/:workspaceId/projects/:projectId/tasks/:taskId`
- `/my-tasks`
- `/members`
- `/ai-summarizer`
- `/achieved`
- `/settings`

### User
- `/user/profile`

### Invite Flow
- `/workspace-invite/:workspaceId`

## Backend API Overview

Base URL: `http://localhost:5000/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/verify-email`
- `POST /auth/reset-password-request`
- `POST /auth/reset-password`

### Users
- `GET /users/profile`
- `PUT /users/profile`
- `PUT /users/change-password`

### Workspaces
- `POST /workspaces`
- `GET /workspaces`
- `GET /workspaces/:workspaceId`
- `GET /workspaces/:workspaceId/projects`
- `GET /workspaces/:workspaceId/stats`
- `PUT /workspaces/:workspaceId`
- `DELETE /workspaces/:workspaceId`
- `POST /workspaces/:workspaceId/invite-member`
- `POST /workspaces/:workspaceId/accept-generate-invite`
- `POST /workspaces/accept-invite-token`

### Projects
- `POST /projects/:workspaceId/create-project`
- `GET /projects/:projectId`
- `GET /projects/:projectId/tasks`
- `DELETE /projects/:projectId`

### Tasks
- `POST /tasks/:projectId/create-task`
- `GET /tasks/:taskId`
- `PUT /tasks/:taskId/title`
- `PUT /tasks/:taskId/description`
- `PUT /tasks/:taskId/status`
- `PUT /tasks/:taskId/priority`
- `PUT /tasks/:taskId/assignees`
- `POST /tasks/:taskId/add-subtask`
- `PUT /tasks/:taskId/update-subtask/:subTaskId`
- `POST /tasks/:taskId/add-comment`
- `GET /tasks/:taskId/comments`
- `GET /tasks/:resourceId/activity`
- `POST /tasks/:taskId/watch`
- `POST /tasks/:taskId/achieved`
- `GET /tasks/my-tasks`
- `DELETE /tasks/:taskId`

### AI
- `POST /ai/summarize`

## AI Summarizer

The backend integrates with the Google Gemini API to generate summaries for:
- user tasks
- workspace projects
- workspace activity

The current backend includes a simple per-user in-memory rate limit of 10 summary requests per day.

## Access Control Notes

- Only authenticated users can access protected routes.
- Workspace actions depend on workspace membership and role.
- Project creation is restricted to workspace `owner` and `admin`.
- Task creation is restricted to project `manager`.
- Some task updates are allowed for assigned contributors; managerial actions such as assigning users and changing priority are more restricted.

## Known Documentation Notes

- The existing [backend/README.md](/home/rgutkrkvalley/Desktop/ProjectManagement/backend/README.md) does not fully reflect the current implementation.
- This root README is intended to be the accurate high-level entry point for the project.

## Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

## Current Gaps

- No automated tests are configured yet.
- The AI rate limiter is in-memory, so it resets on server restart.
- Some backend and frontend labels contain minor typos, but the feature flows are implemented.

## License

This project currently uses the default package license declarations in the subprojects.
