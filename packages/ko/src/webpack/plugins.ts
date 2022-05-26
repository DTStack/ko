import { IgnorePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

type IPluginOpts = {
  isProd: boolean;
  outputPath: string;
};

function getPlugins(opts: IPluginOpts) {
  return [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CaseSensitivePathsPlugin(),
    new WebpackBar(),
    new CleanWebpackPlugin({
      verbose: false,
      dry: false,
    }),
    new ReactRefreshPlugin(),
  ];
}

export default getPlugins;
