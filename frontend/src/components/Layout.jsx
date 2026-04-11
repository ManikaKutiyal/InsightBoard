import React, { useContext } from "react";
import Sidebar from "./SideBar";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);
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
