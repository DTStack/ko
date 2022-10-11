# ko

## 5.3.11

### Patch Changes

- c2b27e77: fix: correct worker-loader include config

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
