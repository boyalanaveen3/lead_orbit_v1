import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Leads from "../pages/leads/Leads";
import CreateLead from "../pages/leads/CreateLead";
import Tasks from "../pages/tasks/Tasks";
import CreateTask from "../pages/tasks/CreateTask";
import Settings from "../pages/settings/Settings";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/leads", element: <Leads /> },
  { path: "/leads/create", element: <CreateLead /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/tasks/create", element: <CreateTask /> },
  { path: "/settings", element: <Settings /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
