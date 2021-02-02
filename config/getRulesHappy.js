const deepAssign = require('deep-assign');
const BABEL_LOADER = require.resolve('babel-loader');
const { createHappyPlugin } = require('../util/createHappyPlugin');
const getUserConf = require('./getUserConf');

module.exports = () => {
  const { babel = {} } = getUserConf();
  const babelConf = require('ko-babel-app')(babel.plugins, babel.targets);
  let happyPlugins = [];
  happyPlugins.push(
    createHappyPlugin('happy-babel-js', [
      {
        loader: BABEL_LOADER,
        options: deepAssign({}, babelConf, {
          cacheDirectory: true,
        }),
      },
    ])
  );
  return happyPlugins;
};
