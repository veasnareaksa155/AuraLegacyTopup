import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import type { Game, Currency } from '../types';
import type { Translations } from '../utils/i18n';
import { formatPrice } from '../utils/format';
import { sound } from '../utils/sound';

interface SearchModalProps {
  games: Game[];
  currency: Currency;
  t: Translations;
  onSelectGame: (game: Game) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  games,
  currency,
  t,
  onSelectGame,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = games.filter(
    (g) =>
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.publisher.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-card rounded-3xl border border-slate-200 dark:border-cyan-500/40 p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200 dark:border-white/10">
          <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchGamesFilter}
            className="w-full bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none py-1"
          />
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-3 max-h-80 overflow-y-auto space-y-1.5 p-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              {t.noGamesFound} "{query}".
            </div>
          ) : (
            results.map((game) => {
              const minPrice = Math.min(...game.denominations.map((d) => d.price));
              return (
                <div
                  key={game.id}
                  onClick={() => {
                    sound.playSelect();
                    onSelectGame(game);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200/80 dark:border-white/10"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                        {game.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{game.publisher}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      {t.startFrom} {formatPrice(minPrice, currency)}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1">
                      <span>{t.topUpAction}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
