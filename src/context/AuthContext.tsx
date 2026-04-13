// ─── src/context/AuthContext.tsx ─────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// Context = a shared whiteboard for ALL components
// Any component can READ or WRITE to this whiteboard
// We use it to share "is user logged in?" across the whole app
//
// HOW IT WORKS — 3 simple steps:
// Step 1 → Create the whiteboard (createContext)
// Step 2 → Put the whiteboard in the classroom (Provider)
// Step 3 → Any student reads the whiteboard (useAuth hook)

import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser, AuthContextType } from '../types';

// ── Step 1: Create the whiteboard ────────────────────────────────────
// We start with null because no one is logged in yet
const AuthContext = createContext<AuthContextType | null>(null);

// ── Step 2: Put the whiteboard in the classroom ──────────────────────
// AuthProvider WRAPS your whole app
// Everything inside it can access the whiteboard!
export function AuthProvider({ children }: { children: ReactNode }) {

  // This is the data ON the whiteboard
  // null = no user logged in
  const [user, setUser] = useState<AuthUser | null>(null);

  // Write "user logged in" on the whiteboard
  const login = (userData: AuthUser) => {
    setUser(userData);
    // Later: save token to localStorage here
  };

  // Erase the whiteboard (user logged out)
  const logout = () => {
    setUser(null);
    // Later: clear token from localStorage here
  };

  // Everything we put ON the whiteboard
  const value: AuthContextType = {
    user,
    isLoggedIn: user !== null, // true if someone is logged in
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Step 3: Any component reads the whiteboard ───────────────────────
// Instead of writing useContext(AuthContext) every time
// We just write useAuth() — much simpler!
//
// Example usage in any component:
// const { isLoggedIn, user, login, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);

  // Safety check — make sure we are inside AuthProvider
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider!');
  }

  return context;
}