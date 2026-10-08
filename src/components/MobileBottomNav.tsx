import React from 'react';
import { Home, Gamepad2, Flame, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Translations } from '../utils/i18n';
import type { Language } from '../types';
import { sound } from '../utils/sound';

export interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenTracker?: () => void;
  t: Translations;
  lang?: Language;
  isVisible: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  t,
  lang,
  isVisible,
}) => {
  if (!isVisible) return null;

  // Localized concise labels
  const getShortLabel = (id: string) => {
    if (id === 'home') return t.home;
    if (id === 'games') return t.allGames;
    if (id === 'flash') return t.flashSale;
    if (id === 'search') {
      if (lang === 'km' || t.searchPlaceholder?.includes('ស្វែងរក')) return 'ស្វែងរក';
      if (lang === 'id' || t.searchPlaceholder?.toLowerCase().includes('cari')) return 'Cari';
      return 'Search';
    }
    return '';
  };

  const navItems = [
    {
      id: 'home',
      label: getShortLabel('home'),
      icon: Home,
      action: () => {
        sound.playClick();
        setCurrentTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentTab === 'home',
    },
    {
      id: 'games',
      label: getShortLabel('games'),
      icon: Gamepad2,
      action: () => {
        sound.playClick();
        setCurrentTab('games');
        const el = document.getElementById('games-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      },
      isActive: currentTab === 'games',
    },
    {
      id: 'flash',
      label: getShortLabel('flash'),
      icon: Flame,
      action: () => {
        sound.playClick();
        setCurrentTab('flash');
        const el = document.getElementById('flash-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      },
      isActive: currentTab === 'flash',
      badge: 'HOT',
    },
    {
      id: 'search',
      label: getShortLabel('search'),
      icon: Search,
      action: () => {
        sound.playClick();
        onOpenSearch();
      },
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 md:hidden pointer-events-auto select-none"
      style={{ bottom: 'max(calc(env(safe-area-inset-bottom, 0px) * 0.25), 8px)' }}
    >
      {/* Outer Dock Bar with Glass Solid Glow */}
      <div className="relative rounded-[24px] border border-slate-200/90 dark:border-cyan-500/30 bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-2xl shadow-[0_8px_28px_-4px_rgba(15,23,42,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.85),0_0_24px_rgba(0,242,254,0.14)] px-2 pt-1.5 pb-1 flex items-center justify-around">
        
        {/* Subtle Ambient Glow Mesh inside dock */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          const isFlash = item.id === 'flash';

          return (
            <motion.button
              key={item.id}
              onClick={item.action}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-end flex-1 h-12 py-0.5 cursor-pointer focus:outline-none"
            >
              {/* Active State: Floating Elevated Bubble with Pure Glass Solid Glow */}
              {active ? (
                <motion.div
                  layoutId="active-floating-bubble"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 26,
                    mass: 0.75,
                  }}
                  className={`absolute -top-3.5 w-11 h-11 rounded-full flex items-center justify-center z-20 border-2 border-white/70 dark:border-cyan-300/80 ${
                    isFlash
                      ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 text-white shadow-[0_6px_20px_rgba(245,158,11,0.65),0_0_16px_rgba(245,158,11,0.45)]'
                      : 'bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 text-white shadow-[0_6px_20px_rgba(6,182,212,0.65),0_0_16px_rgba(6,182,212,0.45)]'
                  }`}
                >
                  {/* Inner Glass Specular Glare */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />
                  
                  <motion.div
                    initial={{ scale: 0.6, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Icon className="w-4.5 h-4.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  </motion.div>
                </motion.div>
              ) : (
                /* Inactive State: Clean Icon with Micro Effects */
                <div className="relative flex items-center justify-center mb-1">
                  <div className="w-9 h-7 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                    <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  </div>

                  {/* Micro HOT Promo Badge */}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1.5 py-[1.5px] rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-[8px] font-black text-white leading-none shadow-xs shadow-rose-500/40 animate-pulse font-tech pointer-events-none">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Text Label: ONLY rendered for inactive tabs - Active tab has sleek glowing neon bar */}
              {!active ? (
                <span className="text-[10px] leading-tight tracking-tight whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium font-tech select-none mt-auto">
                  {item.label}
                </span>
              ) : (
                /* Glowing Neon Anchor Bar at the base of active tab */
                <div className="h-3.5 flex items-center justify-center mt-auto">
                  <motion.span
                    layoutId="active-indicator-bar"
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    className={`w-5 h-1 rounded-full ${
                      isFlash
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]'
                        : 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
                    }`}
                  />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
