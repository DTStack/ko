---
sidebar_position: 5
title: ko stylelint
---

:::tip
`ko stylelint` has been moved into package `ko-lints`, so if you want use this feature, please run `pnpm add ko-lints -D` in your terminal
:::

Alias `ko sl`

**Please note that `ko stylelint` is experimental**

use **stylelint** to format your codes, we collate an [stylelint configuration](https://github.com/DTStack/ko/blob/master/packages/ko-config/stylelint.js) and use it as default stylelint configuration, you can override it via cli arguments. 

## How to Use
You can use `pnpm` or `npx` to run `ko stylelint` on the command like this:

``` bash
# Run on files:
npx stylelint file1.js
# Run on multiple files via glob syntax
npx ko stylelint "src/**"
```

## Optional arguments:

* `-f, --fix`:  Fix problems automatically
* `-c, --config <path>`: overriding default eslint config path, and use this configuration
* `--ignore-path <ignorePath>`: Specify path of ignore file