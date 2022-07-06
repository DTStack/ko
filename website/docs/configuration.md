---
sidebar_position: 4
title: Configuration
---

You can custom ko's action via **ko.config.js**, below are supported configurations:

``` typescript
export type IOptions = {
  //common configs
  cwd: string; //current working directory
  alias?: Record<string, string>; // Create aliases to import or require certain modules more easily
  copy?: Pattern[]; // copy files patterns
  entry?: string; // all start from here
  outputPath?: string; // The output directory as an absolute path
  publicPath?: string; // specify the base path for all the assets within your application
  hash?: boolean; // output files with it's content hash
  externals?: Record<string, string>; //excluding dependencies from the output bundles
  plugins?: any[]; // ko internal plugins, you can define your own plugin of ko.
  htmlTemplate?: string; //output html file template 
  // style configs
  analyzer?: boolean; // show output files with an interactive zoomable treemap
  extraPostCSSPlugins?: Plugin[]; // extra post css plugins
  lessOptions?: any; // custom less options
  antdV4LessOptions?: any; // custom less options for antd v4
  // dev, or serve configs
  serve: {
    proxy?: Record<string, any>; // proxy of dev server
    host: string; // host of dev server
    port: number; // port of dev server
    staticPath?: string; // static path that will be watch of dev server
  };
  // experimental features
  experiment?: {
    speedUp?: boolean; // enable speed up configs of dev & build actions
    minimizer?: boolean; // enable minimizer via esbuild in build action
    enableCssModule?: boolean; //enable css module 
  };
   lints?: Record<IKeys, Omit<IOpts, 'write'>>; // lint configs
};
```

For more details, please see [link](https://github.com/DTStack/ko/blob/master/packages/ko/src/types.ts)
