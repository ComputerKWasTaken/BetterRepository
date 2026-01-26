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
          primary: '#0d0d0f',
          secondary: '#16161a',
          tertiary: '#1e1e24',
          elevated: '#252530',
        },
        // Text Colors
        'bd-text': {
          primary: '#e8e8ec',
          secondary: '#a0a0a8',
          muted: '#6b6b75',
          inverse: '#0d0d0f',
        },
        // Brand/Accent Colors
        'bd-accent': {
          primary: '#ff9500',
          secondary: '#e07800',
          light: '#ffb84d',
        },
        // Border Colors
        'bd-border': {
          subtle: 'rgba(255, 255, 255, 0.06)',
          default: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
        // Tag Background
        'bd-tag-bg': 'rgba(255, 255, 255, 0.08)',
        // Category Colors
        'bd-blue': '#3b82f6',
        'bd-purple': '#a855f7',
        'bd-green': '#22c55e',
        'bd-amber': '#fbbf24',
        'bd-pink': '#ec4899',
        'bd-cyan': '#06b6d4',
        // Status Colors
        'bd-success': '#22c55e',
        'bd-error': '#ef4444',
        'bd-warning': '#f59e0b',
        'bd-info': '#3b82f6',
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['Roboto Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 149, 0, 0.12)',
        'glow-lg': '0 0 30px rgba(255, 149, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 149, 0, 0.12)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 149, 0, 0.25)' },
        },
      },
    },
  },
  plugins: [],
}
