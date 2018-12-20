const paths=require('../config/defaultPaths')
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