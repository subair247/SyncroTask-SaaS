/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // You can add custom SaaS branding colors here if you want
      colors: {
        brand: {
          light: '#3b82f6',
          dark: '#1e40af',
        }
      }
    },
  },
  plugins: [],
}