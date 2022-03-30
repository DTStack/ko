import Webpack, { Compiler } from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import detect from 'detect-port';
import { prompt } from 'inquirer';
import config from '../utils/config';
import { Options } from '../interfaces';
import { WebpackCreator } from './creator';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

class Dev extends WebpackCreator {
  private devServerConf: Configuration;
  constructor(opts: Options) {
    super(opts);
    const { port, host } = this.opts;
    const userDefinedDevServerConfig = config.userConf.devServer || {};
    this.devServerConf = {
      port,
      host,
      contentBase: config.defaultPaths.dist,
      historyApiFallback: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      inline: true,
      publicPath: '/',
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
      },
      ...userDefinedDevServerConfig,
    };
  }

  public config() {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [this.opts.analyzer && new BundleAnalyzerPlugin()].filter(
        Boolean
      ),
    };
    return this.mergeConfig([this.baseConfig, conf]);
  }

  private async changePort(newPort: number, port: number) {
    const question = {
      type: 'confirm',
      name: 'changePort',
      message: `port: ${port} has been used，use new port ${newPort} instead?`,
      default: true,
    };
    const answer = await prompt([question]);
    if (answer.changePort) {
      return newPort;
    } else {
      return null;
    }
  }

  private async checkPort(port: number) {
    const newPort = await detect(port);
    if (newPort === port) {
      return newPort;
    }
    const isInteractive = process.stdout.isTTY;
    if (isInteractive) {
      return this.changePort(newPort, port);
    }
  }

  private threadLoaderWarmUp() {
    const threadLoader = require('thread-loader');
    threadLoader.warmup({}, [require.resolve('babel-loader')]);
  }

  public async action() {
    const { port } = this.devServerConf;
    const newPort = await this.checkPort(port!);
    if (!newPort) {
      process.exit(0);
    }
    this.devServerConf.port = newPort;
    WebpackDevServer.addDevServerEntrypoints(
      this.config() as Configuration,
      this.devServerConf
    );
    const compiler = Webpack(this.config());
    const devServer = new WebpackDevServer(compiler as any, this.devServerConf);
    let isFirstCompile = true;
    compiler.hooks.done.tap('done', stats => {
      if (isFirstCompile) {
        isFirstCompile = false;
        this.successStdout('development server has been started');
      }
      if (stats.hasErrors()) {
        console.log(
          stats.toString({
            colors: true,
          })
        );
      }
    });

    compiler.hooks.invalid.tap('invalid', () => {
      console.log('Compiling...');
    });

    devServer.listen(this.devServerConf.port, this.devServerConf.host!, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
}

export default Dev;
