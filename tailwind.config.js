/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: '#0B0D0C',
          surface: '#14171A',
          'surface-2': '#1C2023',
          border: '#262B2E',
        },
        primary: {
          50: '#EAF7EE',
          100: '#C9EBD3',
          200: '#9BDBAF',
          300: '#63C687',
          400: '#33AE64',
          500: '#1E9250',
          600: '#177A42',
          700: '#136336',
          800: '#0F4E2B',
          900: '#0B3B21',
        },
        accent: {
          50: '#FFF3E6',
          100: '#FFE1BF',
          200: '#FFC585',
          300: '#FFA94D',
          400: '#FF9224',
          500: '#F97A0B',
          600: '#D6640A',
          700: '#AD4F08',
          800: '#853C07',
          900: '#602B06',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px 0 rgba(51, 174, 100, 0.35)',
        'glow-accent': '0 0 24px 0 rgba(249, 122, 11, 0.35)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
