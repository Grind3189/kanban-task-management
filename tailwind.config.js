/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "purple-#635FC7": "#635FC7",
        "light-purple-#A8A4FF": "#A8A4FF",
        "black-#000112": "#000112",
        "very-dark-grey-#20212C": "#20212C",
        "dark-grey-#2B2C37": "#2B2C37",
        "lines-dark-#3E3F4E": "#3E3F4E",
        "medium-grey-#828FA3": "#828FA3",
        "lines-light-#E4EBFA": "#E4EBFA",
        "light-grey-#F4F7FD": "#F4F7FD",
        "red": "#EA5555",
        "light-red": "#FF9898"
      },
      borderRadius: {
        "button": "1.25rem",
        "button": "1.5rem",
        "inputs": "0.25rem"
      },
      backgroundImage: {
        'logo-mobile': "url('./src/assets/logo-mobile.svg')",
        'logo-light': "url('./src/assets/logo-light.svg')",
        'logo-dark': "url('./src/assets/logo-dark.svg')"
      }
    },
  },
  plugins: [],
}