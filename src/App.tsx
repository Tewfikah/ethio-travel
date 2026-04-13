// ─── src/App.tsx ─────────────────────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// App.tsx is the STARTING POINT of our whole app
// It is very clean now — only 2 jobs:
//
// Job 1 → AuthProvider
//   Wraps the whole app with our whiteboard
//   So EVERY component can know if user is logged in
//
// Job 2 → AppRoutes
//   Shows the right page based on the URL
//
// Everything else is handled by their own files!
// Navbar → components/shared/Navbar.tsx
// HomePage → pages/Home/HomePage.tsx
// AuthPage → pages/Auth/AuthPage.tsx
// Slider logic → hooks/useSlider.ts

import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    // AuthProvider wraps EVERYTHING
    // So every component can use useAuth()
    <AuthProvider>

      {/* AppRoutes shows the right page for each URL */}
      <AppRoutes />

    </AuthProvider>
  );
}