import React from "react";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#FDF8F5]">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
