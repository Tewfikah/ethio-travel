// ─── src/pages/Auth/AuthModal.tsx ────────────────────────────────────
import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Mountain,
} from 'lucide-react';

type AuthMode = 'login' | 'signup';

interface AuthUser {
  name: string;
  email: string;
}

export default function AuthModal({
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
            {/* Mobile close */}
            <button
              onClick={onClose}
              className="md:hidden w-7 h-7 rounded-full bg-gray-100
              flex items-center justify-center text-gray-500
              hover:bg-gray-200 text-xs font-bold"
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
            <button type="button"
            className="flex-1 flex items-center justify-center
            h-9 rounded-lg border border-gray-200 hover:bg-gray-50
            active:scale-95 transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-800">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>

            {/* Google */}
            <button type="button"
            className="flex-1 flex items-center justify-center
            h-9 rounded-lg border border-gray-200 hover:bg-gray-50
            active:scale-95 transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            {/* X */}
            <button type="button"
            className="flex-1 flex items-center justify-center
            h-9 rounded-lg border border-gray-200 hover:bg-gray-50
            active:scale-95 transition-all">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gray-800">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

            {/* Full Name — signup only */}
            {!isLogin && (
              <div>
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
                    className="w-full pl-9 pr-3 py-2 rounded-lg
                    border border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email — signup only */}
            {!isLogin && (
              <div>
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
                    className="w-full pl-9 pr-3 py-2 rounded-lg
                    border border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all"
                  />
                </div>
              </div>
            )}

            {/* Username — login only */}
            {isLogin && (
              <div>
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
                    className="w-full pl-9 pr-3 py-2 rounded-lg
                    border border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
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
                  className="w-full pl-9 pr-9 py-2 rounded-lg
                  border border-gray-200 focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/20 outline-none
                  bg-white text-gray-800 placeholder-gray-400
                  text-xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-gray-600"
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
              <div>
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
                    className="w-full pl-9 pr-9 py-2 rounded-lg
                    border border-gray-200 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20 outline-none
                    bg-white text-gray-800 placeholder-gray-400
                    text-xs transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 hover:text-gray-600"
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
                <label className="flex items-center gap-1.5
                cursor-pointer">
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
                <button type="button"
                className="text-[11px] text-blue-600 hover:text-blue-800
                font-medium">
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
                </button>{' '}and{' '}
                <button type="button"
                className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </button>.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gray-900
              hover:bg-blue-700 active:scale-[0.98] text-white
              text-xs font-semibold shadow-lg transition-all duration-300
              flex items-center justify-center gap-2
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin"
                  viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12"
                    r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"/>
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
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* ══ RIGHT — IMAGE ══════════════════════════════════════ */}
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
            items-center justify-center shrink-0">
              <span className="text-white text-[10px]">♥</span>
            </div>
            <div>
              <p className="text-white font-bold text-xs mb-1">
                Wander, Explore, Experience.
              </p>
              <p className="text-white/65 text-[10px] leading-relaxed">
                Discover new places & create unforgettable memories.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 mt-auto p-5">
            <h3 className="text-white text-lg font-bold leading-tight
            mb-2">
              Escape the Ordinary,<br />
              Embrace the Journey!
            </h3>
            <button className="bg-white/10 border border-white/20
            text-white text-[11px] px-3 py-1.5 rounded-full
            hover:bg-white/20 transition-all">
              Experience the world your way!
            </button>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full
            bg-black/30 border border-white/20 flex items-center
            justify-center text-white hover:bg-black/50 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}