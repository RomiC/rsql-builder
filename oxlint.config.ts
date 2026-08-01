import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'import', 'unicorn', 'oxc'],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    perf: 'warn'
  },
  env: {
    builtin: true
  },
  ignorePatterns: ['dist/**', 'coverage/**', 'scripts/**', 'tsdown*.config.ts'],
  rules: {
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/group-exports': 'off',
    'import/no-named-export': 'off',
    'import/no-nodejs-modules': 'off',
    'import/prefer-default-export': 'off',
    'eslint/func-style': 'off',
    'eslint/max-statements': 'off',
    'eslint/no-magic-numbers': 'off',
    'eslint/sort-imports': 'off',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-extra-boolean-cast': ['warn', { enforceForLogicalOperands: true }],
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-underscore-dangle': 'warn',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    radix: 'error',
    'typescript/parameter-properties': 'off',
    'unicorn/max-nested-calls': 'off',
    'unicorn/no-null': 'off',
    'use-isnan': 'error'
  },
  overrides: [
    {
      files: ['*.config.ts'],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ]
});
