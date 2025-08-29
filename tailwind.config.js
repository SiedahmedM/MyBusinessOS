/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8192ff',
          500: '#1e40af', // Main navy blue
          600: '#1d3a9f',
          700: '#1b3190',
          800: '#192975',
          900: '#162661',
        },
        accent: {
          50: '#fef7f0',
          100: '#fdedd6',
          200: '#fad8ad',
          300: '#f6bc7a',
          400: '#f19945',
          500: '#ea7c1f', // Main coral/orange
          600: '#db6515',
          700: '#b54f14',
          800: '#914018',
          900: '#763617',
        },
        neutral: {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e8ecf0',
          300: '#d6dce4',
          400: '#b8c2d0',
          500: '#8b96a5',
          600: '#64748b',
          700: '#475569',
          800: '#334155',
          900: '#1e293b',
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
          '0%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(102, 126, 234, 0.6)' },
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
        'hero-gradient': 'linear-gradient(135deg, #1e40af 0%, #334155 50%, #64748b 100%)',
        'primary-gradient': 'linear-gradient(135deg, #1e40af 0%, #1d3a9f 100%)',
        'accent-gradient': 'linear-gradient(135deg, #ea7c1f 0%, #db6515 100%)',
        'neutral-gradient': 'linear-gradient(135deg, #f4f6f8 0%, #e8ecf0 100%)',
      },
      backdropBlur: {
        'xl': '20px',
      },
    },
  },
  plugins: [],
}