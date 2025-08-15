/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- খুব জরুরি
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
