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
      maxHeight: {
        "70p": "70%",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      zIndex: {
        9999: "9999",
      },
      animation: {
        bellShake: "bellShake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        bellShake: {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(5deg)" },
          "30%": { transform: "rotate(-5deg)" },
          "45%": { transform: "rotate(4deg)" },
          "60%": { transform: "rotate(-4deg)" },
          "75%": { transform: "rotate(2deg)" },
          "85%": { transform: "rotate(-2deg)" },
          "92%": { transform: "rotate(1deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
