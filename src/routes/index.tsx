import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import CreateLead from "../pages/CreateLead";
import PlaceholderPage from "../pages/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/leads",
    element: <Leads />,
  },
  {
    path: "/leads/getleads",
    element: <Leads />,
  },
  {
    path: "/leads/create",
    element: <CreateLead />,
  },
  {
    path: "/tasks",
    element: (
      <PlaceholderPage
        title="Tasks"
        description="Task management screen can be added here."
      />
    ),
  },
  {
    path: "/settings",
    element: (
      <PlaceholderPage
        title="Settings"
        description="Settings screen can be added here."
      />
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
