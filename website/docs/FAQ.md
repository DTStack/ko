---
sidebar_position: 5
title: FAQ
---

## How to polyfill Node.js core modules

Webpack 5 no longer polyfills Node.js core modules automatically which means if you use them in your code running in browsers or alike, you will have to install compatible modules from npm and include them yourself. And if your target environment is browser, just install some packages and add **resolve.fallback** into **ko.config.js**.
:::tip
From v5.3.4, ko polyfill these core modules internally, so you don't have to install below packages and add configs.
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

### Environment variables process.env.node_env 

* To custom plugins in your ko.config.js between development and production builds you may use environment variables.
* ko dev vs build inject process.env.node_env as developement and production

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
