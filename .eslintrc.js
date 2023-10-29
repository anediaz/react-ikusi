module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'prettier',
    'react',
    'react-hooks',
    'json',
    'jsx-a11y',
    'es',
    'unused-imports',
    'testing-library',
],
reportUnusedDisableDirectives: true,
  rules: {
    'import/no-unresolved': [
      'error',
      {
          commonjs: true,
          caseSensitive: true,
          ignore: ['!#'],
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.tsx', '.jsx'] },
    ],
    'jest/no-focused-tests': 'error',
    'jest/valid-expect': 'error',
  },
};
