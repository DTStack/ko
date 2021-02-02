const fs = require('fs');
const deepAssign = require('deep-assign');
const { getCurFilePath } = require('../../util');
const { eslint } = require('../getUserConf');
/**
 * eslint default config, user defined config file can override this
 * @ref: https://eslint.org/docs/rules/
 */
const defaultEslintConf = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],
    'no-var': 'error',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 2,
        VariableDeclarator: {
          var: 2,
          let: 2,
          const: 2,
        },
        outerIIFEBody: 4,
        MemberExpression: 1,
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    quotes: ['warn', 'double'],
    'semi-style': ['warn', 'last'],
    semi: [
      'warn',
      'always',
      {
        omitLastInOneLineBlock: true,
      },
    ],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'key-spacing': [
      'error',
      {
        mode: 'strict',
        beforeColon: true,
        afterColon: true,
      },
    ],
    'no-label-var': 'error',
    'valid-typeof': [
      'error',
      {
        requireStringLiterals: true,
      },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-mixed-requires': 'warn',
    'use-isnan': 'error',
    'no-template-curly-in-string': 'error',
    'no-unexpected-multiline': 'error',
    'no-extra-parens': [
      'error',
      'all',
      {
        nestedBinaryExpressions: false,
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: true,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          balanced: false,
        },
      },
    ],
    'object-curly-spacing': [
      'warn',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-eq-null': 'error',
    'no-extend-native': 'error',
    'no-invalid-this': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-multi-str': 'error',
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
        overrides: {
          new: true,
          function: true,
          if: true,
          async: true,
          await: true,
          delete: true,
          typeof: true,
        },
      },
    ],
    'no-await-in-loop': 'error',
    'space-infix-ops': 'error',
    'space-in-parens': ['error', 'never'],
    'space-before-blocks': 'error',
    'no-multi-assign': 'error',
    'no-unused-vars': 'off',
    'no-tabs': [
      'error',
      {
        allowIndentationTabs: false,
      },
    ],
  },
};

const userConfFile = eslint ? getCurFilePath(eslint) : '';
const userConf = userConfFile
  ? JSON.parse(fs.readFileSync(userConfFile, 'utf8'))
  : {};

const config = deepAssign({}, defaultEslintConf, userConf);

module.exports = config;
