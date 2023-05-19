---
sidebar_position: 2
title: 如何编写插件
---

Ko 支持使用插件来修改内部配置和行为。以下是一个示例：

```js
const VersionWebpackPlugin = require('./version-webpack-plugin');
module.exports = {
  plugins: [
    {
      key: 'WebpackPlugin',
      action: 'add',
      opts: {
        name: 'VersionWebpackPlugin',
        fn: () => new VersionWebpackPlugin(),
      },
    },
  ],
}
``` 

如您所见，您可以通过在 **ko.config.js** 中添加插件配置来注册自己的 ko 插件，并且您需要指定 `key`、`action` 和 `opts` 值：

* key：钩子主键，目前仅支持 `WebpackPlugin` 和 `ModifyWebpack`。
* action：支持的操作，当您添加配置时，可以使用 `add`，当您想要完全控制当前配置时，可以使用 `update`。
* opts：所有传递的 opts 将通过 `tapable` 在内部使用，支持的类型：

```typescript
export type HookItem = {
  name: string;
  fn: Function;
  stage?: number;
  before?: string;
};
```
