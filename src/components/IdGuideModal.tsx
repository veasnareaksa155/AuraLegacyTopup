import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Gamepad2
} from 'lucide-react';
import type { Translations } from '../utils/i18n';
import { sound } from '../utils/sound';

interface IdGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGameId?: string;
  t: Translations;
  onSelectSampleId?: (sample: { userId: string; zoneId?: string; server?: string }) => void;
}

interface GameGuideData {
  id: string;
  name: string;
  icon: string;
  hasZoneId: boolean;
  hasServer: boolean;
  badge: string;
  sample: { userId: string; zoneId?: string; server?: string };
  steps: {
    km: string[];
    en: string[];
  };
  mockup: {
    avatarText: string;
    playerName: string;
    idLabel: string;
    idValue: string;
    zoneLabel?: string;
    zoneValue?: string;
    serverLabel?: string;
    serverValue?: string;
    tip: {
      km: string;
      en: string;
    };
  };
}

const GAME_GUIDES: GameGuideData[] = [
  {
    id: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    icon: '⚔️',
    badge: 'User ID + Zone ID',
    hasZoneId: true,
    hasServer: false,
    sample: { userId: '1114917746', zoneId: '13486' },
    steps: {
      km: [
        'បើកហ្គេម Mobile Legends រួចចុចលើរូប Avatar (Profile) នៅជ្រុងខាងលើឆ្វេងដៃនៃអេក្រង់។',
        'ចូលទៅកាន់ផ្ទាំង "Basic Info" (ព័ត៌មានមូលដ្ឋាន) ក្រោមរូបតំណាងរបស់អ្នក។',
        'នៅខាងក្រោមឈ្មោះកីឡាករ អ្នកនឹងឃើញលេខសម្គាល់ទម្រង់៖ 1114917746 (13486)។',
        'លេខ 8-10 ខ្ទង់ខាងមុខ គឺជា User ID ហើយលេខក្នុងវង់ក្រចក គឺជា Zone ID!'
      ],
      en: [
        'Open Mobile Legends and tap your Avatar Profile icon in the top-left corner of the main screen.',
        'Go to the "Basic Info" tab located underneath your avatar.',
        'Below your player name, you will see your ID in this format: 1114917746 (13486).',
        'The 8-10 digits in front is your User ID, and the digits in parentheses is your Zone ID!'
      ]
    },
    mockup: {
      avatarText: 'MLBB',
      playerName: 'Outrageous Dominance',
      idLabel: 'User ID',
      idValue: '1114917746',
      zoneLabel: 'Zone ID',
      zoneValue: '(13486)',
      tip: {
        km: 'ត្រូវប្រាកដថាអ្នកបញ្ចូលទាំង User ID និង Zone ID ទាំងពីរ ដើម្បីឱ្យពេជ្រចូលគណនីបានត្រឹមត្រូវ!',
        en: 'Make sure to enter both User ID and Zone ID so diamonds are injected into the exact account!'
      }
    }
  },
  {
    id: 'free-fire',
    name: 'Free Fire / FF MAX',
    icon: '🔥',
    badge: 'Player ID (UID)',
    hasZoneId: false,
    hasServer: false,
    sample: { userId: '182749021' },
    steps: {
      km: [
        'បើកហ្គេម Free Fire ឬ Free Fire MAX លើទូរស័ព្ទរបស់អ្នក។',
        'ចុចលើ Profile Banner (រូបកីឡាករ) នៅជ្រុងខាងលើឆ្វេងដៃនៃអេក្រង់មេ។',
        'អ្នកនឹងឃើញ UID (Player ID) មាន 8 ទៅ 10 ខ្ទង់ នៅខាងក្រោមឈ្មោះកីឡាករ។',
        'ចុចលើរូបតំណាង "Copy" (ឯកសារ) នៅជាប់លេខ UID នោះដើម្បីចម្លងយកមកបំពេញលើវេបសាយ!'
      ],
      en: [
        'Launch Free Fire or Free Fire MAX on your smartphone.',
        'Tap on your Profile Banner in the top-left corner of the lobby screen.',
        'Locate your UID (Player ID) with 8 to 10 digits directly below your in-game name.',
        'Click the small "Copy" icon next to the UID to copy it directly into our website!'
      ]
    },
    mockup: {
      avatarText: 'FF',
      playerName: 'LsCrowzero',
      idLabel: 'Player ID (UID)',
      idValue: '182749021',
      tip: {
        km: 'Free Fire ត្រូវការតែ Player ID (UID) តែមួយគត់ មិនចាំបាច់មានលេខ Server ឬ Password ឡើយ!',
        en: 'Free Fire only requires your Player ID (UID). Never share passwords or login credentials!'
      }
    }
  },
  {
    id: 'genshin-impact',
    name: 'Genshin Impact',
    icon: '✨',
    badge: 'UID + Server',
    hasZoneId: false,
    hasServer: true,
    sample: { userId: '812345678', server: 'Asia' },
    steps: {
      km: [
        'បើកហ្គេម Genshin Impact ហើយចូលទៅក្នុងពិភព Teyvat។',
        'មើលនៅជ្រុងខាងស្តាំក្រោមនៃអេក្រង់ អ្នកនឹងឃើញលេខ UID ៩ខ្ទង់ (ឧ. 812345678) គ្រប់ពេល។',
        'ឬចុច Menu Paimon (រូប Paimon ខាងលើឆ្វេង) ដើម្បីមើលឈ្មោះកីឡាករ និង UID។',
        'ជ្រើសរើស Server ដែលអ្នកកំពុងលេង (Asia, America, Europe, ឬ TW/HK/MO)។'
      ],
      en: [
        'Launch Genshin Impact and enter your game world.',
        'Look at the bottom-right corner of the gameplay screen to find your 9-digit UID (e.g. 812345678).',
        'Alternatively, open the Paimon Menu (top-left) to view your profile UID.',
        'Select the corresponding server you play on (Asia, America, Europe, or TW/HK/MO).'
      ]
    },
    mockup: {
      avatarText: 'GI',
      playerName: 'Traveler_Teyvat',
      idLabel: 'UID',
      idValue: '812345678',
      serverLabel: 'Server',
      serverValue: 'Asia Server',
      tip: {
        km: 'ត្រូវជ្រើសរើស Server ឱ្យត្រូវ ព្រោះ UID ដូចគ្នាអាចមានគណនីខុសគ្នានៅលើ Server ផ្សេងៗ!',
        en: 'Make sure to select the correct Server because cross-server accounts are distinct!'
      }
    }
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: '🎯',
    badge: 'Riot ID + #Tag',
    hasZoneId: false,
    hasServer: false,
    sample: { userId: 'TenZ#NA1' },
    steps: {
      km: [
        'បើក Riot Client ឬបើកហ្គេម Valorant លើកុំព្យូទ័ររបស់អ្នក។',
        'មើលនៅជ្រុងខាងស្ដាំលើក្បែរបញ្ជីមិត្តភក្តិ ឬចុចលើ Profile របស់អ្នក។',
        'អ្នកនឹងឃើញ Riot ID ពេញលេញ រួមមាន ឈ្មោះ + សញ្ញា # + Tagline (ឧទាហរណ៍៖ Player#AP1)។',
        'សូមចម្លងទាំងឈ្មោះ និង Tagline រួមបញ្ចូលគ្នា យកមកបំពេញលើវេបសាយ។'
      ],
      en: [
        'Open Riot Client or Valorant on your PC.',
        'Look at the top-right corner near your friends list or click your player card.',
        'You will see your complete Riot ID formatted as: Name + # + Tagline (e.g., Player#AP1).',
        'Copy both your player name and the #Tagline together into the input field.'
      ]
    },
    mockup: {
      avatarText: 'VAL',
      playerName: 'RadiantAce',
      idLabel: 'Riot ID + Tagline',
      idValue: 'TenZ#NA1',
      tip: {
        km: 'សូមកុំភ្លេចសញ្ញាទ្រុងជ្រូក (#) និងលេខកូដសម្គាល់ Tagline នៅខាងចុង!',
        en: 'Do not omit the hashtag symbol (#) and your region tagline at the end!'
      }
    }
  }
];

