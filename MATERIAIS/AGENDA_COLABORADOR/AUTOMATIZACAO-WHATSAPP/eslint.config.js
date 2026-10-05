import js from '@eslint/js';
import globals from 'globals';

const REGRAS_PROJETO = {
  'no-var': 'error',
  'prefer-const': 'error',
  'no-nested-ternary': 'error',
  'max-lines': ['error', { max: 1000 }],
  'max-lines-per-function': ['error', { max: 45, skipBlankLines: true, skipComments: true }],
  'max-params': ['error', 3],
  'max-depth': ['error', 2],
  'max-len': [
    'error',
    { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true },
  ],
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
};

export default [
  { ignores: ['node_modules/', 'dados/', 'graphify-out/'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'scripts/**/*.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2025, sourceType: 'module', globals: globals.node },
    rules: REGRAS_PROJETO,
  },
  {
    files: ['public/**/*.js'],
    languageOptions: { ecmaVersion: 2025, sourceType: 'module', globals: globals.browser },
    rules: REGRAS_PROJETO,
  },
];
