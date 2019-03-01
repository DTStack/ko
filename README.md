### 说明
 ```text

  1.已封装包 webpack4 ,webpack-cli,webpack-dev-server, scss, babel ,babel-plugin-xxx,copy,less,scss,autoprefixer,
  
  postcss-loader,vue-loader,clean-webpack-plugin,html-webpack-plugin,ts 等；

  2.为提高编译效率，采用 webpack.DllPlugin 进行编译， 并以项目dependencies依赖项分组打包，默认以3个业务包为一组进行划分

   ko dll -s number //可以更改分组个数，以避免编译包过大,也可自定义打包moudles
  
  3.可以分别打包react和vue项目，并可以自定义webpack配置信息（使用请详细阅读本文档），支持react typescript

  4.antd 相关框架组件(react,vue,pc,mobile) 默认按需动态引入，无需在项目中再配置，样式文件或主题通过less文件全局引入

  [示例](https://ant.design/docs/react/customize-theme-cn)

 ```
 * devDependencies 里的 ko-script 依赖版本号为 2.1.0 及以上及项目目录

```
project
├── public                 // 公共资源文件(第三方资源库，项目模板文件，全局配置文件config)
├── src
│     ├── components       // 公共组件
│     ├── layouts          // 通用布局
│     ├── pages            // 页面
│     └── index.js/index.tsx         // 入口文件
├── dll                  // 构建后的动态链接库文件
├── dist                  // 构建后的前端静态资源
│     ├── index.html
│     ├── css
│     └── js
├── ko.config.js          // 自定义配置文件
├── package.json           // package.json
└── README.md              // 项目说明
```
### 要求
 ```text
  1.引入es6新实例方法 如 string.includes('xx'),需在项目入口文件加入垫片 如下方式：

   import "@babel/polyfill"`

  2.入口文件尽量不要加入业务包，dll会自行打包优化；另外 dependencies 依赖项必须是项目编译后需要依赖的包(自定义module除外)

  并且包中不可引用 node API(若引入请放在 devpendencies )，其他包放入 devpendencies 中;

    entry: {
          index:'src/index'
    }

  3.用户自定义配置路径，尽量写绝对路径 如：

    {
      resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@public': path.resolve(__dirname, 'src/public')
            }
        }
    }
 ```

### 基础使用

 * 安装 
 ```text

  npm install -g ko-script 或者 yarn add ko-script --dev

 ```

 * ko 项目默认使用 ko-script 作为开发工具，ko-script提供了丰富的功能帮助我们提高开发效率并兼容 [vue] 和 [react];
  
 ```text
  1. ko init  初始项目模版文件 如:[create-react-app]

  2. ko dll   生成动态连接库

  3. ko dev   启动本地开发环境

  4. ko build 编译项目到生产环境

  5. ko preview 预览编译后项目静态文件

  6. ko move  默认移动文件(可配置)

  7. ko swagger 生成swagger接口js文件,用户自定义请放在restful.js

  8. ko [xx] -h 查看相关命令参数
 ```

### 定制构建器

ko项目使用了 `webpack，DllPlugin` `happypack` 作为构建的基石，并且提供了零配置的构建配置，但是如果你对 `webpack` 配置有特别的需求，可以参考本文对默认配置进行定制。

### 如何配置

ko项目支持在项目根目录创建 `ko.config.js` 文件对 `webpack` 项目进行定制和覆盖，`ko.config.js` 文件需要导出一个 `userConf` 对象，其支持的参数可以参考 `webpack` [官方文档](https://webpack.js.org/concepts/output/)。

`ko.config.js` 文件采用您操作系统中安装的 Node.js 所支持的语法，所以您可以使用除了 `import`, `export` 等之外的几乎所有 ES6 语法。

```js

module.exports =()=> {
  // userConf
};

```

### 配置举例

```js

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (context) => {
  const { webpack } = context;
  return {
     //修改开发环境端口及主机
     "dll":["react"],// 自定义打包modules
    "server": {
      "host": "127.0.0.1",
      "port": 3002
    },
    //修改接口代理地址
    "proxy": [{
      "context": ["/auth", "/api"],
      "target": "http://localhost:3000"
    }],
    //配置移动文件路径
    move: {
      "from": "/Users/charlesyang/space/workspace/team/kangaroo-resource/react-resource/scaffolds/ko-react-sample/dist",
      "to": "/Users/charlesyang/space/workspace/team/kangaroo-resource/gh-pages/ko-react-sample"
    },
    //用户自定义webpack配置
    webpack: {
      entry: {
          index:'',
          index_2:''
      },
      output: {},
      module: {
        rules: []
      },
      plugins: [
        new webpack.DefinePlugin({
          ASSETS_VERSION: '0.0.1',
        }),
        new CopyWebpackPlugin([{
          from: path.resolve('dll'),
          to: path.resolve('test')
        }])
      ],
      resolve: {}
    }
  };
};

```
### 全局配置使用

* 在当前项目 public 目录新建config目录，并分别新建文件conf.dev.js(代表开发环境)， conf.prod.js(生产环境配置)

* conf 代码示例如下：
``` js

var FRONT_CONF = {
   LOGO: '/img/logo.png', // 项目logo
  COPY_RIGHT: (new Date()).getFullYear() + ' 杭州玳数科技有限公司 浙ICP备15044486号-1',
}

```
### 参考项目示例 

 * 基于react，react-router，bizchart，等简单脚手架 [pc-react-sample](https://github.com/dtux-kangaroo/pc-react-sample.git)

### 待更新
* vue jsx 支持
* vue typescript 支持



