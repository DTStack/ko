#### 发布周期
- 修订版本号：修订特定的问题而发布的修订版本。
- 次版本号：带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

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

本次版本升级了webpack至5.x版本，并对相关的plugins和loaders进行了对应的升级或替换，删除了一些不必要的依赖以减小包的体积，具体内容如下

### 升级

 assets-webpack-plugin                 ^3.9.10  →    ^7.0.0     
 autoprefixer                           ^9.7.3  →   ^10.1.0     
 babel-loader                           ^8.0.6  →    ^8.2.2     
 camelcase                              ^5.3.1  →    ^6.2.0     
 case-sensitive-paths-webpack-plugin    ^2.2.0  →    ^2.3.0     
 clean-webpack-plugin                    1.0.0  →     3.0.0     
 commander                              ^4.1.0  →    ^6.2.1     
 compressing                            ^1.5.0  →    ^1.5.1     
 copy-webpack-plugin                    ^5.1.1  →    ^7.0.0     
 css-loader                             ^3.4.1  →    ^5.0.1     
 decamelize                             ^3.2.0  →    ^4.0.0     
 file-loader                            ^5.0.2  →    ^6.2.0     
 fork-ts-checker-webpack-plugin         ^3.1.1  →    ^6.0.7     
 html-webpack-plugin                    ^3.2.0  →    ^4.5.0     
 inquirer                               ^7.0.3  →    ^7.3.3     
 less                                  ^3.10.3  →   ^3.13.0     
 less-loader                            ^5.0.0  →    ^7.1.0     
 lodash                               ^4.17.15  →  ^4.17.20     
 mini-css-extract-plugin                ^0.9.0  →    ^1.3.3     
 mustache                               ^3.2.1  →    ^4.1.0     
 ora                                    ^4.0.3  →    ^5.1.0     
 postcss-loader                         ^3.0.0  →    ^4.1.0     
 react-dev-utils                        ^9.0.3  →   ^11.0.1     
 sass-loader                            ^8.0.0  →   ^10.1.0     
 shelljs                                ^0.8.3  →    ^0.8.4     
 style-loader                           ^1.1.2  →    ^2.0.0     
 ts-loader                              ^6.2.1  →   ^8.0.12     
 tsconfig-paths-webpack-plugin          ^3.2.0  →    ^3.3.0     
 typescript                             ^3.7.4  →    ^4.1.3     
 url-loader                             ^3.0.0  →    ^4.1.1     
 urllib                                ^2.34.2  →   ^2.36.1     
 vue-loader                            ^15.8.3  →   ^15.9.5     
 vue-template-compiler                 ^2.6.11  →   ^2.6.12     
 webpack                               ^4.41.5  →   ^4.44.2     
 webpack-bundle-analyzer                ^3.6.0  →    ^4.2.0     
 webpack-cli                           ^3.3.10  →    ^4.2.0     
 webpack-dev-server                    ^3.10.1  →   ^3.11.0     
 webpack-merge                          ^4.2.2  →    ^5.7.0   

### 删除

| 包名称  | 删除原因  |
|---|---|
| awesome-typescript-loader  |  无引用 |
|  babel-plugin-import | 无引用  |
|  friendly-errors-webpack-plugin |  无引用 |
| moment  | deprecated,只有一处用到,改为Date方式实现  |
|  request |  deprecated,改为其他方式实现 |
| request-progress  | deprecated,改为其他方式实现  |
|  request-promise | deprecated,改为其他方式实现  |

### 替换

| 包名称  | 替换  | 替换原因 |
|---|---|---|
|  optimize-css-assets-webpack-plugin |  css-minimizer-webpack-plugin | 官方建议 |
|  node-sass  | sass  | 官方建议 |

### 新增功能

### dll相关配置修改，现在在dev和build阶段dll为默认不引入， 增添了--enable-dll相关可选项，可以通过该选项开启dll支持

### html-webpack-plugin现在只支持生成单一html，后续考虑添加多出口文件

#### lint支持，支持eslint和prettier结合来进行相应的代码格式化,

#### microfrontends相关配置支持，可以通过-m, --micro相关可选项开启支持

