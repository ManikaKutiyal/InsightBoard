import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import KanbanBoard from "./components/KanbanBoard";
import Dashboard from "./components/Dashboard";
import AIChat from "./components/AIChat";
import AuthPage from "./components/AuthPage";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";

export default function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const hideNavbar = location.pathname === "/auth" || isLandingPage;

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* RESTORED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        {/* KANBAN BOARD */}
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <Layout><KanbanBoard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <Layout><AIChat /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
