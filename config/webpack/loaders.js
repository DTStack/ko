const THREAD_LOADER = require.resolve('thread-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const SASS_LOADER = require.resolve('sass-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const BABEL_LOADER = require.resolve('babel-loader');
const FILE_LOADER = require.resolve('file-loader');
// const VUE_LOADER = require.resolve('vue-loader'); //TODO: added in the future
const autoprefixer = require('autoprefixer');

const { babel } = require('../../util/userConfig');
const { PROD } = require('../../constants/env');

let styleLoader;
if (process.env.NODE_ENV === PROD) {
  const MiniCssExtractPluginLoader = require('mini-css-extract-plugin').loader;
  styleLoader = {
    loader: MiniCssExtractPluginLoader,
  };
} else {
  const STYLE_LOADER = require.resolve('style-loader');
  styleLoader = {
    loader: STYLE_LOADER,
  };
}

const postcssLoader = {
  loader: POSTCSS_LOADER,
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [autoprefixer()],
    },
  },
};

const babelConf = require('ko-babel-app')(babel.plugins, babel.targets);

let loaders = [
  {
    test: /\.css$/,
    use: [
      styleLoader,
      {
        loader: CSS_LOADER,
        options: {
          sourceMap: true,
        },
      },
      postcssLoader,
    ],
  },
  {
    test: /\.scss$/,
    use: [
      styleLoader,
      {
        loader: CSS_LOADER,
        options: {
          sourceMap: true,
        },
      },
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
      {
        loader: CSS_LOADER,
        options: {
          sourceMap: true,
        },
      },
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
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      THREAD_LOADER,
      {
        loader: BABEL_LOADER,
        options: Object.assign({}, babelConf, {
          cacheDirectory: true,
        }),
      },
    ],
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
// support typescript
if (process.env.ts) {
  const TS_LOADER = require.resolve('ts-loader');
  const typescriptLoaders = [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: TS_LOADER,
      options: {
        transpileOnly: true,
        happyPackMode: true,
      },
    },
  ];
  loaders = loaders.concat(typescriptLoaders);
}

function getLoaders() {
  const { opts } = require('../../util/program');
  if (opts.ts) {
    const TS_LOADER = require.resolve('ts-loader');
    const typescriptLoaders = [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: TS_LOADER,
        options: {
          transpileOnly: true,
          happyPackMode: true,
        },
      },
    ];
    loaders = loaders.concat(typescriptLoaders);
  }
  return loaders;
}

module.exports = getLoaders;
