---
sidebar_position: 4
title: FAQ
---

## 如何覆盖 webpack 配置
您可以通过 **ko.config.js** 覆盖 webpack 配置，如果需要，我们建议您覆盖 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 和 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)。您可以像这样覆盖：



``` js
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyConfig = [
  { from: path.resolve(__dirname, 'public/config'), to: 'config' },
  { from: path.resolve(__dirname, 'public/assets'), to: 'assets' },
]

module.exports = {
  ... //other webpack configs
  plugins: [
    new CopyWebpackPlugin(copyConfig),
  ],
};

```

## 如何 polyfill Node.js 核心模块：

Webpack 5 不再自动 polyfill Node.js 核心模块，这意味着如果您在浏览器或类似环境中使用它们，您将不得不从 npm 安装兼容的模块并自行包含它们。如果您的目标环境是浏览器，则只需安装一些包并将 **resolve.fallback** 添加到 **ko.config.js** 中。
:::tip
从 v5.3.4 开始，ko 在内部 polyfill 这些核心模块，因此您不必安装以下软件包并添加配置。
:::

### 安装 browserify 包：
```bash
pnpm add os-browserify crypto-browserify stream-browserify buffer string_decoder -D
```

### 将以下配置添加到 **ko.config.js** 中：


```js
module.exports = {
  ... //other webpack configs
   resolve: {
    fallback: {
      fs: false,
      path: false,
      events: false,
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      string_decoder: require.resolve('string_decoder/'),
    },
  }
};
```
### 环境变量 process.env.node_env 

* 在你的 ko.config.js 中，你可以使用环境变量来自定义开发和生产构建中的插件。
* ko dev 和 build 会注入 process.env.node_env 作为 development 和 production。


```js
 plugins: [
    new CopyWebpackPlugin(yourOwnCopyConfig),
    process.env.NODE_ENV === 'production' ? new VersionPlugin() : null
  ].filter(Boolean)

```
## 如何使用 Web Workers

:::caution
为了兼容性，我们在 ko 中内部使用 `work-loader`。因此，您可以迁移到 ko 而无需考虑更新导入 Worker 代码。但是，建议使用以下示例中的方式使用 worker。
:::

您可以在 ko 中不使用 [worker-loader](https://github.com/webpack-contrib/worker-loader) 使用 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)，就像这样：


```js
new Worker(new URL('./worker.js', import.meta.url));
```
And you should update your project **tsconfig.json** into these configs:
```json
"compilerOptions": {         
  "module": "esnext",         
  "moduleResolution": "Node"   
} 
```

## 为什么我的插件不起作用
您的一些插件可能太旧，无法适应 webpack(v5) 的最新版本，因此您应该将插件更新到最新版本。您的一些插件通常在项目中使用，例如：
* [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin#patterns)
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

并确保在迁移到 ko 时具有正确的插件配置。

## 为什么我的插件不起作用
您的一些插件可能太旧，无法适应 webpack(v5) 的最新版本，因此您应该将插件更新到最新版本。您的一些插件通常在项目中使用，例如：
* [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin#patterns)
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

并确保在迁移到 ko 时具有正确的插件配置。

