import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:      '#fdfaf7',
          100:     '#f9f3ec',
          200:     '#f2e8d9',
          300:     '#e8d5be',
          DEFAULT: '#f9f3ec',
        },
        'rose-gold':       '#c9a48a',
        'rose-gold-light': '#dbbfa8',
        'rose-gold-dark':  '#b08e72',
        blush:    '#f0d9cd',
        espresso: '#3d2314',
        mink:     '#8c6b55',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['Jost', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.75rem',{ lineHeight: '1.2' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'luxury':    '0 4px 32px -4px rgba(61,35,20,0.12)',
        'luxury-lg': '0 8px 48px -8px rgba(61,35,20,0.18)',
        'luxury-xl': '0 16px 64px -12px rgba(61,35,20,0.22)',
        'glow-gold': '0 0 32px rgba(201,164,138,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.25,0.1,0.25,1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}

export default config
