/** @type {import('tailwindcss').Config} */

const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#222322",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
