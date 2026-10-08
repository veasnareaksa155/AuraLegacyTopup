import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Zap
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/payments';
import type { Translations } from '../utils/i18n';
import { sound } from '../utils/sound';

interface OrderTrackerModalProps {
  onClose: () => void;
  t: Translations;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ onClose, t }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (idToSearch?: string) => {
    sound.playClick();
    const query = (idToSearch || searchInput).trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);
    const found = MOCK_ORDERS.find((o) => o.id === query);
    
    if (found) {
      setSearchedOrder(found);
      sound.playSuccess();
    } else {
      // Create a dynamic simulated order result if not in mock list
      if (query.startsWith('AURA-')) {
        setSearchedOrder({
          id: query,
          gameTitle: 'Mobile Legends: Bang Bang',
          denomination: 'Weekly Diamond Pass',
          status: 'COMPLETED',
          time: 'Baru saja',
          user: 'Gamer***99',
          total: '$1.79'
        });
        sound.playSuccess();
      } else {
        setSearchedOrder(null);
        sound.playError();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card rounded-3xl border border-slate-200 dark:border-cyan-500/40 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t.trackerBadge}</span>
          </div>
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">
            {t.trackerTitle}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            {t.trackerDesc}
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t.searchInvoicePlaceholder}
              className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 pl-10 pr-4 py-3 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 uppercase font-mono shadow-xs"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-white font-bold text-xs tracking-wider shadow-aura-cyan transition-all flex-shrink-0 font-tech"
          >
            {t.searchAction}
          </button>
        </div>

        {/* Quick Demo ID links */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400 mb-6">
          <span className="text-[11px]">{t.tryDemoId}:</span>
          {MOCK_ORDERS.slice(0, 3).map((mo) => (
            <button
              key={mo.id}
              onClick={() => {
                setSearchInput(mo.id);
                handleSearch(mo.id);
              }}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              {mo.id}
            </button>
          ))}
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <div>
            {searchedOrder ? (
              <div className="bg-slate-50 dark:glass-panel rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 animate-in fade-in">
                {/* Header Status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Order ID:</span>
                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">{searchedOrder.id}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>SUKSES DIKIRIM</span>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="relative pl-6 space-y-5 my-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-500/40">
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-cyan-400 border-2 border-white dark:border-[#070913] shadow-aura-cyan flex items-center justify-center" />
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{t.orderReceived}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Aura Legacy system recorded invoice</div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-cyan-400 border-2 border-white dark:border-[#070913] shadow-aura-cyan flex items-center justify-center" />
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{t.paymentVerified}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Gateway verified payment</div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-[#070913] shadow-emerald-500/40 flex items-center justify-center" />
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-300">{t.serverInjected}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {searchedOrder.denomination}
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Game:</span>
                    <p className="font-semibold text-slate-900 dark:text-white">{searchedOrder.gameTitle}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Nominal:</span>
                    <p className="font-semibold text-cyan-700 dark:text-cyan-300">{searchedOrder.denomination}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Account:</span>
                    <p className="font-mono text-slate-900 dark:text-white">{searchedOrder.user}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Total:</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">{searchedOrder.total}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 dark:glass-panel rounded-2xl p-6 text-center border border-rose-500/30">
                <AlertCircle className="w-8 h-8 text-rose-500 dark:text-rose-400 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.orderNotFound}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Please verify your invoice or order number.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
