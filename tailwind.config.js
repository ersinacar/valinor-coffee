/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateX(-50%) translateY(20px)' },
          to:   { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
        },
      },
      animation: {
        slideUp: 'slideUp 400ms cubic-bezier(.22,1,.36,1) both',
      },
      colors: {
        forest: '#728974',
        shire:  '#526854',
        grass:  '#8fad92',
        coffee: '#8b6914',
        gold:   '#c8a84b',
        cream:  '#f5e6a3',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
