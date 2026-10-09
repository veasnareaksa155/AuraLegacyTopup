import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  CheckCircle2, 
  DollarSign, 
  Star,
  TrendingUp
} from 'lucide-react';
import type { Game, GameDenomination } from '../../types';
import { POPULAR_GAMES } from '../../data/games';
import { catalogService } from '../../services/catalogService';
import { sound } from '../../utils/sound';

interface AdminCatalogTabProps {
  games: Game[];
  onCatalogUpdated: (updatedGames: Game[]) => void;
}

export const AdminCatalogTab: React.FC<AdminCatalogTabProps> = ({ games, onCatalogUpdated }) => {
  const [selectedGameId, setSelectedGameId] = useState<string>(games[0]?.id || 'mobile-legends');
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Denomination Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDenomName, setNewDenomName] = useState('');
  const [newDenomAmount, setNewDenomAmount] = useState('');
  const [newDenomPriceUsd, setNewDenomPriceUsd] = useState('1.50');
  const [newDenomOrigUsd, setNewDenomOrigUsd] = useState('2.00');
  const [newDenomBonus, setNewDenomBonus] = useState('');

  useEffect(() => {
    const found = games.find((g) => g.id === selectedGameId);
    if (found) {
      const cloned = JSON.parse(JSON.stringify(found));
      if (cloned.banner && (cloned.banner.includes('YrkR-GP7OKghBTAT') || cloned.banner.includes('ZHLmkdTW2Q'))) {
        const def = POPULAR_GAMES.find((p) => p.id === cloned.id);
        if (def) cloned.banner = def.banner;
      }
      setCurrentGame(cloned);
    }
  }, [selectedGameId, games]);

  if (!currentGame) return null;

  const handlePriceChangeUsd = (denomId: string, valStr: string) => {
    const usd = parseFloat(valStr) || 0;
    const priceIdr = Math.round(usd * 16000);

    setCurrentGame((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        denominations: prev.denominations.map((d) => (d.id === denomId ? { ...d, price: priceIdr } : d)),
      };
    });
  };

  const handleOrigPriceChangeUsd = (denomId: string, valStr: string) => {
    const usd = parseFloat(valStr) || 0;
    const origIdr = Math.round(usd * 16000);

    setCurrentGame((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        denominations: prev.denominations.map((d) =>
          d.id === denomId ? { ...d, originalPrice: origIdr } : d
        ),
      };
    });
  };

  const handleDenomFieldChange = (denomId: string, field: keyof GameDenomination, value: any) => {
    setCurrentGame((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        denominations: prev.denominations.map((d) => (d.id === denomId ? { ...d, [field]: value } : d)),
      };
    });
  };

  const handleDeleteDenom = (denomId: string) => {
    sound.playClick();
    if (currentGame.denominations.length <= 1) {
      alert('ត្រូវតែមានកញ្ចប់ទំនិញយ៉ាងហោចណាស់មួយ!');
      return;
    }
    setCurrentGame((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        denominations: prev.denominations.filter((d) => d.id !== denomId),
      };
    });
  };

  const handleAddDenomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    const priceUsd = parseFloat(newDenomPriceUsd) || 1.0;
    const origUsd = parseFloat(newDenomOrigUsd) || priceUsd * 1.2;

    const newDenom: GameDenomination = {
      id: `${currentGame.id}-${Date.now().toString().slice(-4)}`,
      name: newDenomName || 'Diamond Pack',
      amount: newDenomAmount || 'Diamonds',
      price: Math.round(priceUsd * 16000),
      originalPrice: Math.round(origUsd * 16000),
      bonus: newDenomBonus || undefined,
      category: 'diamonds',
      popular: false,
    };

    setCurrentGame((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        denominations: [...prev.denominations, newDenom],
      };
    });

    setIsAddModalOpen(false);
    setNewDenomName('');
    setNewDenomAmount('');
    setNewDenomBonus('');
    sound.playSuccess();
  };

  const handleSaveAll = () => {
    sound.playClick();
    if (!currentGame) return;

    catalogService.updateGame(currentGame);
    onCatalogUpdated(catalogService.getGames());

    sound.playSuccess();
    setNotification({
      type: 'success',
      message: `បានរក្សាទុកព័ត៌មាន និងតម្លៃថ្មីសម្រាប់ ${currentGame.title} រួចរាល់!`,
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleResetDefaults = () => {
    if (confirm('តើអ្នកពិតជាចង់កំណត់តម្លៃ និងរូបភាពទាំងអស់ត្រឡប់ទៅជា Original Defaults វិញឬទេ?')) {
      sound.playClick();
      const defaults = catalogService.resetToDefault();
      onCatalogUpdated(defaults);
      const reloaded = defaults.find((g) => g.id === selectedGameId);
      if (reloaded) setCurrentGame(JSON.parse(JSON.stringify(reloaded)));

      sound.playSuccess();
      setNotification({
        type: 'success',
        message: 'បានកំណត់ឡើងវិញទៅជាតម្លៃដើម (Factory Defaults) រួចរាល់!',
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-2 shadow-xl animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Game Selector Bar */}
      <div className="admin-card rounded-2xl p-3 border border-white/10 bg-[#0d1326] flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xl">
        {games.map((g) => {
          const isSelected = g.id === selectedGameId;
          return (
            <button
              key={g.id}
              onClick={() => {
                sound.playClick();
                setSelectedGameId(g.id);
              }}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.45)] border border-cyan-400/50'
                  : 'bg-[#121933] text-slate-300 hover:text-white hover:bg-[#1a2347] border border-white/10'
              }`}
            >
              <img src={g.thumbnail} alt="" className="w-5 h-5 rounded-md object-cover" />
              <span>{g.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Editing Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Game Media & Details */}
        <div className="space-y-6">
          {/* Card: Images & Media */}
          <div className="admin-card rounded-2xl p-5 border border-white/10 bg-[#0d1326] space-y-4 shadow-xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>រូបភាពតំណាងហ្គេម (Game Media)</span>
              </h3>
            </div>

            {/* Banner Preview & Input */}
            <div>
              <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1.5">
                Banner Header URL (16:9)
              </label>
              <div className="relative mb-2 rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/60">
                <img
                  src={currentGame.banner}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', 'https://placehold.co/1200x600/111827/06b6d4?text=Invalid+Banner+URL');
                  }}
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-slate-300 font-mono">
                  Live Preview
                </span>
              </div>
              <input
                type="text"
                value={currentGame.banner}
                onChange={(e) => setCurrentGame({ ...currentGame, banner: e.target.value })}
                placeholder="https://..."
                className="w-full bg-[#080c1d] border border-white/15 px-3 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            {/* Thumbnail Preview & Input */}
            <div>
              <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1.5">
                Thumbnail Icon URL (Square 1:1)
              </label>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-black/60 flex-shrink-0">
                  <img
                    src={currentGame.thumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://placehold.co/200x200/111827/06b6d4?text=Icon');
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={currentGame.thumbnail}
                    onChange={(e) => setCurrentGame({ ...currentGame, thumbnail: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#080c1d] border border-white/15 px-3 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">រូប Icon បង្ហាញលើទំព័រដើម & Catalog</p>
                </div>
              </div>
            </div>

            {/* Game Meta */}
            <div>
              <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1.5">
                ឈ្មោះហ្គេម (Game Title)
              </label>
              <input
                type="text"
                value={currentGame.title}
                onChange={(e) => setCurrentGame({ ...currentGame, title: e.target.value })}
                className="w-full bg-[#080c1d] border border-white/15 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1.5">
                ក្រុមហ៊ុនផលិត (Publisher)
              </label>
              <input
                type="text"
                value={currentGame.publisher}
                onChange={(e) => setCurrentGame({ ...currentGame, publisher: e.target.value })}
                className="w-full bg-[#080c1d] border border-white/15 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Denominations & Prices Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="admin-card rounded-2xl p-5 border border-white/10 bg-[#0d1326] space-y-4 shadow-xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>កញ្ចប់ពេជ្រ និងកំណត់តម្លៃលក់ ({currentGame.title})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  តម្លៃ USD នឹងត្រូវគណនាជាស្វ័យប្រវត្តិទៅជារូបិយប័ណ្ណរៀល (~4,100 ៛) នៅលើ Storefront
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.35)] border border-cyan-400/40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>បន្ថែមកញ្ចប់ថ្មី</span>
                </button>
              </div>
            </div>

            {/* Denominations List */}
            <div className="space-y-3">
              {currentGame.denominations.map((denom, index) => {
                const priceUsd = (denom.price / 16000).toFixed(2);
                const origUsd = denom.originalPrice ? (denom.originalPrice / 16000).toFixed(2) : '';
                const priceKhr = Math.round(denom.price / 3.9).toLocaleString('en-US');

                return (
                  <div
                    key={denom.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0f162e] border border-white/10 hover:border-cyan-500/40 transition-all shadow-lg space-y-3.5 group"
                  >
                    {/* Tier 1: Item Header (Index, Name, Popular Badge & Action Buttons) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                      {/* Left: Index badge + Name Input */}
                      <div className="flex items-center gap-2.5 flex-1 min-w-[240px]">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-black flex-shrink-0 shadow-sm">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={denom.name}
                            onChange={(e) => handleDenomFieldChange(denom.id, 'name', e.target.value)}
                            placeholder="ឈ្មោះកញ្ចប់ (Item Name)"
                            className="w-full bg-[#080c1d] border border-white/15 px-3 py-1.5 rounded-xl font-bold text-sm text-white focus:outline-none focus:border-cyan-400 font-display transition-all"
                          />
                        </div>
                        {denom.popular && (
                          <span className="px-2 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 flex-shrink-0 shadow-xs">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>Popular</span>
                          </span>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDenomFieldChange(denom.id, 'popular', !denom.popular)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            denom.popular
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                          }`}
                          title="កំណត់ជាកញ្ចប់ពេញនិយម (Popular)"
                        >
                          <Star className={`w-3.5 h-3.5 ${denom.popular ? 'fill-amber-400 text-amber-400' : ''}`} />
                          <span className="text-[11px] font-tech">{denom.popular ? 'Starred' : 'Star'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDenom(denom.id)}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                          title="លុបកញ្ចប់នេះ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Tier 2: Amount & Bonus Inputs (Clear 2-column grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-tech text-cyan-400 uppercase font-bold mb-1">
                          បរិមាណបង្ហាញ (Amount Tag)
                        </label>
                        <input
                          type="text"
                          value={denom.amount}
                          onChange={(e) => handleDenomFieldChange(denom.id, 'amount', e.target.value)}
                          placeholder="ឧទាហរណ៍៖ 86 💎"
                          className="w-full bg-[#080c1d] border border-white/15 px-3 py-1.5 rounded-xl text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-tech text-slate-400 uppercase font-bold mb-1">
                          ប្រាក់រង្វាន់បន្ថែម (Bonus Tag - Optional)
                        </label>
                        <input
                          type="text"
                          value={denom.bonus || ''}
                          onChange={(e) => handleDenomFieldChange(denom.id, 'bonus', e.target.value)}
                          placeholder="ឧទាហរណ៍៖ +8 Bonus"
                          className="w-full bg-[#080c1d] border border-white/15 px-3 py-1.5 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Tier 3: 4-Column Financial Stats & Profit Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 border-t border-white/5">
                      {/* 1. Retail Selling Price */}
                      <div className="p-3 rounded-xl bg-[#080c1d] border border-emerald-500/40 shadow-inner flex flex-col justify-between">
                        <span className="block text-[10px] font-tech text-emerald-400 uppercase font-bold tracking-wider">
                          តម្លៃលក់ (Selling USD)
                        </span>
                        <div className="relative mt-1">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={priceUsd}
                            onChange={(e) => handlePriceChangeUsd(denom.id, e.target.value)}
                            className="w-full bg-black/40 border border-emerald-500/50 pl-6 pr-2 py-1.5 rounded-lg text-xs font-mono font-black text-emerald-400 focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                        <span className="text-[10px] text-emerald-300/80 font-mono block mt-1.5">
                          ~{priceKhr} ៛ (KHR)
                        </span>
                      </div>

                      {/* 2. Original Price for Discount */}
                      <div className="p-3 rounded-xl bg-[#080c1d] border border-white/15 shadow-inner flex flex-col justify-between">
                        <span className="block text-[10px] font-tech text-slate-400 uppercase font-bold tracking-wider">
                          តម្លៃដើម (Original USD)
                        </span>
                        <div className="relative mt-1">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={origUsd}
                            onChange={(e) => handleOrigPriceChangeUsd(denom.id, e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-black/40 border border-white/15 pl-6 pr-2 py-1.5 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block mt-1.5">
                          សម្រាប់ Discount
                        </span>
                      </div>

                      {/* 3. Payment Fee */}
                      <div className="p-3 rounded-xl bg-[#080c1d] border border-white/15 shadow-inner flex flex-col justify-between">
                        <span className="block text-[10px] font-tech text-cyan-400 uppercase font-bold tracking-wider">
                          សេវាទូទាត់ (Fee)
                        </span>
                        <div className="mt-1 py-1.5 px-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-bold text-center">
                          0% FREE
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block mt-1.5 text-center">
                          $0.00 (KHQR ឥតគិតថ្លៃ)
                        </span>
                      </div>

                      {/* 4. Net Profit */}
                      {(() => {
                        const priceNum = parseFloat(priceUsd) || 0;
                        const costEst = Number((priceNum * 0.90).toFixed(2));
                        const profitEst = Number((priceNum - costEst).toFixed(2));
                        const profitKhr = Math.round(profitEst * 4100);
                        const margin = priceNum > 0 ? ((profitEst / priceNum) * 100).toFixed(1) : '10.0';
                        return (
                          <div className="p-3 rounded-xl bg-[#080c1d] border border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-inner flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-tech text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                <span>ចំណេញ (Profit)</span>
                              </span>
                              <span className="text-[9px] font-mono text-emerald-400/90 font-bold bg-emerald-500/20 px-1 py-0.2 rounded">
                                {margin}%
                              </span>
                            </div>
                            <div className="mt-1 py-1 px-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-black text-center">
                              +${profitEst.toFixed(2)}
                            </div>
                            <span className="text-[10px] text-emerald-300/80 font-mono block mt-1.5 text-center">
                              ~{profitKhr.toLocaleString()} ៛ (Net)
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#121933] hover:bg-[#1a2347] border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>កំណត់ឡើងវិញទៅតម្លៃដើម (Reset Defaults)</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>រក្សាទុកការផ្លាស់ប្តូរ (Save All Changes)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Denomination Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="admin-card rounded-3xl border border-cyan-500/40 bg-[#0d1326] p-6 sm:p-7 max-w-md w-full relative animate-in fade-in zoom-in-95 shadow-2xl text-white">
            <h3 className="font-display font-black text-lg text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>បន្ថែមកញ្ចប់ពេជ្រថ្មី (New Denomination)</span>
            </h3>

            <form onSubmit={handleAddDenomSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1">
                  ឈ្មោះកញ្ចប់ (Package Name)
                </label>
                <input
                  type="text"
                  required
                  value={newDenomName}
                  onChange={(e) => setNewDenomName(e.target.value)}
                  placeholder="ឧទាហរណ៍៖ 500 Diamonds"
                  className="w-full bg-[#080c1d] border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1">
                  បរិមាណបង្ហាញ (Amount Tag)
                </label>
                <input
                  type="text"
                  required
                  value={newDenomAmount}
                  onChange={(e) => setNewDenomAmount(e.target.value)}
                  placeholder="ឧទាហរណ៍៖ 500 💎"
                  className="w-full bg-[#080c1d] border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-tech text-emerald-400 font-bold uppercase tracking-wider mb-1">
                    តម្លៃលក់ ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newDenomPriceUsd}
                    onChange={(e) => setNewDenomPriceUsd(e.target.value)}
                    placeholder="1.50"
                    className="w-full bg-[#080c1d] border border-emerald-500/60 px-3.5 py-2.5 rounded-xl text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-tech text-slate-400 font-bold uppercase tracking-wider mb-1">
                    តម្លៃដើម ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newDenomOrigUsd}
                    onChange={(e) => setNewDenomOrigUsd(e.target.value)}
                    placeholder="2.00"
                    className="w-full bg-[#080c1d] border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-tech text-cyan-400 font-bold uppercase tracking-wider mb-1">
                  ប្រាក់រង្វាន់បន្ថែម Bonus Tag (បើមាន)
                </label>
                <input
                  type="text"
                  value={newDenomBonus}
                  onChange={(e) => setNewDenomBonus(e.target.value)}
                  placeholder="ឧទាហរណ៍៖ +50 Bonus"
                  className="w-full bg-[#080c1d] border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Live Estimated Profit Preview */}
              {newDenomPriceUsd && parseFloat(newDenomPriceUsd) > 0 && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ប្រាក់ចំណេញប៉ាន់ស្មាន (Est. Profit):</span>
                  </span>
                  <span className="font-mono font-black text-emerald-400">
                    +${(parseFloat(newDenomPriceUsd) * 0.10).toFixed(2)} (~{Math.round(parseFloat(newDenomPriceUsd) * 0.10 * 4100).toLocaleString()} ៛)
                  </span>
                </div>
              )}

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  បោះបង់ (Cancel)
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                >
                  យល់ព្រមបន្ថែម (Add)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