export const IdGuideModal: React.FC<IdGuideModalProps> = ({
  isOpen,
  onClose,
  defaultGameId = 'mobile-legends',
  t,
  onSelectSampleId,
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>(() => {
    const match = GAME_GUIDES.find(g => g.id === defaultGameId);
    return match ? match.id : 'mobile-legends';
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeGuide = GAME_GUIDES.find(g => g.id === selectedGameId) || GAME_GUIDES[0];
  const isKhmer = t.howToTopUp.includes('របៀប');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    sound.playClick();
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUseSample = () => {
    if (onSelectSampleId && activeGuide.sample) {
      onSelectSampleId(activeGuide.sample);
      sound.playSuccess();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-900 dark:text-white"
        >
          {/* Header */}
          <div className="relative px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-aura-cyan flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-tech text-[11px] font-bold uppercase tracking-wider mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  {isKhmer ? 'មគ្គុទ្ទេសក៍ស្វែងរក ID' : 'Account ID Finder Guide'}
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg">
                  {t.idGuideTitle || (isKhmer ? 'របៀបស្វែងរក User ID & Server' : 'How to Find User ID & Server')}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Game Selection Tabs */}
          <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-slate-200/80 dark:border-white/5 bg-slate-100/60 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {GAME_GUIDES.map((g) => {
                const isActive = g.id === selectedGameId;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setSelectedGameId(g.id);
                      sound.playClick();
                    }}
                    className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-aura-cyan shadow-sm font-bold'
                        : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-cyan-500/40'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
            
            {/* Visual Game Profile Screen Mockup */}
            <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 border border-cyan-500/30 text-white shadow-inner overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Gamepad2 className="w-4 h-4" />
                  {activeGuide.name} • In-Game Profile Preview
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-tech text-[10px]">
                  {activeGuide.badge}
                </span>
              </div>

              {/* In-Game Card Simulation */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg border border-white/20">
                    {activeGuide.mockup.avatarText}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      {activeGuide.mockup.playerName}
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Lv.30</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Basic Info Screen</div>
                  </div>
                </div>

                {/* ID & Zone Highlights */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* User ID Highlight Badge */}
                  <button
                    type="button"
                    onClick={() => handleCopy(activeGuide.mockup.idValue, 'id')}
                    title="Click to copy sample ID"
                    className="relative p-2 rounded-xl bg-cyan-500/15 border-2 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer text-left group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="block text-[9px] uppercase tracking-wider text-cyan-300 font-bold">
                        {activeGuide.mockup.idLabel}
                      </span>
                      {copiedField === 'id' ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-cyan-400/70 group-hover:text-cyan-300" />
                      )}
                    </div>
                    <span className="font-mono font-black text-sm text-cyan-200">
                      {activeGuide.mockup.idValue}
                    </span>
                  </button>

                  {/* Zone ID Highlight Badge (if present) */}
                  {activeGuide.mockup.zoneValue && (
                    <button
                      type="button"
                      onClick={() => handleCopy(activeGuide.mockup.zoneValue?.replace(/[()]/g, '') || '', 'zone')}
                      title="Click to copy sample Zone ID"
                      className="relative p-2 rounded-xl bg-amber-500/15 border-2 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer text-left group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="block text-[9px] uppercase tracking-wider text-amber-300 font-bold">
                          {activeGuide.mockup.zoneLabel}
                        </span>
                        {copiedField === 'zone' ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-amber-400/70 group-hover:text-amber-300" />
                        )}
                      </div>
                      <span className="font-mono font-black text-sm text-amber-200">
                        {activeGuide.mockup.zoneValue}
                      </span>
                    </button>
                  )}

                  {/* Server Highlight Badge (if present) */}
                  {activeGuide.mockup.serverValue && (
                    <div className="relative p-2 rounded-xl bg-purple-500/15 border-2 border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                      <span className="block text-[9px] uppercase tracking-wider text-purple-300 font-bold">
                        {activeGuide.mockup.serverLabel}
                      </span>
                      <span className="font-mono font-black text-sm text-purple-200">
                        {activeGuide.mockup.serverValue}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mockup Tip */}
              <p className="mt-3 text-xs text-cyan-200/90 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-cyan-400" />
                <span>{isKhmer ? activeGuide.mockup.tip.km : activeGuide.mockup.tip.en}</span>
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {isKhmer ? 'ជំហានអនុវត្តមួយជំហានម្តងៗ' : 'Step-by-Step Instructions'}
              </h4>

              <div className="space-y-3">
                {(isKhmer ? activeGuide.steps.km : activeGuide.steps.en).map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 font-tech shadow-sm">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* In-App Verification Reminder Note */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">
                  {isKhmer ? '💡 គន្លឹះត្រួតពិនិត្យគណនីមុនបង់ប្រាក់៖' : '💡 Pre-Payment Account Verification Tip:'}
                </strong>
                <span>
                  {isKhmer 
                    ? 'ក្រោយពេលបញ្ចូល User ID (និង Zone ID) រួច សូមចុចប៊ូតុង "ផ្ទៀងផ្ទាត់ ID គណនី"។ ប្រព័ន្ធនឹងស្វែងរកឈ្មោះហ្គេម (In-game Nickname) មកបង្ហាញភ្លាមៗ ដើម្បីបញ្ជាក់ថាគណនីរបស់អ្នកពិតជាត្រឹមត្រូវ ១០០% មុននឹងបង់ប្រាក់!'
                    : 'After entering your User ID (and Zone ID), click the "Validate Account ID" button. The system will look up your in-game nickname instantly to ensure 100% accuracy before making payment!'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-4 sm:px-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
            {onSelectSampleId && activeGuide.sample && (
              <button
                type="button"
                onClick={handleUseSample}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isKhmer ? 'សាកល្បងបំពេញ Demo ID គំរូ' : 'Fill Sample Demo ID'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-aura-cyan hover:shadow-lg transition-all"
            >
              {isKhmer ? 'យល់ហើយ (បិទ)' : 'Got it (Close)'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
