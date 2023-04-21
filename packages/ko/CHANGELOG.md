# ko

## 6.5.2

### Patch Changes

- 723774e0e: optimize devServer complation log and add dev log config
- 8006d5d49: add port select when port used
- 14e59d909: add --max_old_space_size
- 2640cddf5: remove antd4Options when antd upgrade to 4+

## 6.5.1

### Patch Changes

- b23e6cbb: devserver added historyApiFallback configuration to resolve resource path 404 issues

## 6.5.0

### Minor Changes

- 78b5730e: support clear console.log and bug fixed

### Patch Changes

- 1cbef1df: support clear console.log

## 6.4.1

### Patch Changes

- 56e09f1d: correct worker-loader include config

## 6.4.0

### Minor Changes

- 3d2f19ae: new options & bugs fixed
  - support new option: `logLevel`
  - support new plugin key: `ModifyWebpack`
  - change MiniCssExtractPluginLoader to style-loader in development mode
  - fix bugs: #108, #109

## 6.3.4

### Patch Changes

- fba9a04c: support new option
  - auto-polyfills-webpack-plugin: support longTermCache option to decide whether or not to store cache polyfills.
- Updated dependencies [fba9a04c]
  - auto-polyfills-webpack-plugin@1.1.0

## 6.3.3

### Patch Changes

- 55aa11c9: fix bug
  - auto polyfills webpack plugin can't read browserslist correctly
- Updated dependencies [55aa11c9]
  - auto-polyfills-webpack-plugin@1.0.2

## 6.3.2

### Patch Changes

- 51287d44: update plugin dependencies

  - fixed bugs of can't send correct options to core-js-builder

## 6.3.1

### Patch Changes

- 641dc7aa: update ko dependency version

## 6.3.0

### Minor Changes

- 403d780e: release auto-polyfills-webpack-plugin, and support it in ko

  1. release auto-polyfills-webpack-plugin, find more in it's README
  2. add auto-polyfills-webpack-plugin & dynamic-resolve-webpack-plugin into ko, and support change these plugins via config options:

  ```js
    export type IOptions = {
      dynamicResolve?: <T extends any>(request: T) => T;
      autoPolyfills: boolean | AutoPolyfillsWebpackPluginOptions;
    }
  ```

- Updated dependencies [403d780e]
  - auto-polyfills-webpack-plugin@1.0.1

## 6.2.0

### Minor Changes

- c77237f1: support new config

  1. support disableLazyImports config when using fast refresh

## 6.1.4

### Patch Changes

- fix bugs in production mode

  1. minimizer bug when in production mode
  2. include ico assets when build

## 6.1.3

### Patch Changes

- ko-lints@4.0.0

## 6.1.2

### Patch Changes

- ff1560a2: exit with error when lint throw errors

  - exit with `process.exit(1)` when stdout length is not zero
  - use variadic arguments in patterns

## 6.1.1

### Patch Changes

- 62572f85: update dependence of ko-lints

## 6.1.0

### Minor Changes

- 1721dfa0: Support Lints & Format with concurrency mode, Add Config & Plugin of Prettier in Eslint

  - `ko-lint-config`:

    Add Config & Plugin of Prettier in Eslint Config

  - `ko-lints`:

    - Support concurrency mode with multithreading to do lint or format tasks,you can enable concurrency mode via `--concurrency` cli flag
    - Default threads Count is `require('os').cpus().length`, you can specify it via `--concurrentNumber` like `--concurrentNumber=4`

  - `ko`:
    - Support `ko prettier`,`ko eslint`,`ko stylelint` commands with concurrency mode, you can also specify this mode with `ko.config.js`

### Patch Changes

- Updated dependencies [1721dfa0]
  - ko-lints@4.0.0

## 6.0.1

### Patch Changes

- ko-lints@3.0.0

## 6.0.0

### Major Changes

- 84adca00: publish ko v6.0 and it's related packages

### Patch Changes

- Updated dependencies [84adca00]
  - ko-lints@2.0.0

## 5.3.10

### Patch Changes

- 70576b9c: Bug Fixed
  - fix: antd v4 less loader path

## 5.3.9

### Patch Changes

- 35faeb91: fix less-loader config issue when in symlink

## 5.3.8

### Patch Changes

- update less exclude config
- exclude test files when build

## 5.3.7

### Patch Changes

- fd136e36: Optimizations
  - feat: update build action optimization
  - fix: update work-loader's path to resolve path

## 5.3.6

### Patch Changes

- ## 4f4516bb: Optimization:
  - fix: chunks can be shared even between async and no-async chunks
  - fix: fix dt-common path scope bug
  - docs: update FAQ.md

## 5.3.5

### Patch Changes

- 1ed9e367: Optimization:
  - support hash parameter for fix potential conflict filename
  - update devServer default config to prevent GC

## 5.3.4

### Patch Changes

- cb5abf09: \* Downgrade webpack-dev-server to v3
- Support fallback internally

## 5.3.3

### Patch Changes

- 1e760adc: Fix Bug #87, change cache to "memory" when environment is development
- e268fcb1: bugs fixed

## 5.3.2

### Patch Changes

- Bugs fixed

  - fix set wrong **mode** when run `ko build` bug
  - fix port change not effect devSever config bug

## 5.3.1

- support work-loader internally
- update webpack-dev-server default config to disable full-screen overlay in the browser
- optimize docs

