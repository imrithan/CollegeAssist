import React, { useState } from 'react';
import { GraduationCap, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onNavigate: (tab: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('rithan@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password, rememberMe);
    setLoading(false);

    if (res.success) {
      onNavigate('home');
    } else {
      setError(res.error || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F0F5FA]">
      {/* Left Column: Campus Image + Dark Blue Overlay */}
      <div className="relative md:w-1/2 min-h-[300px] md:min-h-screen bg-[#0F243A] overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-left md:bg-center"
          style={{
            backgroundImage: "url('/images/campus_bg.png')",
            opacity: 0.65
          }}
        />
        {/* Navy Gradient Overlay matching Figure 15 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D233A]/90 via-[#0F2A4A]/80 to-[#10345C]/75" />

        {/* Content over background */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-9 h-9 text-white" />
            <span className="text-2xl font-bold tracking-tight text-white">CollegeAssist</span>
          </div>
        </div>

        <div className="relative z-10 my-auto py-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug max-w-md">
            Your AI Powered College Admission Counselor
          </h1>
          <p className="mt-4 text-slate-200 text-sm md:text-base font-normal max-w-sm">
            Get personalized guidance for a brighter future.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-400">
          © 2026 CollegeAssist. All rights reserved.
        </div>
      </div>

      {/* Right Column: Centered Login Card */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
            Login to Your Account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1.5">
                <User className="w-4 h-4 text-slate-600" />
                <span>Email Address</span>
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1.5">
                <Lock className="w-4 h-4 text-slate-600" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm text-slate-800 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-slate-600">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-150 text-sm flex items-center justify-center"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <button
              id="link-to-signup"
              onClick={() => onNavigate('signup')}
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
