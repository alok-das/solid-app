import solidPlugin from 'eslint-plugin-solid';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // SolidJS recommended rules (flat config) - single object, no spread
  solidPlugin.configs['flat/recommended'],

  // Prettier: disable conflicting rules + enable prettier as a rule
  {
    files: ['**/*.{js,jsx,css,json}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },

  // Ignore build output and dependencies
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Max lines rule scoped to source files only
  {
    files: ['src/**/*.scss'],
    rules: {
      'max-lines': [
        'error',
        {
          max: 200, // max 200 lines per file
          skipBlankLines: true, // blank lines won't count
          skipComments: true, // comment-only lines won't count
        },
      ],
    },
  },
];
