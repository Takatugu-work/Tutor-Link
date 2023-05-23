module.exports = {
  extends: ['eslint-config-next', 'prettier'],
  ignorePatterns: ['*.d.ts', 'schema/*.ts'],
  settings: {
    next: {
      rootDir: ['./apps/*/', './packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      plugins: ['@typescript-eslint', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        'prettier/prettier': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        'react/display-name': 'off',
      },
    },
  ],
};
