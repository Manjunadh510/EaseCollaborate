import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { ErrorBoundary } from "../components/error-boundary";

// layouts
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import UserLayout from "../layouts/UserLayout";

// pages
import Home from "../layouts/pages/Home";
import About from "../layouts/pages/About";
import Features from "../layouts/pages/Features";

// auth
import Login from "../layouts/pages/auth/Login";
import Signup from "../layouts/pages/auth/Signup";
import VerifyEmail from "../layouts/pages/auth/verify-email";
import ForgotPassword from "../layouts/pages/auth/forgot-password";
import ResetPassword from "../layouts/pages/auth/reset-password";

// dashboard
import Dashboard from "../layouts/pages/dashboard";
import Workspaces from "../layouts/pages/dashboard/workspaces";
import WorkspaceDetails from "../layouts/pages/dashboard/workspaces/workspace-details";
import ProjectDetails from "../layouts/pages/dashboard/project/project-details";
import EditProject from "../layouts/pages/dashboard/project/edit-project";
import TaskDetails from "../layouts/pages/dashboard/task/task-details";
import MyTasks from "../layouts/pages/dashboard/my-tasks";
import Members from "../layouts/pages/dashboard/members";

import WorkspaceInvite from "../layouts/pages/dashboard/workspaces/workspace-invite";

// user
import Profile from "../layouts/pages/user/profile";
import Settings from "../layouts/pages/dashboard/settings";
import Achieved from "../layouts/pages/dashboard/achieved";
import AISummarizer from "../layouts/pages/dashboard/ai-summarizer";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      //  Public
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "features", element: <Features /> },
      { path: "about", element: <About /> },

      //  Auth Layout
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "verify-email", element: <VerifyEmail /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },

      //  Dashboard Layout
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "workspaces", element: <Workspaces /> },
          { path: "workspaces/:workspaceId", element: <WorkspaceDetails /> },
          {
            path: "workspaces/:workspaceId/projects/:projectId",
            element: <ProjectDetails />,
          },
          {
            path: "workspaces/:workspaceId/projects/:projectId/edit",
            element: <EditProject />,
          },
          {
            path: "workspaces/:workspaceId/projects/:projectId/tasks/:taskId",
            element: <TaskDetails />,
          },
          { path: "my-tasks", element: <MyTasks /> },
          { path: "members", element: <Members /> },
          { path: "ai-summarizer", element: <AISummarizer /> },
          { path: "achieved", element: <Achieved/> },
          { path: "settings", element: <Settings /> },
        ],
      },

      //  Standalone route
      {
        path: "workspace-invite/:workspaceId",
        element: <WorkspaceInvite />,
      },

      //  User Layout
      {
        element: <UserLayout />,
        children: [
          { path: "user/profile", element: <Profile /> },
        ],
      },
    ],
  },
]);
