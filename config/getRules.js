/*
 * @Description: 设置webpack rule 配置
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors: Charles
 * @LastEditTime: 2020-03-03 18:36:46
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssConf = require('./postcssConf');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const STYLE_LOADER = require.resolve('style-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const FILE_LOADER = require.resolve('file-loader');
const VUE_LOADER = require.resolve('vue-loader');
const HAPPY_PACK = require.resolve('happypack/loader');

module.exports = () => {
  const miniCssExtractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
  };
  const styleLoader = {
    loader: STYLE_LOADER,
  };
  const loaderType =
    process.env.NODE_ENV == 'production'
      ? miniCssExtractPluginLoader
      : styleLoader;
  return [
    {
      test: /\.css$/,
      use: [
        loaderType,
        {
          loader: CSS_LOADER,
          options: {
            sourceMap: true,
          },
        },
        {
          loader: POSTCSS_LOADER,
          options: Object.assign(
            {
              sourceMap: true,
            },
            postcssConf
          ),
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        loaderType,
        {
          loader: CSS_LOADER,
          options: {
            sourceMap: true,
          },
        },
        {
          loader: POSTCSS_LOADER,
          options: Object.assign(
            {
              sourceMap: true,
            },
            postcssConf
          ),
        },
        {
          loader: SASS_LOADER,
          options: {
            sourceMap: true,
            //javascriptEnabled: true
          },
        },
      ],
    },
    {
      test: /\.less$/,
      use: [
        loaderType,
        {
          loader: CSS_LOADER,
          options: {
            sourceMap: true,
          },
        },
        {
          loader: POSTCSS_LOADER,
          options: Object.assign(
            {
              sourceMap: true,
            },
            postcssConf
          ),
        },
        {
          loader: LESS_LOADER,
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.jsx|.js?$/,
      //exclude: /node_modules/,
      loader: HAPPY_PACK,
      options: {
        id: 'happy-babel-js',
      },
    },
    // {
    //   test: /\.vue$/,
    //   loader: VUE_LOADER,
    // },
    {
      test: /\.(woff|woff2|svg|ttf|eot)$/,
      loader: FILE_LOADER,
      options: {
        name: 'fonts/[hash].[ext]',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: FILE_LOADER,
      options: {
        name: 'imgs/[hash].[ext]',
      },
    },
  ];
};
