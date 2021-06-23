const webpack = require('webpack');
const { getWebpackPro } = require('../config/webpack');

function buildWebpackPro() {
  const webpackProConf = getWebpackPro();
  webpack(webpackProConf, (error, stats) => {
    if (error || stats.hasErrors()) {
      throw (
        error ||
        stats.toString({
          colors: true,
          chunks: false,
          children: false,
          modules: false,
          chunkModules: false,
        })
      );
    }
    console.log('ko build completed!');
  });
}

module.exports = buildWebpackPro;
