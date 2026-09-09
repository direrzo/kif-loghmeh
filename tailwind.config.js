/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9f6",
          100: "#d8f0e9",
          500: "#159a7c",
          600: "#0f8068",
          700: "#0b6654",
          800: "#084c40",
        },
      },
    },
  },
  plugins: [],
};
