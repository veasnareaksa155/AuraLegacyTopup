import React from 'react';
import type { AuraTheme, ThemeMode } from '../types';

interface AuraAestheticsProps {
  theme: AuraTheme;
  mode?: ThemeMode;
}

interface OrbColors {
  orb1: string;
  orb2: string;
  orb3: string;
  orb4: string;
  particleColor: string;
}

const DARK_THEME_GRADIENTS: Record<AuraTheme, OrbColors> = {
  cyan: {
    orb1: 'rgba(0, 242, 254, 0.22)',
    orb2: 'rgba(79, 172, 254, 0.18)',
    orb3: 'rgba(157, 78, 221, 0.16)',
    orb4: 'rgba(0, 242, 254, 0.12)',
    particleColor: 'rgba(0, 242, 254, 0.75)',
  },
  purple: {
    orb1: 'rgba(157, 78, 221, 0.28)',
    orb2: 'rgba(255, 0, 127, 0.20)',
    orb3: 'rgba(92, 45, 145, 0.25)',
    orb4: 'rgba(192, 132, 252, 0.15)',
    particleColor: 'rgba(216, 180, 254, 0.8)',
  },
  gold: {
    orb1: 'rgba(255, 183, 3, 0.24)',
    orb2: 'rgba(251, 133, 0, 0.18)',
    orb3: 'rgba(255, 214, 10, 0.15)',
    orb4: 'rgba(245, 158, 11, 0.15)',
    particleColor: 'rgba(252, 211, 77, 0.8)',
  },
  emerald: {
    orb1: 'rgba(16, 185, 129, 0.25)',
    orb2: 'rgba(5, 150, 105, 0.20)',
    orb3: 'rgba(6, 182, 212, 0.15)',
    orb4: 'rgba(52, 211, 153, 0.15)',
    particleColor: 'rgba(110, 231, 183, 0.8)',
  },
  crimson: {
    orb1: 'rgba(239, 68, 68, 0.25)',
    orb2: 'rgba(244, 63, 94, 0.20)',
    orb3: 'rgba(185, 28, 28, 0.18)',
    orb4: 'rgba(251, 113, 133, 0.15)',
    particleColor: 'rgba(253, 164, 175, 0.8)',
  },
};

const LIGHT_THEME_GRADIENTS: Record<AuraTheme, OrbColors> = {
  cyan: {
    orb1: 'rgba(6, 182, 212, 0.16)',
    orb2: 'rgba(59, 130, 246, 0.14)',
    orb3: 'rgba(168, 85, 247, 0.10)',
    orb4: 'rgba(14, 165, 233, 0.12)',
    particleColor: 'rgba(6, 182, 212, 0.65)',
  },
  purple: {
    orb1: 'rgba(168, 85, 247, 0.18)',
    orb2: 'rgba(236, 72, 153, 0.12)',
    orb3: 'rgba(99, 102, 241, 0.12)',
    orb4: 'rgba(192, 132, 252, 0.14)',
    particleColor: 'rgba(168, 85, 247, 0.65)',
  },
  gold: {
    orb1: 'rgba(245, 158, 11, 0.16)',
    orb2: 'rgba(251, 146, 60, 0.12)',
    orb3: 'rgba(234, 179, 8, 0.12)',
    orb4: 'rgba(217, 119, 6, 0.10)',
    particleColor: 'rgba(245, 158, 11, 0.65)',
  },
  emerald: {
    orb1: 'rgba(16, 185, 129, 0.16)',
    orb2: 'rgba(14, 165, 233, 0.12)',
    orb3: 'rgba(20, 184, 166, 0.12)',
    orb4: 'rgba(52, 211, 153, 0.12)',
    particleColor: 'rgba(16, 185, 129, 0.65)',
  },
  crimson: {
    orb1: 'rgba(244, 63, 94, 0.16)',
    orb2: 'rgba(239, 68, 68, 0.12)',
    orb3: 'rgba(217, 70, 239, 0.10)',
    orb4: 'rgba(251, 113, 133, 0.12)',
    particleColor: 'rgba(244, 63, 94, 0.65)',
  },
};

export const AuraAesthetics: React.FC<AuraAestheticsProps> = ({ theme, mode = 'dark' }) => {
  const gradientMap = mode === 'light' ? LIGHT_THEME_GRADIENTS : DARK_THEME_GRADIENTS;
  const currentTheme = gradientMap[theme] || gradientMap.cyan;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-700 select-none"
      style={{ contain: 'strict', transform: 'translateZ(0)' }}
      aria-hidden="true"
    >
      {/* GPU-Native Ambient Aura Orbs - Static cached radial gradients (0 paint overhead, 0 blur calculation) */}
      <div
        className="absolute -top-[10%] left-[8%] w-[580px] h-[580px] rounded-full opacity-60 transition-colors duration-700 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${currentTheme.orb1} 0%, transparent 70%)`,
          transform: 'translateZ(0)',
        }}
      />
      <div
        className="absolute top-[32%] -right-[8%] w-[520px] h-[520px] rounded-full opacity-55 transition-colors duration-700 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${currentTheme.orb2} 0%, transparent 70%)`,
          transform: 'translateZ(0)',
        }}
      />
      <div
        className="absolute -bottom-[10%] left-[25%] w-[640px] h-[640px] rounded-full opacity-45 transition-colors duration-700 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${currentTheme.orb3} 0%, transparent 70%)`,
          transform: 'translateZ(0)',
        }}
      />
      <div
        className="absolute top-[18%] -left-[5%] w-[380px] h-[380px] rounded-full opacity-35 transition-colors duration-700 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${currentTheme.orb4} 0%, transparent 70%)`,
          transform: 'translateZ(0)',
        }}
      />

      {/* Cyber Grid Lines Overlay - Static with radial mask (instant 60fps GPU compositor) */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: mode === 'light'
            ? 'linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 20%, transparent 85%)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Subtle Aurora Light Beam at Top */}
      <div
        className="absolute top-0 left-0 right-0 h-32 opacity-25 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${currentTheme.orb1}, transparent 80%)`,
          transform: 'translateZ(0)',
        }}
      />

      {/* Subtle Ambient Vignette Overlay */}
      <div 
        className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
          mode === 'light'
            ? 'bg-gradient-to-b from-transparent via-slate-50/10 to-slate-50/80'
            : 'bg-gradient-to-b from-transparent via-[#070913]/30 to-[#070913]'
        }`} 
      />
    </div>
  );
};
