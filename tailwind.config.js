/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        mystical: {
          50: '#f8f7ff',
          100: '#f0edff',
          200: '#e4ddff',
          300: '#d1c2ff',
          400: '#b89dff',
          500: '#9d72ff',
          600: '#8b4dff',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        cosmic: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        void: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0f0f23',
        }
      },
      fontFamily: {
        'mystical': ['Inter', 'system-ui', 'sans-serif'],
        'cosmic': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'mystical-glow': 'mysticalGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        mysticalGlow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0f0f23 0%, #1e293b 50%, #7c3aed 100%)',
        'mystical-gradient': 'linear-gradient(135deg, #7c3aed 0%, #9d72ff 50%, #eab308 100%)',
        'starfield': "url('data:image/svg+xml,%3Csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"stars\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"0.5\" fill=\"%23ffffff\" opacity=\"0.3\"/%3E%3Ccircle cx=\"12\" cy=\"8\" r=\"0.3\" fill=\"%23ffffff\" opacity=\"0.5\"/%3E%3Ccircle cx=\"18\" cy=\"15\" r=\"0.4\" fill=\"%23ffffff\" opacity=\"0.4\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23stars)\"/%%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
