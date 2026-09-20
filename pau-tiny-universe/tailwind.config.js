/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cute: ['"Quicksand"', "sans-serif"],
      },
      colors: {
        pauPink: {
          light: "#FFF5F8",
          DEFAULT: "#FFB6C1",
          dark: "#FF69B4",
        },
        pauBrown: "#8B5A2B",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        blob: "blob 15s infinite ease-in-out",
        "blob-slow": "blob 20s infinite ease-in-out reverse",
      },
    },
  },
  plugins: [],
};
