module.exports = {
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr',
      },
      gridTemplateColumns: {
        layout: 'auto 1fr',
      },
      minWidth: (theme) => theme('maxWidth'),
      minHeight: (theme) => theme('maxWidth'),
      maxHeight: (theme) => theme('maxWidth'),
    },
  },
  variants: {},
  plugins: [],
};
