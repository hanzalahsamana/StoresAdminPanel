/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        bounceSlow: 'bounceSlow 0.3s forwards',
      },
      keyframes: {
        bounceSlow: {
          '0%': { opacity:0 },
          '100%': { opacity:1 },
        },
      },
    },
  },
  plugins: [],
};
