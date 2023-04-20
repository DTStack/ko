---
sidebar_position: 5
title: ko stylelint
---

:::tip
`ko stylelint`已经被移动到`ko-lints`包中，如果您想使用此功能，请在终端中运行`pnpm add ko-lints -D`
:::

别名`ko sl`

**请注意，`ko stylelint`是实验性的**

使用**stylelint**格式化您的代码，我们整理了一个[stylelint配置](https://github.com/DTStack/ko/blob/master/packages/ko-config/stylelint.js)并将其用作默认的stylelint配置，您可以通过cli参数覆盖它。

## 如何使用
您可以使用`pnpm`或`npx`在命令行上运行`ko stylelint`，如下所示：

``` bash
# Run on files:
npx stylelint file1.js
# Run on multiple files via glob syntax
npx ko stylelint "src/**"
```

## 可选参数:

* `-f, --fix`: 自动修复问题
* `-c, --config <path>`: 覆盖默认的eslint配置路径，并使用此配置
* `--ignore-path <ignorePath>`: 指定忽略文件的路径

