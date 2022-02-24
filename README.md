# ko

Project toolkit base on webpack,babel,eslint and prettier.

<a href="https://www.npmjs.com/package/lerna"><img alt="NPM Status" src="https://img.shields.io/npm/v/ko.svg?style=flat"></a>

EngLish | [中文文档](./README-zh.md)

## Getting Started

global install:

``` bash
npm install ko -g
yarn global add ko
```

install as `devDependencies`:

``` bash
npm install ko -D
yarn add ko -D
```

## Commands

* [ko build](#ko-build)
* [ko dev](#ko-dev)
* [ko prettier](#ko-prettier-ko-pr-patterns)
* [ko eslint](#ko-eslint-patterns)

### ko build

use webpack to bundle files. The supported options are:

* `--hash`: output filename with hash
* `-t,--ts,--typescript`: support typescript
* `-e,--esbuild`: enable esbuild(now only esbuild minification is supported)

### ko dev

use `webpack-dev-server` to start `devServer`. The supported options are:

* `-p, --port <port>`: server start on which port
* `--host <host>`: server start on which host
* `-t, --ts`: support typescript
* `-a,--analyzer`: support building analyzer(internal use `webpack-bundle-analyzer`)

### ko prettier (ko pr) [[patterns]](https://github.com/mrmlnc/fast-glob)

use `prettier` to format your codes. The supported options are:

* `-w, --write`: Edit files in-place. (Beware!)
* `-c, --config <configPath>`: Specify prettier config path
* `--ignore-path <ignorePath>`: specify prettier ignore path

### ko eslint (ko el) [[patterns]](https://github.com/mrmlnc/fast-glob)

use `eslint` to format your codes.The supported options are:

* `-f, --fix`: Automatically fix problems
* `-c, --config <path>`: Specify eslint config path
* `--ignore-path <ignorePath>`: Specify eslint ignore path

### ko stylelint (ko sl) [[patterns]](https://github.com/mrmlnc/fast-glob)

use `stylelint` to format your codes.The supported options are:

* `-f, --fix`: Automatically fix problems
* `-c, --config <path>`: Specify stylelint config path
* `--ignore-path <ignorePath>`: Specify stylelint ignore path

## Configuration

You can configure `ko build` and `ko dev` via `ko.config.js`. User defined webpack configurations like customized entry & output,add plugins or loaders will be merged by [`webpack`](https://github.com/survivejs/webpack-merge) when webpack initiate.

### ko.config.js

``` js
module.exports = {
  entry: './src/app.tsx',
  output: {
    publicPath: isDev ? '/' : '/easyIndex/',
  },
  plugins: [
    new CopyWebpackPlugin(copyConfig),
  ],
  externals: {
    APP_CONF: 'APP_CONF',
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      events: false,
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  devServer: {
    proxy,
    host: '0.0.0.0',
    port: 8084,
  },
};
```

All list above will be merged, for more configurations, please read [webpack configuration](https://webpack.js.org/configuration/)

### .koignore

``` plain text
*.DS_Store
*.idea
node_modules*
static*
```

set ignore patterns for `eslint` and `prettier` like `.gitignore`

## Links

* [Contributing](CONTRIBUTING.md)
* [Change Log](CHANGELOG.md)
* [RoadMap](https://github.com/dtux-kangaroo/ko-script/wiki/Roadmap)
