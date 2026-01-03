import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';

export default defineConfig(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    name: 'General rules',
    files: ['src/*.ts', 'tests/*.ts'],
    settings: { 'import/parsers': { '@typescript-eslint/parser': ['.ts'] } },
    rules: {
      complexity: 'off',
      'constructor-super': 'error',
      'eol-last': 'off',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-blacklist': 'warn',
      'id-match': 'warn',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'desc', orderImportKind: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ],
      'max-classes-per-file': 'off',
      'max-len': [
        'error',
        { code: 120, comments: 160, ignoreComments: false, ignoreTrailingComments: true, tabWidth: 2 }
      ],
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-extra-boolean-cast': ['warn', { enforceForLogicalOperands: true }],
      'no-fallthrough': 'off',
      'no-invalid-this': 'off',
      'no-new-wrappers': 'error',
      'no-shadow': 'off',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'warn',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-arrow/prefer-arrow-functions': 'off',
      'prefer-const': 'error',
      quotes: ['warn', 'single'],
      radix: 'error',
      'spaced-comment': ['warn', 'always', { markers: ['/'] }],
      'use-isnan': 'error',
      'valid-typeof': 'off'
    }
  },
  {
    name: 'Eslint config file',
    files: ['eslint.config.mjs'],
    rules: { 'import/no-default-export': 'off', 'import/no-unresolved': 'off' }
  },
  {
    name: 'Test files',
    files: ['tests/*.js'],
    rules: {
      'import/no-unresolved': 'off'
    }
  }
);
