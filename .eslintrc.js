module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': ["error", "windows"],
    indent: ['error', 4],
    'no-console': 'off'
  },

};
