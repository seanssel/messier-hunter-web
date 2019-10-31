const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        red: {
          ...colors.red,
          // '100': '#f0eeee',
          '200': '#ffecec',
          '300': '#d1a2a2',
          '400': '#a59697',
          '500': '#876666',
          // '600': '#785353',
          '700': '#6a4040',
          // '800': '#421f22',
          '800': '#4c2122',
          '900': '#2c1010',
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-grid')({
      grids: [2, 3, 4, 5, 6, 8, 10, 12],
      gaps: {
        0: '0',
        4: '1rem',
        8: '2rem',
        '4-x': '1rem',
        '4-y': '1rem',
      },
      autoMinWidths: {
        '16': '4rem',
        '24': '6rem',
        '300px': '300px',
      },
      variants: ['responsive']
    })
  ]
};