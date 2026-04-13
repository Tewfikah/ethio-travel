// ─── src/types/index.ts ──────────────────────────────────────────────
// This file defines the SHAPE of our data
// Think of it like a blueprint
// Every destination MUST have these exact fields

export interface Destination {
  id: number;
  title: string;
  sub: string;
  rating: number;
  image: string;
}

// Shape of a logged in user
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string; // optional
}

// Shape of what AuthContext gives us
export interface AuthContextType {
  user: AuthUser | null; // null = not logged in
  isLoggedIn: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}





