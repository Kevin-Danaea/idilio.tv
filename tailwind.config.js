/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./services/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-surface': '#1a1a1a',
        'dark-card': '#252525',
        'brand-500': '#e11d48',
        'brand-600': '#be185d',
        'brand-700': '#9f1239',
        'brand-900': '#831843',
        'brand-950': '#500724',
      },
    },
  },
  plugins: [],
}

