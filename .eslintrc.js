module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  'rules': {
    "camelcase":0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren':0,
    'no-multiple-empty-lines':0,
    quotes: [2, "single"],
    semi: [2, "always"],
    "key-spacing": [2, {"beforeColon":false,"afterColon":true}],
  }
}
