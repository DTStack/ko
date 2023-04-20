---
sidebar_position: 2
title: 入门指南
---

## 环境要求

* Node.js 版本: Node.js 14+

## 安装 ko

你可以使用 npm、yarn 或 pnpm 来安装 ko：

``` bash
pnpm add ko --save-dev
# 或者
npm install ko --save-dev
# 或者
yarn add ko --dev
```

IE 浏览器需要使用 polyfills。我们推荐使用 [core-js](https://github.com/zloirock/core-js) 和 [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)。你需要将它们安装为依赖项：

``` bash
pnpm add core-js regenerator-runtime
```

## 配置

安装 ko 后，你可以创建一个名为 **ko.config.js** 的配置文件来自定义 ko。你可以指定自己的 **entry** 和 **output** 配置。更多配置信息请参见 [配置](./configuration)。ko 将帮助你合并这些配置并在内部 webpack 实例中使用它们。以下是一个真实的案例：

``` js
module.exports = {
  entry: './src/app.tsx',
  outputPath: './dist' // 你自己的输出路径
  serve: {
    proxy: PROXY_CONFIG, // 你自己的代理配置
    host: '0.0.0.0',
    port: 8084,
  },
};
