/**
 * @description: 开发环境服务配置
 * @param1: args 对象 {port,host}
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:25:37
 */
const paths = require('../config/defaultPaths');

module.exports = args => {
  return {
    port: args.port,
    host: args.host,
    contentBase: paths.appDist,
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    inline: true,
    publicPath: '/',
    quiet: true,
    proxy: [],
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    before(app) {
      app.use((req, res, next) => {
        res.set('Access-Control-Allow-Origin', '*');
        next();
      });
    },
  };
};
