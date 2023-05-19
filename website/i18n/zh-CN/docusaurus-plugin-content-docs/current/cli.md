---
sidebar_position: 3
title: 命令行界面
---

## ko dev

启动开发服务器。

可选参数：

* `-h --hash`：输出带有内容哈希的文件名
* `-a,--analyzer`：在 **http://127.0.0.1:8888** 中显示文件的可视化bundle报告

## ko build

使用内部 webpack 实例打包文件，默认情况下编译文件将写入 **dist** 目录。

可选参数：

* `--hash`：输出带有内容哈希的文件名

## ko lint

通过 prettier、eslint 或 stylelint 对代码进行 lint，您可以使用 `pnpm` 或 `npx` 在命令行上运行 lint，如下所示：

``` bash
# 在文件上通过 prettier 运行 lint：
pnpm exec ko prettier file1.js file2.ts
# 通过 glob 语法在多个文件上通过 prettier 运行 lint 并尝试修复问题
pnpm exec ko prettier "src/**" --write
# 在文件上通过 eslint 运行 lint：
pnpm exec ko eslint file1.js file2.ts
# 通过 glob 语法在多个文件上通过 eslint 运行 lint 并发模式
pnpm exec ko eslint "src/**" --concurrency
# 在文件上通过 stylelint 运行 lint：
pnpm exec ko stylelint file1.css file2.less
# 通过 glob 语法在多个文件上通过 stylelint 运行 lint 并使用自定义配置
pnpm exec ko stylelint "src/**" --configPath="/path/to/custom/config"
```

Optional arguments:

* `-w, --write`: 尝试自动修复问题
* `-c, --configPath <path>`: 覆盖默认配置路径，并使用此配置
* `--concurrency`: 使用多线程对文件进行 lint
* `--concurrentNumber <number>`: 指定线程数，默认为 `require('os').cpus().length`

您可以通过在 `.gitignore` ， `.prettierignore` ， `.eslintignore` ， `.stylelint` 文件中添加需要忽略的文件，所有这些匹配到的文件在 lint 运行时都将被忽略。


