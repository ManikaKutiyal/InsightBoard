import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
  const { user } = useAuth();
  const currentTheme = user?.theme || "cream";

  return (
    <div className={`theme-${currentTheme} min-h-screen transition-colors duration-500`}>
      <div className="flex min-h-screen bg-[var(--bg-app)] pb-20 lg:pb-0">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
