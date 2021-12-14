# ko

依托于`webpack`,`babel`等的工具类集合

<a href="https://www.npmjs.com/package/lerna"><img alt="NPM Status" src="https://img.shields.io/npm/v/ko.svg?style=flat"></a>

[EngLish](README.md) | 中文文档

## 快速开始

全局安装:

``` bash
npm install ko -g
yarn global add ko
```

本地安装:

``` bash
npm install ko -D
yarn add ko -D
```

## 命令

* [ko build](#ko-build)
* [ko dev](#ko-dev)
* [ko prettier](#ko-prettier-ko-pr-patterns)
* [ko eslint](#ko-eslint-patterns)

### ko build

内部使用webpack打包，可选配置项为:

* `--hash`: 打包文件名添加hash
* `-t,--ts,--typescript`: `typescript`支持
* `-e,--esbuild`: **实验性**`esbuild`支持，目前只使用了esbuild压缩相关功能

### ko dev

启用webpack DevServer, 可选配置项为:

* `-p, --port <port>`: 配置端口号
* `--host <host>`: 配置host
* `-t, --ts`: `typescript`支持
* `-a,--analyzer`: 使用`webpack-bundle-analyzer`进行打包结果分析

### ko prettier (ko pr) [[patterns]](https://github.com/mrmlnc/fast-glob)

使用`prettier`格式化代码，可选配置项为:

* `-w, --write`: 开启自动修复
* `-c, --config <configPath>`: `prettier`自定义配置路径
* `--ignore-path <ignorePath>`: `prettier`需要忽略的文件配置路径，默认为`.koignore`

### ko eslint [[patterns]](https://github.com/mrmlnc/fast-glob)

使用`stylelint`格式化代码，可选配置项为:

* `-f, --fix`: 开启自动修复
* `-c, --config <path>`: `eslint`自定义配置路径
* `--ignore-path <ignorePath>`: `stylelint`需要忽略的文件配置路径，默认为`.koignore`

使用`stylelint`格式化代码，可选配置项为:

* `-f, --fix`: 开启自动修复
* `-c, --config <path>`: `stylelint`自定义配置路径
* `--ignore-path <ignorePath>`: `stylelint`需要忽略的文件配置路径，默认为`.koignore`

## 配置文件

### ko.config.js

可使用`ko.config.js`对`ko build`和`ko dev`进行自定义配置，配置项及其可选配置和webpack5官方文档保持一致，内部会使用`webpack-merge`将自定义配置项合并到最终的配置结果中。如下所示:

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

### .koignore

`ko lints`相关的需要忽略的文件配置项，格式与`.gitignore`保持一致，如下所示:

``` plain text
*.DS_Store
*.idea
node_modules*
static*
```

## 链接

* [Contributing](CONTRIBUTING.md)
* [Change Log](CHANGELOG.md)
* [RoadMap](https://github.com/dtux-kangaroo/ko-script/wiki/Roadmap)
