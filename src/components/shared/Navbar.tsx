// ─── src/components/shared/Navbar.tsx ───────────────────────────────
import { Search, Mountain, Menu, LogIn, LogOut } from 'lucide-react';

const NAV_LINKS = ['News', 'Destinations', 'Blog', 'Contact'];

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string;
  onAuthOpen: () => void;
  onLogout: () => void;
  onMobileMenuOpen: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({
  isLoggedIn,
  userName,
  onAuthOpen,
  onLogout,
  onMobileMenuOpen,
  currentPage,
  onNavigate,
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between w-full
    bg-white/5 backdrop-blur-md border border-white/10
    rounded-2xl px-5 py-3 mb-6">

      {/* Logo */}
      <div
        className="flex items-center gap-2.5 shrink-0 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <div className="w-9 h-9 rounded-xl bg-amber-500/20
        border border-amber-500/40 flex items-center justify-center">
          <Mountain className="w-5 h-5 text-amber-400
          fill-amber-400/30" />
        </div>
        <span className="text-lg font-bold tracking-wider">
          EthioTravel
        </span>
      </div>

      {/* Desktop links */}
      <div className="hidden lg:flex items-center gap-10 xl:gap-14
      text-[13px] tracking-wide text-gray-400">
        {NAV_LINKS.map((link) => {
          const page = link.toLowerCase();
          const isActive = currentPage === page;
          return isActive ? (
            <button
              key={link}
              onClick={() => onNavigate(page)}
              className="text-white font-semibold flex flex-col
              items-center gap-1.5"
            >
              {link}
              <span className="w-1 h-1 rounded-full bg-white block" />
            </button>
          ) : (
            <button
              key={link}
              onClick={() => onNavigate(page)}
              className="hover:text-white transition-colors duration-200"
            >
              {link}
            </button>
          );
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Search */}
        <button className="w-9 h-9 rounded-full bg-white/10
        border border-white/10 flex items-center justify-center
        hover:bg-white/20 transition-all duration-200">
          <Search className="w-4 h-4 text-white/80" />
        </button>

        {/* Login or Logout */}
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="hidden sm:flex items-center gap-2 bg-white/10
            hover:bg-white/20 border border-white/20 text-white
            text-[12px] font-semibold px-4 py-2 rounded-full
            transition-all duration-200 active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={onAuthOpen}
            className="hidden sm:flex items-center gap-2 bg-white/10
            hover:bg-white/20 border border-white/20 text-white
            text-[12px] font-semibold px-4 py-2 rounded-full
            transition-all duration-200 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
        )}

        {/* Avatar */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={isLoggedIn ? undefined : onAuthOpen}
        >
          <span className="hidden lg:block text-[13px] text-gray-300
          group-hover:text-white transition-colors">
            {isLoggedIn ? (
              <>
                Hello,{' '}
                <span className="font-semibold text-white">
                  {userName}!
                </span>
              </>
            ) : (
              'Sign in'
            )}
          </span>
          <img
            src="/avatar.jpg"
            alt="User"
            className="w-9 h-9 rounded-full object-cover border
            border-white/20 group-hover:border-white/50
            transition-all shadow-lg"
          />
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden w-9 h-9 rounded-full border
          border-white/20 flex items-center justify-center
          hover:bg-white/10 transition-all"
          onClick={onMobileMenuOpen}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}