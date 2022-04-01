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
:::tip
From v5.3.4, ko polyfill these core modules internally, so you don't have to install below packages and add configs.
:::

### Install browserify packages:
```bash
pnpm add os-browserify crypto-browserify stream-browserify buffer string_decoder -D
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
      buffer: require.resolve('buffer/'),
      string_decoder: require.resolve('string_decoder/'),
    },
  }
};
```
### Inject version-webpack-plugin for production environment

```js
 plugins: [
    new CopyWebpackPlugin(yourOwnCopyConfig),
    process.env.NODE_ENV === 'production' ? new VersionPlugin() : null
  ].filter(Boolean)

```
## How to use web workers

:::caution
For compatible reason we use `work-loader` internally. So you can migrate into ko without considering update your import Worker code.But using worker like below examples is recommended.
:::

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

## Why my devSever config not working
:::caution
**webpack-dev-server** has some troubles in ko, we downgrade **webpack-dev-server** temporarily to v3 in ko v5.3.4
:::

ko use **webpack-dev-server** v4 internally. So if you find out that your old **devServer** configs not working,please refer to [webpack-dev-server migration v4](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md) and update your **devServer** configs.

## Why my plugin not working
some of your plugins may be too old to suit latest version of webpack(v5), so you should update your plugins to the latest version.Some of plugins are normally been used in your projects, like: 
* [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin#patterns)
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

And make sure you have the right configs of your plugins when you migrate into ko.