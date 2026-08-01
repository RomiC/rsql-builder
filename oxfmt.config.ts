import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  bracketSpacing: true,
  ignorePatterns: ['dist/**', 'coverage/**', 'scripts/**', 'package-lock.json'],
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false
      }
    }
  ]
});
