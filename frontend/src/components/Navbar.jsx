import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav className="bg-brand-card backdrop-blur-md border-b border-brand-border p-4 flex justify-between items-center sticky top-0 z-40">
      {/* LEFT SIDE: LOGO + NAME */}
      <div className="flex items-center gap-3">
        <img
          src="https://m.media-amazon.com/images/I/51Z0iXejQvL._AC_UF1000,1000_QL80_.jpg"
          alt="Logo"
          className="h-8 w-8 lg:h-10 lg:w-10 object-cover rounded-lg"
        />
        <span className="text-lg lg:text-xl font-bold tracking-tight text-brand-charcoal">InsightBoard</span>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden lg:flex items-center gap-8">
        <Link to="/dashboard" className="text-xs font-bold text-brand-charcoal/60 hover:text-brand-charcoal transition-colors">DASHBOARD</Link>
        <Link to="/kanban" className="text-xs font-bold text-brand-charcoal/60 hover:text-brand-charcoal transition-colors">SYNERGY BOARD</Link>
        <Link to="/forge" className="text-brand-coral text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">THE FORGE</Link>
      </div>

      {/* RIGHT SIDE: AVATAR + DROPDOWN */}
      <div className="relative" ref={dropdownRef}>

        {/* AVATAR */}
        <div
          onClick={() => setOpen(!open)}
          className="h-10 w-10 rounded-full bg-brand-border cursor-pointer flex items-center justify-center overflow-hidden ring-2 ring-brand-border hover:ring-brand-coral transition-all"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="h-10 w-10 object-cover"
            />
          ) : (
            <FiUser className="text-brand-charcoal/40 text-xl" />
          )}
        </div>

        {/* DROPDOWN MENU */}
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-brand-card shadow-lg rounded-md overflow-hidden border border-brand-border">

            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-brand-bg transition-colors"
              onClick={() => navigate("/settings")}
            >
              <FaRegEdit className="text-green-600" />
              <span>Edit Profile</span>
            </button>

            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-brand-bg text-red-500 transition-colors"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}
