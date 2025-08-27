/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'roi-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'code-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'purple-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      },
      backdropBlur: {
        'xl': '20px',
      },
    },
  },
  plugins: [],
}