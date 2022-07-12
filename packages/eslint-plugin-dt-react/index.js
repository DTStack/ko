const rules = {
  'jsx-closing-bracket-location': require('./rules/jsx-closing-bracket-location'),
  'jsx-tag-spacing': require('./rules/jsx-tag-spacing'),
  'jsx-wrap-multilines': require('./rules/jsx-wrap-multilines'),
  'self-closing-comp': require('./rules/self-closing-comp'),
};

module.exports = {
  rules,
  configs: {
    all: {
      plugins: ['dt-react'],
      rules,
    },
  },
};