## 5.3.0

- change ts-loader to babel-loader because babel-loader is faster than ts-loader when build [#76](https://github.com/DTStack/ko/issues/76)
- support React Fast Refresh [#77](https://github.com/DTStack/ko/issues/77)
- migrate webapack-dev-server from v3 to v4 [#78](https://github.com/DTStack/ko/issues/78)

## 5.2.1

- fixed [Throw an error when running "ko init"](https://github.com/DTStack/ko/issues/27)
- check node version when install because [webpack 5 requires at least Node.js 10.13.0 (LTS)](https://webpack.js.org/migrate/5/#preparations)

## 5.2.0

- upgrade dependencies except less because [Ant Design use 3.x version of less](https://github.com/vueComponent/ant-design-vue/issues/3665)
- remove file-loader, change to [asset-modules](https://webpack.js.org/guides/asset-modules/)
- fixed [react-dev-utils warning](https://github.com/facebook/create-react-app/issues/9880)
- update `ko-babel-app` to version 8.0.17

## 5.0.5

- remove prettier parse config to fixed prettier format bug
- support react lint for eslint

## 5.0.4

- repository structure:

  - config directory: webpack config files has been move to webpack subdirectory
  - util directory: remove useless and duplicated utility functions

- lint:

  - add prettier & eslint dependencies
  - eslint support default & user defined config, and eslintignore config
  - prettier support default & user defined config, and prettierignore config

- plugins have be removed in this release:

  - `webpack.BannerPlugin`'s banner now has static banner content, maybe it's will be readded in the future with user defined banner content
  - `webpack.DllPlugin` has been removed from CRA & vue-cli because [Webpack 4 should provide good enough perf and the cost of maintaining DLL mode inside Vue CLI is no longer justified](https://github.com/vuejs/vue-cli/issues/1205) & webpack 5 use [HardSourceWebpackPlugin](https://www.cnblogs.com/skychx/p/webpack-dllplugin.html) to optimize
  - `happypack`'s maintainer sugguest users to use [thread-loader](https://github.com/webpack-contrib/thread-loader) instead
  - `copy-webpack-plugin` has been used when dll is support, it will be removed when release new verison

- dependencies will be removed in next release:

  - `camelcase` removed because attachToEnv function has been removed

  - `decamelize` removed because attachToEnv function has been removed

## 5.0.0

Migrate webpack to v5, and remove or update webpack plugins & loaders.

### Upgrade

    assets-webpack-plugin ^3.9.10 → ^7.0.0
    autoprefixer ^9.7.3 → ^10.1.0
    babel-loader ^8.0.6 → ^8.2.2
    camelcase ^5.3.1 → ^6.2.0
    case-sensitive-paths-webpack-plugin ^2.2.0 → ^2.3.0
    clean-webpack-plugin 1.0.0 → 3.0.0
    commander ^4.1.0 → ^6.2.1
    compressing ^1.5.0 → ^1.5.1
    copy-webpack-plugin ^5.1.1 → ^7.0.0
    css-loader ^3.4.1 → ^5.0.1
    decamelize ^3.2.0 → ^4.0.0
    file-loader ^5.0.2 → ^6.2.0
    fork-ts-checker-webpack-plugin ^3.1.1 → ^6.0.7
    html-webpack-plugin ^3.2.0 → ^4.5.0
    inquirer ^7.0.3 → ^7.3.3
    less ^3.10.3 → ^3.13.0
    less-loader ^5.0.0 → ^7.1.0
    lodash ^4.17.15 → ^4.17.20
    mini-css-extract-plugin ^0.9.0 → ^1.3.3
    mustache ^3.2.1 → ^4.1.0
    ora ^4.0.3 → ^5.1.0
    postcss-loader ^3.0.0 → ^4.1.0
    react-dev-utils ^9.0.3 → ^11.0.1
    sass-loader ^8.0.0 → ^10.1.0
    shelljs ^0.8.3 → ^0.8.4
    style-loader ^1.1.2 → ^2.0.0
    ts-loader ^6.2.1 → ^8.0.12
    tsconfig-paths-webpack-plugin ^3.2.0 → ^3.3.0
    typescript ^3.7.4 → ^4.1.3
    url-loader ^3.0.0 → ^4.1.1
    urllib ^2.34.2 → ^2.36.1
    vue-loader ^15.8.3 → ^15.9.5
    vue-template-compiler ^2.6.11 → ^2.6.12
    webpack ^4.41.5 → ^4.44.2
    webpack-bundle-analyzer ^3.6.0 → ^4.2.0
    webpack-cli ^3.3.10 → ^4.2.0
    webpack-dev-server ^3.10.1 → ^3.11.0
    webpack-merge ^4.2.2 → ^5.7.0

### Remove

| PackageName                    | Reason     |
| ------------------------------ | ---------- |
| awesome-typescript-loader      | Not Use    |
| babel-plugin-import            | Not Use    |
| friendly-errors-webpack-plugin | Not Use    |
| moment                         | deprecated |
| request                        | deprecated |
| request-progress               | deprecated |
| request-promise                | deprecated |

### Replace

| PackageName                        | Replace To                   |
| ---------------------------------- | ---------------------------- |
| optimize-css-assets-webpack-plugin | css-minimizer-webpack-plugin |
| node-sass                          | sass                         |
