/**
 * 启动服务，根据传入的路径地址，按照ko的规则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */
process.env.NODE_ENV = 'development';
const colors = require('colors');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const deepmerge = require('deepmerge');
const checkPort = require('../util/checkPort');
const getWebpackDev = require('../config/webpackDev');
const getWebpackSer = require('../config/webpackSer');
const { proxy = [], server = {} } = require('../config/getUserConf')();
module.exports = async function(program) {
  const DEFAULT_PORT = server.port || program.port || process.env.PORT || 4446;
  const defaultPort = parseInt(DEFAULT_PORT, 10);
  const host = server.host || program.host || process.env.HOST || '127.0.0.1';
  let port = await checkPort(defaultPort);
  if (!port) return;
  const webpackDev = getWebpackDev(program);
  let isFirstCompile = true;
  const compiler = webpack(webpackDev);
  let webpackSer = getWebpackSer({ host, port });
  if ('devServer' in webpackDev) {
    webpackSer = deepmerge(webpackSer, webpackDev.devServer);
  }
  webpackSer.proxy = proxy.length ? proxy : {};
  program.micro && (webpackSer.writeToDisk = true);
  const devServer = new WebpackDevServer(compiler, webpackSer);

  compiler.hooks.done.tap('done', stats => {
    if (isFirstCompile) {
      isFirstCompile = false;
      console.log(colors.cyan('Starting the development server...'));
      let tips = [
        `    - Local:   ${colors.yellow('http://' + host + ':' + port)}`,
        `    - Html:   ${colors.red(
          '非index.html静态文件，请访问:'
        )}${colors.yellow('http://' + host + ':' + port + '/xxx.html')}`,
      ];
      console.log(tips.join('\n'));
    }
    const json = stats.toJson({}, true);
    const messages = formatWebpackMessages(json);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;

    if (isSuccessful) {
      if (stats.stats) {
        console.log(colors.green('Compiled successfully'));
      } else {
        console.log(
          colors.green(
            `Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`
          )
        );
      }
    }
    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(colors.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
    } else if (messages.warnings.length) {
      console.log(colors.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      console.log();
    }
  });

  compiler.hooks.invalid.tap('invalid', () => {
    console.log('Compiling...');
  });

  devServer.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
  });

  devServer.listen(port, host, err => {
    // 端口被占用，退出程序
    if (err) {
      console.error(err);
      process.exit(500);
    }
  });
};
