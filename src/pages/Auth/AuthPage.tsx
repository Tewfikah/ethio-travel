// ─── src/pages/Auth/AuthPage.tsx ─────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// This is the Login and Signup modal
// It connects to AuthContext to save the logged in user
// onClose prop comes from MainLayout to close the modal
//
// HOW SUBMIT WORKS:
// User fills form → clicks submit
// → handleSubmit runs
// → calls authService (fake API for now)
// → gets user data back
// → calls login() to save to AuthContext
// → calls onClose() to close modal
// → Navbar now shows user name!

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Mountain,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Login or Signup mode
type AuthMode = 'login' | 'signup';

/* ── SocialButton ────────────────────────────────────────────────────
   Small button for Google Apple X login
   Kept here because only used in this file
*/
function SocialButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex items-center justify-center w-14 h-12 rounded-xl
      border border-gray-200 hover:border-gray-400 hover:bg-gray-50
      active:scale-95 transition-all duration-200"
    >
      {icon}
    </button>
  );
}

/* ── InputField ──────────────────────────────────────────────────────
   Reusable input — used for all form fields
   icon = left icon (Mail, Lock, User)
   rightIcon = optional eye icon for password
*/
function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  rightIcon,
  onRightIconClick,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}) {
  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-gray-400
        uppercase tracking-wider mb-1.5 pl-1"
      >
        {label}
      </label>
      <div className="relative">
        {/* Left icon */}
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2
        text-gray-400 group-focus-within:text-blue-600
        transition-colors duration-200">
          {icon}
        </span>

        {/* Input field */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl border
          border-gray-200 focus:border-blue-500
          focus:ring-2 focus:ring-blue-500/20 outline-none
          bg-white text-gray-800 placeholder-gray-400
          text-sm transition-all duration-200"
        />

        {/* Right icon — eye button for password */}
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3.5 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-600 transition-colors"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── AuthPage ────────────────────────────────────────────────────────
   Main component
   onClose = function from MainLayout to close this modal
*/
export default function AuthPage({ onClose }: { onClose: () => void }) {

  // Which mode are we in — login or signup
  const [mode, setMode] = useState<AuthMode>('login');

  // Show or hide password text
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Remember me checkbox
  const [remember, setRemember] = useState(false);

  // Loading state — shows spinner while submitting
  const [loading, setLoading] = useState(false);

  // Form fields — each has its own state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Simple check — are we in login mode?
  const isLogin = mode === 'login';

  // Get login function from AuthContext (our whiteboard)
  const { login } = useAuth();

  /* ── Handle Form Submit ──────────────────────────────────────────
     Right now uses fake data
     When backend is ready:
     Replace setTimeout with real API call!
  */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stop page from refreshing
    setLoading(true);   // show spinner

    // Fake API call — replace with real API later!
    setTimeout(() => {
      setLoading(false);

      // Save user to AuthContext whiteboard
      // Replace this with real user data from API!
      login({
        id: '1',
        name: name || 'Traveler',
        email: email,
        avatar: '/avatar.jpg',
      });

      onClose(); // close the modal
    }, 1500);
  };

  return (
    /* Full screen overlay */
    <div className="fixed inset-0 z-[200] flex items-center
    justify-center p-4 sm:p-6 overflow-y-auto">

      {/* Dark backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Modal Card ── */}
      <div className="relative z-10 w-full max-w-4xl min-h-[560px]
      bg-white rounded-3xl shadow-2xl overflow-hidden
      flex flex-col md:flex-row">

        {/* ══ LEFT SIDE — FORM ═══════════════════════════════════════ */}
        <div className="flex-1 flex flex-col px-8 sm:px-10 py-8
        sm:py-10 bg-white overflow-y-auto">

          {/* Brand */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex
            items-center justify-center shadow">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-gray-800
            tracking-wide">
              EthioTravel
            </span>
          </div>
          <p className="text-[11px] text-gray-400 tracking-wider mb-7">
            Explore More. Experience Life.
          </p>

          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-7">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold
              border transition-all duration-300 ${
                !isLogin
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold
              border transition-all duration-300 ${
                isLogin
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              Log In
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            {isLogin ? 'Journey Begins' : 'Start Your Journey'}
          </h2>
          <p className="text-[12px] text-gray-400 mb-5">
            {isLogin
              ? 'Log in to your account'
              : 'Create your free account today'}
          </p>

          {/* Social Buttons */}
          <div className="flex items-center gap-3 mb-5">
            {/* Apple */}
            <SocialButton
              label="Continue with Apple"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-800">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              }
            />
            {/* Google */}
            <SocialButton
              label="Continue with Google"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              }
            />
            {/* X */}
            <SocialButton
              label="Continue with X"
              icon={
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-800">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Full Name — signup only */}
            {!isLogin && (
              <InputField
                id="name"
                label="Full Name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={setName}
                icon={<User className="w-4 h-4" />}
              />
            )}

            {/* Email — signup only */}
            {!isLogin && (
              <InputField
                id="email"
                label="Email Address"
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={setEmail}
                icon={<Mail className="w-4 h-4" />}
              />
            )}

            {/* Username or Email — login only */}
            {isLogin && (
              <InputField
                id="username"
                label="Username or Email"
                type="text"
                placeholder="eli_trekker"
                value={email}
                onChange={setEmail}
                icon={<User className="w-4 h-4" />}
              />
            )}

            {/* Password */}
            <InputField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              icon={<Lock className="w-4 h-4" />}
              rightIcon={
                showPassword
                  ? <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />
              }
              onRightIconClick={() => setShowPassword((v) => !v)}
            />

            {/* Confirm Password — signup only */}
            {!isLogin && (
              <InputField
                id="confirm"
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirm}
                onChange={setConfirm}
                icon={<Lock className="w-4 h-4" />}
                rightIcon={
                  showConfirm
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                }
                onRightIconClick={() => setShowConfirm((v) => !v)}
              />
            )}

            {/* Remember me + Forgot password — login only */}
            {isLogin && (
              <div className="flex items-center justify-between -mt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-600 rounded cursor-pointer"
                  />
                  <span className="text-[12px] text-gray-500
                  group-hover:text-gray-700 transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[12px] text-blue-600 hover:text-blue-800
                  font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Terms — signup only */}
            {!isLogin && (
              <p className="text-[11px] text-gray-400 -mt-1">
                By signing up, you agree to our{' '}
                <button type="button" className="text-blue-600 hover:underline font-medium">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </button>.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gray-900
              hover:bg-blue-700 active:scale-[0.98] text-white text-sm
              font-semibold shadow-lg transition-all duration-300
              flex items-center justify-center gap-2 mt-1
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {isLogin ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch between Login and Signup */}
          <p className="text-[12px] text-gray-400 text-center mt-5">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
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

        {/* ══ RIGHT SIDE — IMAGE PANEL ════════════════════════════════ */}
        <div className="hidden md:flex md:w-[48%] relative flex-col
        overflow-hidden rounded-r-3xl">

          {/* Background image */}
          <img
            src="/auth-bg.jpg"
            alt="Ethiopia landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t
          from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-br
          from-blue-900/30 to-transparent" />

          {/* Top info card */}
          <div className="relative z-10 m-5 bg-white/10 backdrop-blur-xl
          border border-white/20 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex
            items-center justify-center shrink-0 shadow-lg">
              <span className="text-white text-xs">♥</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">
                Wander, Explore,
              </p>
              <p className="text-white font-bold text-sm leading-tight mb-1.5">
                Experience.
              </p>
              <p className="text-white/65 text-[11px] leading-relaxed">
                Discover new places, embrace adventures, & create
                unforgettable travel memories worldwide.
              </p>
            </div>
            <button className="w-7 h-7 rounded-full bg-white/10 border
            border-white/20 flex items-center justify-center shrink-0
            hover:bg-white/20 transition-all">
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </div>

          {/* Bottom text */}
          <div className="relative z-10 mt-auto p-6 pb-7">
            <h3 className="text-white text-xl sm:text-2xl font-bold
            leading-tight mb-3 drop-shadow-lg">
              Escape the Ordinary,<br />
              Embrace the Journey!
            </h3>
            <button className="flex items-center gap-2 bg-white/10
            backdrop-blur-sm border border-white/20 text-white
            text-[12px] font-medium px-4 py-2 rounded-full
            hover:bg-white/20 transition-all duration-200">
              Experience the world your way!
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full
            bg-black/30 border border-white/20 flex items-center
            justify-center text-white hover:bg-black/50 transition-all
            text-sm font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-20 w-8 h-8
          rounded-full bg-gray-100 flex items-center justify-center
          text-gray-600 hover:bg-gray-200 transition-all text-sm font-bold"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}