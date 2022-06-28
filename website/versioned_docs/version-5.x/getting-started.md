---
sidebar_position: 2
title: Getting Started
---

## Prerequisites

* Node.js version: Node.js 10.13.0 +

## Install ko

You can install ko using npm, yarn or pnpm:
``` bash
pnpm add ko --save-dev
# or
npm install ko --save-dev
# or
yarn add ko --dev
```
Polyfills are needed for IE browsers. We recommended [core-js](https://github.com/zloirock/core-js) and [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) for it. And you should install them as dependencies:
``` bash
pnpm add core-js regenerator-runtime
```

## Configuration

After install ko,you can create an configuration file named **ko.config.js** for customize ko. And you can specify your own **entry** and **output** configurations, use plugins and loaders as same in webpack configurations, ko will help you merge these configs and use them in internal webpack instance. A real world showcase:
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
    proxy: PROXY_CONFIG, // Your own proxy config
    host: '0.0.0.0',
    port: 8084,
  },
};
```

## Everyday Commands

Your daily workflow only needs a few ko commands:

### ko dev
start a development server that provides live reloading. You can change development server default behaviors via **devServer** configurations.

### ko build
bundle files with internal webpack instance, with some built-in loaders and plugins that can speed up build process.


