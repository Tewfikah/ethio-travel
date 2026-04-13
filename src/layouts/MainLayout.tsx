// ─── src/layouts/MainLayout.tsx ──────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// Layout = a WRAPPER that every page uses
// It has the Navbar and Background
// Every page that uses MainLayout gets these automatically!
//
// HOW IT WORKS:
// <MainLayout>          ← the frame
//   <HomePage />        ← the picture inside
// </MainLayout>
//
// children = whatever page we put inside the frame
// ReactNode = any React content (components, text, etc)

import { useState, ReactNode } from 'react';
import Navbar from '../components/shared/Navbar';
import AuthPage from '../pages/Auth/AuthPage';

// Props this component needs
interface MainLayoutProps {
  children: ReactNode; // the page content goes here
}

export default function MainLayout({ children }: MainLayoutProps) {

  // Controls if auth modal is open or closed
  // false = closed, true = open
  const [authOpen, setAuthOpen] = useState(false);

  return (
    // Main wrapper — dark background color
    <div className="relative w-full min-h-screen font-sans text-white
    overflow-hidden bg-[#050d20] select-none">

      {/* ── Auth Modal ───────────────────────────────────────────────
          Only shows when authOpen is true
          Available on EVERY page because it lives in Layout!
          onClose → sets authOpen back to false
      */}
      {authOpen && (
        <AuthPage onClose={() => setAuthOpen(false)} />
      )}

      {/* ── Page Wrapper ─────────────────────────────────────────────
          max-w controls max width on big screens
          px = padding left and right
          py = padding top and bottom
      */}
      <div className="relative z-10 min-h-screen flex flex-col
      max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 xl:px-16
      py-6 md:py-8">

        {/* ── Navbar ───────────────────────────────────────────────
            Always visible on every page
            onAuthOpen → opens the auth modal
        */}
        <Navbar onAuthOpen={() => setAuthOpen(true)} />

        {/* ── Page Content ─────────────────────────────────────────
            This is where the PAGE renders
            flex-1 makes it take up all remaining space
            HomePage, DestinationsPage etc go here
        */}
        <div className="flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}