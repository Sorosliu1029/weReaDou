/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        dou: { "50": "#CBF9D5", "100": "#ACF4BB", "200": "#8FEE9E", "300": "#73E882", "400": "#49E159", "500": "#2AD735", "600": "#10CA19", "700": "#00B600", "800": "#019E16", "900": "#00651C" }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
