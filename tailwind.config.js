/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1d1d1f',
        graphite: '#707070',
        slate: '#474747',
        ash: '#333333',
        fog: '#f5f5f7',
        snow: '#ffffff',
        obsidian: '#000000',
        'silver-mist': '#e8e8ed',
        azure: '#0071e3',
        'cobalt-link': '#0066cc',
        caution: '#b64400',
      },
      backgroundImage: {
        'citrus-gradient': 'linear-gradient(184deg, rgb(29, 29, 31) 0%, rgb(223, 231, 79) 33%, rgb(94, 156, 42) 66%, rgb(10, 134, 26) 95%)',
        'indigo-gradient': 'linear-gradient(184deg, rgb(29, 29, 31) 20%, rgb(168, 211, 251) 43%, rgb(0, 18, 249) 76%, rgb(37, 53, 224) 95%)',
        'blush-gradient': 'linear-gradient(184deg, rgb(29, 29, 31) 20%, rgb(243, 196, 246) 43%, rgb(245, 0, 180) 76%, rgb(204, 41, 188) 95%)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Fallback for SF Pro Display
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Fallback for SF Pro Text
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1.33', letterSpacing: '-0.26px' }],
        'body-sm': ['14px', { lineHeight: '1.43', letterSpacing: '-0.04px' }],
        'body': ['17px', { lineHeight: '1.47', letterSpacing: '-0.1px' }],
        'subheading': ['20px', { lineHeight: '1.4', letterSpacing: '-0.2px' }],
        'heading-sm': ['24px', { lineHeight: '1.29', letterSpacing: '-0.36px' }],
        'heading': ['40px', { lineHeight: '1.17', letterSpacing: '-0.6px' }],
        'heading-lg': ['56px', { lineHeight: '1.07', letterSpacing: '-0.9px' }],
        'display': ['96px', { lineHeight: '1.04', letterSpacing: '-2.11px' }],
      },
      borderRadius: {
        'card': '28px',
        'pill': '999px',
        'small': '10px',
      },
      boxShadow: {
        none: 'none',
      }
    },
  },
  plugins: [],
}
