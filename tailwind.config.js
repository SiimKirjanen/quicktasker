/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,php}"],
  prefix: "wpqt-",
  theme: {
    extend: {
      colors: {
        qtBorder: "#d0d7de",
      },
    },
  },
  plugins: [],
};
