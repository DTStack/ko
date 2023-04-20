---
sidebar_position: 1
title: 构建
---

使用内部的 webpack 实例来打包文件，默认情况下编译后的文件将被写入 **dist** 目录。您可以通过 **ko.config.js** 更改此行为。

可选参数：

* `--hash`：使用内容哈希输出文件名
* `-t,--ts,--typescript`：是否支持 TypeScript，ko 默认支持 TypeScript
* `-e,--esbuild`：启用 esbuild（现在只支持 esbuild 压缩）

