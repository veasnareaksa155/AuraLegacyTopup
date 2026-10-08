import React, { useState, useEffect } from 'react';
import { Flame, Clock, Zap } from 'lucide-react';
import type { Game, Currency } from '../types';
import type { Translations } from '../utils/i18n';
import { formatPrice } from '../utils/format';
import { sound } from '../utils/sound';

interface FlashDealsProps {
  games: Game[];
  currency: Currency;
  onSelectDeal: (game: Game, denomId: string) => void;
  t: Translations;
}

const CountdownClock: React.FC<{ label: string }> = ({ label }) => {
  const [timeLeft, setTimeLeft] = useState(28540); // ~7h 55m

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 28800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="glass-solid-btn rounded-2xl px-3 py-1.5 flex items-center gap-2.5 self-start sm:self-auto border border-amber-500/35 dark:border-amber-400/25 shadow-xs">
      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs font-tech">
        <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">{label}</span>
      </div>

      {/* Cyber Digital Countdown Tiles */}
      <div className="flex items-center gap-1 font-mono font-black text-xs sm:text-sm">
        <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-b from-amber-500 to-orange-500 text-white shadow-xs leading-none">
          {h}
        </span>
        <span className="text-amber-500 font-bold leading-none animate-pulse">:</span>
        <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-b from-amber-500 to-orange-500 text-white shadow-xs leading-none">
          {m}
        </span>
        <span className="text-amber-500 font-bold leading-none animate-pulse">:</span>
        <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-b from-amber-500 to-orange-500 text-white shadow-xs leading-none">
          {s}
        </span>
      </div>
    </div>
  );
};

export const FlashDeals: React.FC<FlashDealsProps> = ({
  games,
  currency,
  onSelectDeal,
  t,
}) => {
  const deals = [
    {
      gameId: 'mobile-legends',
      denomId: 'ml-wdp',
      title: 'Weekly Diamond Pass',
      gameTitle: 'Mobile Legends',
      discount: '30% OFF',
      stockLeft: 12,
      totalStock: 50,
      price: 28500,
      originalPrice: 35000,
      tag: 'HOT PROMO',
      img: 'https://play-lh.googleusercontent.com/YrkR-GP7OKghBTATCoO_jJrchSVrh-NSUBb5DnbRZC1DbLK_cgV9FC2e_iI4GzLsKXuZjuFZajnGCiA8qA=w600-h300',
    },
    {
      gameId: 'genshin-impact',
      denomId: 'gi-welkin',
      title: 'Blessing of Welkin Moon',
      gameTitle: 'Genshin Impact',
      discount: '25% OFF',
      stockLeft: 8,
      totalStock: 30,
      price: 62000,
      originalPrice: 79000,
      tag: 'LIMITED',
      img: 'https://play-lh.googleusercontent.com/ZHLmkdTW2Q_T_DVxu9piEOwkJtcXEkmeIGiJXhwcdYSS6-L51bHuEvlVqpt3dPM_McPJ1enEo6FwnbrxOak=w600-h300',
    },
    {
      gameId: 'valorant',
      denomId: 'val-1000',
      title: '1000 Valorant Points',
      gameTitle: 'Valorant',
      discount: '15% OFF',
      stockLeft: 19,
      totalStock: 40,
      price: 108000,
      originalPrice: 120000,
      tag: 'BATTLEPASS',
      img: 'https://media.rawg.io/media/crop/600/400/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg',
    },
    {
      gameId: 'roblox',
      denomId: 'rbx-800',
      title: '800 Robux Digital Key',
      gameTitle: 'Roblox',
      discount: '20% OFF',
      stockLeft: 5,
      totalStock: 25,
      price: 145000,
      originalPrice: 165000,
      tag: 'HOT PROMO',
      img: 'https://play-lh.googleusercontent.com/bHynJCCjTZyc9Lqqx45O5GLX3sWAupY9mSqYn7wndPkwuB4A28txE7NKIpteQ_4t1kGvsRWKRuYiToYTYLtVSg=w600-h300',
    },
  ];

  const handleClaim = (gameId: string, denomId: string) => {
    sound.playSelect();
    const game = games.find((g) => g.id === gameId);
    if (game) {
      onSelectDeal(game, denomId);
    }
  };

  return (
    <section id="flash-section" className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner Container */}
      <div className="glass-solid-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-500/35 relative overflow-hidden">
        {/* Ambient Warm Glow with GPU radial gradient */}
        <div 
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-40" 
          style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)' }}
        />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 font-tech">
              <Flame className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span>{t.flashBadge}</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              {t.flashTitle} <span className="aura-text-gold">{t.flashHighlight}</span>
            </h2>
          </div>

          {/* Isolated Countdown Clock */}
          <CountdownClock label={t.endsIn} />
        </div>

        {/* Deals Grid - 2 columns on mobile, 4 columns on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {deals.map((deal) => {
            const percentSold = Math.round(((deal.totalStock - deal.stockLeft) / deal.totalStock) * 100);

            return (
              <div
                key={deal.denomId}
                className="glass-solid-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200/90 dark:border-white/10 hover:border-amber-400/80 dark:hover:border-amber-400/60 shadow-sm hover:shadow-[0_16px_36px_-6px_rgba(245,158,11,0.25)] active:scale-[0.98] transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Light shimmer sheen */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-20" />

                <div>
                  <div className="relative aspect-[16/10] sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-3 bg-slate-950">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[9px] sm:text-[10px] uppercase font-tech shadow-md border border-white/30">
                      {deal.discount}
                    </span>
                    <span className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 text-[9px] sm:text-[10px] font-semibold text-slate-200 bg-black/65 border border-white/15 px-2 py-0.5 rounded-lg backdrop-blur-md max-w-[85%] truncate">
                      {deal.gameTitle}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 line-clamp-1">
                    {deal.title}
                  </h3>

                  <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <span className="font-display font-extrabold text-xs sm:text-base text-amber-600 dark:text-amber-400 font-tech">
                      {formatPrice(deal.price, currency)}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 line-through font-tech">
                      {formatPrice(deal.originalPrice, currency)}
                    </span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="space-y-1 mb-2.5 sm:mb-4">
                    <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 font-medium font-tech">
                      <span className="truncate">{t.leftQuota} {deal.stockLeft}</span>
                      <span className="flex-shrink-0">{percentSold}%</span>
                    </div>
                    <div className="w-full h-1 sm:h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                        style={{ width: `${percentSold}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleClaim(deal.gameId, deal.denomId)}
                  className="w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-display font-extrabold text-[10px] sm:text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95"
                >
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white flex-shrink-0" />
                  <span className="truncate">{t.claimDeal}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
