/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeout: 'fadeOut 0.2s ease-in-out forwards',
        fadein: 'fadeIn 0.2s ease-in-out forwards',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }),
    },
  },
  plugins: [],
}
