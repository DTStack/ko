---
sidebar_position: 2
title: Migration
---

ko is built on top of webpack so it's easy to migrate from webpack. 

:::caution
ko use webpack v5 internally, so if you use webpack v4 or earlier webpack version before, please refer to [webpack migrate](https://webpack.js.org/migrate/5)
:::

## remove duplicated loaders & plugins
There are some built-in webpack loaders & plugins in ko as shown below:
### loaders
* babel-loader
* css-loader
* esbuild-loader
* less-loader
* postcss-loader
* sass-loader
* thread-loader

### plugins
* @pmmmwh/react-refresh-webpack-plugin
* case-sensitive-paths-webpack-plugin
* clean-webpack-plugin
* css-minimizer-webpack-plugin
* html-webpack-plugin
* tsconfig-paths-webpack-plugin

You should remove them from your **package.json** if you have used them.

## create **ko.config.js**
**ko.config.js** let you customize your own configs, and all your customized configs will be merged into internal webpack instance.we recommend you override [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin),[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) if needed. you can get more details in [FAQ](/docs/FAQ)

## run commands as you'd like
You can run `pnpm ko -h` then you can find all ko commands, choose one you'd like and use it.

