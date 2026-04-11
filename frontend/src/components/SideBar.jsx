import React from "react";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { IoSettings } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ emoji, label, active }) => (
  <div
    className={`group flex flex-col items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-0 lg:mb-4 cursor-pointer rounded-2xl lg:rounded-3xl transition-all duration-300 
    ${active ? "bg-[#F8AFA6] text-white shadow-lg" : "text-[#5B4B49] hover:bg-white"}`}
  >
    <span className="text-xl lg:text-2xl mb-1">{emoji}</span>
    <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);

export default function Sidebar() {
  const { pathname } = useLocation();

  const NavContent = () => (
    <>
      <Link to="/dashboard">
        <SidebarItem
          emoji={<FaHome size={24} />}
          label="Home"
          active={pathname === "/dashboard"}
        />
      </Link>
      <Link to="/kanban">
        <SidebarItem
          emoji={<RiDashboardFill size={24} />}
          label="Kanban"
          active={pathname === "/kanban"}
        />
      </Link>
      <Link to="/forge">
        <SidebarItem
          emoji={<FiUsers size={24} />}
          label="Collab"
          active={pathname === "/forge"}
        />
      </Link>
      <Link to="/settings">
        <SidebarItem
          emoji={<IoSettings size={24} />}
          label="Settings"
          active={pathname === "/settings"}
        />
      </Link>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-28 min-h-screen flex-col items-center py-8 border-r border-[#FADCD9]/50 bg-[#FDF8F5] sticky top-0 overflow-y-auto">
        <div className="mb-12 text-4xl">🎀</div>
        <nav className="flex-1">
          <NavContent />
        </nav>
        <div className="text-[10px] font-black text-[#F8AFA6] rotate-90 mb-4 opacity-50 tracking-widest">
          EST. 2024
        </div>
      </aside>

      {/* MOBILE BOTTOM BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#FADCD9]/30 flex justify-around items-center py-2 px-4 z-50">
        <NavContent />
      </nav>
    </>
  );
}
