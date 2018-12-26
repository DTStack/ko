/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-13 11:45:17
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:26:18
 */
const paths=require('../config/defaultPaths')
/**
 * @description: 开发环境服务配置
 * @param1: args 对象 {port,host}
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:25:37
 */
module.exports = (args) => {
    return {
      port:args.port,
      host:args.host,
      contentBase: paths.appDirectory,
      historyApiFallback: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      inline:true,
      publicPath: '/',
      quiet: true,
      proxy: [],
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
      },
      before(app) {
        app.use((req, res, next) => {
          res.set('Access-Control-Allow-Origin', '*');
          next();
        });
      }
    };
  };