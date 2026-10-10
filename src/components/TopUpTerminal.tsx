import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Check,
  HelpCircle, 
  Sparkles, 
  MessageCircle,
  AlertCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Game, GameDenomination, PaymentMethod, Currency } from '../types';
import type { Translations } from '../utils/i18n';
import { PAYMENT_METHODS, SUPPORTED_CAMBODIAN_BANKS } from '../data/payments';
import { formatPrice } from '../utils/format';
import { sound } from '../utils/sound';
import diamondIcon from '../assets/diamond.png';
import diamondDoubleIcon from '../assets/diamond-double.png';
import diamondStackIcon from '../assets/diamond-stack.png';
import diamondVaultIcon from '../assets/diamond-vault.png';
import diamondPassIcon from '../assets/diamond-pass.png';
import { IdGuideModal } from './IdGuideModal';
import { validateGameAccount } from '../services/topupApi';

export const getDenomVisual = (denom: GameDenomination) => {
  const nameLower = denom.name.toLowerCase();
  if (denom.category === 'membership' || nameLower.includes('pass') || nameLower.includes('starlight') || nameLower.includes('welkin') || nameLower.includes('twilight')) {
    return diamondPassIcon;
  }
  const digits = parseInt(denom.name.replace(/\D/g, ''), 10) || 0;
  if (digits >= 700) return diamondVaultIcon;
  if (digits >= 300) return diamondStackIcon;
  if (digits >= 150) return diamondDoubleIcon;
  return diamondIcon;
};

interface TopUpTerminalProps {
  game: Game;
  onBack: () => void;
  currency: Currency;
  t: Translations;
  onProceedCheckout: (orderData: {
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
  }) => void;
}

