import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Headphones, 
  Heart, 
  Send, 
  Globe, 
  Share2 
} from 'lucide-react';
import { sound } from '../utils/sound';
import brandLogo from '../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block mt-20 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070913]/95 backdrop-blur-xl relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img 
                src={brandLogo} 
                alt="AuraLegacy Logo" 
                className="w-13 h-13 sm:w-14 sm:h-14 object-contain drop-shadow-[0_4px_12px_rgba(239,68,68,0.35)]" 
              />
              <span className="font-display font-brand font-extrabold text-xl tracking-wider text-slate-900 dark:text-white">
                AURA<span className="aura-text-gradient">LEGACY</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Platform top up game tercepat, termurah, dan terpercaya di Indonesia dengan teknologi API Auto-Injection instan 1-3 detik. Tersedia 24/7 melayani jutaan gamer tanah air.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick();
                }}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors shadow-xs"
                title="Komunitas Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick();
                }}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors shadow-xs"
                title="Website Komunitas"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick();
                }}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors shadow-xs"
                title="Bagikan Aura Legacy"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 tracking-wide">
              PRODUK POPULER
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Mobile Legends MLBB</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Genshin Impact</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Valorant Points VP</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Free Fire Garena</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Honor of Kings Tokens</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Roblox Robux</li>
            </ul>
          </div>

          {/* Customer Service & Help */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 tracking-wide">
              BANTUAN & CS
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Hubungi WhatsApp CS</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Cek Status Pesanan</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Syarat & Ketentuan</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Kebijakan Privasi</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Panduan Pembayaran</li>
              <li className="hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors">Kemitraan Reseller VIP</li>
            </ul>
          </div>

          {/* Guarantee Badges */}
          <div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 tracking-wide">
              JAMINAN KEAMANAN
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                <span>SSL Encrypted 256-Bit</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span>Pengiriman Otomatis 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span>Customer Care Siap Bantu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Partners strip */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            វិធីសាស្ត្រទូទាត់ផ្លូវការ៖ KHQR Universal Scan (Bakong, ABA Mobile, Wing, ACLEDA, Canadia & គ្រប់ធនាគារនៅកម្ពុជា)
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span>© 2026 AuraLegacy Top up. Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for Gamers. Made by Veasna Reaksa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
