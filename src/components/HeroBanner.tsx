import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import type { Game } from '../types';
import type { Translations } from '../utils/i18n';
import { sound } from '../utils/sound';
import mlbbBanner from '../assets/banners/mlbb.jpg';
import valorantBanner from '../assets/banners/valorant.jpg';
import genshinBanner from '../assets/banners/genshin.jpg';

interface HeroBannerProps {
  onSelectGame: (game: Game) => void;
  games: Game[];
  onExploreClick?: () => void;
  t: Translations;
}

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  gameId: string;
  image: string;
  badgeBg: string;
  glowColor: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 'slide-ml',
    badge: 'KHQR 0% FEE',
    title: 'Mobile Legends: Bang Bang',
    subtitle: 'បញ្ចូលពេជ្ររហ័ស 1-3 វិនាទី • Weekly Pass & Diamonds',
    gameId: 'mobile-legends',
    image: mlbbBanner,
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-aura-cyan',
    glowColor: 'rgba(0, 242, 254, 0.35)',
  },
  {
    id: 'slide-val',
    badge: 'RIOT DIRECT',
    title: 'Valorant Points',
    subtitle: 'ស្កេនទូទាត់ KHQR • ចូលគណនីភ្លាមៗ 24 ម៉ោង',
    gameId: 'valorant',
    image: valorantBanner,
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    glowColor: 'rgba(244, 63, 94, 0.35)',
  },
  {
    id: 'slide-gi',
    badge: 'GENESIS CRYSTALS',
    title: 'Genshin Impact',
    subtitle: 'Blessing of the Welkin Moon • UID 100% សុវត្ថិភាព',
    gameId: 'genshin-impact',
    image: genshinBanner,
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    glowColor: 'rgba(168, 85, 247, 0.35)',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectGame, games, t }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = SLIDES[activeSlide];

  const handleSlideClick = (gameId: string) => {
    sound.playSelect();
    const found = games.find((g) => g.id === gameId);
    if (found) {
      onSelectGame(found);
    }
  };

  return (
    <div className="relative pt-4 sm:pt-6 pb-6 sm:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Dynamic Main Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-slate-200/80 dark:border-white/10 shadow-2xl preserve-dark">
        {/* Background Ambient Art with vibrant game artwork */}
        <div className="absolute inset-0 z-0">
          <img
            key={current.id}
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover object-right sm:object-center filter brightness-95 contrast-105 saturate-110 scale-100 transition-all duration-700 ease-out animate-in fade-in zoom-in-105 duration-500"
          />
          
          {/* Left Dark Scrim for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070913] via-[#070913]/75 via-40% to-transparent" />
          {/* Subtle Bottom Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070913]/70 via-transparent to-transparent" />
          
          {/* Dynamic Glowing Aura Flare */}
          <div 
            className="absolute -top-24 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-50 transition-all duration-700"
            style={{ 
              background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
              transform: 'translateZ(0)',
            }}
          />
        </div>

        {/* Content Layout */}
        <div className="relative z-10 p-5 sm:p-8 lg:p-12 flex flex-col justify-between min-h-[320px] sm:min-h-[400px]">
          
          {/* Top Clean Badge */}
          <div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase border font-tech transition-all duration-300 ${current.badgeBg}`}>
              <Sparkles className="w-3.5 h-3.5" />
              {current.badge}
            </span>
          </div>

          {/* Center Titles */}
          <div className="my-4 sm:my-6 max-w-xl relative">
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-2 drop-shadow-md">
              {current.title}
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm md:text-base font-normal leading-relaxed mb-5 max-w-md drop-shadow-sm">
              {current.subtitle}
            </p>

            <div>
              <button
                onClick={() => handleSlideClick(current.gameId)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-display font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{t.heroCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Slider Dots */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSlide(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? 'w-8 bg-cyan-400 shadow-aura-cyan' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
