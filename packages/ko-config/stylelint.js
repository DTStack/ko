const stylelintConfigStandard = require.resolve(
  'stylelint-config-standard'
);
const stylelintOrder = require.resolve('stylelint-order');
module.exports = {
    extends: stylelintConfigStandard,
    files: [
        '**/*.css',
        '**/*.less',
        '**/*.scss',
        '**/*.sass'
    ],
    ignoreFiles: [
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.gif',
        '**/*.mp3',
        '**/*.json',
        '**/*.html',
        '**/*.htm',
        '**/*.tsx',
        '**/*.js'
    ],
    plugins: [
      stylelintOrder
    ],
    rules: {
      "order/order": [
        "custom-properties",
        "declarations"
      ],
      "order/properties-order": [
        "width",
        "height"
      ],
      'block-no-empty': [
        true,
        {
          "severity": "error",
          message: "Forbid empty block"
        }
      ],
      'no-extra-semicolons': [
        true,
        {
          "severity": "error",
          message: 'Disallow extra semicolons'
        }
      ],
      'string-quotes': [
        'single',
        {
          "severity": "error",
          message: 'String should be single quote'
        }
      ],
      'length-zero-no-unit': true,
      'unit-case': 'lower',
      'value-list-comma-space-after': 'always',
      'value-list-max-empty-lines': 0,
      'declaration-colon-space-after': 'always',
      'declaration-colon-space-before': 'never',
      'declaration-block-semicolon-newline-after': 'always',
      'declaration-block-semicolon-newline-before': 'never-multi-line',
      'declaration-block-trailing-semicolon': 'always',
      'block-closing-brace-empty-line-before': 'never',
      'selector-list-comma-newline-after': 'never-multi-line',
      'selector-list-comma-newline-before': 'never-multi-line',
      'selector-list-comma-space-after': 'always',
      'selector-list-comma-space-before': 'never',
      'rule-empty-line-before': 'always-multi-line',
      'media-feature-colon-space-after': 'always',
      'media-feature-colon-space-before': 'never',
      'media-feature-name-case': 'lower',
      'media-query-list-comma-newline-after': 'always',
      'media-query-list-comma-newline-before': 'never-multi-line',
      'at-rule-no-unknown': [
          true,
          {
              ignoreAtRules: ['extends', 'ignores']
          }
      ],
      indentation: 4,
      'max-empty-lines': 2,
      'no-empty-first-line': true,
      'number-leading-zero': null,
      'unit-allowed-list': ['em', 'rem', 's', 'px', 'deg', 'all', 'vh', '%'],
      'no-eol-whitespace': [
          true,
          {
              ignore: 'empty-lines'
          }
      ],
      'selector-pseudo-class-no-unknown': [
          true,
          {
              ignorePseudoClasses: ['global']
          }
      ],
      'block-closing-brace-newline-after': 'always',
      'no-descending-specificity': null,
      'selector-pseudo-element-colon-notation': 'single',
      "color-hex-case": "lower"
    },
    fix: true,
    defaultSeverity: 'error'
}