const webpack = require('webpack');
const getWebpackPro = require('../config/webpackPro');
const ENV_PROD = "production";

module.exports =(program)=> {
  if(typeof program.env === 'boolean') {
    throw new Error('环境变量配置出错,请检查参数')
  }
  process.env.NODE_ENV = program.env || ENV_PROD;
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
    console.log('ko build finished');
  });
}