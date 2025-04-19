/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},   // <— the correct plugin for Tailwind v4+
    autoprefixer: {},
  },
}
