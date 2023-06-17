/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#FF0000', // Light mode primary color
          secondary: '#00FF00', // Light mode secondary color
        },
        dark: {
          primary: '#0000FF', // Dark mode primary color
          secondary: '#FFFF00', // Dark mode secondary color
        },
      },
    },
  },
  
  plugins: [require("daisyui")],
}

