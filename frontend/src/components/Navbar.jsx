import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export default function Navbar() {
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
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      
      {/* LEFT SIDE: LOGO + NAME */}
      <div className="flex items-center gap-3">
        <img 
          src="https://m.media-amazon.com/images/I/51Z0iXejQvL._AC_UF1000,1000_QL80_.jpg" 
          alt="Logo" 
          className="h-10 w-10 object-cover"
        />
        <span className="text-xl font-bold">InsightBoard</span>
      </div>

      {/* RIGHT SIDE: AVATAR + DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        
        {/* AVATAR */}
        <div
          onClick={() => setOpen(!open)}
          className="h-10 w-10 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center"
        >
          <img
            src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
            alt="avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        {/* DROPDOWN MENU */}
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-md overflow-hidden border">
            
            <button 
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/profile")}
            >
              <FaRegEdit className="text-green-600" />
              <span>Edit Profile</span>
            </button>

            <button 
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-500"
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
