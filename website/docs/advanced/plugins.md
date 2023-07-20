---
sidebar_position: 2
title: How to Write Plugins
---

Ko support use plugin to modify internal configs and behaviors.Here is an example:

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

As you can see, you can register your own ko plugin in via add plugins config in **ko.config.js**, and you should specify `key`, `action` and `opts` values:

* key: supported hook keys, only `WebpackPlugin` & `ModifyWebpack` are supported currently.
* action: supported actions, you can use `add` when add configs or use `update` when you want fully control current configs
* opts: all opts passed will use internally via `tapable`, supported types:

```typescript
export type HookItem = {
  name: string;
  fn: Function;
  stage?: number;
  before?: string;
};
```
