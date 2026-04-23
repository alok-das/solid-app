// =============================================================================
// commitlint.config.cjs — Commit Message Validation Rules
// =============================================================================
//
// COMMIT MESSAGE FORMAT:
//
//   <ticket>: <type> - <subject>
//   <BLANK LINE>
//   <body>         (optional)
//   <BLANK LINE>
//   <footer>       (optional)
//
// RULES:
//   - <ticket>  : minimum 6-digit numeric ID                e.g. 123456
//   - <type>    : one of the allowed types below            e.g. feat
//   - <subject> : short description in lower-case           e.g. add login button
//
// VALID EXAMPLES:
//   123456: feat - add google oauth login
//   789012: fix - resolve null response from user endpoint
//   100000: chore - update vite to v6
//   999999: docs - update readme with setup steps
//
// INVALID EXAMPLES:
//   12345: feat - too short ticket id      ❌  (less than 6 digits)
//   123456 feat - missing colon            ❌
//   123456: feature - wrong type           ❌  (not in allowed list)
//   123456: feat - Add button              ❌  (subject must be lower-case)
//   123456: feat add button                ❌  (missing hyphen separator)
//
// RULE FORMAT:
//   'rule-name': [severity, condition, value]
//
//   severity:  0 = disabled | 1 = warning | 2 = error (blocks commit)
//   condition: 'always' = rule must be true | 'never' = rule must be false
//
// =============================================================================

