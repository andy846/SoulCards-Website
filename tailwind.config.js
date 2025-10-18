/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 神秘主題色彩系統
        mystical: {
          purple: '#663399',
          'deep-purple': '#4D1A80',
          'cosmic-indigo': '#4C0080',
          gold: '#FFD700',
          'light-gold': '#FFF4A3',
          'dark-gold': '#CC9900',
          'star-silver': '#CCCCDD',
          'cosmic-black': '#0D0D1A',
          blue: '#1A4B8C',
          green: '#2D7A4A',
          pink: '#CC4D7A',
        },
        // 塔羅牌花色主題
        tarot: {
          wands: '#FF8000',
          cups: '#0080FF',
          swords: '#B3B3CC',
          pentacles: '#33B366',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #4C0080 0%, #663399 25%, #1A4B8C 50%, #4D1A80 75%, #0D0D1A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFF4A3 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(102, 51, 153, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'particle-float': 'particle-float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(120deg)' },
          '66%': { transform: 'translateY(10px) rotate(240deg)' },
        },
      },
      fontFamily: {
        'mystical': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'mystical': '0 4px 20px rgba(102, 51, 153, 0.3)',
        'gold': '0 4px 20px rgba(255, 215, 0, 0.3)',
        'cosmic': '0 8px 32px rgba(76, 0, 128, 0.4)',
      },
    },
  },
  plugins: [],
}
