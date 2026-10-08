import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Trophy, 
  Moon
} from 'lucide-react';
import { sound } from '../utils/sound';

interface WinrateCalculatorModalProps {
  onClose: () => void;
}

export const WinrateCalculatorModal: React.FC<WinrateCalculatorModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'wr' | 'genshin'>('wr');

  // MLBB Win Rate States
  const [totalMatches, setTotalMatches] = useState<number>(300);
  const [currentWr, setCurrentWr] = useState<number>(53.5);
  const [targetWr, setTargetWr] = useState<number>(60);
  const [calculatedWins, setCalculatedWins] = useState<number | null>(null);

  // Genshin Pity States
  const [currentPrimos, setCurrentPrimos] = useState<number>(1600);
  const [currentFates, setCurrentFates] = useState<number>(5);
  const [currentPity, setCurrentPity] = useState<number>(45);

  const calculateWinRate = () => {
    sound.playClick();
    if (totalMatches <= 0 || currentWr <= 0 || targetWr <= 0 || targetWr >= 100) {
      sound.playError();
      return;
    }

    if (targetWr <= currentWr) {
      setCalculatedWins(0);
      sound.playSuccess();
      return;
    }

    // Formula:
    // currentWins = totalMatches * (currentWr / 100)
    // (currentWins + x) / (totalMatches + x) = targetWr / 100
    // currentWins + x = (targetWr/100) * totalMatches + (targetWr/100) * x
    // x * (1 - targetWr/100) = (targetWr/100) * totalMatches - currentWins
    // x = ( (targetWr/100)*totalMatches - currentWins ) / (1 - targetWr/100)
    const currentWins = totalMatches * (currentWr / 100);
    const targetRatio = targetWr / 100;
    const requiredWins = Math.ceil(((targetRatio * totalMatches) - currentWins) / (1 - targetRatio));

    setCalculatedWins(requiredWins);
    sound.playSuccess();
  };

  const totalGenshinPulls = Math.floor(currentPrimos / 160) + currentFates;
  const pullsToHardPity = Math.max(0, 90 - (currentPity + totalGenshinPulls));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card rounded-3xl border border-slate-200 dark:border-purple-500/40 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>GAMER UTILITY TOOLKIT</span>
          </div>
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">
            KALKULATOR PRO GAMER
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Hitung target kemenangan Win Rate Mobile Legends dan estimasi Pity Gacha Genshin Impact.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-white/5 p-1 mb-6 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('wr');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'wr'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-aura-purple'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Kalkulator WR MLBB</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('genshin');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'genshin'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-aura-purple'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 text-cyan-500 dark:text-cyan-300" />
            <span>Kalkulator Pity Gacha</span>
          </button>
        </div>

        {/* MLBB WR Tab */}
        {activeTab === 'wr' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Total Pertandingan:
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={totalMatches}
                  onChange={(e) => setTotalMatches(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-xs"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Win Rate Saat Ini (%):
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={currentWr}
                  onChange={(e) => setCurrentWr(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-xs"
                  min="1"
                  max="99.9"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Win Rate (%):
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={targetWr}
                  onChange={(e) => setTargetWr(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-xs"
                  min="1"
                  max="99.9"
                />
              </div>
            </div>

            <button
              onClick={calculateWinRate}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-aura-cyan transition-all"
            >
              HITUNG KEBUTUHAN WIN STREAK
            </button>

            {calculatedWins !== null && (
              <div className="bg-slate-50 dark:glass-panel rounded-2xl p-5 border border-cyan-500/40 text-center animate-in fade-in">
                <span className="text-xs text-slate-500 dark:text-slate-400">Hasil Perhitungan:</span>
                <div className="font-display font-black text-3xl sm:text-4xl text-cyan-600 dark:text-cyan-400 my-2">
                  {calculatedWins} Win Streak
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {calculatedWins === 0
                    ? 'Target Win Rate kamu sudah tercapai atau lebih kecil dari Win Rate saat ini!'
                    : `Kamu membutuhkan kemenangan berturut-turut sebanyak ${calculatedWins} pertandingan tanpa kalah untuk mencapai Win Rate ${targetWr}%.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Genshin Pity Tab */}
        {activeTab === 'genshin' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primogems Dimiliki:
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={currentPrimos}
                  onChange={(e) => setCurrentPrimos(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-xs"
                  step="160"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Intertwined Fate:
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={currentFates}
                  onChange={(e) => setCurrentFates(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pity Saat Ini:
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={currentPity}
                  onChange={(e) => setCurrentPity(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-xs"
                  max="89"
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:glass-panel rounded-2xl p-5 border border-purple-500/40 text-center space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-xs">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Total Pulls Tersedia:</span>
                  <div className="font-display font-black text-2xl text-purple-700 dark:text-purple-300">{totalGenshinPulls} Pulls</div>
                </div>
                <div className="bg-white dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-xs">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Sisa Menuju Hard Pity (90):</span>
                  <div className="font-display font-black text-2xl text-cyan-600 dark:text-cyan-300">
                    {pullsToHardPity === 0 ? 'GARANSI SIAP!' : `${pullsToHardPity} Pulls lagi`}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kurang Primogems? Top up Blessing of Welkin Moon atau Genesis Crystals di Aura Legacy sekarang untuk harga termurah!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
