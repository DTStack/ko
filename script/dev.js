const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const detect = require('detect-port');
const inquirer = require('inquirer');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const { DEV } = require('../constants/env');
const { logWithColor } = require('../util/stdout');
const { getWebpackDev, getDevServerConfig } = require('../config/webpack');

async function checkPort(port) {
  const newPort = await detect(port);
  if (newPort === port) {
    return newPort;
  }
  const isInteractive = process.stdout.isTTY;
  if (isInteractive) {
    return changePort(newPort, port);
  }
}

async function changePort(newPort, port) {
  const question = {
    type: 'confirm',
    name: 'changePort',
    message: `port: ${port} has been used，use new port ${newPort} instead?`,
    default: true,
  };
  const answer = await inquirer.prompt(question);
  if (answer.changePort) {
    return newPort;
  } else {
    return null;
  }
}

function getUrlHost(host) {
  const regex = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*$/i;
  return regex.test(host) ? host : `http://${host}`;
}

module.exports = async function () {
  process.env.NODE_ENV = DEV;
  const webpackDevServerConf = getDevServerConfig();
  const webpackDevConf = getWebpackDev();
  const { port, host } = webpackDevServerConf;
  const newPort = await checkPort(parseInt(webpackDevServerConf.port));
  if (!newPort) return;
  const compiler = webpack(webpackDevConf);
  const devServer = new WebpackDevServer(compiler, webpackDevServerConf);
  let isFirstCompile = true;

  compiler.hooks.done.tap('done', (stats) => {
    if (isFirstCompile) {
      isFirstCompile = false;
      logWithColor('cyan', 'development server has been started');
      logWithColor('yellow', `server starts at:${getUrlHost(host)}:${port}`);
    }
    const json = stats.toJson({}, true);
    const messages = formatWebpackMessages(json);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      if (stats.stats) {
        logWithColor('green', 'compiled successfully');
      } else {
        logWithColor(
          'green',
          `Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`
        );
      }
    }
    if (messages.errors.length) {
      logWithColor('red', 'failed to compiled with errors:\n');
      messages.errors.forEach((msg) => console.log(msg + '\n'));
    } else if (messages.warnings.length) {
      logWithColor('yellow', 'compiled with warnings:\n');
      messages.warnings.forEach((msg) => console.log(msg + '\n'));
    }
  });

  compiler.hooks.invalid.tap('invalid', () => {
    console.log('Compiling...');
  });

  devServer.listen(port, host, (err) => {
    if (err) {
      console.error(err);
      process.exit(500);
    }
  });
};
