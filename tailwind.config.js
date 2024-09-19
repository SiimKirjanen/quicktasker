/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,php}"],
  prefix: "wpqt-",
  theme: {
    extend: {
      colors: {
        qtBorder: "#d0d7de",
        qtBlueHover: "#3b82f6",
        qtTextGreen: "#2b8a3e",
        qtTextRed: "#d32f2f",
      },
      height: {
        "screen-minus-top-bar": "calc(100vh - 32px)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      zIndex: {
        9999: "9999",
      },
    },
  },
  plugins: [],
};
