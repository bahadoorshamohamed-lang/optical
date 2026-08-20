/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        optom: {
          green: {
            DEFAULT: '#0B4F37',
            hover: '#073827',
            light: '#F0FDF4',
            border: '#BBF7D0',
            dark: '#052E23'
          },
          maroon: {
            DEFAULT: '#901A1E',
            hover: '#701317',
            light: '#FFF5F5',
            border: '#FECDD3',
            dark: '#580E11'
          },
          slate: {
            bg: '#F8FAFC',
            card: '#FFFFFF',
            heading: '#0F172A',
            body: '#334155',
            muted: '#64748B'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 20px 25px -5px rgba(11, 79, 55, 0.1), 0 10px 10px -5px rgba(144, 26, 30, 0.04)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
