A webpack plugin for dynamic resolve paths, you can use it to resolve paths dynamically.

## Getting Started
1. Install as devDependencies:
``` bash
pnpm install dynamic-resolve-webpack-plugin -D
```

2. custom dynamic resolve function:
```js
const targetDir = path.resolve('./custom-icon');
const baseDir = require
  .resolve('@ant-design/icons-svg')
  .replace(/lib\/index\.js/, 'es/asn/');
const scopeList = list.map((file) => path.join(baseDir, file));

function dynamic(request) {
  const innerPath = request.request || request.path;
  if (scopeList.includes(innerPath)) {
    request.path = path.join(targetDir, innerPath.split(baseDir)[1]);
    return request;
  }
  return request;
}

```
3. then add it to webpack resolve plugin config:

```js
config.resolve.plugins.push(
      new DynamicResolvePlugin({
        dynamic,
      })
    );
```
**Ensure This Plugin is used in [webpack resolve plugins](https://webpack.js.org/configuration/resolve/#resolveplugins)**

## Options

```ts
type IOptions = {
  source: string; // enhanced-resolve register hook, default value is `file`
  target: string; // next hooks to call, default value is `final-file`
  dynamic: <T>(request: T) => T; //dynamic function, you can do whatever you want with callback parameter request, and you should return it back after modified.
};
```