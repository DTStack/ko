

## 基础使用
 kangaroo项目默认使用 ko-script 作为开发工具，ko-script提供了丰富的功能帮助我们提高开发效率：

 ```text
  1. ko dll   生成动态连接库
  2. ko dev   启动本地开发环境
  3. ko build 编译项目到生产环境
  4. ko preview 预览编译后项目静态文件
  5. ko move  默认移动文件到gh-pages
 ```

## 定制构建器

kangaroo的[工程](https:///ko-script)使用了 `webpack` 作为构建的基石，并且提供了零配置的构建配置，但是如果你对 `webpack` 配置有特别的需求，可以参考本文对默认配置进行定制。

## 要求

* devDependencies 里的 ko-script 依赖版本号为 1.2.0 及以上及项目目录
```
project
├── src
│     ├── components       // 公共组件
│     ├── layouts          // 通用布局
│     ├── pages            // 页面
│     └── index.js         // 入口文件
├── dll                  // 构建后的动态链接库文件
├── dist                  // 构建后的前端静态资源
│     ├── index.html
│     ├── css
│     └── js
├── ko.config.js          // 自定义 webpack 配置
├── package.json           // package.json
└── README.md              // 项目说明
```

## 如何配置

KO 项目支持在项目根目录创建 `ko.config.js` 文件对 `webpack` 项目进行定制和覆盖，`ko-config.js` 文件需要导出一个 `userConf` 对象，其支持的参数可以参考 `webpack` [官方文档](https://webpack.js.org/concepts/output/)。

`ko-config.js` 文件采用您操作系统中安装的 Node.js 所支持的语法，所以您可以使用除了 `import`, `export` 等之外的几乎所有 ES6 语法。

```js
module.exports =()=> {
  // userConf
};
```

## 配置举例

```js

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (context) => {
  const { webpack } = context;
  return {
     //修改开发环境端口及主机
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


