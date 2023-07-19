/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "dark-cocoa": "var(--darkcocoa)",
        "powder-iris": "var(--powderiris)",
        "light-creme": "var(--lightcreme)",
      },
      fontFamily: {
        "helvetica": "Helvetica Neue"
      },
      transitionProperty: {
        "linkHover": "var(--powderiris) 0.2s ease",
        "navLinkHover": "var(--darkcocoa) 0.2s ease",
        "imageHover": "opacity 0.2s ease"
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('not-first', '&:not(:first-child)')
    })
  ],
}
