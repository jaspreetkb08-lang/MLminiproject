/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#F9F1F2',
          100: '#EED9DB',
          200: '#DDB4B8',
          300: '#C5898F',
          400: '#9C474E',
          500: '#5A1F25',
          DEFAULT: '#45171B',
          600: '#45171B',
          700: '#3A1316',
          800: '#2F0F12',
          900: '#220A0D',
        },
        wine: {
          DEFAULT: '#362128',
          light: '#442A33',
          dark: '#2B1A20',
          deep: '#221418',
          elevated: '#51333D',
        },
        gold: {
          50: '#FBF8F1',
          100: '#F4EBD7',
          200: '#E8D5AE',
          300: '#DBBE85',
          400: '#D1AC6C',
          DEFAULT: '#C6A46A',
          500: '#C6A46A',
          600: '#B08C4E',
          700: '#8E6F39',
          800: '#6C5329',
          900: '#4B3819',
        },
        ivory: {
          DEFAULT: '#F8F4EC',
          50: '#FCFAF6',
          100: '#F8F4EC',
          200: '#EDE4D2',
          300: '#DFD2B7',
        },
        beige: {
          DEFAULT: '#EAE1D4',
          light: '#F4EFE6',
          dark: '#DACDBB',
        },
        rose: {
          DEFAULT: '#B77B7E',
          light: '#CE9FA2',
          dark: '#9B5B5E',
        },
        charcoal: {
          DEFAULT: '#292626',
          light: '#3F3C3C',
          dark: '#1A1818',
        }
      },
      fontFamily: {
        display: ['"Libre Caslon Display"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Source Serif 4"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'folio': '0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px -4px rgba(69, 23, 27, 0.04)',
        'folio-hover': '0 4px 12px rgba(0, 0, 0, 0.06), 0 16px 36px -6px rgba(69, 23, 27, 0.08)',
        'folio-dark': '0 1px 3px rgba(0, 0, 0, 0.4), 0 8px 24px -4px rgba(0, 0, 0, 0.6)',
      },
      borderWidth: {
        'thin': '0.5px',
      }
    },
  },
  plugins: [],
}

