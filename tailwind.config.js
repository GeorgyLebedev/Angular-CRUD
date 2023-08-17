/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation:{
          'appear': 'appear 1s ease-out'
      }
    },
  },
  plugins: [],
}
