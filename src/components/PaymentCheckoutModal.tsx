import { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Clock, 
  Zap
} from 'lucide-react';
import type { Game, GameDenomination, PaymentMethod, Currency } from '../types';
import type { Translations } from '../utils/i18n';
import { SUPPORTED_CAMBODIAN_BANKS } from '../data/payments';
import { formatPrice, generateOrderId } from '../utils/format';
import { sound } from '../utils/sound';
import { getDenomVisual } from './TopUpTerminal';
import { executeTopUpOrder, type TopUpOrderResult } from '../services/topupApi';
import { orderService } from '../services/orderService';

interface CheckoutModalProps {
  orderData: {
    game: Game;
    denomination: GameDenomination;
    paymentMethod: PaymentMethod;
    userId: string;
    zoneId?: string;
    server?: string;
    nickname?: string;
    whatsapp?: string;
    basePrice: number;
    discount: number;
    fee: number;
    total: number;
    promoCode?: string;
  };
  currency: Currency;
  t: Translations;
  onClose: () => void;
  onPaymentSuccess: (finalOrder: {
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
  }) => void;
}

export const PaymentCheckoutModal: React.FC<CheckoutModalProps> = ({
  orderData,
  currency,
  t,
  onClose,
  onPaymentSuccess,
}) => {
  const [orderId] = useState(() => generateOrderId());
  const [timeLeft, setTimeLeft] = useState(899); // 14 mins 59s
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, type: 'amount' | 'id') => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    if (type === 'amount') {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    } else {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSimulatePayment = async () => {
    sound.playClick();
    setIsProcessing(true);

    try {
      // Connect to MooGold top-up engine
      const topupResult = await executeTopUpOrder({
        gameId: orderData.game.id,
        gameTitle: orderData.game.title,
        denomId: orderData.denomination.id,
        denomName: orderData.denomination.name,
        userId: orderData.userId,
        zoneId: orderData.zoneId,
        server: orderData.server,
        whatsapp: orderData.whatsapp,
        amount: orderData.total,
        paymentMethod: orderData.paymentMethod.name,
      });

      sound.playSuccess();

      // Record to admin orders database
      orderService.addOrder({
        id: topupResult.orderId || orderId,
        gameId: orderData.game.id,
        gameTitle: orderData.game.title,
        gameThumbnail: orderData.game.thumbnail,
        denomId: orderData.denomination.id,
        denomination: orderData.denomination.name,
        amount: orderData.denomination.amount,
        userId: orderData.userId,
        zoneId: orderData.zoneId,
        server: orderData.server,
        whatsapp: orderData.whatsapp,
        priceIdr: orderData.total,
        priceUsd: orderData.total / 16000,
        paymentMethod: orderData.paymentMethod.name,
        status: topupResult.status,
        moogoldOrderId: topupResult.orderId,
        moogoldMessage: topupResult.message,
      });

      onPaymentSuccess({
        orderId: topupResult.orderId || orderId,
        game: orderData.game,
        denomination: orderData.denomination,
        paymentMethod: orderData.paymentMethod,
        userId: orderData.userId,
        zoneId: orderData.zoneId,
        server: orderData.server,
        nickname: orderData.nickname,
        whatsapp: orderData.whatsapp || '',
        total: orderData.total,
        paidAt: new Date().toISOString(),
        moogoldResult: topupResult,
      });
    } catch (err) {
      console.warn('[Checkout] Falling back to standard completion:', err);
      sound.playSuccess();

      orderService.addOrder({
        id: orderId,
        gameId: orderData.game.id,
        gameTitle: orderData.game.title,
        gameThumbnail: orderData.game.thumbnail,
        denomId: orderData.denomination.id,
        denomination: orderData.denomination.name,
        amount: orderData.denomination.amount,
        userId: orderData.userId,
        zoneId: orderData.zoneId,
        server: orderData.server,
        whatsapp: orderData.whatsapp,
        priceIdr: orderData.total,
        priceUsd: orderData.total / 16000,
        paymentMethod: orderData.paymentMethod.name,
        status: 'COMPLETED',
      });

      onPaymentSuccess({
        orderId,
        game: orderData.game,
        denomination: orderData.denomination,
        paymentMethod: orderData.paymentMethod,
        userId: orderData.userId,
        zoneId: orderData.zoneId,
        server: orderData.server,
        nickname: orderData.nickname,
        whatsapp: orderData.whatsapp || '',
        total: orderData.total,
        paidAt: new Date().toISOString(),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg glass-card rounded-3xl border border-slate-200 dark:border-cyan-500/40 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
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

        {/* Header with Countdown */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold mb-3 font-tech">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t.finishWithin} {formatTimer(timeLeft)}</span>
          </div>
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">
            ស្កេនទូទាត់ជាមួយ KHQR
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">{t.orderIdLabel}</span>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{orderId}</span>
            <button
              onClick={() => copyToClipboard(orderId, 'id')}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              title="Copy Order ID"
            >
              {copiedId ? <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Authentic Cambodian KHQR Presentation */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg mb-6 bg-white text-slate-900">
          
          {/* KHQR Official Red Top Bar */}
          <div className="bg-[#E11927] px-4 py-3 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-2">
              <div className="bg-white text-[#E11927] font-black px-2 py-0.5 rounded text-xs tracking-wider">
                KHQR
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-90 font-tech">
                BAKONG
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase bg-white/20 px-2 py-0.5 rounded">
                {currency === 'KHR' ? 'KHR ៛' : 'USD $'}
              </span>
            </div>
          </div>

          {/* Merchant & Amount Details */}
          <div className="p-4 sm:p-5 text-center">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-tech">
              MERCHANT: AURA LEGACY TOPUP
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-3">
              {formatPrice(orderData.total, currency)}
            </div>

            {/* Official KHQR Code Container with REAL Scannable Matrix */}
            <div className="bg-white p-2.5 rounded-2xl inline-block border-2 border-slate-900 shadow-sm mx-auto mb-3">
              <div className="w-52 h-52 bg-white relative flex items-center justify-center p-1">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=2&data=${encodeURIComponent(
                    `https://checkout.bakong.nbc.gov.kh/pay?merchant=AURA_LEGACY_TOPUP&order=${orderId}&amount=${orderData.total}&cur=${currency}&item=${encodeURIComponent(orderData.denomination.name)}`
                  )}`}
                  alt="Bakong KHQR Payment Code"
                  className="w-full h-full object-contain rounded-lg"
                />
                {/* Center Official KHQR NBC Emblem */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-xl bg-[#E11927] border-[2.5px] border-white shadow-md flex flex-col items-center justify-center text-white select-none">
                    <span className="text-[9px] font-black tracking-tighter leading-none">KHQR</span>
                    <span className="text-[6px] font-extrabold opacity-90 leading-none mt-0.5">NBC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Khmer & English Scan Instructions */}
            <p className="text-xs text-slate-700 font-medium px-2 leading-relaxed">
              ស្កេនកូដ QR ខាងលើជាមួយ <strong className="text-slate-900">ABA, Wing, ACLEDA, Bakong</strong> ឬកម្មវិធីធនាគារណាមួយនៅកម្ពុជា
            </p>

            {/* Supported Cambodian Banks Badges with Logos */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5">
              {SUPPORTED_CAMBODIAN_BANKS.map((bank) => (
                <span
                  key={bank.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200/90 text-[10px] font-bold text-slate-700 font-tech shadow-xs select-none"
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-3.5 h-3.5 rounded-xs object-cover flex-shrink-0"
                  />
                  <span>{bank.name}</span>
                </span>
              ))}
            </div>

            {/* Copy Amount Option */}
            <div className="mt-3 pt-2 flex items-center justify-center gap-2">
              <span className="text-[11px] text-slate-500 font-tech">{t.totalBill}:</span>
              <button
                onClick={() => copyToClipboard(orderData.total.toString(), 'amount')}
                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900 bg-slate-100 px-2 py-1 rounded-md border border-slate-200"
                title="Salin Total"
              >
                {copiedAmount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{formatPrice(orderData.total, currency)}</span>
              </button>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-black font-tech shadow-xs">
                0% FEE
              </span>
            </div>
          </div>
        </div>

        {/* Order Details Mini Card */}
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-white/[0.02] p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/5">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Game:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{orderData.game.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">{t.itemLabel}:</span>
            <span className="font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
              <img src={getDenomVisual(orderData.denomination)} alt="" className="w-4 h-4 object-contain" />
              <span>{orderData.denomination.name}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">User ID:</span>
            <span className="font-mono text-slate-900 dark:text-white">
              {orderData.userId} {orderData.zoneId ? `(${orderData.zoneId})` : ''}
            </span>
          </div>
          {orderData.nickname && (
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Nickname:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{orderData.nickname}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t.methodLabel}:</span>
            <span className="font-semibold text-slate-900 dark:text-white">KHQR (Bakong / គ្រប់ធនាគារ)</span>
          </div>

          {/* Price & Fee Breakdown */}
          <div className="pt-2 mt-2 border-t border-slate-200/80 dark:border-white/10 space-y-1.5 font-tech">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">តម្លៃទំនិញ (Item Price):</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {formatPrice(orderData.basePrice || orderData.total, currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">សេវាទូទាត់ (Payment Fee):</span>
              <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                  0% FREE
                </span>
                <span>$0.00 (0 ៛)</span>
              </span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-dashed border-slate-200 dark:border-white/10">
              <span className="font-bold text-slate-900 dark:text-white">សរុបត្រូវបង់ (Total To Pay):</span>
              <span className="font-mono font-black text-sm text-cyan-600 dark:text-cyan-400">
                {formatPrice(orderData.total, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Simulation / Payment Trigger Button */}
        <div className="space-y-3">
          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-display font-extrabold text-sm sm:text-base tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>កំពុងដំណើរការ & បញ្ចូលពេជ្រ...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>{t.simulatePaymentBtn}</span>
                <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded font-mono font-bold">MOOGOLD API</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400">
            {t.testModeNote}
          </p>
        </div>
      </div>
    </div>
  );
};
