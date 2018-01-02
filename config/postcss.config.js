module.exports = ({ file, options, env }) => (
  {
    plugins: {
      'autoprefixer': options.autoprefixer,
      'postcss-pxtorem': /output/.test(file.dirname) ? options['postcss-pxtorem'] : false
    }
  }
);
