/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        primaryC: "var(--primary-color)",
        secondaryC: "var(--secondary-color)",
        accentC: "var(--accent-color)",
        backgroundC: "var(--background-color)",
        textC: "var(--text-color)",
        borderC: "var(--border-color)",
      },
      animation: {
        bounceSlow: "bounceSlow 0.3s forwards",
        spin988: "spin988 3s linear infinite",
      },
      keyframes: {
        bounceSlow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        spin988: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "20%, 25%": { transform: "scale(1.3) rotate(90deg)" },
          "45%, 50%": { transform: "scale(1) rotate(180deg)" },
          "70%, 75%": { transform: "scale(1.3) rotate(270deg)" },
          "95%, 100%": { transform: "scale(1) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
