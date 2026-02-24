import React from "react";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { IoSettings } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ emoji, label, active }) => (
  <div
    className={`group flex flex-col items-center justify-center w-20 h-20 mb-4 cursor-pointer rounded-3xl transition-all duration-300 
    ${active ? "bg-[#F8AFA6] text-white shadow-lg" : "text-[#5B4B49] hover:bg-white"}`}
  >
    <span className="text-2xl mb-1">{emoji}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-28 min-h-screen flex flex-col items-center py-8 border-r border-[#FADCD9]/50 bg-[#FDF8F5]">
      <div className="mb-12 text-4xl">🎀</div>

      <nav className="flex-1">
        <Link to="/dashboard">
          <SidebarItem
            emoji={<FaHome size={28} />}
            label="Home"
            active={pathname === "/dashboard"}
          />
        </Link>

        <Link to="/kanban">
          <SidebarItem
            emoji={<RiDashboardFill size={28} />}
            label="Kanban"
            active={pathname === "/kanban"}
          />
        </Link>


        <SidebarItem emoji={<GoGoal size={28} />} label="Goals" />
        <SidebarItem emoji={<IoSettings size={28} />} label="Settings" />
      </nav>

      <div className="text-[10px] font-black text-[#F8AFA6] rotate-90 mb-4 opacity-50 tracking-widest">
        EST. 2024
      </div>
    </aside>
  );
}
