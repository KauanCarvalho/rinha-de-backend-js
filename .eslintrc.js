module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: ['standard', 'eslint:recommended', 'prettier'],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'none',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        arrowParens: 'avoid',
        printWidth: 100
      }
    ],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'no-empty': 'error',
    'no-var': 'error',
    'no-unsafe-finally': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off'
  },
  plugins: ['prettier']
};
