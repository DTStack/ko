---
sidebar_position: 3
title: ko eslint
---

:::tip
`ko eslint` has been moved into package `ko-lints`, so if you want use this feature, please run `pnpm add ko-lints -D` in your terminal
:::

Alias `ko el`

**Please note that `ko eslint` is experimental**

use **eslint** to format your codes, we collate an [eslint configuration](https://github.com/DTStack/ko/blob/master/packages/ko-config/eslint.js) and use it as default eslint configuration, you can override it via cli arguments. 

## How to Use
You can use `pnpm` or `npx` to run `ko eslint` on the command like this:

``` bash
# Run on files:
npx eslint file1.js
# Run on multiple files via glob syntax
npx ko eslint "src/**"
```

## Optional arguments:

* `-f, --fix`:  Fix problems automatically
* `-c, --config <path>`: overriding default eslint config path, and use this configuration
* `--ignore-path <ignorePath>`: Specify path of ignore file