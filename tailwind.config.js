/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aura: {
          dark: '#070913',
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#9d4edd',
          magenta: '#ff007f',
          gold: '#ffb703',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Siemreab', 'Siemreap', 'sans-serif'],
        display: ['Unbounded', 'Siemreab', 'Siemreap', 'sans-serif'],
        tech: ['Chakra Petch', 'Siemreab', 'Siemreap', 'Space Grotesk', 'monospace'],
        khmer: ['Siemreab', 'Siemreap', 'sans-serif'],
      },
      boxShadow: {
        'aura-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4)',
        'aura-purple': '0 0 25px -5px rgba(157, 78, 221, 0.4)',
        'aura-magenta': '0 0 25px -5px rgba(255, 0, 127, 0.4)',
        'aura-gold': '0 0 25px -5px rgba(255, 183, 3, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aura-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.15), transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
