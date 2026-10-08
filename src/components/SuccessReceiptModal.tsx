import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Zap,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Game, GameDenomination, PaymentMethod, Currency } from '../types';
import type { Translations } from '../utils/i18n';
import { formatPrice, formatDate } from '../utils/format';
import { sound } from '../utils/sound';
import type { TopUpOrderResult } from '../services/topupApi';

interface SuccessReceiptModalProps {
  receipt: {
    orderId: string;
    game: Game;
    denomination: GameDenomination;
    paymentMethod: PaymentMethod;
    userId: string;
    zoneId?: string;
    server?: string;
    nickname?: string;
    whatsapp?: string;
    total: number;
    paidAt: string;
    moogoldResult?: TopUpOrderResult;
  };
  currency: Currency;
  t: Translations;
  onClose: () => void;
  onNewOrder: () => void;
}

export const SuccessReceiptModal: React.FC<SuccessReceiptModalProps> = ({
  receipt,
  currency,
  t,
  onClose,
  onNewOrder,
}) => {
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    // Fire confetti bursts
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#4facfe', '#9d4edd', '#ffb703', '#10b981'],
    });

    const timeout = setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  const copyId = () => {
    sound.playClick();
    navigator.clipboard.writeText(receipt.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg glass-card rounded-3xl border border-slate-200 dark:border-emerald-500/40 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Holographic Glow Badge */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] mx-auto shadow-lg shadow-emerald-500/30">
              <div className="w-full h-full bg-white dark:bg-[#0a1420] rounded-[14px] flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-bounce" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px] tracking-wider uppercase mb-2">
            {t.deliverySuccessBadge}
          </span>
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">
            {t.deliverySuccessTitle}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            {t.deliverySuccessDesc}
          </p>
        </div>

        {/* Detailed Struk / Receipt Card */}
        <div className="bg-slate-50 dark:glass-panel rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 mb-6 space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400">{t.orderIdLabel}:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">{receipt.orderId}</span>
              <button
                onClick={copyId}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Salin Order ID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Game:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{receipt.game.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t.itemLabel}:</span>
            <span className="font-bold text-cyan-700 dark:text-cyan-300">{receipt.denomination.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">User ID / Server:</span>
            <span className="font-mono text-slate-900 dark:text-white">
              {receipt.userId} {receipt.zoneId ? `(${receipt.zoneId})` : ''} {receipt.server ? `[${receipt.server}]` : ''}
            </span>
          </div>

          {receipt.nickname && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Nickname:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{receipt.nickname}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t.methodLabel}:</span>
            <span className="text-slate-800 dark:text-slate-200">{receipt.paymentMethod.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Time:</span>
            <span className="text-slate-500 dark:text-slate-400">{formatDate(receipt.paidAt)}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400">{t.totalPaid}:</span>
            <span className="font-display font-black text-lg text-emerald-600 dark:text-emerald-400">
              {formatPrice(receipt.total, currency)}
            </span>
          </div>

          <div className="pt-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>MooGold Direct Injection</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  {receipt.moogoldResult?.status || 'COMPLETED'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>ល្បឿនបញ្ចូល (Delivery Speed):</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {receipt.moogoldResult?.deliveryTime || '1.2 វិនាទី'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>ប្រព័ន្ធ Server:</span>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {receipt.moogoldResult?.isSandbox !== false ? 'MooGold Engine (Sandbox Ready)' : 'MooGold Live Official'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-slate-100 dark:glass-panel border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Printer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.printReceipt}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNewOrder();
            }}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-aura-cyan transition-all"
          >
            <span>{t.topUpAgain}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors text-center"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
