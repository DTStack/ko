/* eslint-disable import/no-extraneous-dependencies */
const { ESLint } = require('eslint');
const test = require('tape');

test('load config in eslint to validate all rule syntax is correct', async function (t) {
  const eslint = new ESLint();
  const code = 'const foo = 1\nconst bar = (val) => val + 1\nbar(foo)\n';
  const [lintResult] = await eslint.lintText(code);
  t.equal(lintResult.errorCount, 0);
  t.end();
});

test('ensure we allow top level await', async function (t) {
  const eslint = new ESLint();
  const code =
    'const foo = await 1\nconst bar = (val) => val + 2\nawait bar(foo)\n';
  const [lintResult] = await eslint.lintText(code);
  t.equal(lintResult.errorCount, 0);
  t.end();
});
