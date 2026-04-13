import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ArrowRight,
  Mountain,
  Menu,
  X,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from 'lucide-react';

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
const ACTIVE_LINK = 'Destinations';
const AUTO_PLAY_INTERVAL = 4000;

/* ─── Types ─────────────────────────────────────────────────────────── */
type AuthMode = 'login' | 'signup';

interface AuthUser {
  name: string;
  email: string;
}

/* ─── Star Dots ─────────────────────────────────────────────────────── */
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

/* ─── Auth Modal ────────────────────────────────────────────────────── */
function AuthModal({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: name || 'Traveler', email });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center
    justify-center p-3 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl bg-white
      rounded-2xl shadow-2xl overflow-hidden flex flex-col
      md:flex-row max-h-[92vh]">

        {/* ══ LEFT — FORM ══════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col px-6 py-5 bg-white
        overflow-y-auto">

          {/* Brand */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex
              items-center justify-center shadow">
                <Mountain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-800
              tracking-wide">
                EthioTravel
              </span>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden w-7 h-7 rounded-full bg-gray-100
              flex items-center justify-center text-gray-500
              hover:bg-gray-200 transition-all text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Toggle tabs */}
          <div className="flex gap-1.5 mb-4 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold
              transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold
              transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Log In
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-lg font-bold text-gray-900 mb-0.5">
            {isLogin ? 'Journey Begins' : 'Start Your Journey'}
          </h2>
          <p className="text-[11px] text-gray-400 mb-3">
            {isLogin
              ? 'Log in to your account'
              : 'Create your free account today'}
          </p>

          {/* Social buttons */}
          <div className="flex items-center gap-2 mb-3">
            {/* Apple */}
            <button
              type="button"
              className="flex-1 flex items-center justify-center
              h-9 rounded-lg border border-gray-200 hover:bg-gray-50
              active:scale-95 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-800">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>

            {/* Google */}
            <button
              type="button"
              className="flex-1 flex items-center justify-center
              h-9 rounded-lg border border-gray-200 hover:bg-gray-50
              active:scale-95 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* X */}
            <button
              type="button"
              className="flex-1 flex items-center justify-center
              h-9 rounded-lg border border-gray-200 hover:bg-gray-50
              active:scale-95 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gray-800">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] text-gray-400 font-medium">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

            {/* Full Name — signup only */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-[10px] font-semibold
                text-gray-400 uppercase tracking-wider mb-1 pl-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2
                  -translate-y-1/2 text-gray-400">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border
                    border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Email — signup only */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-[10px] font-semibold
                text-gray-400 uppercase tracking-wider mb-1 pl-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2
                  -translate-y-1/2 text-gray-400">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border
                    border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Username — login only */}
            {isLogin && (
              <div className="relative">
                <label className="block text-[10px] font-semibold
                text-gray-400 uppercase tracking-wider mb-1 pl-1">
                  Username or Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2
                  -translate-y-1/2 text-gray-400">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eli_trekker"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border
                    border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <label className="block text-[10px] font-semibold
              text-gray-400 uppercase tracking-wider mb-1 pl-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2
                -translate-y-1/2 text-gray-400">
                  <Lock className="w-3.5 h-3.5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 rounded-lg border
                  border-gray-200 focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/20 outline-none
                  bg-white text-gray-800 placeholder-gray-400
                  text-xs transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="w-3.5 h-3.5" />
                    : <Eye className="w-3.5 h-3.5" />
                  }
                </button>
              </div>
            </div>

            {/* Confirm Password — signup only */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-[10px] font-semibold
                text-gray-400 uppercase tracking-wider mb-1 pl-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2
                  -translate-y-1/2 text-gray-400">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 rounded-lg border
                    border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm
                      ? <EyeOff className="w-3.5 h-3.5" />
                      : <Eye className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>
              </div>
            )}

            {/* Remember + Forgot — login only */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3 h-3 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-gray-500">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[11px] text-blue-600
                  hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Terms — signup only */}
            {!isLogin && (
              <p className="text-[10px] text-gray-400">
                By signing up, you agree to our{' '}
                <button type="button"
                className="text-blue-600 hover:underline font-medium">
                  Terms
                </button>{' '}
                and{' '}
                <button type="button"
                className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </button>.
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gray-900
              hover:bg-blue-700 active:scale-[0.98] text-white text-xs
              font-semibold shadow-lg transition-all duration-300
              flex items-center justify-center gap-2
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin"
                  viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12"
                    r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {isLogin ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-[11px] text-gray-400 text-center mt-3">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setMode(isLogin ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-800 font-semibold
              transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* ══ RIGHT — IMAGE PANEL ══════════════════════════════════ */}
        <div className="hidden md:flex md:w-[42%] relative flex-col
        overflow-hidden rounded-r-2xl">
          <img
            src="/auth-bg.jpg"
            alt="Ethiopia"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t
          from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-br
          from-blue-900/30 to-transparent" />

          {/* Top card */}
          <div className="relative z-10 m-4 bg-white/10 backdrop-blur-xl
          border border-white/20 rounded-xl p-3 flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-red-500 flex
            items-center justify-center shrink-0 shadow-lg">
              <span className="text-white text-[10px]">♥</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs leading-tight mb-1">
                Wander, Explore, Experience.
              </p>
              <p className="text-white/65 text-[10px] leading-relaxed">
                Discover new places & create unforgettable memories.
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-10 mt-auto p-5">
            <h3 className="text-white text-lg font-bold leading-tight
            mb-2 drop-shadow-lg">
              Escape the Ordinary,<br />
              Embrace the Journey!
            </h3>
            <button className="flex items-center gap-2 bg-white/10
            backdrop-blur-sm border border-white/20 text-white
            text-[11px] font-medium px-3 py-1.5 rounded-full
            hover:bg-white/20 transition-all duration-200">
              Experience the world your way!
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full
            bg-black/30 border border-white/20 flex items-center
            justify-center text-white hover:bg-black/50 transition-all
            text-xs font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ──────────────────────────────────────────────────────── */
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const isLoggedIn = user !== null;

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
        className={`fixed inset-0 z-[100] bg-[#060c1e]/96 backdrop-blur-xl
        flex flex-col items-center justify-center gap-10
        transition-all duration-500 ${
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

        {/* ══ NAVBAR ════════════════════════════════════════════ */}
        <nav className="flex items-center justify-between w-full
        bg-white/5 backdrop-blur-md border border-white/10
        rounded-2xl px-5 py-3 mb-6">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20
            border border-amber-500/40 flex items-center
            justify-center">
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
            {NAV_LINKS.map((link) =>
              link === ACTIVE_LINK ? (
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
                <a
                  key={link}
                  href="#"
                  className="hover:text-white transition-colors
                  duration-200"
                >
                  {link}
                </a>
              )
            )}
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
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2
                bg-white/10 hover:bg-white/20 border border-white/20
                text-white text-[12px] font-semibold px-4 py-2
                rounded-full transition-all duration-200 active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden sm:flex items-center gap-2
                bg-white/10 hover:bg-white/20 border border-white/20
                text-white text-[12px] font-semibold px-4 py-2
                rounded-full transition-all duration-200 active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Avatar */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={isLoggedIn ? undefined : () => setAuthOpen(true)}
            >
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
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <main className="flex-1 flex flex-col lg:flex-row items-center
        lg:items-stretch mt-4 sm:mt-6 lg:mt-0 gap-10 lg:gap-0
        pb-16 lg:pb-10">

          {/* ── LEFT COLUMN ───────────────────────────────────── */}
          <div className="w-full lg:w-[48%] flex items-center
          lg:items-stretch relative z-10">

            {/* Vertical progress */}
            <aside className="hidden md:flex flex-col items-center
            justify-between py-8 mr-8 xl:mr-12 shrink-0 self-center
            h-[360px] lg:h-[420px]">
              <div className="flex flex-col items-center gap-5">
                <div className="w-8 h-8 rounded-full border
                border-white/40 flex items-center justify-center
                text-[10px] font-semibold text-white/70 tracking-widest">
                  {String(currentSlide + 1).padStart(2, '0')}
                </div>
                <div className="flex flex-col gap-2.5">
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all
                      duration-300 ${
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
                  {String(total).padStart(2, '0')}
                </span>
              </div>
            </aside>

            {/* Hero text */}
            <div className="flex flex-col justify-center max-w-lg
            relative z-10">
              <span
                aria-hidden="true"
                className="absolute -top-6 sm:-top-10 -left-2
                text-[5rem] sm:text-[7rem] md:text-[8rem]
                xl:text-[10rem] font-black text-white/[0.03]
                pointer-events-none leading-none tracking-tighter
                uppercase select-none"
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
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5
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

          {/* ── RIGHT COLUMN — SLIDER ─────────────────────────── */}
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
                    className={`absolute inset-0 transition-all
                    duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
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
                      flex items-center justify-center shadow-lg
                      shrink-0">
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
                            object-cover transition-transform
                            duration-[2s] ease-out group-hover:scale-110"
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

            {/* Slider Controls */}
            <div className="flex items-center justify-between mt-6
            sm:mt-8 pr-4 sm:pr-8 lg:pr-[20%]">
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border
                  border-white/20 bg-white/5 backdrop-blur-sm flex
                  items-center justify-center hover:bg-white/15
                  active:scale-90 transition-all duration-200 group"
                >
                  <ChevronLeft className="w-4 h-4 text-white/70
                  group-hover:text-white group-hover:-translate-x-0.5
                  transition-all" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border
                  border-white/20 bg-white/5 backdrop-blur-sm flex
                  items-center justify-center hover:bg-white/15
                  active:scale-90 transition-all duration-200 group"
                >
                  <ChevronRight className="w-4 h-4 text-white/70
                  group-hover:text-white group-hover:translate-x-0.5
                  transition-all" />
                </button>
              </div>

              {/* Progress track */}
              <div className="flex items-center gap-3 text-[11px]
              font-mono tracking-widest text-white/35">
                <span className={
                  currentSlide === 0 ? 'text-white font-semibold' : ''
                }>
                  01
                </span>
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
        </main>
      </div>
    </div>
  );
}