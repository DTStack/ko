const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const STYLE_LOADER = require.resolve('style-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const FILE_LOADER = require.resolve('file-loader');
// const VUE_LOADER = require.resolve('vue-loader'); //TODO: added in the future
const HAPPY_PACK = require.resolve('happypack/loader'); //TODO: remove in the future
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

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
          options: {
            sourceMap: true,
            plugins: [autoprefixer()],
          },
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
      loader: HAPPY_PACK,
      options: {
        id: 'happy-babel-js',
      },
    },
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
