/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core neutrals
        ink: '#1d1d1f',
        graphite: '#8e8e93',
        slate: '#48484a',
        ash: '#2c2c2e',
        fog: '#f2f2f7',
        snow: '#ffffff',
        obsidian: '#000000',
        'silver-mist': '#e5e5ea',
        'surface': '#1c1c1e',
        'surface-2': '#2c2c2e',
        'surface-3': '#3a3a3c',

        // Brand / accent
        brand: '#6C5CE7',
        'brand-light': '#A29BFE',
        'brand-dark': '#5A4BD1',
        azure: '#0A84FF',
        'cobalt-link': '#0066cc',
        mint: '#30D158',
        coral: '#FF6B6B',
        amber: '#FF9F0A',
        caution: '#b64400',
        sky: '#64D2FF',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 40%, #16213e 70%, #0a0a0a 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(10,132,255,0.08) 100%)',
        'glow-purple': 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(108,92,231,0.15), transparent 40%)',
        'glow-blue': 'radial-gradient(400px circle, rgba(10,132,255,0.12), transparent 60%)',
        'mesh-1': 'radial-gradient(at 40% 20%, rgba(108,92,231,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(10,132,255,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(100,210,255,0.15) 0px, transparent 50%)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        'body-sm': ['14px', { lineHeight: '1.43', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'subheading': ['18px', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        'heading-sm': ['22px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'heading': ['32px', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        'heading-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display': ['64px', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        'card': '20px',
        'pill': '999px',
        'small': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'none': 'none',
        'soft': '0 2px 8px rgba(0,0,0,0.04)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'elevated': '0 8px 32px rgba(0,0,0,0.08)',
        'glow-brand': '0 0 40px rgba(108,92,231,0.3)',
        'glow-blue': '0 0 40px rgba(10,132,255,0.2)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
