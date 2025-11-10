/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 15s linear infinite'
      },
      fontFamily: {
        'geo': ['Unageo', 'sans-serif']
      }
    },
  },
  plugins: [],
};
