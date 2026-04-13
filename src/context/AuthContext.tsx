// ─── src/context/AuthContext.tsx ─────────────────────────────────────

import { createContext, useContext, useState, ReactNode } from 'react';

// ── Define types directly here ────────────────────────────────────────
// We define them HERE instead of importing
// This fixes the import error!

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

// ── Create the whiteboard ─────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ── AuthProvider — wraps the whole app ───────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: user !== null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ── useAuth — reads the whiteboard ───────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider!');
  }

  return context;
}