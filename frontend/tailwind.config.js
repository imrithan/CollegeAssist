/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1E34',
          800: '#0F243A',
          700: '#162F4A',
        },
        brand: {
          blue: '#2563EB',
          hover: '#1D4ED8',
          light: '#EBF3FE',
        },
        canvas: {
          bg: '#F0F5FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
