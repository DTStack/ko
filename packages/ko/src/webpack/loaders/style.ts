import { loader as MiniCssExtractPluginLoader } from 'mini-css-extract-plugin';
import autoprefixer from "autoprefixer";

const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const SASS_LOADER = require.resolve('sass-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');

const styleLoader = {
  loader: MiniCssExtractPluginLoader
}

const cssLoader = {
  loader: CSS_LOADER,
  options: {
    sourceMap: true,
  },
}

//TODO: check postcss-loader should use sourceMap option
const postcssLoader = {
  loader: POSTCSS_LOADER,
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [autoprefixer()],
    },
  },
};

const styleLoaders = [
  {
    test: /\.css$/,
    use: [
      styleLoader,
      cssLoader,
      postcssLoader,
    ],
  },
  {
    test: /\.s[ac]ss$/,
    use: [
      styleLoader,
      cssLoader,
      postcssLoader,
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
      styleLoader,
      cssLoader,
      postcssLoader,
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
];

export default styleLoaders;