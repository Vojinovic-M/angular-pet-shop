/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#048ABF', // Default primary color
          600: '#036B8F', // Darker shade
          700: '#024E67', // Even darker shade
        },
        secondary: {
          500: '#FFB400', // Example secondary color
          600: '#CC8E00', // Darker secondary
        }
      }
      }
    },
  plugins: [
    require('preline/plugin')
  ],
}

