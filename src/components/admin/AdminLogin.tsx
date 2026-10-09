import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Store } from 'lucide-react';
import { loginAdmin } from '../../services/adminAuth';
import { sound } from '../../utils/sound';
import brandLogo from '../../assets/logo.png';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    sound.playClick();

    setTimeout(() => {
      const result = loginAdmin(username, password);
      setIsLoading(false);

      if (result.success) {
        sound.playSuccess();
        onLoginSuccess();
      } else {
        sound.playError();
        setError(result.error || 'ការចូលបរាជ័យ');
      }
    }, 400);
  };

  const handleQuickFill = () => {
    sound.playClick();
    setUsername('admin');
    setPassword('aura2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#070913] to-[#04060c] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => {
            sound.playClick();
            onBackToStore();
          }}
          className="bg-[#121933] hover:bg-[#1a2347] px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 border border-white/15 hover:border-cyan-500/40 transition-all shadow-lg cursor-pointer"
        >
          <Store className="w-4 h-4 text-cyan-400" />
          <span>ត្រឡប់ទៅកាន់ហាង (Storefront)</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="admin-card bg-[#0d1326] rounded-3xl p-7 sm:p-9 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2)] backdrop-blur-2xl text-white">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-3">
              <img
                src={brandLogo}
                alt="Aura Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-pulse"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-wider font-tech shadow-md">
                Admin
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white">
              AURA <span className="aura-text-gradient">COMMAND CENTER</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>ប្រព័ន្ធគ្រប់គ្រងការបញ្ជាទិញ និងកែសម្រួលតម្លៃ</span>
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cyan-400 mb-1.5 font-tech uppercase tracking-wider">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#080c1d] border border-white/15 pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-400 mb-1.5 font-tech uppercase tracking-wider">
                Passcode / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#080c1d] border border-white/15 pl-10 pr-11 py-3 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all transform active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>ចូលប្រព័ន្ធគ្រប់គ្រង (Login)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ចុចទីនេះដើម្បីបំពេញគណនីស្វ័យប្រវត្ត (admin / aura2026)</span>
            </button>
          </div>
        </div>

        {/* Security watermark */}
        <p className="text-center text-[11px] text-slate-500 mt-4 font-mono">
          AURA LEGACY v2.5 • MOOGOLD ENGINE SECURED • 256-BIT ENCRYPTION
        </p>
      </div>
    </div>
  );
};

