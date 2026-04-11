import React from "react";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#FDF8F5] pb-20 lg:pb-0">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
