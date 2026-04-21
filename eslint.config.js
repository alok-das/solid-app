import solidPlugin from 'eslint-plugin-solid';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // =========================================================================
  // SolidJS recommended rules
  // =========================================================================
  {
    ...solidPlugin.configs['flat/recommended'],
    files: ['**/*.{js,jsx}'],
  },

  // =========================================================================
  // Core rules — variables, globals, browser environment
  // =========================================================================
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // window, document, fetch, localStorage, etc.
        // ...globals.node,  // uncomment if also running in Node.js (process, __dirname, etc.)
      },
    },
    rules: {
      // -----------------------------------------------------------------------
      // VARIABLES
      // -----------------------------------------------------------------------
      'no-undef': 'error', // error on use of undeclared variables — e.g. console.log(abc) ❌
      'no-unused-vars': [
        'warn',
        {
          // warn on declared but never used variables
          vars: 'all', // check all variables
          args: 'after-used', // only flag unused args after the last used one
          ignoreRestSiblings: true, // allow { used, ...rest } patterns
          // varsIgnorePattern: '^_',         // uncomment to ignore vars prefixed with _
          // argsIgnorePattern: '^_',         // uncomment to ignore args prefixed with _
        },
      ],
      'no-shadow': 'warn', // warn when a variable shadows one in an outer scope
      'no-use-before-define': [
        'error',
        {
          // error when variable is used before it's declared
          functions: false, // allow hoisted function declarations
          classes: true,
          variables: true,
        },
      ],

      // -----------------------------------------------------------------------
      // CODE QUALITY
      // -----------------------------------------------------------------------
      'no-console': 'warn', // warn on console.log — remove before production
      'no-debugger': 'error', // never leave debugger statements in code
      'no-alert': 'warn', // warn on alert/confirm/prompt usage
      'no-eval': 'error', // disallow eval() — security risk
      'no-implied-eval': 'error', // disallow setTimeout("code") style eval
      'no-new-func': 'error', // disallow new Function() — similar to eval
      'no-script-url': 'error', // disallow javascript: URLs
      'no-throw-literal': 'error', // only throw Error objects, not strings/literals
      'no-return-await': 'error', // disallow unnecessary return await
      'require-await': 'warn', // warn on async functions with no await inside
      'no-promise-executor-return': 'error', // disallow returning values from Promise executor

      // -----------------------------------------------------------------------
      // POTENTIAL BUGS
      // -----------------------------------------------------------------------
      'no-duplicate-case': 'error', // no duplicate case labels in switch
      'no-duplicate-imports': 'error', // merge duplicate import statements
      'no-dupe-keys': 'error', // no duplicate keys in object literals
      'no-dupe-args': 'error', // no duplicate function parameter names
      'no-unreachable': 'error', // code after return/throw/break is never reached
      'no-unreachable-loop': 'error', // loop body that can only run once
      'no-constant-condition': 'error', // e.g. while (true) without a break
      'no-constant-binary-expression': 'error', // e.g. x && false — always false
      'no-self-assign': 'error', // x = x does nothing
      'no-self-compare': 'error', // x === x only true for NaN; use Number.isNaN()
      'no-unmodified-loop-condition': 'warn', // loop variable never changes → infinite loop
      'no-unused-expressions': [
        'error',
        {
          // expressions with no effect
          allowShortCircuit: true, // allow a && b()
          allowTernary: true, // allow a ? b() : c()
        },
      ],
      'use-isnan': 'error', // use Number.isNaN() instead of x === NaN
      'valid-typeof': 'error', // typeof x === 'strng' typo → error
      'array-callback-return': 'error', // require return in array method callbacks (map, filter, etc.)
      'no-constructor-return': 'error', // constructors should not return values
      'no-unsafe-optional-chaining': 'error', // disallow ?.() when result is used arithmetically

      // -----------------------------------------------------------------------
      // BEST PRACTICES
      // -----------------------------------------------------------------------
      eqeqeq: ['error', 'always', { null: 'ignore' }], // always use === instead of ==
      curly: ['error', 'all'], // always use braces for if/else/for/while
      'default-case': 'warn', // require default case in switch statements
      'default-case-last': 'error', // default must be the last case
      'dot-notation': 'warn', // prefer obj.prop over obj['prop'] where possible
      'no-else-return': 'warn', // no else after a return in if block
      'no-empty': 'warn', // no empty block statements {}
      'no-empty-function': [
        'warn',
        {
          // no empty functions (easy to miss stubs)
          allow: ['arrowFunctions'], // allow empty arrow functions () => {}
        },
      ],
      'no-extra-boolean-cast': 'error', // !!value in boolean context is redundant
      'no-lonely-if': 'warn', // if inside else can be else if
      'no-nested-ternary': 'warn', // deeply nested ternaries are hard to read
      'no-param-reassign': [
        'warn',
        {
          // warn when reassigning function parameters
          props: false, // allow mutating param properties (e.g. obj.x = 1)
        },
      ],
      'no-var': 'error', // use let/const instead of var
      'prefer-const': [
        'error',
        {
          // use const when variable is never reassigned
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-arrow-callback': 'warn', // prefer arrow functions as callbacks
      'prefer-template': 'warn', // prefer `Hello ${name}` over "Hello " + name
      'object-shorthand': 'warn', // prefer { x } over { x: x }
      'spaced-comment': ['warn', 'always'], // require space after // or /*
      yoda: 'warn', // disallow yoda conditions: if (42 === x) → if (x === 42)

      // -----------------------------------------------------------------------
      // ES MODULES & IMPORTS
      // -----------------------------------------------------------------------
      'no-useless-rename': 'error', // import { x as x } is pointless
      'sort-imports': [
        'warn',
        {
          // sort import specifiers alphabetically
          ignoreCase: true,
          ignoreDeclarationSort: true, // don't sort import declarations (leave that to tools)
          ignoreMemberSort: false,
        },
      ],
    },
  },

  // =========================================================================
  // Prettier — formatting rules (must come last to override style rules above)
  // =========================================================================
  {
    files: ['**/*.{js,jsx,css,json}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules, // disable ESLint rules that conflict with Prettier
      'prettier/prettier': 'error', // treat Prettier formatting issues as errors
    },
  },

  // =========================================================================
  // Ignored paths
  // =========================================================================
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
