const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#3543C4',
        'celeste': '#525CEB',
        'gris-claro': '#DBDBDD',
        'gris-oscuro': '#EFEFEF'
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
    // flowbite.plugin()
  ],
}