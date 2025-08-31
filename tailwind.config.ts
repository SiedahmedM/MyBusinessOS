import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"General Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        // tighter look for big headlines like Aceternity UI
        tightish: '-0.01em',
        tighter2: '-0.02em',
      },
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#111111', // Deep black
          600: '#0d0d0d',
          700: '#080808',
          800: '#050505',
          900: '#000000',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308', // Bold yellow
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        neutral: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slideIn': 'slideIn 0.5s ease forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'countUp': 'countUp 2s ease-out forwards',
        'typewriter': 'typewriter 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(250, 204, 21, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(250, 204, 21, 0.6)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #000000 0%, #111111 50%, #1a1a1a 100%)',
        'primary-gradient': 'linear-gradient(135deg, #000000 0%, #111111 100%)',
        'accent-gradient': 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
        'neutral-gradient': 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      },
      backdropBlur: {
        'xl': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
