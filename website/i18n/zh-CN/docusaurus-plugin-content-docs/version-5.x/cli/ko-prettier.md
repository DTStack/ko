---
sidebar_position: 4
title: ko prettier
---

:::tip
`ko prettier`已经被移动到`ko-lints`包中，如果您想使用此功能，请在终端中运行`pnpm add ko-lints -D`
:::

别名`ko pr`

**请注意，`ko prettier`是实验性的**

使用**prettier**格式化您的代码，我们整理了一个[prettier配置](https://github.com/DTStack/ko/blob/master/packages/ko-config/prettier.js)并将其用作默认的prettier配置，您可以通过cli参数覆盖它。

## 如何使用
您可以使用`pnpm`或`npx`在命令行上运行`ko prettier`，如下所示：

``` bash
# 指定prettier文件
npx prettier file1.js
# 通过glob语法prettier多个文件
npx ko prettier "src/**"
```

## 可选参数:

* `-w, --write`: 原地修改文件。
* `-c, --config <path>`: 覆盖默认的prettier配置路径，并使用此配置
* `--ignore-path <ignorePath>`: 指定忽略文件的路径

