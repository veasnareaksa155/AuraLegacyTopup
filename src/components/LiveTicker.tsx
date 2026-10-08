import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import type { Translations } from '../utils/i18n';

interface FeedItem {
  id: string;
  game: string;
  item: string;
  user: string;
  secondsAgo: number;
}

interface LiveTickerProps {
  t: Translations;
}

const INITIAL_FEED: FeedItem[] = [
  { id: '1', game: 'Mobile Legends', item: '86 Diamonds', user: 'ID 9821***', secondsAgo: 8 },
  { id: '2', game: 'Genshin Impact', item: 'Blessing of Welkin Moon', user: 'UID 819***', secondsAgo: 24 },
  { id: '3', game: 'Valorant', item: '1000 VP', user: 'TenZ***', secondsAgo: 45 },
  { id: '4', game: 'Roblox', item: '400 Robux', user: 'Robloxian***', secondsAgo: 60 },
  { id: '5', game: 'Honor of Kings', item: 'Weekly Pass', user: 'King***88', secondsAgo: 85 },
  { id: '6', game: 'Free Fire', item: '720 Diamonds', user: 'Booyah***12', secondsAgo: 110 },
];

export const LiveTicker: React.FC<LiveTickerProps> = ({ t }) => {
  // Stable duplicated list for seamless infinite marquee loop
  const displayFeed = [...INITIAL_FEED, ...INITIAL_FEED];

  return (
    <div className="w-full bg-slate-100/90 dark:bg-[#080c1b]/80 border-y border-slate-200/80 dark:border-white/5 py-2 overflow-hidden backdrop-blur-md transition-colors select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center gap-3">
        {/* Live Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-[11px] font-bold font-tech">
          <Zap className="w-3 h-3 text-cyan-500 dark:text-cyan-400 animate-pulse" />
          <span className="whitespace-nowrap">{t.liveTickerBadge}</span>
        </div>

        {/* Scrolling ticker track with hardware acceleration */}
        <div className="relative flex-1 overflow-hidden">
          <div 
            className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap text-xs text-slate-700 dark:text-slate-300 will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            {displayFeed.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 rounded-lg px-2.5 sm:px-3 py-1 hover:border-cyan-500/30 transition-colors flex-shrink-0"
              >
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{item.user}</span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="font-semibold text-slate-900 dark:text-white">{item.game}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">({item.item})</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-500 dark:text-emerald-400 text-[10px] flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> {t.success}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {item.secondsAgo}s {t.secondsAgo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
