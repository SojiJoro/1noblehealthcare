/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          brandBlue: '#00ADEF',
          brandGreen: '#78BE20',
          brandRed: '#ED1C24',
          brandOrange: '#F15A24',
          brandYellow: '#FFC20E',
        }
      }
    },
    plugins: []
  }
  