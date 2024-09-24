module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'
  ],
  darkMode: 'class', // Ensure this matches your desired dark mode setting
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': 'auto 1fr', // Define custom rows
      },
      gridTemplateColumns: {
        'layout': '200px 1fr',    // Custom layout for default screens
        'layout-md': '300px 1fr', // Custom layout for medium and larger screens
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