module.exports = {
  // helpUrl is shown at the bottom of every failed commit message output.
  // Point this to your team's wiki, confluence page, or contributing guide.
  helpUrl: 'Format: "<6-digit-ticket>: <type> - <subject>"  e.g. 123456: feat - add login button',

  // Custom plugin with a single rule that validates the full header format
  // and returns a clear, human-readable error when it doesn't match.
  plugins: [
    {
      rules: {
        'header-match-ticket-format': ({ header }) => {
          const pattern = /^(\d{6,}):\s+(\w+)\s+-\s+(.+)$/;
          const valid = pattern.test(header);
          return [
            valid,
            `Commit message format is invalid.\n\n` +
            `  Expected : <ticket>: <type> - <subject>\n` +
            `  Example  : 123456: feat - add login button\n` +
            `  Received : ${header}\n\n` +
            `  Rules:\n` +
            `    <ticket>  → minimum 6 digits            e.g. 123456\n` +
            `    <type>    → one of: feat | fix | docs | style | refactor |\n` +
            `                        test | chore | perf | ci | build | revert | wip\n` +
            `    separator → single space, hyphen, space  e.g. " - "\n` +
            `    <subject> → lower-case, min 10 chars, no trailing period`,
          ];
        },
      },
    },
  ],

  // Custom parser to extract ticket, type, and subject from the header.
  //
  // FORMAT: <ticket>: <type> - <subject>
  //
  // Regex breakdown:
  //   ^(\d{6,})   → ticket: 6 or more digits at start
  //   :\s+        → colon followed by one or more spaces
  //   (\w+)       → type: one word (letters/digits/underscore)
  //   \s+-\s+     → space(s), hyphen, space(s)
  //   (.+)$       → subject: everything to end of line
  //
  // To change the minimum ticket digits, update {6,} e.g. {8,} for 8+ digits.
  // To allow alphanumeric ticket IDs (e.g. PROJ-123), change (\d{6,}) to ([A-Z]+-\d+)
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\d{6,}):\s+(\w+)\s+-\s+(.+)$/,
      headerCorrespondence: ['ticket', 'type', 'subject'],
    },
  },

  rules: {

    // Validates the full header format and shows a clear error message.
    // This fires first so the user sees the expected format before other rule errors.
    'header-match-ticket-format': [2, 'always'],

    // =========================================================================
    // TYPE — the category of change
    // =========================================================================
    //
    // Add or remove types to match your team's workflow.
    // The type must come after "<ticket>: " in the commit message.
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature                         e.g. 123456: feat - add dark mode
        'fix',      // Bug fix                             e.g. 123456: fix - resolve login crash
        'docs',     // Documentation only                  e.g. 123456: docs - update api reference
        'style',    // Formatting, whitespace (no logic)   e.g. 123456: style - fix indentation
        'refactor', // Code restructure (no feat/fix)      e.g. 123456: refactor - simplify auth flow
        'test',     // Add or update tests                 e.g. 123456: test - add unit tests for utils
        'chore',    // Tooling, deps, config               e.g. 123456: chore - update eslint config
        'perf',     // Performance improvement             e.g. 123456: perf - cache user query results
        'ci',       // CI/CD pipeline changes              e.g. 123456: ci - add github actions workflow
        'build',    // Build system or dependencies        e.g. 123456: build - switch to esbuild
        'revert',   // Revert a previous commit            e.g. 123456: revert - undo dark mode commit
        'wip',      // Work in progress (optional)         e.g. 123456: wip - experimenting with layout
      ],
    ],

    // Type must never be empty — if header doesn't match the pattern,
    // type will be null and this rule will block the commit.
    'type-empty': [2, 'never'],

    // Case of the type.
    // Options: 'lower-case' | 'upper-case' | 'camel-case' | 'pascal-case' | 'sentence-case'
    // Example: feat ✅ | Feat ❌
    'type-case': [2, 'always', 'lower-case'],

    // =========================================================================
    // SUBJECT — the short description after the hyphen
    // =========================================================================

    // Subject must never be empty.
    'subject-empty': [2, 'never'],

    // No trailing period at the end.
    // Example: "add login button." ❌  |  "add login button" ✅
    'subject-full-stop': [2, 'never', '.'],

    // Case of the subject.
    // Options: 'lower-case' | 'upper-case' | 'sentence-case' | 'start-case' | 'camel-case'
    // Example (lower-case): "add login button" ✅  |  "Add login button" ❌
    'subject-case': [2, 'always', 'lower-case'],

    // Maximum length of the subject (not including ticket/type prefix).
    'subject-max-length': [2, 'always', 72],

    // Minimum length — prevents empty/useless messages.
    'subject-min-length': [2, 'always', 10],

    // =========================================================================
    // HEADER — the full first line: "<ticket>: <type> - <subject>"
    // =========================================================================

    // Maximum total length of the header line.
    // 100 allows for: 8-digit ticket + ": " + type + " - " + 72-char subject
    'header-max-length': [2, 'always', 100],

    // Minimum total length (rarely needed — subject-min-length covers this).
    // 'header-min-length': [2, 'always', 20],

    // =========================================================================
    // BODY — optional extended description (after blank line)
    // =========================================================================
    //
    // Example:
    //   123456: feat - add google oauth login
    //
    //   Users can now sign in using their Google account.
    //   This replaces the old email/password-only flow.

    // Require a blank line between the header and body.
    'body-leading-blank': [1, 'always'],

    // Maximum length of each body line.
    'body-max-line-length': [2, 'always', 100],

    // Minimum length of the body (rarely enforced — uncomment if needed).
    // 'body-min-length': [2, 'always', 20],

    // =========================================================================
    // FOOTER — optional metadata
    // =========================================================================
    //
    // Example:
    //   123456: feat - remove deprecated config options
    //
    //   BREAKING CHANGE: The `legacyMode` config key has been removed.
    //   Closes #123456

    // Require a blank line between body and footer.
    'footer-leading-blank': [1, 'always'],

    // Maximum length of each footer line.
    'footer-max-line-length': [2, 'always', 100],

    // =========================================================================
    // REFERENCES — issue / ticket linking in footer
    // =========================================================================

    // Warn if no issue reference is present (e.g. "Closes #42").
    // Change to [2, ...] to make it a hard error.
    // 'references-empty': [1, 'never'],

    // =========================================================================
    // SIGNED-OFF-BY — (uncomment for open source / Linux-style projects)
    // =========================================================================

    // 'signed-off-by': [2, 'always', 'Signed-off-by:'],

  },
};
