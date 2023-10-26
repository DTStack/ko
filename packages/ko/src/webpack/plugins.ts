import { IgnorePlugin, optimize } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AutoPolyfillsWebpackPlugin from '@dtinsight/auto-polyfills-webpack-plugin';
import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import PurgeCacheWebpackPlugin from './custom-plugins/purge-cache-webpack-plugin';
import { IWebpackOptions } from '../types';

function getPlugins(opts: IWebpackOptions) {
  const {
    isProd,
    htmlTemplate,
    htmlChunks,
    copy,
    analyzer,
    autoPolyfills,
    serve: { host, port, compilationSuccessInfo },
  } = opts;
  const htmlOptions: HtmlWebpackPlugin.Options = {
    template: htmlTemplate,
  };
  if (htmlChunks) {
    htmlOptions.chunks = htmlChunks;
  }
  return [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    isProd &&
      new optimize.SplitChunksPlugin({
        chunks: 'all',
        minSize: 30000,
        maxSize: 600000,
        minChunks: 1,
        automaticNameDelimiter: '_',
        cacheGroups: {
          baseCommon: {
            test: new RegExp(
              `[\\/]node_modules[\\/](${[
                'react',
                'react-router',
                'react-dom',
                'react-redux',
                'redux',
                'react-router-redux',
              ].join('|')})`
            ),
            priority: 1,
          },
          antd: {
            name: 'antd',
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            chunks: 'initial',
          },
          lodash: {
            name: 'lodash',
            test: /[\\/]node_modules[\\/]lodash[\\/]/,
            chunks: 'initial',
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }),
    isProd &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[id].[contenthash].css',
      }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin(htmlOptions),
    copy &&
      new CopyWebpackPlugin({
        patterns: copy,
      }),
    new WebpackBar(),
    new CleanWebpackPlugin({
      verbose: false,
      dry: false,
    }),
    new ReactRefreshPlugin({
      overlay: false,
    }),
    analyzer && new BundleAnalyzerPlugin(),
    !isProd &&
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: compilationSuccessInfo ?? {
          messages: [`Your application is running at http://${host}:${port}`],
          notes: [],
        },
      }),
    !isProd && new PurgeCacheWebpackPlugin(),
    isProd &&
      autoPolyfills &&
      (typeof autoPolyfills === 'boolean'
        ? new AutoPolyfillsWebpackPlugin()
        : new AutoPolyfillsWebpackPlugin(autoPolyfills)),
  ].filter(Boolean);
}

export default getPlugins;
