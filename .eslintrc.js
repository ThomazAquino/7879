module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'unused-imports/no-unused-imports': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
  },
  env: {
    browser: true,
    node: true,
    amd: true,
  },
};
