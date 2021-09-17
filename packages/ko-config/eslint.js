module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier'],
  rules: {
    semi: 0,
    strict: 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'arrow-body-style': 0,
    'no-return-assign': 0,
    'no-useless-constructor': 0,
    'no-unused-expressions': 0,
    eqeqeq: 0,
    'no-console': 0,
    'no-param-reassign': 0,
    camelcase: 0,
    'space-before-function-paren': 0,
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
