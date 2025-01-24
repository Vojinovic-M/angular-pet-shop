/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#101129',
        accent: '#F2F2F2',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '95%',
          md: '80%',
          lg: '80%',
          xl: '80%',
          '2xl': '80%',
        }
      }
      }
    },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
}

