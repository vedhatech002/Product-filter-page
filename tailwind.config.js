/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      gridTemplateColumns: {
        "main-col": " 0.5fr 2fr",
      },
    },
  },
  plugins: [],
};
