/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0ba062",
        secondary: "#1c1c1c",
        warn: "#ab1f13",
      },
    },
  },
  plugins: [],
};
