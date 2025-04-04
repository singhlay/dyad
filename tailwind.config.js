/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#00A3E0',
      },
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
      maxWidth: {
        '1440': '1440px',
      },
    },
  },
  plugins: [],
};