import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }],
      'object-curly-spacing': ['error', 'always'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
])
