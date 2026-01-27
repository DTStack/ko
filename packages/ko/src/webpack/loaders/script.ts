import BabelLoader from './babel';
import { IWebpackOptions } from '../../types';
class Script {
  private THREAD_LOADER = require.resolve('thread-loader');
  private WORKER_LOADER = require.resolve('worker-loader');
  private ESBUILD_LOADER = require.resolve('esbuild-loader');
  private BABEL_LOADER: BabelLoader;
  private opts: IWebpackOptions;
  constructor(opts: IWebpackOptions) {
    this.opts = opts;
    this.BABEL_LOADER = new BabelLoader(opts);
  }

  get config() {
    const scriptLoader = [
      {
        test: /\.worker.[jt]s$/,
        loader: this.WORKER_LOADER,
        include: (input: string) =>
          /dt-react-monaco-editor[\\/]lib[\\/]languages/.test(input) ||
          input.includes('monaco-sql-languages'),
        options: {
          inline: 'fallback',
          chunkFilename: '[name].[contenthash].worker.js',
        },
      },
      {
        test: /\.m?(t|j)sx?$/,
        include: (input: string) => {
          // internal modules dt-common compatible
          if (/node_modules[\\/]dt-common[\\/]src[\\/]/.test(input)) {
            return true;
          } else if (input.includes('antlr4-c3')) {
            return true;
          } else if (input.includes('antlr4ng')) {
            return true;
          } else if (input.includes('immer')) {
            return true;
          } else if (input.includes('react-grid-layout')) {
            return true;
          } else if (input.includes('monaco-sql-languages')) {
            return true;
          } else if (input.includes('node_modules')) {
            return false;
          } else {
            return true;
          }
        },
        use: [
          {
            loader: this.THREAD_LOADER,
            options: {
              name: 'ko-js-pool',
            },
          },
          this.opts.experiment?.speedUp
            ? {
                loader: this.ESBUILD_LOADER,
                options: {
                  loader: 'tsx',
                  target: 'es2015',
                },
              }
            : this.BABEL_LOADER.config,
        ].filter(Boolean),
      },
    ];
    return scriptLoader;
  }
}

export default Script;
