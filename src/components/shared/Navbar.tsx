// ─── src/components/shared/Navbar.tsx ───────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// Navbar is a SHARED component — used on every page
// It reads from AuthContext to know if user is logged in
// It calls onAuthOpen to open the login modal
//
// HOW IT CONNECTS:
// MainLayout → passes onAuthOpen to Navbar
// Navbar → reads useAuth() to know login state
// Navbar → calls onAuthOpen when Login button clicked
// Navbar → calls logout() when Logout button clicked

import { useState } from 'react';
import {
  Search,
  Mountain,
  Menu,
  X,
  LogIn,
  LogOut,
} from 'lucide-react';
import { NAV_LINKS, ACTIVE_LINK } from '../../data/destinations';
import { useAuth } from '../../context/AuthContext';

// Props this component needs from outside
interface NavbarProps {
  onAuthOpen: () => void; // function to open login modal
}

export default function Navbar({ onAuthOpen }: NavbarProps) {

  // Controls mobile menu open/close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Read from our whiteboard (AuthContext)
  // isLoggedIn → true if user is logged in
  // user → the logged in user's data
  // logout → function to log out
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      {/* ══ MOBILE MENU OVERLAY ══════════════════════════════════════
          This covers the whole screen on mobile
          Shows when hamburger button is clicked
      */}
      <div
        className={`fixed inset-0 z-[100] bg-[#060c1e]/96 backdrop-blur-xl
        flex flex-col items-center justify-center gap-10
        transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 w-10 h-10 rounded-full
          border border-white/20 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mobile Nav Links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className={`text-2xl font-semibold tracking-wide
            transition-colors ${
              link === ACTIVE_LINK
                ? 'text-white'
                : 'text-white/50 hover:text-white'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link}
          </a>
        ))}

        {/* Login or Logout in mobile menu */}
        {isLoggedIn ? (
          // Show Logout if user is logged in
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logout();
            }}
            className="flex items-center gap-2.5 bg-white/10
            hover:bg-white/20 border border-white/20 text-white
            text-lg font-semibold px-8 py-3 rounded-2xl
            transition-all duration-200 active:scale-95 mt-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        ) : (
          // Show Login if user is NOT logged in
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onAuthOpen();
            }}
            className="flex items-center gap-2.5 bg-white/10
            hover:bg-white/20 border border-white/20 text-white
            text-lg font-semibold px-8 py-3 rounded-2xl
            transition-all duration-200 active:scale-95 mt-2"
          >
            <LogIn className="w-5 h-5" />
            Login / Sign Up
          </button>
        )}
      </div>

      {/* ══ MAIN NAVBAR ══════════════════════════════════════════════ */}
      <nav className="flex items-center justify-between w-full">

        {/* ── Logo ── */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border
          border-amber-500/40 flex items-center justify-center">
            <Mountain className="w-5 h-5 text-amber-400 fill-amber-400/30" />
          </div>
          <span className="text-lg font-bold tracking-wider">
            EthioTravel
          </span>
        </div>

        {/* ── Desktop Nav Links ── */}
        {/* hidden on mobile, shows on large screens */}
        <div className="hidden lg:flex items-center gap-10 xl:gap-14
        text-[13px] tracking-wide text-gray-400">
          {NAV_LINKS.map((link) =>
            link === ACTIVE_LINK ? (
              // Active link — white with dot under it
              <a
                key={link}
                href="#"
                className="text-white font-semibold flex flex-col
                items-center gap-1.5"
              >
                {link}
                <span className="w-1 h-1 rounded-full bg-white block" />
              </a>
            ) : (
              // Normal link
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* ── Right Side Buttons ── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search Button */}
          <button
            className="w-9 h-9 rounded-full bg-white/10 border
            border-white/10 flex items-center justify-center
            hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-white/80" />
          </button>

          {/* Login or Logout — desktop only */}
          {isLoggedIn ? (
            // Show Logout button if logged in
            <button
              onClick={logout}
              className="hidden sm:flex items-center gap-2 bg-white/10
              hover:bg-white/20 border border-white/20 hover:border-white/40
              backdrop-blur-sm text-white text-[12px] font-semibold
              px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          ) : (
            // Show Login button if NOT logged in
            <button
              onClick={onAuthOpen}
              className="hidden sm:flex items-center gap-2 bg-white/10
              hover:bg-white/20 border border-white/20 hover:border-white/40
              backdrop-blur-sm text-white text-[12px] font-semibold
              px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* User Avatar + Name */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={isLoggedIn ? undefined : onAuthOpen}
          >
            {/* Show user name if logged in */}
            <span className="hidden lg:block text-[13px] text-gray-300
            group-hover:text-white transition-colors">
              {isLoggedIn ? (
                <>
                  Hello,{' '}
                  <span className="font-semibold text-white">
                    {user?.name}!
                  </span>
                </>
              ) : (
                'Sign in'
              )}
            </span>

            {/* Avatar image */}
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-9 h-9 rounded-full object-cover border
              border-white/20 group-hover:border-white/50
              transition-all shadow-lg"
            />
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden w-9 h-9 rounded-full border
            border-white/20 flex items-center justify-center
            hover:bg-white/10 transition-all"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </>
  );
}