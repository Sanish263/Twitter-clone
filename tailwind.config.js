module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        twitter: '#00ADED',
        twitter_dark: '#15202b',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
