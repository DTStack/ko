process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const getWebpackDll = require('../config/webpackDll');
const colors = require('colors');
const log = console.log;
module.exports = s => {
  if (s < 1 || !s) {
    log(
      colors.yellow(
        `warning :分割组数必须是大于1的正整数；根据包大小，可以自由组合，默认3个包一组`
      )
    );
    s = 3;
  }
  let webpackDll = getWebpackDll(s);
  log(colors.green('start dll ...'));
  webpack(webpackDll, (error, stats) => {
    if (error) {
      throw error;
    } else {
      log(
        stats.toString({
          colors: true,
          chunks: false,
          children: false,
          modules: false,
          chunkModules: false,
        })
      );
      if (stats.hasErrors()) {
        throw new Error('webpack dll compiled failed.');
      }
    }
  });
};
