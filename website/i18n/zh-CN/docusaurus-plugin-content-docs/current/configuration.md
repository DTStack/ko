---
sidebar_position: 4
title: 配置
---

你可以通过 **ko.config.js** 自定义 ko 的配置，以下是支持的配置项：

``` typescript
export type IOptions = {
  // 通用配置
  cwd: string; // 当前工作目录
  alias?: Record<string, string>; // 创建别名以更轻松地导入或引入某些模块
  copy?: Pattern[]; // 使用拷贝文件模式
  entry?: string; // 入口文件路径
  outputPath?: string; // 输出目录的绝对路径
  publicPath?: string; // 指定应用程序中所有资源文件的目录
  hash?: boolean; // 使用内容哈希输出文件
  externals?: Record<string, string>; // 从输出的Bundle中需要排除的依赖
  plugins?: any[]; // ko 内部插件，您可以定义自己的 ko 插件。
  htmlTemplate?: string; // 输出 HTML 文件模板
  htmlChunks?: 'all' | string[]; // 添加到 HTML 中的 chunk
  // 样式配置
  analyzer?: boolean; // 显示带有可缩放的交互式树状图的输出文件
  extraPostCSSPlugins?: Plugin[]; // 额外的 postcss 插件
  lessOptions?: any; // 自定义 less 选项
  // 集成插件选项
  dynamicResolve?: <T extends any>(request: T) => T; // 动态解析函数
  autoPolyfills: boolean | AutoPolyfillsWebpackPluginOptions; // 自动 polyfills 插件选项
  // 开发配置
  serve: {
    proxy?: Record<string, any>; // 开发服务器的代理配置
    host: string; // 开发服务器的主机名
    port: number; // 开发服务器的端口
    staticPath?: string; // 监视的资源路径
    client?: boolean | ClientConfiguration | undefined; // 日志、错误捕获等配置项
    compilationSuccessInfo?: { messages: string[]; notes?: string[] }; // 成功编译后的日志，与 friendly-errors-webpack-plugin 相同
    // 其他所有 webpack-dev-server 支持的配置项
  };
  // 实验性功能
  experiment?: {
    speedUp?: boolean; // 启用 dev 和 build 时的加速选项
    minimizer?: boolean; // 在 build 时中通过 esbuild 启用压缩处理器
    enableCssModule?: boolean; // 启用 css 模块化
    disableLazyImports?: boolean; // 是否禁用导入懒编译
  };
   lints?: Record<IKeys, Omit<IOpts, 'write'>>; // lint 配置
};
