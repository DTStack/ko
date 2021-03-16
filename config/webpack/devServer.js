const { merge } = require('webpack-merge');
const { webpack } = require('../../util/userConfig');
const { appDist } = require('../../util/file');
const { PORT, HOST } = require('../../constants/default');

function getDevServerConfig() {
  const { opts } = require('../../util/program');
  const userDefinedDevServerConfig = webpack.devServer || {};

  const port = opts.port || PORT;
  const host = opts.host || HOST;

  const defaultDevServerConfig = {
    port,
    host,
    contentBase: appDist,
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    inline: true,
    publicPath: '/',
    quiet: true,
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
  };
  return merge(defaultDevServerConfig, userDefinedDevServerConfig);
}

module.exports = getDevServerConfig;
