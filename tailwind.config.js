/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base Dark Theme Colors
        'bd-bg': {
          primary: '#0f0e11',
          secondary: '#17161b',
          tertiary: '#1e1d23',
          elevated: '#26252c',
          active: '#2e2d35',
        },
        // Text Colors
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
        // Border Colors
        'bd-border': {
          subtle: 'rgba(255, 255, 255, 0.05)',
          default: 'rgba(255, 255, 255, 0.09)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
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
      boxShadow: {
        'glow': '0 0 20px rgba(232, 133, 10, 0.10)',
        'glow-lg': '0 0 30px rgba(232, 133, 10, 0.20)',
        'glow-xl': '0 4px 12px rgba(232, 133, 10, 0.30)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'count-up': 'countUp 0.6s ease-out',
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
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 133, 10, 0.10)' },
          '50%': { boxShadow: '0 0 30px rgba(232, 133, 10, 0.22)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
