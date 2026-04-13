import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ArrowRight,
  X,
  LogIn,
  LogOut,
} from 'lucide-react';
import Navbar from './components/shared/Navbar';
import AuthModal from './pages/Auth/AuthModal';
import NewsPage from './pages/News/NewsPage';

/* ─── Data ─────────────────────────────────────────────────────────── */
const destinations = [
  {
    id: 1,
    title: 'Lalibela Churches',
    sub: 'Lalibela, Ethiopia',
    rating: 5,
    image: '/dest-1.jpg',
  },
  {
    id: 2,
    title: 'Blue Nile Falls',
    sub: 'Tis Abay, Ethiopia',
    rating: 5,
    image: '/dest-2.jpg',
  },
  {
    id: 3,
    title: 'Fasil Ghebbi',
    sub: 'Gondar, Ethiopia',
    rating: 4,
    image: '/dest-3.jpg',
  },
  {
    id: 4,
    title: 'Erta Ale Volcano',
    sub: 'Afar Region, Ethiopia',
    rating: 5,
    image: '/dest-4.jpg',
  },
];

const NAV_LINKS = ['News', 'Destinations', 'Blog', 'Contact'];
const AUTO_PLAY_INTERVAL = 4000;

/* ─── Types ─────────────────────────────────────────────────────────── */
interface AuthUser {
  name: string;
  email: string;
}

