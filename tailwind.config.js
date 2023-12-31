/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: 0, transform:'scaleY(0)', 'transform-origin':'top', },
          '100%': { opacity: 1, transform:'scaleY(1)','transform-origin':'top' },
        },
      },
      animation:{
          'appear': 'appear 0.3s ease-in-out'
      }
    },
  },
  plugins: [],
}
