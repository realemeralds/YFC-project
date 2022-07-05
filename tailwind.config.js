module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['AdelicaBrush', 'cursive'],
        'serif': ['Poppins', 'sans-serif'],
        'garet': ['GaretBook', 'sans-serif'],
        'header': ['Akshar', 'sans-serif'],
        'navbar': ['Staatliches', 'cursive']
      },
      spacing: {
        '100': '400px',
        '125': '500px',
        '131': '524px',
        'general': '13vw'
      },
      colors: {
        'green': {
          DEFAULT: '#00A76A'
        },
        'disabled': '#DBDBDB'
      }
    },
  },
  plugins: [],
}
