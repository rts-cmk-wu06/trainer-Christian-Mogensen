/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        largest: "56px", // 56px
        larger: "2.25rem", // 36px
        large: "1.5rem", // 24px
        medium: "1.25rem", // 20px
        small: "1.125rem", // 18px
        smaller: "1rem", // 16px
        extrasmall: "0.875rem", // 14px
        smallest: "0.75rem", // 12px
      },
      colors: {
        curry: "#f1c40e",
        licorice: "#000000",
        sky: "#ffffff",
        ashe: {
          dark: "#9e9e9e",
          medium: "#d4d4d4",
          light: "#fbfbfb",
        },
      },
      screens: {
        standalone: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [],
};
