/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bd-bg': {
          primary: '#0f0e11',
          secondary: '#17161b',
          tertiary: '#1e1d23',
          elevated: '#26252c',
          active: '#2e2d35',
        },
        'bd-text': {
          primary: '#e8e8ec',
          secondary: '#a0a0a8',
          muted: '#6b6b75',
          inverse: '#0f0e11',
          'on-accent': '#ffffff',
        },
        // Brand/Accent Colors
        'bd-accent': {
          primary: '#e8850a',
          secondary: '#c06a00',
          light: '#f29520',
        },
        'bd-border': {
          DEFAULT: 'rgba(255, 255, 255, 0.09)',
          subtle: 'rgba(255, 255, 255, 0.05)',
          default: 'rgba(255, 255, 255, 0.09)',
          strong: 'rgba(255, 255, 255, 0.15)',
          accent: 'rgba(232, 133, 10, 0.22)',
        },
        'bd-border-flat': 'rgba(255, 255, 255, 0.09)',
        // Tag Background
        'bd-tag-bg': 'rgba(255, 255, 255, 0.08)',
        // Category Colors — base
        'bd-blue': '#3b82f6',
        'bd-purple': '#a855f7',
        'bd-green': '#22c55e',
        'bd-amber': '#fbbf24',
        'bd-pink': '#ec4899',
        'bd-cyan': '#06b6d4',
        'bd-emerald': '#10b981',
        'bd-red': '#ef4444',
        'bd-orange': '#f97316',
        'bd-teal': '#14b8a6',
        'bd-indigo': '#6366f1',
        'bd-rose': '#f43f5e',
        'bd-slate': '#94a3b8',
        'bd-gray': '#6b7280',
        // Category Colors — light variants
        'bd-blue-light': '#60a5fa',
        'bd-purple-light': '#c084fc',
        'bd-green-light': '#4ade80',
        'bd-amber-light': '#fcd34d',
        'bd-cyan-light': '#22d3ee',
        'bd-orange-light': '#fb923c',
        // Status Colors
        'bd-success': '#22c55e',
        'bd-success-light': '#4ade80',
        'bd-error': '#ef4444',
        'bd-error-light': '#f87171',
        'bd-warning': '#f59e0b',
        'bd-warning-light': '#fbbf24',
        'bd-info': '#3b82f6',
        'bd-info-light': '#60a5fa',
        // Third-party brand
        'bd-discord': '#5865F2',
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['Roboto Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: ['10px', { lineHeight: '1.4' }],
        sm: ['11px', { lineHeight: '1.4' }],
        base: ['12px', { lineHeight: '1.5' }],
        md: ['13px', { lineHeight: '1.5' }],
        lg: ['14px', { lineHeight: '1.5' }],
        xl: ['16px', { lineHeight: '1.4' }],
        '2xl': ['18px', { lineHeight: '1.4' }],
        '3xl': ['22px', { lineHeight: '1.4' }],
        '4xl': ['22px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        sm: 'var(--bd-radius-sm)',
        DEFAULT: 'var(--bd-radius-md)',
        md: 'var(--bd-radius-md)',
        lg: 'var(--bd-radius-lg)',
        xl: 'var(--bd-card-radius)',
        '2xl': 'var(--bd-radius-2xl)',
        '3xl': 'var(--bd-radius-3xl)',
        full: 'var(--bd-radius-full)',
      },
      boxShadow: {
        'sm': 'var(--bd-shadow-sm)',
        'md': 'var(--bd-shadow-md)',
        'lg': 'var(--bd-shadow-lg)',
        'xl': 'var(--bd-shadow-xl)',
        '2xl': 'var(--bd-shadow-2xl)',
        'glow': 'var(--bd-shadow-glow)',
        'glow-lg': 'var(--bd-shadow-glow-lg)',
        'glow-xl': 'var(--bd-shadow-glow-xl)',
      },
      animation: {
        'fade-in': 'fadeIn var(--bd-transition-slow)',
        'slide-up': 'slideUp var(--bd-transition-slow)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
