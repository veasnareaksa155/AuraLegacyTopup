import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Lock, 
  Key, 
  RefreshCw, 
  Globe, 
  Cpu, 
  Save 
} from 'lucide-react';
import { saveNewPassword } from '../../services/adminAuth';
import { sound } from '../../utils/sound';

export const AdminSystemTab: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>('USD');
  const [checkingBalance, setCheckingBalance] = useState(false);

  // Password Change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMessage, setPwMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchLiveBalance = async () => {
    sound.playClick();
    setCheckingBalance(true);
    try {
      const res = await fetch('/api/moogold/balance');
      const data = await res.json();
      if (data && data.balance !== undefined) {
        setBalance(data.balance.toString());
        setCurrency(data.currency || 'USD');
        sound.playSuccess();
      } else {
        setBalance('0.00');
      }
    } catch {
      setBalance('0.00 (Offline)');
      sound.playError();
    } finally {
      setCheckingBalance(false);
    }
  };

  useEffect(() => {
    fetchLiveBalance();
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!newPassword || newPassword.length < 4) {
      sound.playError();
      setPwMessage({ type: 'error', text: 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៤ តួអក្សរ' });
      return;
    }

    if (newPassword !== confirmPassword) {
      sound.playError();
      setPwMessage({ type: 'error', text: 'ការបញ្ជាក់ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ!' });
      return;
    }

    const ok = saveNewPassword(newPassword);
    if (ok) {
      sound.playSuccess();
      setPwMessage({ type: 'success', text: 'បានផ្លាស់ប្តូរពាក្យសម្ងាត់ Admin ជោគជ័យ!' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: MooGold API & Proxy Engine */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>MooGold API Engine & Proxy Network</span>
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE ACTIVE</span>
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-white/5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tokyo Static Outbound Proxy</span>
              </span>
              <span className="font-mono font-bold text-cyan-300">142.111.67.146:5611</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-purple-400" />
                <span>Partner ID Masked</span>
              </span>
              <span className="font-mono font-bold text-white">439c30de***</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-white/5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>HMAC Signature Algorithm</span>
              </span>
              <span className="font-mono font-bold text-slate-300">HMAC-SHA256 (Payload+Time)</span>
            </div>

            {/* Wallet Balance */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between mt-3">
              <div>
                <span className="text-[11px] text-slate-400 block">សមតុល្យក្នុងកាបូប MooGold (Wallet)</span>
                <span className="font-display font-black text-2xl text-white">
                  ${balance !== null ? balance : '...'} {currency}
                </span>
              </div>
              <button
                onClick={fetchLiveBalance}
                disabled={checkingBalance}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-cyan-400 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingBalance ? 'animate-spin' : ''}`} />
                <span>Check Balance</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Admin Password Settings */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>សុវត្ថិភាពគណនី (Admin Passcode)</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Master Security</span>
          </div>

          {pwMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                pwMessage.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/20 border-rose-500/30 text-rose-300'
              }`}
            >
              <span>{pwMessage.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-tech text-slate-400 uppercase tracking-wider mb-1">
                ពាក្យសម្ងាត់ថ្មី (New Password)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-tech text-slate-400 uppercase tracking-wider mb-1">
                បញ្ជាក់ពាក្យសម្ងាត់ថ្មី (Confirm Password)
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-2"
            >
              <Save className="w-4 h-4" />
              <span>ផ្លាស់ប្តូរពាក្យសម្ងាត់ (Update Passcode)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
