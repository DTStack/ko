import { join } from 'path';
import { realpathSync, existsSync } from 'fs';
import { loader as MiniCssExtractPluginLoader } from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';

const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const SASS_LOADER = require.resolve('sass-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const antdV4Path = join(process.cwd(), 'node_modules/antd-v4');
const antdV4RealPath = existsSync(antdV4Path)
  ? realpathSync(antdV4Path)
  : antdV4Path;

const styleLoader = {
  loader: MiniCssExtractPluginLoader,
};

const cssLoader = {
  loader: CSS_LOADER,
  options: {
    sourceMap: true,
  },
};

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
    use: [styleLoader, cssLoader, postcssLoader],
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
    exclude: [antdV4RealPath],
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
  {
    test: /\.less$/,
    include: [antdV4RealPath],
    use: [
      styleLoader,
      cssLoader,
      postcssLoader,
      {
        loader: LESS_LOADER,
        options: {
          sourceMap: true,
          lessOptions: {
            modifyVars: {
              '@ant-prefix': 'ant-v4',
              '@font-size-base': '12px',
              '@border-color-base': '#ddd',
              '@font-family':
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
            },
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
];

export default styleLoaders;
