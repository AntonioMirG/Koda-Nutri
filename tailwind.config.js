/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#fbfaf9',
        stone: {
          surface: '#f2f0ed',
          tint: '#f2f0ed',
        },
        parchment: '#f8f7f4',
        graphite: '#474645',
        charcoal: '#343433',
        midnight: '#121212',
        obsidian: '#000000',
        ash: '#848281',
        fog: '#c6c6c6',
        smoke: '#a7a7a7',
        pepper: '#282624',
        ember: '#ff3e00',
        meadow: '#00ca48',
        sky: '#0090ff',
        sunburst: '#ffbb26',
        amber: '#d48f00',
        ocean: '#0086fc',
        ice: '#64c6ff',
        spearmint: '#00c978',
        flamingo: '#ff58ae',
        violet: '#9f4fff',
        coral: '#ff2b3a',
        valid: '#00c454',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1.58', letterSpacing: '-0.14px' }],
        'body': ['15px', { lineHeight: '1.47', letterSpacing: '-0.2px' }],
        'heading-sm': ['19px', { lineHeight: '1.38', letterSpacing: '-0.25px' }],
        'heading': ['23px', { lineHeight: '1.2', letterSpacing: '-0.44px' }],
        'heading-lg': ['44px', { lineHeight: '1.09', letterSpacing: '-1.14px' }],
        'display': ['68px', { lineHeight: '1.09', letterSpacing: '-2.11px' }],
      },
      boxShadow: {
        'subtle-inset': 'color(display-p3 0.94902 0.941176 0.929412) 0px 0px 0px 1px inset',
        'subtle-inset-2': 'color(display-p3 0.94902 0.941176 0.929412) 0px 0px 0px 0px inset',
        'subtle-outline': 'rgba(0, 0, 0, 0.04) 0px 0px 0px 1px',
        'lg-soft': 'rgba(0, 0, 0, 0.15) 0px 0px 24px 0px',
        'sm-soft': 'rgba(0, 0, 0, 0.04) 0px 1px 6px 0px, rgba(0, 0, 0, 0.05) 0px 0px 24px 0px',
      },
      borderRadius: {
        'tag': '6px',
        'card': '10px',
        'card-lg': '24px',
        'input': '10px',
        'button': '32px',
        'pill': '32px',
        'icon': '40px',
        'illustration': '72px',
      }
    },
  },
  plugins: [],
}
