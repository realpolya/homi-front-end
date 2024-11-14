/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCF7F8", //snow
        secondary: "#CE3DC", // french gray
        accent: "#A31621", // red-madder
        background: "#4E8098", // air foce blue
        alternative: "#90C2E7", // light sky blue
      },
    },
  },
  plugins: [],
};
