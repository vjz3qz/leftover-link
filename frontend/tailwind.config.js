/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        rojo_logo: "#FF4257",
        sunset_orange: "#FF4257",
        another_sunset: "#FF4600",
        light_orange: "#FDC471",
        custom_yellow: '#fedeaf',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 4s ease-out forwards',
      },
    },
  },
  plugins: [],
};