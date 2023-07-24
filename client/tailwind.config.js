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
      }
    },
  },
  plugins: [],
};