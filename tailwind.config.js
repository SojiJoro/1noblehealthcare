const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: {
        // This keeps the defaults and adds your custom colours
        brandBlue: '#00ADEF',
        'brandBlue-dark': '#0095D1',
        brandGreen: '#78BE20',
      },
    },
  },
  plugins: [],
}
