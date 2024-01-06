/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
        rubik: "font-family: 'Rubik Maps', system-ui ",
      },
      gridTemplateColumns: {
        "main-col": " 0.5fr 2fr",
      },
    },
  },
  plugins: [],
};
