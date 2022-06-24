const rules = {
  'jsx-closing-bracket-location': require('./rules/jsx-closing-bracket-location'),
  'jsx-tag-spacing': require('./rules/jsx-tag-spacing'),
};

module.exports = {
  rules,
  configs: {
    all: {
      pulgins: ['dt-react'],
      rules,
    },
  },
};
