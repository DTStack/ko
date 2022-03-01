const path = require('path');

module.exports = function (api, opts = {}) {
  let absoluteRuntimePath = false;
  if (opts.useAbsoluteRuntime) {
    absoluteRuntimePath = path.dirname(
      require.resolve('@babel/runtime/package.json')
    );
  }
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  const isProd = env === 'production';
  return {
    assumptions: {
      //use assignment rather than using Object.defineProperty
      setPublicClassFields: true,
    },
    presets: [
      [
        require('@babel/preset-env').default,
        {
          useBuiltIns: 'entry',
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          development: !isProd,
        },
      ],
      [require('@babel/preset-typescript').default],
    ],
    plugins: [
      //support proposal decorators
      //NOTE: https://babeljs.io/docs/en/babel-plugin-proposal-decorators#note-compatibility-with-babelplugin-proposal-class-properties
      [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          version: require('@babel/runtime/package.json').version,
          regenerator: true,
          absoluteRuntime: absoluteRuntimePath,
        },
      ],
    ],
  };
};
