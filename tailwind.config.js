/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "carbon-black": "#1C1C1C",
        "charcoal-gray": "#2F2F2F",
        "bright-orange": "#FF6F00",
        "tactical-yellow": "#FFD700",
        "steel-gray": "#707070",
        "ghost-white": "#F5F5F5",
        "blood-red": "#D32F2F"
      },
      fontFamily: {
        headline: ["Montserrat", "sans-serif"],
        subheading: ["Roboto", "sans-serif"],
        body: ["Inter", "sans-serif"],
        stats: ["Space Mono", "monospace"]
      },
      fontWeight: {
        bold: "700",
        medium: "500",
        regular: "400",
        light: "300"
      }
    }
  },
  plugins: [],
  important: true,
} 