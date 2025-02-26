/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: ["Firago", "sans-serif"],
      },
      colors: {
        primary: "#063776",
        BgSecondary: "#F1F1F1",
        white: "#FFFEFE",
        black: "#1C1C1C",
        errorRed: "#FF0000",
        placeholder: "#898A8A",
        popupBackground: "rgba(0, 0, 0, 0.59)",
      },
      screens: {
        md: "768px",
        lg: "1440px",
        xl: "1920px",
      },
      boxShadow: {
        customShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        primary: "10px",
        secondary: "30px",
      },
    },
  },
  plugins: [],
};
