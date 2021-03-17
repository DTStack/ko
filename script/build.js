const webpack = require('webpack');
const getWebpackPro = require('../config/webpackPro');

module.exports = (program) => {
  process.env.NODE_ENV = 'production';
  const webpackConfig = getWebpackPro(program);
  webpack(webpackConfig, (error, stats) => {
    if (error) {
      throw error;
    } else {
      console.log(
        stats.toString({
          colors: true,
          chunks: false,
          children: false,
          modules: false,
          chunkModules: false,
        })
      );
      if (stats.hasErrors()) {
        throw new Error('webpack compiled failed.');
      }
    }
    console.log('ko build completed!');
  });
};
