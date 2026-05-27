/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#C5A880',
          amber: '#D4AF37',
          emerald: '#0F2C23',
          'emerald-light': '#1A4D3E',
          'emerald-dark': '#081B15',
          sand: '#FDF8F5',
          cream: '#FAF3EC',
          dark: '#0B0F19',
          'dark-card': '#141B2D',
          slate: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(197, 168, 128, 0.15)',
        'premium-hover': '0 20px 40px -15px rgba(197, 168, 128, 0.25)',
        'emerald': '0 10px 30px -10px rgba(15, 44, 35, 0.2)',
      }
    },
  },
  plugins: [],
}
