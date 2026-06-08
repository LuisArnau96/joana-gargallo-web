import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Yoga palette
        beige: {
          50: '#FDFAF6',
          100: '#F7F3EE',
          200: '#EDE8E0',
          300: '#DDD5C8',
          400: '#C4B49A',
        },
        tierra: {
          300: '#C4A882',
          400: '#A8896A',
          500: '#8B7355',
          600: '#6B5740',
          700: '#4A3D2C',
          800: '#2C2420',
        },
        oliva: {
          400: '#8B9E8A',
          500: '#6B7C5C',
          600: '#4E5E42',
        },
        // Dark palette (photography)
        carbon: {
          900: '#1A1815',
          800: '#252220',
          700: '#302C28',
          600: '#3D3830',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'h2': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.125rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
