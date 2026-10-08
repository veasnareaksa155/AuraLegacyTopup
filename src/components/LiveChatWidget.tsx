import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Headphones, 
  ExternalLink, 
  HelpCircle, 
  ShieldCheck, 
  ChevronRight,
  Clock,
  Zap
} from 'lucide-react';
import type { Language } from '../types';
import type { Translations } from '../utils/i18n';
import { sound } from '../utils/sound';

interface LiveChatWidgetProps {
  lang: Language;
  t: Translations;
  onOpenTracker?: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  lang,
  onOpenTracker,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleOpen = () => {
    sound.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleOpenTelegram = () => {
    sound.playClick();
    // Default official Telegram support handle
    window.open('https://t.me/AuraLegacyTopup', '_blank', 'noopener,noreferrer');
  };

  const handleOpenWhatsApp = () => {
    sound.playClick();
    window.open('https://wa.me/85512345678', '_blank', 'noopener,noreferrer');
  };

  const QUICK_QUESTIONS = [
    {
      q: lang === 'km' 
        ? 'ពេជ្រមិនទាន់ចូលក្នុងហ្គេម តើត្រូវធ្វើដូចម្តេច?' 
        : 'What if my in-game credits have not arrived?',
      a: lang === 'km'
        ? 'ជាទូទៅពេជ្រចូលក្នុងរយៈពេល ០.៥ - ៣ វិនាទី។ ប្រសិនបើហួស ៥ នាទីមិនទាន់ឃើញ សូមផ្ញើលេខ Order ID និងរូបវិក្កយបត្រមកកាន់ Telegram Admin របស់យើងដើម្បីជួយឆែកជូនភ្លាមៗ!'
        : 'Top-ups normally take 0.5 - 3 seconds. If not received after 5 minutes, please send your Order ID and receipt to our Telegram Admin for immediate assistance!'
    },
    {
      q: lang === 'km'
        ? 'របៀបទូទាត់ប្រាក់តាម KHQR (0% Fee)?'
        : 'How to pay with Bakong KHQR (0% Fee)?',
      a: lang === 'km'
        ? 'បងអាចប្រើកម្មវិធីធនាគារណាមួយនៅកម្ពុជា (ABA, Wing, ACLEDA, Canadia...) ដើម្បីស្កេន QR Code ដោយមិនអស់ថ្លៃសេវា (0% Fee)។'
        : 'You can use any Cambodian mobile banking app (ABA, Wing, ACLEDA, Bakong...) to scan the QR code with 0% fee.'
    },
    {
      q: lang === 'km'
        ? 'តើត្រូវស្វែងរក User ID ហ្គេមនៅកន្លែងណា?'
        : 'Where can I find my in-game User ID?',
      a: lang === 'km'
        ? 'ចូលទៅកាន់ Profile ក្នុងហ្គេមរបស់អ្នក។ User ID និង Zone ID នឹងបង្ហាញនៅក្រោមរូប Avatar របស់អ្នក។'
        : 'Open your in-game Profile. Your User ID and Zone ID are displayed right beneath your avatar.'
    }
  ];

  return (
    <>
      {/* Floating Chat Trigger Button (FAB) - Generous clearance above mobile bottom navbar */}
      <div className="fixed bottom-[108px] sm:bottom-8 right-4 sm:right-6 z-40">
        <button
          onClick={toggleOpen}
          aria-label="Customer Support Chat"
          className="relative group p-3 sm:p-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-[0_8px_25px_rgba(6,182,212,0.45)] hover:shadow-[0_12px_32px_rgba(6,182,212,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/20"
        >
          {/* Glowing Green Online Status Indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#070913]" />
          </span>

          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform rotate-90 duration-200" />
          ) : (
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" />
          )}

          {/* Floating Pill Label on Desktop */}
          <span className="hidden md:inline-flex ml-2 pr-1 text-xs font-bold font-tech tracking-wide select-none">
            {lang === 'km' ? 'ជំនួយ ២៤/៧' : 'Chat CS'}
          </span>
        </button>
      </div>

      {/* Interactive Chat & Support Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-end sm:items-auto justify-center sm:justify-end p-3 sm:p-0 bg-black/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full sm:w-[380px] max-h-[85vh] sm:max-h-[580px] flex flex-col glass-solid-card rounded-3xl border border-slate-200/90 dark:border-cyan-500/30 shadow-2xl overflow-hidden bg-white/95 dark:bg-[#090e1c]/95 backdrop-blur-2xl">
            
            {/* Header with Agent Info */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white relative">
              <button
                onClick={toggleOpen}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center p-2 shadow-inner">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-indigo-700" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-black text-sm text-white">
                      Aura Legacy Support
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-cyan-200" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-cyan-100 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{lang === 'km' ? 'អនឡាញ ២៤ ម៉ោង • ឆ្លើយតបក្នុង ១ នាទី' : 'Online 24/7 • Fast Reply < 1 min'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Support Content */}
            <div className="p-4 space-y-4 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200 text-xs">
              
              {/* Welcome Card */}
              <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{lang === 'km' ? 'សួស្តី! តើយើងអាចជួយអ្វីដល់អ្នក?' : 'Hello! How can we help you today?'}</span>
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {lang === 'km' 
                    ? 'ជ្រើសរើសបណ្តាញខាងក្រោមដើម្បីទាក់ទងមកកាន់ Admin ផ្ទាល់ ឬអានចម្លើយរហ័ស។' 
                    : 'Choose a channel below to contact our admin team or find instant answers.'}
                </p>
              </div>

              {/* Direct Contact Buttons */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-tech">
                  {lang === 'km' ? 'ទាក់ទងមក Admin ផ្ទាល់ (Direct Support)' : 'Direct Admin Support'}
                </div>

                {/* Telegram Official Channel */}
                <button
                  onClick={handleOpenTelegram}
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#229ED9]/15 to-[#229ED9]/5 hover:from-[#229ED9]/25 hover:to-[#229ED9]/15 border border-[#229ED9]/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#229ED9] text-white flex items-center justify-center shadow-sm">
                      <Send className="w-4 h-4 ml-0.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Telegram Support</span>
                        <span className="text-[10px] bg-[#229ED9]/20 text-[#229ED9] px-1.5 py-0.2 rounded font-mono font-bold">លឿនបំផុត</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        @AuraLegacyTopup
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#229ED9] transition-colors" />
                </button>

                {/* WhatsApp Support */}
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#25D366]/15 to-[#25D366]/5 hover:from-[#25D366]/25 hover:to-[#25D366]/15 border border-[#25D366]/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        WhatsApp Hotline
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        +855 12 345 678
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] transition-colors" />
                </button>
              </div>

              {/* Quick Self-Help FAQs */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-tech flex items-center justify-between">
                  <span>{lang === 'km' ? 'សំណួរញឹកញាប់ (FAQ)' : 'Quick Answers'}</span>
                  {onOpenTracker && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenTracker();
                      }}
                      className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-sans normal-case"
                    >
                      <Clock className="w-3 h-3" />
                      <span>{lang === 'km' ? 'តាមដាន Order' : 'Track Order'}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {QUICK_QUESTIONS.map((item, idx) => {
                    const isExpanded = activeFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => {
                            sound.playClick();
                            setActiveFaq(isExpanded ? null : idx);
                          }}
                          className="w-full p-2.5 text-left font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between gap-2"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                            <span className="text-[11px] leading-snug">{item.q}</span>
                          </span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform flex-shrink-0 ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="px-3 pb-3 pt-0 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/40 dark:border-white/5">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Direct CTA Footer */}
            <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">
                {lang === 'km' ? 'ជំនួយបច្ចេកទេស ២៤/៧' : '24/7 Live Support'}
              </span>
              <button
                onClick={handleOpenTelegram}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Send className="w-3 h-3" />
                <span>{lang === 'km' ? 'ផ្ញើសារ' : 'Chat Now'}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

