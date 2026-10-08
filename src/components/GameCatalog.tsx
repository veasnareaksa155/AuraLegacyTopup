import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  Smartphone, 
  Monitor, 
  Ticket, 
  Sparkles, 
  Flame, 
  Zap, 
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Check,
  ArrowDownAZ,
  Coins,
  ArrowRight
} from 'lucide-react';
import type { Game, GameCategory, Currency } from '../types';
import type { Translations } from '../utils/i18n';
import { formatPrice } from '../utils/format';
import { sound } from '../utils/sound';

interface GameCatalogProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  currency: Currency;
  searchQuery?: string;
  t: Translations;
}

export const GameCatalog: React.FC<GameCatalogProps> = ({
  games,
  onSelectGame,
  currency,
  searchQuery: externalSearchQuery = '',
  t,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [internalSearch, setInternalSearch] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'price'>('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

  const sortOptions = [
    { id: 'popular' as const, label: t.sortPopular, icon: Flame, iconColor: 'text-amber-500' },
    { id: 'name' as const, label: t.sortName, icon: ArrowDownAZ, iconColor: 'text-cyan-500' },
    { id: 'price' as const, label: t.sortPrice, icon: Coins, iconColor: 'text-emerald-500' },
  ];

  const query = externalSearchQuery || internalSearch;

  const categories: { id: GameCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.allProducts, icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'mobile', label: t.mobileGames, icon: <Smartphone className="w-4 h-4" /> },
    { id: 'pc', label: t.pcGames, icon: <Monitor className="w-4 h-4" /> },
    { id: 'voucher', label: t.vouchers, icon: <Ticket className="w-4 h-4" /> },
  ];

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchCat = selectedCategory === 'all' || game.category === selectedCategory;
      const matchSearch =
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.publisher.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'price') {
        const minA = Math.min(...a.denominations.map((d) => d.price));
        const minB = Math.min(...b.denominations.map((d) => d.price));
        return minA - minB;
      }
      return 0;
    });
  }, [games, selectedCategory, query, sortBy]);

  return (
    <section id="games-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1 font-tech">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t.catalogBadge}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.catalogTitle} <span className="aura-text-gradient">{t.catalogTitleHighlight}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
            {t.catalogSubtitle}
          </p>
        </div>

        {/* Search & Sort inside Catalog */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Solid Glass Search Input */}
          <div className="relative flex-1 md:w-72 glass-solid-btn rounded-2xl flex items-center px-3.5 h-11 transition-all duration-200 focus-within:ring-2 focus-within:ring-cyan-500/25 focus-within:border-cyan-500/80">
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mr-2" />
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              placeholder={t.searchGamesFilter}
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium font-tech"
            />
            {internalSearch && (
              <button
                type="button"
                onClick={() => setInternalSearch('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Custom Solid Glass Sort Dropdown */}
          <div className="relative flex-shrink-0" ref={sortRef}>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsSortOpen(!isSortOpen);
              }}
              className="glass-solid-btn h-11 px-3.5 rounded-2xl flex items-center gap-2 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 hover:border-cyan-500/50 transition-all cursor-pointer select-none"
              title="Sort Catalog"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <span className="font-tech text-xs sm:text-sm">
                {sortOptions.find((o) => o.id === sortBy)?.label}
              </span>
              <ChevronDown 
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isSortOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-solid-card rounded-2xl p-1.5 shadow-2xl z-30 border border-slate-200/90 dark:border-white/15 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-tech">
                  {t.catalogBadge || 'SORT'}
                </div>
                {sortOptions.map((opt) => {
                  const OptIcon = opt.icon;
                  const isSelected = sortBy === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        sound.playSelect();
                        setSortBy(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/25'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <OptIcon className={`w-3.5 h-3.5 ${opt.iconColor}`} />
                        <span>{opt.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border-none'
                  : 'glass-solid-btn text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400/50'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Game Cards Grid */}
      {filteredGames.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/5 my-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">{t.noGamesFound}</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            "{query}"
          </p>
          <button
            onClick={() => {
              setInternalSearch('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-all font-tech"
          >
            {t.resetFilter}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredGames.map((game) => {
            const minPrice = Math.min(...game.denominations.map((d) => d.price));

            return (
              <div
                key={game.id}
                onClick={() => {
                  sound.playSelect();
                  onSelectGame(game);
                }}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-solid-card border border-slate-200/90 dark:border-white/10 hover:border-cyan-400/80 dark:hover:border-cyan-400/60 shadow-sm hover:shadow-[0_18px_40px_-8px_rgba(6,182,212,0.25)] dark:hover:shadow-[0_18px_42px_-8px_rgba(6,182,212,0.35)] active:scale-[0.98] transition-all duration-300 ease-out hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              >
                {/* Ambient Top Flare Glow on Hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/20 dark:group-hover:bg-cyan-500/25 blur-2xl transition-all duration-500 pointer-events-none z-0" />

                {/* Diagonal Light Shimmer Sheen on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none z-20" />

                {/* Image Container with Ambient Glow on hover */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform"
                    loading="lazy"
                  />
                  
                  {/* Top Vignette for Badges */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 via-black/25 to-transparent pointer-events-none z-10" />

                  {/* Bottom Vignette for Publisher and smooth fade into card */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

                  {/* Hover Blue Tint Sheen */}
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300 pointer-events-none z-10" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                    {game.trending && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow-[0_0_12px_rgba(244,63,94,0.5)] backdrop-blur-md font-tech border border-white/20">
                        <Flame className="w-2.5 h-2.5 fill-white" />
                        HOT
                      </span>
                    )}
                    {game.popular && !game.trending && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow-[0_0_12px_rgba(245,158,11,0.5)] backdrop-blur-md font-tech border border-white/30">
                        <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
                        POPULAR
                      </span>
                    )}

                    <span className="ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-cyan-400/40 text-cyan-300 font-bold text-[9px] sm:text-[10px] backdrop-blur-md font-tech shadow-[0_0_10px_rgba(6,182,212,0.25)] group-hover:border-cyan-300 group-hover:text-cyan-200 group-hover:shadow-aura-cyan transition-all">
                      <Zap className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400 animate-pulse" />
                      INSTANT
                    </span>
                  </div>

                  {/* Publisher badge bottom left of image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                    <span className="inline-flex items-center text-[10px] font-semibold text-slate-200 bg-black/65 border border-white/15 px-2 py-0.5 rounded-lg backdrop-blur-md max-w-[85%] truncate">
                      {game.publisher}
                    </span>
                  </div>
                </div>

                {/* Card Body Info */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 relative z-10">
                  <div>
                    <h3 className="font-display font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1 tracking-tight">
                      {game.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 pt-0.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {t.startFrom}
                        </span>
                        <span className="text-sm sm:text-base font-black text-cyan-600 dark:text-cyan-400 font-tech tracking-tight group-hover:scale-105 transition-transform origin-left">
                          {formatPrice(minPrice, currency)}
                        </span>
                      </div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-tech border border-cyan-500/25">
                        0% FEE
                      </span>
                    </div>
                  </div>

                  {/* Modern Action Button */}
                  <div className="mt-3.5">
                    <div className="relative overflow-hidden w-full py-2.5 px-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-500/15 dark:via-blue-500/15 dark:to-indigo-500/15 border border-cyan-500/30 dark:border-cyan-400/30 group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-indigo-600 group-hover:border-transparent text-center text-xs sm:text-sm font-black text-cyan-700 dark:text-cyan-300 group-hover:!text-white transition-all duration-300 shadow-xs group-hover:shadow-[0_6px_22px_rgba(6,182,212,0.45)] flex items-center justify-center gap-1.5 font-display">
                      <span>{t.topUpAction}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