/* ─── StarDots ──────────────────────────────────────────────────────── */
function StarDots({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-300 ${
            i < rating
              ? 'w-2 h-2 bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]'
              : 'w-1.5 h-1.5 bg-white/25'
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Home Page ─────────────────────────────────────────────────────── */
function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = destinations.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, AUTO_PLAY_INTERVAL);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrentSlide((idx + total) % total);
      startTimer();
      setTimeout(() => setAnimating(false), 700);
    },
    [animating, total, startTimer]
  );

  const handlePrev = () => goTo(currentSlide - 1);
  const handleNext = () => goTo(currentSlide + 1);
  const progressPct = ((currentSlide + 1) / total) * 100;

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center
    lg:items-stretch mt-4 sm:mt-6 lg:mt-0 gap-10 lg:gap-0
    pb-16 lg:pb-10">

      {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
      <div className="w-full lg:w-[48%] flex items-center
      lg:items-stretch relative z-10">

        {/* Vertical progress */}
        <aside className="hidden md:flex flex-col items-center
        justify-between py-8 mr-8 xl:mr-12 shrink-0 self-center
        h-[360px] lg:h-[420px]">
          <div className="flex flex-col items-center gap-5">
            <div className="w-8 h-8 rounded-full border border-white/40
            flex items-center justify-center text-[10px] font-semibold
            text-white/70 tracking-widest">
              {String(currentSlide + 1).padStart(2, '0')}
            </div>
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'w-2 h-2 bg-white shadow-[0_0_6px_white]'
                      : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-px h-24 bg-white/15 relative
            overflow-hidden rounded-full">
              <div
                className="absolute bottom-0 w-full bg-white
                transition-all duration-700 ease-out"
                style={{ height: `${progressPct}%` }}
              />
            </div>
            <span
              className="text-[9px] font-mono tracking-[0.3em]
              text-white/40"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              {String(currentSlide + 1).padStart(2, '0')}/
              {String(total).padStart(2, '00')}
            </span>
          </div>
        </aside>

        {/* Hero text */}
        <div className="flex flex-col justify-center max-w-lg
        relative z-10">
          <span
            aria-hidden="true"
            className="absolute -top-6 sm:-top-10 -left-2
            text-[5rem] sm:text-[7rem] md:text-[8rem] xl:text-[10rem]
            font-black text-white/[0.03] pointer-events-none
            leading-none tracking-tighter uppercase select-none"
          >
            Ethiopia
          </span>

          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <span className="w-6 h-px bg-white/40" />
            <span className="text-[11px] font-semibold
            tracking-[0.25em] text-white/60 uppercase">
              Discover Africa
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl
          xl:text-[5.5rem] font-extrabold tracking-tighter
          leading-[1.05] mb-5 sm:mb-6 drop-shadow-2xl">
            ETHIOPIA
          </h1>

          <p className="text-[13px] sm:text-[14px] leading-relaxed
          text-gray-300/90 mb-8 sm:mb-10 max-w-sm md:max-w-md
          font-light">
            As the oldest independent country in Africa, Ethiopia is
            blessed with so many different people, cultures, customs,
            traditions, artworks, food, animals, plants, landscapes —
            almost like 200 countries beautifully melted into one.
          </p>

          <div>
            <button className="group inline-flex items-center gap-3
            bg-[#2A4B8C] hover:bg-[#1E3A8A] active:scale-95
            transition-all duration-300 px-7 sm:px-8 py-3.5
            rounded-xl text-[13px] sm:text-sm font-semibold
            shadow-[0_8px_32px_rgba(42,75,140,0.45)]">
              Explore
              <ArrowRight className="w-4 h-4
              group-hover:translate-x-1.5
              transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile dots */}
          <div className="flex items-center gap-2.5 mt-8 md:hidden">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-5 h-2 bg-white'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN — SLIDER ────────────────────────────────── */}
      <div className="w-full lg:w-[52%] flex flex-col justify-center
      relative z-10 lg:pl-6 xl:pl-10">

        <div
          className="relative overflow-hidden w-full"
          style={{
            maskImage:
              'linear-gradient(to right, black 55%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, black 55%, transparent 100%)',
          }}
        >
          {/* Mobile single card */}
          <div className="lg:hidden relative h-[320px] sm:h-[380px]
          w-full overflow-hidden rounded-3xl">
            {destinations.map((dest, idx) => (
              <div
                key={dest.id}
                className={`absolute inset-0 transition-all duration-700
                ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  idx === currentSlide
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 z-0'
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t
                from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5
                flex items-end justify-between">
                  <div>
                    <p className="font-semibold text-base mb-1">
                      {dest.title}
                    </p>
                    <StarDots rating={dest.rating} />
                  </div>
                  <div className="w-9 h-9 bg-white/95 rounded-full
                  flex items-center justify-center shadow-lg shrink-0">
                    <Bookmark className="w-4 h-4 text-amber-600
                    fill-amber-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop multi card */}
          <div className="hidden lg:block h-[400px] xl:h-[440px]
          overflow-hidden">
            <div
              className="flex gap-5 xl:gap-6 transition-transform
              duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              h-full items-center absolute"
              style={{
                transform: `translateX(calc(-${
                  currentSlide * (260 + 20)
                }px))`,
              }}
            >
              {destinations.map((dest, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <article
                    key={dest.id}
                    onClick={() => goTo(idx)}
                    className={`flex flex-col w-[260px] xl:w-[280px]
                    shrink-0 group transition-all duration-700
                    cursor-pointer ${
                      isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-50 translate-y-3 hover:opacity-75'
                    }`}
                  >
                    <div className="mb-3 px-1">
                      <h3 className="font-semibold text-[14px]
                      text-white/90 leading-tight mb-1.5 truncate">
                        {dest.title}
                      </h3>
                      <StarDots rating={dest.rating} />
                    </div>
                    <div
                      className={`relative rounded-[1.5rem]
                      overflow-hidden shadow-2xl transition-all
                      duration-700 ${
                        isActive
                          ? 'h-[320px] xl:h-[350px] shadow-black/60'
                          : 'h-[280px] xl:h-[310px] shadow-black/20'
                      }`}
                    >
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="absolute inset-0 w-full h-full
                        object-cover transition-transform duration-[2s]
                        ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0
                      bg-gradient-to-t from-black/40 via-transparent
                      to-transparent opacity-0 group-hover:opacity-100
                      transition-opacity duration-500" />
                      <div
                        className={`absolute top-4 right-4 w-9 h-9
                        bg-white/95 rounded-full flex items-center
                        justify-center shadow-lg transition-all
                        duration-300 z-10 ${
                          isActive
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 text-amber-600
                        fill-amber-500" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6
        sm:mt-8 pr-4 sm:pr-8 lg:pr-[20%]">
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20
              bg-white/5 backdrop-blur-sm flex items-center
              justify-center hover:bg-white/15 active:scale-90
              transition-all duration-200 group"
            >
              <ChevronLeft className="w-4 h-4 text-white/70
              group-hover:text-white group-hover:-translate-x-0.5
              transition-all" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20
              bg-white/5 backdrop-blur-sm flex items-center
              justify-center hover:bg-white/15 active:scale-90
              transition-all duration-200 group"
            >
              <ChevronRight className="w-4 h-4 text-white/70
              group-hover:text-white group-hover:translate-x-0.5
              transition-all" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px]
          font-mono tracking-widest text-white/35">
            <span className={
              currentSlide === 0 ? 'text-white font-semibold' : ''
            }>01</span>
            <div className="w-24 sm:w-32 h-[2px] bg-white/10
            rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-white
                rounded-full transition-all duration-700"
                style={{
                  width: `${100 / total}%`,
                  transform: `translateX(${currentSlide * 100}%)`,
                }}
              />
            </div>
            <span className={
              currentSlide === total - 1
                ? 'text-white font-semibold' : ''
            }>
              {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ──────────────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const isLoggedIn = user !== null;

  const handleLogin = (userData: AuthUser) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <div className="relative w-full min-h-screen font-sans text-white
    overflow-hidden bg-[#050d20] select-none">

      {/* ══ AUTH MODAL ══════════════════════════════════════════ */}
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLogin={handleLogin}
        />
      )}

      {/* ══ MOBILE MENU ══════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[100] bg-[#060c1e]/96
        backdrop-blur-xl flex flex-col items-center justify-center
        gap-10 transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="absolute top-6 right-6 w-10 h-10 rounded-full
          border border-white/20 flex items-center justify-center
          hover:bg-white/10 transition-all"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {NAV_LINKS.map((link) => {
          const page = link.toLowerCase();
          return (
            <button
              key={link}
              onClick={() => {
                setCurrentPage(page);
                setMobileMenuOpen(false);
              }}
              className={`text-2xl font-semibold tracking-wide
              transition-colors ${
                currentPage === page
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {link}
            </button>
          );
        })}

        {isLoggedIn ? (
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
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
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setAuthOpen(true);
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

      {/* ══ BACKGROUND ════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r
        from-[#060c1e]/95 via-[#060c1e]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t
        from-[#060c1e]/90 via-transparent to-black/20" />
      </div>

      {/* ══ MAIN WRAPPER ══════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex flex-col
      max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 xl:px-16
      py-6 md:py-8">

        {/* Navbar */}
        <Navbar
          isLoggedIn={isLoggedIn}
          userName={user?.name}
          onAuthOpen={() => setAuthOpen(true)}
          onLogout={handleLogout}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />

        {/* ══ PAGES ═════════════════════════════════════════════ */}
        <main className="flex-1 flex flex-col">

          {/* Home Page */}
          {currentPage === 'home' && <HomePage />}

          {/* News Page */}
          {currentPage === 'news' && <NewsPage />}

          {/* More pages coming soon */}
          {currentPage === 'destinations' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">
                  Destinations
                </h2>
                <p className="text-white/60">Coming Soon...</p>
              </div>
            </div>
          )}

          {currentPage === 'blog' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Blog</h2>
                <p className="text-white/60">Coming Soon...</p>
              </div>
            </div>
          )}

          {currentPage === 'contact' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Contact</h2>
                <p className="text-white/60">Coming Soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}