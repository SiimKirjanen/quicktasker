/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,php}"],
  prefix: "wpqt-",
  theme: {
    extend: {
      colors: {
        qtBorder: "#d0d7de",
      },
      height: {
        "screen-minus-top-bar": "calc(100vh - 32px)",
      },
    },
  },
  plugins: [],
};
