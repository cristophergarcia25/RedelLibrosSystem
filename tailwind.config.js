/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-claro': '#4F6F52',
        'verde-oscuro': '#1A4D2E',
        'blanco-hueso': '#E8DFCA',
        'blanco': '#F5EFE6'
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}