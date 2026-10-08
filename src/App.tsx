import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LiveTicker } from './components/LiveTicker';
import { GameCatalog } from './components/GameCatalog';
import { FlashDeals } from './components/FlashDeals';
import { TopUpTerminal } from './components/TopUpTerminal';
import { PaymentCheckoutModal } from './components/PaymentCheckoutModal';
import { SuccessReceiptModal } from './components/SuccessReceiptModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WinrateCalculatorModal } from './components/WinrateCalculatorModal';
import { SearchModal } from './components/SearchModal';
import { AuraAesthetics } from './components/AuraAesthetics';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';

import { POPULAR_GAMES } from './data/games';
import type { Game, Currency, AuraTheme, Language, ThemeMode } from './types';
import { TRANSLATIONS } from './utils/i18n';
import { sound } from './utils/sound';
import { HelpCircle, ChevronDown, ShieldCheck, Zap, Headphones, Sparkles } from 'lucide-react';

export function App() {
  // Navigation & Game State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Language & Customization States
  const [lang, setLang] = useState<Language>('km');
  const t = TRANSLATIONS[lang];
  const [currency, setCurrency] = useState<Currency>('USD');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [auraTheme, setAuraTheme] = useState<AuraTheme>('cyan');
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('aura_theme_mode');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [checkoutOrderData, setCheckoutOrderData] = useState<any | null>(null);
  const [completedReceipt, setCompletedReceipt] = useState<any | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Keyboard shortcut: Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize document lang attribute and class for Khmer Siemreab font
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'km') {
      document.documentElement.classList.add('lang-km');
    } else {
      document.documentElement.classList.remove('lang-km');
    }
  }, [lang]);

  // Synchronize document theme mode (dark vs light) and persist
  useEffect(() => {
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }

    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.backgroundColor = '#f8fafc';
      document.body.style.backgroundColor = '#f8fafc';
      metaTheme.setAttribute('content', '#f8fafc');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#070913';
      document.body.style.backgroundColor = '#070913';
      metaTheme.setAttribute('content', '#070913');
    }
    localStorage.setItem('aura_theme_mode', themeMode);
  }, [themeMode]);

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo(0, 0);
  };

  const handleSelectFlashDeal = (game: Game, _denomId: string) => {
    setSelectedGame(game);
    window.scrollTo(0, 0);
  };

  const handleProceedCheckout = (orderData: any) => {
    setCheckoutOrderData(orderData);
  };

  const handlePaymentSuccess = (finalOrder: any) => {
    setCheckoutOrderData(null);
    setCompletedReceipt(finalOrder);
  };

  const FAQ_DATA: Record<Language, { q: string; a: string }[]> = {
    km: [
      {
        q: 'តើការបញ្ចូលលុយចំណាយពេលប៉ុន្មានបន្ទាប់ពីបង់ប្រាក់រួច?',
        a: 'ការបញ្ចូលលុយនៅ Aura Legacy ដំណើរការដោយស្វ័យប្រវត្តិតាមរយៈប្រព័ន្ធ API Server ២៤ ម៉ោង។ ជាមធ្យម ពេជ្រ ឬកាក់ហ្គេមនឹងចូលគណនីក្នុងរយៈពេល ០.៥ ទៅ ៣ វិនាទី បន្ទាប់ពីការទូទាត់ត្រូវបានផ្ទៀងផ្ទាត់។'
      },
      {
        q: 'តើការបញ្ចូលលុយនៅ Aura Legacy មានសុវត្ថិភាព និងស្របច្បាប់ដែរឬទេ?',
        a: 'សុវត្ថិភាព និងស្របច្បាប់ ១០០%។ យើងសហការជាមួយក្រុមហ៊ុនចែកចាយផ្លូវការ (Moonton, Riot Games, Garena, HoYoverse)។ ពេជ្រទាំងអស់មានការធានាផ្លូវការ មិនដកពេជ្រ (Anti-Minus)។'
      },
      {
        q: 'ចុះបើពេជ្រមិនទាន់ចូលក្នុងហ្គេម តើត្រូវធ្វើដូចម្តេច?',
        a: 'អ្នកអាចទាក់ទងមកកាន់ផ្នែកបម្រើអតិថិជន ២៤ ម៉ោង ឬពិនិត្យស្ថានភាពតាមរយៈទំព័រ «ពិនិត្យការបញ្ជាទិញ»។ ក្រុមការងារយើងនឹងជួយដោះស្រាយភ្លាមៗ។'
      },
      {
        q: 'តើគាំទ្រវិធីសាស្រ្តទូទាត់ប្រាក់អ្វីខ្លះ?',
        a: 'យើងគាំទ្រការទូទាត់រហ័ស KHQR (Bakong) ជាមួយគ្រប់កម្មវិធីធនាគារទាំងអស់នៅកម្ពុជា (ABA Mobile, Wing Bank, ACLEDA, Canadia, TrueMoney, Sathapana...) ដោយឥតគិតថ្លៃសេវា (0% Fee)។'
      }
    ],
    en: [
      {
        q: 'How long does the top-up take after payment?',
        a: 'Top-ups at Aura Legacy are processed automatically 24/7 via server API injection. On average, game items arrive within 0.5 to 3 seconds after payment verification.'
      },
      {
        q: 'Is top-up at Aura Legacy safe and 100% legal?',
        a: '100% Safe and Legal. We partner directly with official publishers & authorized distributors. All diamonds are guaranteed anti-minus.'
      },
      {
        q: 'What if my in-game credits have not arrived?',
        a: 'You can immediately contact our 24/7 Customer Service or check your invoice status in real-time via "Order Tracker".'
      },
      {
        q: 'What payment methods are supported?',
        a: 'We support universal Bakong KHQR, enabling instant 0% fee payments with any Cambodian mobile banking app including ABA Mobile, Wing Bank, ACLEDA, Canadia, TrueMoney, and Sathapana.'
      }
    ],
    id: [
      {
        q: 'Berapa lama proses top up setelah pembayaran?',
        a: 'Top up di Aura Legacy diproses secara otomatis oleh sistem injeksi server 24 jam. Rata-rata transaksi masuk dalam 0.5 hingga 3 detik setelah pembayaran terverifikasi.'
      },
      {
        q: 'Apakah top up di Aura Legacy aman dan legal?',
        a: '100% Aman dan Legal. Kami bekerjasama langsung dengan authorized publisher & distributor resmi (Moonton, Riot Games, Garena, HoYoverse). Semua diamond bergaransi resmi anti-minus.'
      },
      {
        q: 'Bagaimana jika saldo atau diamond belum masuk?',
        a: 'Kamu dapat langsung menghubungi tim Customer Service WhatsApp kami yang siaga 24 jam atau mengecek status invoice melalui fitur "Cek Transaksi". Tim kami siap membantu menyelesaikan kendala dalam hitungan menit.'
      },
      {
        q: 'Metode pembayaran apa saja yang didukung?',
        a: 'Kami menerima QRIS (BCA, Mandiri, GoPay, OVO, Dana, ShopeePay), Transfer Virtual Account semua bank nasional, Minimarket (Indomaret/Alfamart), serta pembayaran Crypto (USDT).'
      }
    ]
  };

  const faqs = FAQ_DATA[lang];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-500">
      {/* Ambient Visual Aura Layer */}
      <AuraAesthetics theme={auraTheme} mode={themeMode} />

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'home' || tab === 'games') {
            setSelectedGame(null);
          }
        }}
        currency={currency}
        setCurrency={setCurrency}
        lang={lang}
        setLang={setLang}
        t={t}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        auraTheme={auraTheme}
        setAuraTheme={setAuraTheme}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Live Transaction Feed Ticker */}
      <LiveTicker t={t} />

      {/* Main Content Area */}
      <main className={`flex-1 relative z-10 ${!selectedGame ? 'pb-24 md:pb-0' : ''}`}>
        {selectedGame ? (
          /* Dedicated Top-up Terminal View for Selected Game */
          <TopUpTerminal
            game={selectedGame}
            currency={currency}
            t={t}
            onBack={() => {
              setSelectedGame(null);
              window.scrollTo(0, 0);
            }}
            onProceedCheckout={handleProceedCheckout}
          />
        ) : (
          /* Homepage View */
          <>
            {/* Hero Banner Section */}
            {currentTab === 'home' && (
              <HeroBanner
                games={POPULAR_GAMES}
                t={t}
                onSelectGame={handleSelectGame}
                onExploreClick={() => {
                  const el = document.getElementById('games-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* Flash Deals Section */}
            {(currentTab === 'home' || currentTab === 'flash') && (
              <FlashDeals
                games={POPULAR_GAMES}
                currency={currency}
                t={t}
                onSelectDeal={handleSelectFlashDeal}
              />
            )}

            {/* Game Catalog Grid */}
            <GameCatalog
              games={POPULAR_GAMES}
              currency={currency}
              t={t}
              onSelectGame={handleSelectGame}
            />

            {/* Why Choose Us & Gamer Guarantee Section - Hidden on Mobile */}
            <section className="hidden md:block py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-card rounded-3xl p-6 sm:p-12 border border-slate-200/90 dark:border-white/10 relative overflow-hidden shadow-xs dark:shadow-glass">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2 font-tech">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.whyUsBadge}</span>
                  </div>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
                    {t.whyUsTitle} <span className="aura-text-gradient">{t.whyUsTitleHighlight}</span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
                    {t.whyUsSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/40 transition-all">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 mb-4">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
                      {t.feature1Title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.feature1Desc}
                    </p>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 hover:border-purple-500/40 transition-all">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
                      {t.feature2Title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.feature2Desc}
                    </p>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/40 transition-all">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
                      {t.feature3Title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.feature3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive FAQ Section - Hidden on Mobile */}
            <section className="hidden md:block py-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1.5 font-tech">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t.faqBadge}</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  {t.faqTitle} <span className="aura-text-gradient">{t.faqTitleHighlight}</span>
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="glass-card rounded-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => {
                          sound.playClick();
                          setOpenFaq(isOpen ? null : idx);
                        }}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-cyan-500 dark:text-cyan-400 transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-white/5 pt-3 animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Mobile Floating Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'home' || tab === 'games') {
            setSelectedGame(null);
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        t={t}
        lang={lang}
        isVisible={!selectedGame}
      />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {isSearchOpen && (
        <SearchModal
          games={POPULAR_GAMES}
          currency={currency}
          t={t}
          onSelectGame={handleSelectGame}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {isTrackerOpen && (
        <OrderTrackerModal
          t={t}
          onClose={() => setIsTrackerOpen(false)}
        />
      )}

      {isCalculatorOpen && (
        <WinrateCalculatorModal
          onClose={() => setIsCalculatorOpen(false)}
        />
      )}

      {checkoutOrderData && (
        <PaymentCheckoutModal
          orderData={checkoutOrderData}
          currency={currency}
          t={t}
          onClose={() => setCheckoutOrderData(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {completedReceipt && (
        <SuccessReceiptModal
          receipt={completedReceipt}
          currency={currency}
          t={t}
          onClose={() => setCompletedReceipt(null)}
          onNewOrder={() => {
            setCompletedReceipt(null);
            setSelectedGame(null);
          }}
        />
      )}

      {/* Floating 24/7 Live Customer Support Chat Widget */}
      <LiveChatWidget
        lang={lang}
        t={t}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />
    </div>
  );
}

export default App;
