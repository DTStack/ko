const { lint, fix, getDescription } = require('@lint-md/core');
const { readFileSync, writeFileSync } = require('fs');

const defaultRules = {};

function runMdLinted(params) {
  const { file, rules = defaultRules } = params;
  return new Promise((resolve) => {
    const markdown = readFileSync(file, { encoding: 'utf8' });
    const errors = lint(markdown, rules);
    resolve({
      path: file,
      // 去重
      errors,
    });
  });
}

function runMdFixed(params) {
  const { file, rules = defaultRules } = params;
  return new Promise((resolve) => {
    const markdown = readFileSync(file, { encoding: 'utf8' });
    const newMarkdown = fix(markdown, rules);
    if (newMarkdown !== markdown) {
      writeFileSync(file, newMarkdown, { encoding: 'utf8' });
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

module.exports = {
  runMdLinted,
  runMdFixed,
};
