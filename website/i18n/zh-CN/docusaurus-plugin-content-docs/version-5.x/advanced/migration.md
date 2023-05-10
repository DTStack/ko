---
sidebar_position: 2
title: 迁移
---

ko是基于webpack构建的，因此从webpack迁移很容易。

:::caution
ko在内部使用webpack v5，因此如果您使用的是webpack v4或更早的版本，请参考[webpack迁移](https://webpack.js.org/migrate/5)
:::

## 删除重复的loader和plugin
ko中有一些内置的webpack loader和plugin，如下所示：
### Loaders
* babel-loader和babel依赖项
* css-loader
* esbuild-loader
* less-loader及其依赖项
* postcss-loader
* sass-loader及其依赖项
* thread-loader
* worker-loader


### plugins
* @pmmmwh/react-refresh-webpack-plugin
* case-sensitive-paths-webpack-plugin
* css-minimizer-webpack-plugin
* tsconfig-paths-webpack-plugin

你应该从你的 **package.json** 中删除它们。

## 创建 **ko.config.js**
**ko.config.js** 允许您自定义自己的配置，并且所有自定义的配置都将合并到内部的webpack实例中。如果需要，我们建议您覆盖 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 和 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)。您可以在 [FAQ](/docs/5.x/FAQ) 中获取更多详细信息。

## 按您的意愿运行命令
您可以运行 `pnpm ko -h`，然后您可以找到所有的ko命令，选择一个您喜欢的并使用它。



