import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    setUser({
      id: decoded.id,
      email: decoded.email,
      name: decoded.name, // ← add this
    });

  } catch {
    localStorage.removeItem("token");
  }
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
