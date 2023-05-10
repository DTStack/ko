---
sidebar_position: 3
title: ko eslint
---

:::tip
`ko eslint`已经移动到`ko-lints`包中，如果您想使用此功能，请在终端中运行`pnpm add ko-lints -D`
:::

别名`ko el`

**请注意，`ko eslint`是实验性的**

使用**eslint**格式化您的代码，我们整理了一个[eslint配置](https://github.com/DTStack/ko/blob/master/packages/ko-config/eslint.js)并将其用作默认的eslint配置，您可以通过cli参数覆盖它。

## 如何使用
您可以使用`pnpm`或`npx`在命令行上运行`ko eslint`，如下所示：

``` bash
# lint指定文件
npx eslint file1.js
# 通过glob语法lint多个文件
npx ko eslint "src/**"
```

## 可选参数:

* `-f, --fix`: 自动修复问题
* `-c, --config <path>`: 覆盖默认的eslint配置路径，并使用此配置
* `--ignore-path <ignorePath>`: 指定忽略文件的路径