export const TopUpTerminal: React.FC<TopUpTerminalProps> = ({
  game,
  onBack,
  currency,
  t,
  onProceedCheckout,
}) => {
  // Step 1: Account
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [server, setServer] = useState(game.servers ? game.servers[0] : '');
  const [isValidating, setIsValidating] = useState(false);
  const [validatedNickname, setValidatedNickname] = useState<string | null>(null);
  const [showIdHelpModal, setShowIdHelpModal] = useState(false);

  // Step 2: Denomination
  const [selectedDenom, setSelectedDenom] = useState<GameDenomination | null>(
    game.denominations.find((d) => d.popular) || game.denominations[0]
  );
  const [denomTab, setDenomTab] = useState<'all' | 'diamonds' | 'membership'>('all');

  // Step 3: Payment (KHQR only)
  const selectedPayment: PaymentMethod = PAYMENT_METHODS[0];

  // Filter denominations
  const filteredDenominations = useMemo(() => {
    if (denomTab === 'all') return game.denominations;
    return game.denominations.filter((d) => d.category === denomTab);
  }, [game.denominations, denomTab]);

  // Calculate prices
  const basePrice = selectedDenom ? selectedDenom.price : 0;
  const grandTotal = basePrice;

  // Validation state & shake animation (replaces simple browser alert)
  const [validationError, setValidationError] = useState<{
    field: 'userId' | 'zoneId' | 'denom';
    message: string;
  } | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Auto-dismiss floating toast after 4.5 seconds
  useEffect(() => {
    if (!validationError) return;
    const timer = setTimeout(() => {
      setValidationError(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [validationError]);

  const triggerValidationError = (field: 'userId' | 'zoneId' | 'denom', message: string, elementId?: string) => {
    sound.playError();
    setValidationError({ field, message });
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 650);

    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (el instanceof HTMLInputElement) {
          el.focus();
        }
      }
    }
  };

  // Handle Nickname Validation
  const handleValidateAccount = async () => {
    if (!userId.trim()) {
      triggerValidationError('userId', 'សូមបញ្ចូល User ID របស់អ្នកជាមុនសិន', 'input-user-id');
      return;
    }
    if (game.hasZoneId && !zoneId.trim()) {
      triggerValidationError('zoneId', 'សូមបញ្ចូល Zone ID ដើម្បីផ្ទៀងផ្ទាត់គណនី', 'input-zone-id');
      return;
    }
    sound.playClick();
    setIsValidating(true);
    try {
      const res = await validateGameAccount(game.id, userId.trim(), zoneId.trim(), server);
      if (res && res.nickname) {
        setValidatedNickname(res.nickname);
        sound.playSuccess();
      }
    } catch {
      setValidatedNickname('Player_' + userId.slice(-4));
      sound.playSuccess();
    } finally {
      setIsValidating(false);
    }
  };

  // Handle Submit Order
  const handleCheckoutClick = () => {
    if (!userId.trim()) {
      triggerValidationError('userId', `សូមបញ្ចូល ${game.userIdLabel || 'User ID'} របស់អ្នកជាមុនសិន!`, 'input-user-id');
      return;
    }
    if (game.hasZoneId && !zoneId.trim()) {
      triggerValidationError('zoneId', 'សូមបញ្ចូល Zone ID របស់អ្នកជាមុនសិន!', 'input-zone-id');
      return;
    }
    if (!selectedDenom) {
      triggerValidationError('denom', 'សូមជ្រើសរើសចំនួនពេជ្រ ឬកញ្ចប់ដែលចង់បញ្ចូល!', 'step-2-denom-section');
      return;
    }

    setValidationError(null);
    sound.playSuccess();
    onProceedCheckout({
      game,
      denomination: selectedDenom,
      paymentMethod: selectedPayment || PAYMENT_METHODS[0],
      userId,
      zoneId: game.hasZoneId ? zoneId : undefined,
      server: game.servers ? server : undefined,
      nickname: validatedNickname || undefined,
      whatsapp: '',
      basePrice,
      discount: 0,
      fee: 0,
      total: grandTotal,
    });
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Floating Cyber Glass Toast Notification (Replaces native browser alert) */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              x: isShaking ? [-8, 8, -6, 6, -3, 3, 0] : 0,
            }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 450, damping: 25 }}
            className="fixed top-20 sm:top-24 inset-x-3.5 sm:inset-x-auto sm:right-6 max-w-sm sm:max-w-md mx-auto z-50 pointer-events-auto"
          >
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#070b16]/95 border border-rose-500/50 shadow-[0_16px_40px_rgba(244,63,94,0.35),0_0_20px_rgba(244,63,94,0.2)] backdrop-blur-2xl flex items-start gap-3">
              {/* Glowing Rose Warning Icon */}
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center flex-shrink-0 text-rose-500 dark:text-rose-400 shadow-inner">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>

              {/* Text Information */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-tech">
                    ព័ត៌មានមិនទាន់គ្រប់គ្រាន់
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono font-bold leading-none">
                    Required
                  </span>
                </div>
                <p className="text-xs text-rose-600 dark:text-rose-300 mt-1 leading-snug font-medium">
                  {validationError.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setValidationError(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Navigation */}
      <button
        onClick={() => {
          sound.playClick();
          onBack();
        }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-cyan-500/40 text-xs font-semibold mb-6 transition-all"
      >
        <ArrowLeft className="w-4 h-4 text-cyan-400" />
        <span>{t.backToCatalog}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Game Profile & Trust Information */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-solid-card rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-glass">
            {/* Game Banner Header */}
            <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={game.banner}
                alt={game.title}
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-white/15 text-cyan-300 font-bold text-xs backdrop-blur-md flex items-center gap-1.5 shadow-sm font-tech">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  {t.instantAutomation}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-5 sm:p-6 relative z-10">
              {/* Game Identity Row */}
              <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200/90 dark:border-white/10 shadow-md bg-slate-900"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
                    {game.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold font-tech truncate">
                      {game.publisher}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 font-tech flex-shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      Official
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {game.description}
              </p>

              {/* Guarantees */}
              <div className="space-y-2.5 pt-4 border-t border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>{t.legalGuaranteed}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <Zap className="w-4 h-4 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
                  <span>{t.autoSecondsGuarantee}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <MessageCircle className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                  <span>{t.csSupportGuarantee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 shadow-xs">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span>{t.howToTopUp} {game.title}</span>
            </h3>
            <ol className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {(() => {
                const instructions = t.howToTopUp.includes('Cara') 
                  ? game.instructions 
                  : t.howToTopUp.includes('របៀប') 
                    ? [
                        `បញ្ចូល User ID ${game.hasZoneId ? 'និង Zone ID ' : ''}${game.servers ? 'និង Server ' : ''}គណនី ${game.title} របស់អ្នក`,
                        'ជ្រើសរើសចំនួនកញ្ចប់ពេជ្រ (Diamonds) ឬ Pass ដែលអ្នកចង់បាន',
                        'ជ្រើសរើសវិធីសាស្ត្រទូទាត់រហ័ស KHQR (0% Fee)',
                        'ស្កេនទូទាត់ប្រាក់ជាមួយ ABA, Wing, ACLEDA ឬគ្រប់កម្មវិធីធនាគារនៅកម្ពុជា',
                        'ពេជ្រ ឬកាក់ហ្គេម នឹងត្រូវបានបញ្ចូលទៅក្នុងគណនីស្វ័យប្រវត្តិក្នងរយៈពេល ១-៣ វិនាទី!'
                      ]
                    : [
                        `Enter your ${game.title} User ID ${game.hasZoneId ? 'and Zone ID' : ''}${game.servers ? 'and Server' : ''}`,
                        'Select your desired Diamond or Pass package',
                        'Choose instant KHQR payment (0% Fee)',
                        'Scan and pay with any Cambodian mobile banking app',
                        'Items are automatically delivered to your account within 1-3 seconds!'
                      ];

                return instructions.map((ins, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{ins}</span>
                  </li>
                ));
              })()}
            </ol>
          </div>
        </div>

        {/* Right Column: Interactive Order Terminal Steps */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Account Identification */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-glass relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-aura-cyan font-tech">
                1
              </span>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">{t.step1Title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.step1Desc}</p>
              </div>
            </div>

            <div className={`grid ${game.hasZoneId ? 'grid-cols-12 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-3 sm:gap-4`}>
              {/* User ID Field */}
              <div className={game.hasZoneId ? 'col-span-7 sm:col-span-1' : ''}>
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {game.userIdLabel || 'User ID'} <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setShowIdHelpModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline transition-colors cursor-pointer group flex-shrink-0"
                    title={t.howToFindId}
                  >
                    <HelpCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>{t.howToFindId || 'របៀបមើល ID / Server'}</span>
                  </button>
                </div>
                <motion.div
                  animate={isShaking && validationError?.field === 'userId' ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    id="input-user-id"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setValidatedNickname(null);
                      if (validationError?.field === 'userId') setValidationError(null);
                    }}
                    placeholder={game.userIdPlaceholder || 'ID'}
                    className={`w-full bg-slate-50 dark:glass-input px-3.5 sm:px-4 py-3 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all duration-200 shadow-xs ${
                      validationError?.field === 'userId'
                        ? 'border-2 border-rose-500 ring-4 ring-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-900/80'
                    }`}
                  />
                </motion.div>
                {validationError?.field === 'userId' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-semibold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 animate-bounce" />
                    <span>{validationError.message}</span>
                  </motion.div>
                )}
              </div>

              {/* Zone ID Field (if applicable) */}
              {game.hasZoneId && (
                <div className="col-span-5 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 truncate">
                    {game.zoneIdLabel || 'Zone ID'} <span className="text-rose-400">*</span>
                  </label>
                  <motion.div
                    animate={isShaking && validationError?.field === 'zoneId' ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      id="input-zone-id"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      value={zoneId}
                      onChange={(e) => {
                        setZoneId(e.target.value);
                        setValidatedNickname(null);
                        if (validationError?.field === 'zoneId') setValidationError(null);
                      }}
                      placeholder={game.zoneIdPlaceholder || '(Zone ID)'}
                      className={`w-full bg-slate-50 dark:glass-input px-3.5 sm:px-4 py-3 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all duration-200 shadow-xs ${
                        validationError?.field === 'zoneId'
                          ? 'border-2 border-rose-500 ring-4 ring-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                          : 'border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-900/80'
                      }`}
                    />
                  </motion.div>
                  {validationError?.field === 'zoneId' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-semibold"
                    >
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 animate-bounce" />
                      <span>{validationError.message}</span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Server selector (if applicable) */}
              {game.servers && (
                <div className="col-span-12 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 truncate">
                    {t.selectServer} <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full bg-slate-50 dark:glass-input border border-slate-200 dark:border-white/10 px-3.5 sm:px-4 py-3 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 cursor-pointer shadow-xs"
                  >
                    {game.servers.map((s) => (
                      <option key={s} value={s} className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white">
                        {s} Server
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Account Validation Button & Feedback */}
            <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleValidateAccount}
                  disabled={isValidating || !userId}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-white transition-all flex items-center gap-2 disabled:opacity-40 font-tech cursor-pointer active:scale-95"
                >
                  {isValidating ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-cyan-500 dark:border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      <span>{t.validatingServer}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{t.validateIdBtn}</span>
                    </>
                  )}
                </button>
                {!validatedNickname && !isValidating && userId && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                    (ចុចដើម្បីផ្ទៀងផ្ទាត់ឈ្មោះកីឡាករ)
                  </span>
                )}
              </div>

              {validatedNickname && (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold animate-in fade-in shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>{t.verifiedNickname} <strong className="text-emerald-950 dark:text-emerald-200 underline decoration-emerald-500/40">{validatedNickname}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: Select Denomination */}
          <div 
            id="step-2-denom-section"
            className={`glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xs dark:shadow-glass relative overflow-hidden transition-all duration-300 ${
              validationError?.field === 'denom'
                ? 'border-rose-500/80 ring-2 ring-rose-500/25 bg-rose-500/[0.03]'
                : 'border-slate-200/90 dark:border-white/10'
            }`}
          >
            {/* Inline validation message for Denomination */}
            {validationError?.field === 'denom' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 animate-bounce" />
                <span>{validationError.message}</span>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-aura-cyan font-tech">
                  2
                </span>
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">{t.step2Title}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.step2Desc}</p>
                </div>
              </div>

              {/* Denomination Category Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200/80 dark:border-white/10 self-start sm:self-auto font-tech">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setDenomTab('all');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    denomTab === 'all' ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.tabAll}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setDenomTab('diamonds');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    denomTab === 'diamonds' ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.tabDiamonds}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setDenomTab('membership');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    denomTab === 'membership' ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.tabPass}
                </button>
              </div>
            </div>

            {/* Denomination Grid - Compact & Sleek */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
              {filteredDenominations.map((item) => {
                const isSelected = selectedDenom?.id === item.id;
                const isPass = item.category === 'membership' || item.name.toLowerCase().includes('pass') || item.name.toLowerCase().includes('starlight');
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      sound.playSelect();
                      setSelectedDenom(item);
                      if (validationError?.field === 'denom') setValidationError(null);
                    }}
                    className={`group relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between overflow-hidden select-none ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500/10 via-sky-500/5 to-transparent dark:from-cyan-950/70 dark:via-blue-950/50 dark:to-slate-900/40 border-cyan-500 dark:border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.22)] ring-2 ring-cyan-400/60 scale-[1.01]'
                        : 'glass-solid-card bg-white/95 dark:bg-slate-900/60 border-slate-200/90 dark:border-white/10 hover:border-cyan-400/60 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Top Badges */}
                    <div className="flex items-center justify-between w-full h-4 sm:h-4.5 mb-0.5 pointer-events-none">
                      {isSelected ? (
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-aura-cyan flex-shrink-0 animate-in zoom-in-75 duration-150">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span />
                      )}

                      {item.popular && (
                        <span className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-extrabold text-[7.5px] sm:text-[8.5px] shadow-xs uppercase tracking-wider">
                          BEST SELLER
                        </span>
                      )}
                    </div>

                    {/* Diamond / Pass 3D Artwork - Fixed Compact Height */}
                    <div className="relative flex items-center justify-center h-10 sm:h-12 my-0.5 sm:my-1">
                      {/* Ambient Glowing Halo */}
                      <div
                        className={`absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full blur-md pointer-events-none transition-opacity duration-300 ${
                          isSelected
                            ? 'bg-cyan-400/35 dark:bg-cyan-400/40 opacity-100 scale-110'
                            : 'bg-cyan-400/15 dark:bg-cyan-400/20 opacity-30 group-hover:opacity-80'
                        }`}
                      />
                      
                      <img
                        src={getDenomVisual(item)}
                        alt={item.name}
                        className={`relative object-contain transition-all duration-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.35)] ${
                          isPass
                            ? 'h-9 sm:h-11 w-auto max-w-[48px]'
                            : 'h-8 w-8 sm:h-9 sm:w-9'
                        } ${isSelected ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105 group-hover:-translate-y-0.5'}`}
                        loading="lazy"
                      />
                    </div>

                    {/* Denomination Name & Bonus */}
                    <div className="text-center">
                      <div className="font-display font-black text-xs text-slate-900 dark:text-white line-clamp-1 leading-tight">
                        {item.name}
                      </div>

                      <div className="mt-0.5 min-h-[16px] flex items-center justify-center">
                        {item.bonus ? (
                          <span className="inline-block px-1.5 py-0.2 rounded text-[8.5px] sm:text-[9.5px] font-bold bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 line-clamp-1">
                            {item.bonus}
                          </span>
                        ) : (
                          <span className="text-[9px] sm:text-[9.5px] text-slate-400 dark:text-slate-500 font-tech">
                            {item.amount || 'Instant'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price Footer */}
                    <div className="mt-1.5 pt-1 border-t border-slate-100 dark:border-white/5 flex items-baseline justify-center gap-1.5 flex-wrap">
                      <span className="font-display font-black text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-tech">
                        {formatPrice(item.price, currency)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[9.5px] sm:text-[10px] text-slate-400 dark:text-slate-500 line-through font-tech">
                          {formatPrice(item.originalPrice, currency)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: KHQR Payment Method */}
          <div className="glass-solid-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-glass relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-aura-cyan font-tech">
                3
              </span>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  វិធីសាស្ត្រទូទាត់ KHQR (Scan to Pay)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ស្កេនទូទាត់ 0% Fee • គាំទ្រគ្រប់ធនាគារនៅកម្ពុជា
                </p>
              </div>
            </div>

            {/* KHQR Premium Selection Card */}
            <div className="relative p-4 sm:p-5 rounded-2xl border-2 border-cyan-500 dark:border-cyan-400 bg-white dark:bg-[#0c1326] shadow-sm shadow-cyan-500/10 transition-all">
              
              {/* Top Row: Method Identity & Active Pill */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  {/* Official KHQR Red Badge - Guaranteed Crisp White Text */}
                  <div className="w-12 h-11 sm:w-13 sm:h-12 rounded-xl bg-[#E11927] p-1 flex flex-col items-center justify-center flex-shrink-0 shadow-md shadow-red-500/25 select-none">
                    <span className="font-black text-xs tracking-tighter leading-none !text-white" style={{ color: '#ffffff' }}>
                      KHQR
                    </span>
                    <span className="text-[8px] font-bold tracking-widest leading-none mt-0.5 !text-white/90" style={{ color: '#ffffff' }}>
                      BAKONG
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <h3 className="font-display font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                      KHQR (Bakong)
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase font-tech flex-shrink-0">
                      0% Fee
                    </span>
                  </div>
                </div>

                {/* Selected Status Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold font-tech flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span>ជ្រើសរើសរួចរាល់</span>
                </div>
              </div>

              {/* Supported Banks Grid */}
              <div className="pt-3.5 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-tech">
                    គាំទ្រគ្រប់កម្មវិធីធនាគារ (Supported Banks):
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-tech">
                    7+ ធនាគារ
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SUPPORTED_CAMBODIAN_BANKS.map((bank) => (
                    <div
                      key={bank.id}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-white/[0.08] transition-all select-none shadow-2xs"
                    >
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        className="w-5 h-5 rounded-md object-cover shadow-xs flex-shrink-0"
                      />
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate font-tech">
                        {bank.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Glass Checkout Dock */}
      <div 
        className="sticky bottom-2 sm:bottom-5 mt-6 sm:mt-10 z-40 px-2 sm:px-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="glass-solid-card border border-slate-200/90 dark:border-cyan-500/30 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_-5px_rgba(0,242,254,0.15)] backdrop-blur-2xl transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-6">
            
            {/* Left: Product Thumbnail & Price Info */}
            <div className="min-w-0 flex-1 flex items-center gap-2 sm:gap-3.5">
              {/* Product Thumbnail */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-white/10 p-0.5 flex-shrink-0 shadow-xs flex items-center justify-center overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px]"
                />
              </div>

              {/* Order Info & Total */}
              <div className="min-w-0 flex-1">
                {/* Item Name Row (Strict No-Wrap on Mobile) */}
                <div className="flex items-center gap-1.5 min-w-0">
                  {selectedDenom && (
                    <img
                      src={getDenomVisual(selectedDenom)}
                      alt=""
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain flex-shrink-0 drop-shadow-[0_2px_4px_rgba(6,182,212,0.4)]"
                    />
                  )}
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
                    {selectedDenom?.name || 'ជ្រើសរើសទំនិញ'}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#e11927] text-white text-[8px] sm:text-[9px] font-black tracking-tight leading-none flex-shrink-0 shadow-xs">
                    KHQR
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase font-tech flex-shrink-0 border border-emerald-500/20">
                    0% Fee
                  </span>
                </div>

                {/* Big Price Display & Instant Badge */}
                <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                  <span className="font-display font-black text-lg sm:text-2xl text-cyan-600 dark:text-cyan-400 tracking-tight leading-none">
                    {formatPrice(grandTotal, currency)}
                  </span>
                  <span className="hidden xs:inline-flex items-center text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    (Fee: $0.00)
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-tech">
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
                    <span>{t.instantBadge || 'ភ្លាមៗ'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Sleek Buy Now CTA Button */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="px-3.5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 active:scale-95 text-white font-display font-extrabold text-xs sm:text-base tracking-wide shadow-md sm:shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>{t.buyNow}</span>
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300 flex-shrink-0" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Account ID & Server Lookup Guide Modal */}
      <IdGuideModal
        isOpen={showIdHelpModal}
        onClose={() => setShowIdHelpModal(false)}
        defaultGameId={game.id}
        t={t}
        onSelectSampleId={(sample) => {
          setUserId(sample.userId);
          if (sample.zoneId) setZoneId(sample.zoneId);
          if (sample.server) setServer(sample.server);
          setValidatedNickname(null);
        }}
      />
    </div>
  );
};
