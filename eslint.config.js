import solidPlugin from 'eslint-plugin-solid';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // SolidJS recommended rules (flat config)
  {
    ...solidPlugin.configs['flat/recommended'],
    files: ['**/*.{js,jsx}'],
  },
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
];
