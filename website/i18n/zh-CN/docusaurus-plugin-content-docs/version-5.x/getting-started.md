---
sidebar_position: 2
title: 入门指南
---

## 先决条件

* Node.js 版本: Node.js 10.13.0 +

## 安装 ko

您可以使用 npm、yarn 或 pnpm 安装 ko：
``` bash
pnpm add ko --save-dev
# 或者
npm install ko --save-dev
# 或者
yarn add ko --dev
```
IE 浏览器需要使用 polyfills。我们推荐使用 [core-js](https://github.com/zloirock/core-js) 和 [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)。您应该将它们安装为依赖项：
``` bash
pnpm add core-js regenerator-runtime
```

## 配置

安装 ko 后，您可以创建一个名为 **ko.config.js** 的配置文件来自定义 ko。您可以指定自己的 **entry** 和 **output** 配置，使用与 webpack 配置相同的插件和加载器，ko 将帮助您合并这些配置并在内部 webpack 实例中使用它们。一个真实的案例：
``` js
module.exports = {
  entry: './src/app.tsx',
  output: {
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin(yourOwnCopyConfig),
  ],
  devServer: {
    proxy: PROXY_CONFIG, // 您自己的代理配置
    host: '0.0.0.0',
    port: 8084,
  },
};
```

## 日常命令

您的日常工作流只需要几个ko命令：

### ko dev
启动提供实时重新加载的开发服务器。 您可以通过**devServer**配置更改开发服务器的默认行为。

### ko build
使用内部webpack实例捆绑文件，使用一些内置的加载器和插件可以加速构建过程。


