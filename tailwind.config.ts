import type { Config } from 'tailwindcss'

/**
 * Design tokens for the entire system live here.
 * Components consume semantic names (ink / surface / primary / accent),
 * never raw hex values.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#030712',
          soft: '#0F172A',
        },
        primary: {
          DEFAULT: '#7C3AED',
          light: '#8B5CF6',
        },
        accent: {
          cyan: '#06B6D4',
          blue: '#3B82F6',
        },
        snow: '#F8FAFC',
        line: 'rgba(248, 250, 252, 0.08)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '76rem',
      },
      boxShadow: {
        'glow-sm': '0 0 24px -6px rgba(139, 92, 246, 0.45)',
        'glow-md': '0 0 48px -8px rgba(139, 92, 246, 0.5)',
        'glow-cyan': '0 0 40px -8px rgba(6, 182, 212, 0.45)',
        card: '0 1px 0 0 rgba(248,250,252,0.06) inset, 0 24px 48px -24px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'aurora':
          'radial-gradient(60% 50% at 20% 10%, rgba(124,58,237,0.22) 0%, transparent 60%), radial-gradient(50% 40% at 80% 20%, rgba(6,182,212,0.14) 0%, transparent 60%), radial-gradient(40% 40% at 60% 80%, rgba(59,130,246,0.12) 0%, transparent 60%)',
        'text-shine':
          'linear-gradient(110deg, #F8FAFC 35%, #8B5CF6 50%, #06B6D4 60%, #F8FAFC 75%)',
      },
      keyframes: {
        'aurora-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 4%) scale(0.96)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 18s ease-in-out infinite',
        orbit: 'orbit var(--orbit-duration, 28s) linear infinite',
        'orbit-reverse': 'orbit-reverse var(--orbit-duration, 28s) linear infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 6s linear infinite',
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite',
        blink: 'blink 1.1s step-end infinite',
      },
      transitionTimingFunction: {
        // Apple/Linear-style ease — fast start, long luxurious settle.
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
