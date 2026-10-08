import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Flame, 
  Menu, 
  X,
  ShieldCheck,
  Sun,
  Moon,
  Globe,
  ChevronDown
} from 'lucide-react';
import type { Currency, AuraTheme, Language, ThemeMode } from '../types';
import type { Translations } from '../utils/i18n';
import { sound } from '../utils/sound';
import brandLogo from '../assets/logo.png';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
  soundEnabled?: boolean;
  setSoundEnabled?: (enabled: boolean) => void;
  auraTheme?: AuraTheme;
  setAuraTheme?: (theme: AuraTheme) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  onOpenSearch: () => void;
  onOpenTracker?: () => void;
  onOpenCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  lang,
  setLang,
  t,
  themeMode,
  setThemeMode,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Prevent background scrolling & allow ESC key to close mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);


  const languages: { id: Language; label: string; code: string }[] = [
    { id: 'en', label: 'English', code: 'EN' },
    { id: 'km', label: 'ភាសាខ្មែរ', code: 'KH' },
    { id: 'id', label: 'Indonesia', code: 'ID' },
  ];

  return (
    <>
      <header 
        className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#070913]/95 backdrop-blur-md transition-colors"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
      {/* Main Glass Solid Navbar */}
      <nav className="glass-solid border-b border-slate-200/90 dark:border-white/10 px-3.5 sm:px-4 lg:px-8 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo with User's Uploaded Logo */}
          <div 
            onClick={() => {
              sound.playClick();
              setCurrentTab('home');
            }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 via-rose-600 to-amber-500 p-[1.5px] shadow-sm dark:shadow-[0_0_22px_rgba(239,68,68,0.4)] group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-[#180a14] to-[#0a0408] rounded-[10px] sm:rounded-[14px] flex items-center justify-center p-0.5 sm:p-1 relative">
                  <div className="absolute inset-0 bg-red-600/20 blur-sm rounded-full pointer-events-none" />
                  <img
                    src={brandLogo}
                    alt="AuraLegacy Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,20,60,0.7)] group-hover:scale-110 transition-transform duration-300 relative z-10"
                  />
                </div>
              </div>
              <div className="hidden dark:block absolute -inset-1 bg-red-500/25 rounded-2xl blur-md -z-10 group-hover:bg-red-500/40 transition-colors" />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-brand font-black text-base sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1 leading-tight">
                AURA<span className="aura-text-gradient">LEGACY</span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase font-tech font-brand leading-none">
                TOP UP SERVICE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Capsule */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/95 dark:bg-black/40 border border-slate-200/90 dark:border-white/10 rounded-full p-1 shadow-sm dark:shadow-glass flex-shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('home');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                currentTab === 'home'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
              }`}
            >
              {t.home}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('games');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                currentTab === 'games'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
              }`}
            >
              {t.allGames}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('flash');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                currentTab === 'flash'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25'
                  : 'text-amber-600 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 hover:bg-amber-500/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse flex-shrink-0" />
              <span>{t.flashSale}</span>
            </button>
          </div>

          {/* Right Action Deck */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Quick Search Button (Desktop & Tablet only, mobile uses bottom dock) */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenSearch();
              }}
              className="glass-solid-btn hidden sm:flex items-center justify-start gap-2 h-9 px-3.5 rounded-full text-slate-700 dark:text-slate-200 text-xs flex-shrink-0 cursor-pointer"
              title="Quick Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <span className="hidden xl:inline text-xs font-medium text-slate-500 dark:text-slate-400">{t.searchPlaceholder}</span>
              <kbd className="bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-500 dark:text-slate-400 font-mono border border-slate-200/80 dark:border-white/10">⌘K</kbd>
            </button>

            {/* Desktop Language Switcher Pill */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => {
                  sound.playClick();
                  setLangDropdownOpen(!langDropdownOpen);
                }}
                className="glass-solid-btn flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-100 flex-shrink-0 cursor-pointer"
                title={t.selectLanguage}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span className="font-bold text-xs">{lang === 'km' ? 'ខ្មែរ' : lang.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 dark:text-slate-500 opacity-70 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 glass-solid-card rounded-2xl p-1.5 shadow-2xl z-50 border border-slate-200/90 dark:border-white/15 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-tech">
                    {t.selectLanguage}
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        sound.playSelect();
                        setLang(l.id);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        lang === l.id 
                          ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-500/25' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          {l.code}
                        </span>
                        <span>{l.label}</span>
                      </div>
                      {lang === l.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Switcher: $ (USD) and ៛ (KHR) */}
            <div className="hidden sm:flex items-center p-0.5 rounded-full glass-solid-btn font-mono font-bold text-xs">
              <button
                onClick={() => {
                  sound.playSelect();
                  setCurrency('USD');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-emerald-500 text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="US Dollar ($)"
              >
                <span className="text-sm font-black">$</span>
                <span>USD</span>
              </button>
              <button
                onClick={() => {
                  sound.playSelect();
                  setCurrency('KHR');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  currency === 'KHR'
                    ? 'bg-cyan-500 text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Khmer Riel (៛)"
              >
                <span className="text-sm font-black">៛</span>
                <span>KHR</span>
              </button>
            </div>

            {/* Theme Mode Switcher */}
            <div className="hidden md:flex items-center pl-1 border-l border-slate-200 dark:border-white/10">
              <button
                onClick={() => {
                  sound.playClick();
                  setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
                }}
                className="glass-solid-btn w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all duration-300 cursor-pointer"
                title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Light or Dark Mode"
              >
                {themeMode === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-300 text-indigo-600 dark:text-indigo-400 hover:-rotate-12" />
                )}
              </button>
            </div>

            {/* Mobile Unified Capsule (Language + Menu in 1 Sleek Dock) */}
            <div className="lg:hidden relative flex items-center glass-solid-btn rounded-full p-0.5 sm:p-1 border border-slate-200/90 dark:border-white/15 shadow-xs">
              {/* Language Trigger */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLangDropdownOpen(!langDropdownOpen);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer select-none"
                title={t.selectLanguage}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span className="font-bold text-[11px] sm:text-xs leading-none">{lang === 'km' ? 'ខ្មែរ' : lang.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 dark:text-slate-500 opacity-70 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Hairline Divider */}
              <div className="w-[1px] h-3.5 bg-slate-200 dark:bg-white/15 mx-0.5 flex-shrink-0" />

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-all flex-shrink-0 cursor-pointer select-none"
                aria-label="Toggle Navigation Menu"
              >
                <Menu className="w-4 h-4 text-slate-800 dark:text-slate-200" strokeWidth={2.2} />
              </button>

              {/* Mobile Language Dropdown */}
              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 glass-solid-card rounded-2xl p-1.5 shadow-2xl z-50 border border-slate-200/90 dark:border-white/15 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-tech">
                    {t.selectLanguage}
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        sound.playSelect();
                        setLang(l.id);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        lang === l.id 
                          ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-500/25' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          {l.code}
                        </span>
                        <span>{l.label}</span>
                      </div>
                      {lang === l.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>

    {/* Mobile Slide-Over Drawer on the Right (Portaled to document.body to escape header stacking trap) */}
    {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
      <div className="lg:hidden fixed inset-0 z-[100] overflow-hidden">
        {/* Backdrop Blur Overlay */}
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in z-[100]"
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(false);
          }}
        />

        {/* Slide-in Right Drawer Panel */}
        <div className="fixed inset-y-0 right-0 w-full max-w-[320px] sm:max-w-sm bg-white dark:bg-[#080d1a] border-l border-slate-200/90 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 ease-out z-[101]">
            {/* Drawer Top Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-amber-500 p-[1.5px] shadow-sm flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-[#180a14] rounded-[10px] flex items-center justify-center p-0.5">
                    <img src={brandLogo} alt="Aura Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-brand font-extrabold text-sm tracking-wider text-slate-900 dark:text-white">
                    AURA<span className="aura-text-gradient">LEGACY</span>
                  </span>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold font-tech uppercase tracking-wider">
                    MENU & PREFERENCES
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="glass-solid-btn w-8 h-8 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-4 sm:p-5 space-y-4 flex-1">
              {/* Quick Search Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="glass-solid-btn w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 text-xs font-medium cursor-pointer"
              >
                <Search className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{t.searchPlaceholder}</span>
              </button>

              {/* Navigation Links Grid */}
              <div className="grid grid-cols-2 gap-2 font-tech">
                <button
                  onClick={() => {
                    sound.playClick();
                    setCurrentTab('home');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    currentTab === 'home' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                      : 'glass-solid-btn text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{t.home}</span>
                </button>
                
                <button
                  onClick={() => {
                    sound.playClick();
                    setCurrentTab('games');
                    setMobileMenuOpen(false);
                    const el = document.getElementById('games-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    currentTab === 'games' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                      : 'glass-solid-btn text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{t.allGames}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setCurrentTab('flash');
                    setMobileMenuOpen(false);
                    const el = document.getElementById('flash-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    currentTab === 'flash'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                      : 'glass-solid-btn text-amber-600 dark:text-amber-300'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.flashSale}</span>
                </button>
              </div>

              {/* Preferences Card */}
              <div className="glass-solid-card rounded-2xl p-3.5 space-y-3">
                {/* Language Switcher in Mobile Drawer */}
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Language:</span>
                  <div className="flex items-center gap-1">
                    {languages.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          sound.playSelect();
                          setLang(l.id);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          lang === l.id
                            ? 'bg-cyan-500 text-white shadow-xs'
                            : 'glass-solid-btn text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                        }`}
                      >
                        {l.code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Mode Segmented Switch */}
                <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-200/70 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Theme Mode:</span>
                  <div className="flex items-center glass-solid-btn p-0.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setThemeMode('light');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        themeMode === 'light'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Sun className={`w-3.5 h-3.5 transition-transform duration-200 ${themeMode === 'light' ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`} />
                      <span>Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setThemeMode('dark');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        themeMode === 'dark'
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Moon className={`w-3.5 h-3.5 transition-transform duration-200 ${themeMode === 'dark' ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}`} />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>

                {/* Currency Switcher Row: $ and ៛ */}
                <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-200/70 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Currency:</span>
                  <div className="flex items-center glass-solid-btn p-0.5 rounded-xl font-mono text-xs">
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setCurrency('USD');
                      }}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-black">$</span>
                      <span>USD</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setCurrency('KHR');
                      }}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        currency === 'KHR'
                          ? 'bg-cyan-500 text-white shadow-xs'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-black">៛</span>
                      <span>KHR</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Status Strip */}
            <div className="p-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-black/30" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-tech">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.serverOperational}</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{t.officialLegal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
