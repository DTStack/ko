---
sidebar_position: 5
title: 常见问题
---

## 如何 polyfill Node.js 核心模块

Webpack 5 不再自动 polyfill Node.js 核心模块，这意味着如果您在浏览器或类似环境中使用它们，您必须从 npm 安装兼容的模块并引用它们。如果您的目标环境是浏览器，只需安装一些包并将 **resolve.fallback** 添加到 **ko.config.js** 中即可。
:::tip
从 v5.3.4 开始，ko 在内部 polyfill 这些核心模块，因此您不必再安装以下包并配置。
:::

```js
 {
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
 }
```


### 环境变量 process.env.node_env 

* 您可以使用环境变量在开发和生产构建之间自定义 ko.config.js 中的插件。
* ko dev vs build 将 process.env.node_env 注入为 developement 和 production


```js
 plugins: [
    new CopyWebpackPlugin(yourOwnCopyConfig),
    process.env.NODE_ENV === 'production' ? new VersionPlugin() : null
  ].filter(Boolean)

```
## 如何使用 Web Workers

:::caution
为了保证兼容性，我们在 ko 中内部使用了 `worker-loader`。因此，您可以在不更新导入 Worker 代码的情况下迁移到 ko。但是，建议使用以下示例中的方式使用 worker。
:::

您可以在 ko 中不引入 [worker-loader](https://github.com/webpack-contrib/worker-loader) 而使用 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)，就像这样：



```js
new Worker(new URL('./worker.js', import.meta.url));
```

您需要修改项目中 **tsconfig.json** 的如下配置:

```json
"compilerOptions": {         
  "module": "esnext",         
  "moduleResolution": "Node"   
} 
```
