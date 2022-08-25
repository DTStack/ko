A webpack plugin for auto import polyfills using core-js custom build, you can combine it with esbuild-loader because esbuild-loader don't do auto polyfills

## Getting Started
1. Install as devDependencies:
``` bash
pnpm install auto-polyfills-webpack-plugin -D
```

2. then add it into webpack plugins config:

```js
config.plugins.push(
      new AutoPolyfillsWebpackPlugin();
    );
```

and a minified file will be generated in project root (or custom with option cwd), then you should commit it for reused.

## Options

```ts
type IOpts = {
    cwd?: string; // cwd, default value is `process.cwd()`
    browserslistPath?: string; // default value is .browserslistrc in root directory
    hashType?: string; // crypto type, default value is md5
    customPrefix?: string; //custom polyfill prefix, default value is 'dt'
    excludeCoreJsModules?: string[]; //exclude core-js modules.
};
```