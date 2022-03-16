---
sidebar_position: 4
title: FAQ
---

## How to override webpack configs
You can override webpack configs via **ko.config.js**, and we recommend you override [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin),[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) if needed. You can override like this:

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

## How to polyfill Node.js core modules:

Webpack 5 no longer polyfills Node.js core modules automatically which means if you use them in your code running in browsers or alike, you will have to install compatible modules from npm and include them yourself. And if your target environment is browser, just install some packages and add **resolve.fallback** into **ko.config.js**.

### Install browserify packages:
```bash
pnpm add os-browserify crypto-browserify stream-browserify
```

### Add configs into **ko.config.js**:

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
    },
  }
};
```

## How to use web workers

You can use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) without [worker-loader](https://github.com/webpack-contrib/worker-loader) in ko, just like this:
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
