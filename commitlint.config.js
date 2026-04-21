// =============================================================================
// commitlint.config.js — Commit Message Validation Rules
// =============================================================================
//
// COMMIT MESSAGE ANATOMY:
//
//   <type>(<scope>): <subject>
//   <BLANK LINE>
//   <body>
//   <BLANK LINE>
//   <footer>
//
// EXAMPLES:
//   feat(auth): add google oauth login
//   fix(api): handle null response from user endpoint
//   docs: update readme with setup instructions
//   chore(deps): upgrade vite to v6
//   feat!: remove deprecated config options          ← breaking change (shorthand)
//
// RULE FORMAT:
//   'rule-name': [severity, condition, value]
//
//   severity:  0 = disabled | 1 = warning | 2 = error (blocks commit)
//   condition: 'always' = rule must be true | 'never' = rule must be false
//
// =============================================================================

export default {
  // Extend a shareable config as the base.
  // Options:
  //   '@commitlint/config-conventional'  — Conventional Commits standard (most common)
  //   '@commitlint/config-angular'       — Angular commit style
  //   '@commitlint/config-lerna-scopes'  — Enforces scopes to match lerna package names
  extends: ['@commitlint/config-conventional'],

  // Optional: override the commit message parser.
  // Useful when using a non-standard delimiter or custom pattern.
  // parserPreset: {
  //   parserOpts: {
  //     headerPattern: /^(\w*)(?:\(([\w$.\-*/ ]*)\))?: (.*)$/,
  //     // Example for JIRA prefix: /^(PROJ-\d+) (\w+)(?:\((\w+)\))?: (.+)$/
  //     headerCorrespondence: ['type', 'scope', 'subject'],
  //   },
  // },

  rules: {
    // =========================================================================
    // TYPE — the category of change (e.g. feat, fix, chore)
    // =========================================================================

    // Restrict commits to only these types.
    // Add or remove types to match your team's workflow.
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature                         e.g. feat: add dark mode
        'fix', // Bug fix                             e.g. fix: resolve login crash
        'docs', // Documentation only                  e.g. docs: update api reference
        'style', // Formatting, whitespace (no logic)   e.g. style: fix indentation
        'refactor', // Code restructure (no feat/fix)      e.g. refactor: simplify auth flow
        'test', // Add or update tests                 e.g. test: add unit tests for utils
        'chore', // Tooling, deps, config               e.g. chore: update eslint config
        'perf', // Performance improvement             e.g. perf: cache user query results
        'ci', // CI/CD pipeline changes              e.g. ci: add github actions workflow
        'build', // Build system or dependencies        e.g. build: switch to esbuild
        'revert', // Revert a previous commit            e.g. revert: feat: add dark mode
        'wip', // Work in progress (optional)         e.g. wip: experimenting with layout
      ],
    ],

    // Type must never be empty.
    // 'type-empty': [2, 'never']  → blocks commits with no type
    // 'type-empty': [0, 'never']  → disables the check entirely
    'type-empty': [2, 'never'],

    // Case of the type.
    // Options: 'lower-case' | 'upper-case' | 'camel-case' | 'pascal-case' | 'sentence-case' | 'start-case' | 'snake-case' | 'kebab-case'
    // Example: 'lower-case' → feat ✅ | Feat ❌
    'type-case': [2, 'always', 'lower-case'],

    // =========================================================================
    // SCOPE — the area of code affected (optional in most conventions)
    // =========================================================================

    // Restrict scope to a fixed list of allowed values.
    // Uncomment and fill in to enforce only known scopes.
    // Example: feat(auth): ...  or  fix(ui): ...
    // 'scope-enum': [2, 'always', ['auth', 'ui', 'api', 'db', 'config', 'deps']],

    // Make scope required on every commit (uncomment to enable).
    // Example: feat: add button ❌  |  feat(ui): add button ✅
    // 'scope-empty': [2, 'never'],

    // Case of the scope.
    // Options: same as type-case above.
    // Example: (auth) ✅ | (Auth) ❌
    'scope-case': [1, 'always', 'lower-case'],

    // =========================================================================
    // SUBJECT — the short description after the colon
    // =========================================================================

    // Subject must never be empty.
    'subject-empty': [2, 'never'],

    // No trailing period at the end of the subject.
    // Example: "add login button." ❌  |  "add login button" ✅
    'subject-full-stop': [2, 'never', '.'],

    // Case of the subject.
    // Options: 'lower-case' | 'upper-case' | 'sentence-case' | 'start-case' | 'camel-case' | 'pascal-case'
    // Example (lower-case):    "add login button" ✅  |  "Add login button" ❌
    // Example (sentence-case): "Add login button" ✅  |  "add login button" ❌
    'subject-case': [2, 'always', 'lower-case'],

    // Maximum length of the subject line.
    // Keeps subjects readable in git log and GitHub UI.
    'subject-max-length': [2, 'always', 72],

    // Minimum length of the subject line.
    // Prevents useless messages like "fix" or "wip".
    'subject-min-length': [2, 'always', 10],

    // =========================================================================
    // HEADER — the entire first line: "<type>(<scope>): <subject>"
    // =========================================================================

    // Maximum total length of the header line.
    'header-max-length': [2, 'always', 100],

    // Minimum total length of the header line (rarely needed).
    // 'header-min-length': [2, 'always', 20],

    // =========================================================================
    // BODY — optional extended description (after blank line)
    // =========================================================================
    //
    // Example:
    //   feat(auth): add google oauth login
    //
    //   Users can now sign in using their Google account.
    //   This replaces the old email/password-only flow.

    // Require a blank line between the header and body.
    'body-leading-blank': [1, 'always'],

    // Maximum length of each line in the body.
    'body-max-line-length': [2, 'always', 100],

    // Minimum length of the body (rarely enforced).
    // 'body-min-length': [2, 'always', 20],

    // =========================================================================
    // FOOTER — optional metadata (breaking changes, issue refs)
    // =========================================================================
    //
    // Example:
    //   feat!: remove deprecated config options
    //
    //   BREAKING CHANGE: The `legacyMode` config key has been removed.
    //   Closes #42

    // Require a blank line between the body and footer.
    'footer-leading-blank': [1, 'always'],

    // Maximum length of each line in the footer.
    'footer-max-line-length': [2, 'always', 100],

    // =========================================================================
    // REFERENCES — issue / ticket linking in footer
    // =========================================================================

    // Warn if no issue reference is found in the commit (e.g. "Closes #42").
    // Change to [2, ...] to make it a hard error.
    // 'references-empty': [1, 'never'],

    // =========================================================================
    // SIGNED-OFF-BY — (used in open source / Linux-style projects)
    // =========================================================================

    // Require "Signed-off-by:" line in the footer.
    // 'signed-off-by': [2, 'always', 'Signed-off-by:'],
  },
};
