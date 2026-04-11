import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function syncUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Sync failed");

        const userData = await res.json();
        // Consolidate MongoDB _id to frontend id
        setUser({ ...userData, id: userData._id });
      } catch (err) {
        console.error("Auth sync failed:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    syncUser();
  }, []);

  function login(token) {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    console.log("DECODED TOKEN:", decoded);

    setUser({
      id: decoded.id,
      email: decoded.email,
      name: decoded.name, // ← add this
    });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  function updateUser(newData) {
    setUser(prev => ({ ...prev, ...newData }));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
