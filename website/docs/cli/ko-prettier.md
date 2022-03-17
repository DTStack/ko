---
sidebar_position: 4
title: ko prettier
---

:::tip
`ko prettier` has been moved into package `ko-lints`, so if you want use this feature, please run `pnpm add ko-lints -D` in your terminal
:::

Alias `ko pr`

**Please note that `ko prettier` is experimental**

use **prettier** to format your codes, we collate an [prettier configuration](https://github.com/DTStack/ko/blob/master/packages/ko-config/prettier.js) and use it as default prettier configuration, you can override it via cli arguments. 

## How to Use
You can use `pnpm` or `npx` to run `ko prettier` on the command like this:

``` bash
# Run on files:
npx prettier file1.js
# Run on multiple files via glob syntax
npx ko prettier "src/**"
```

## Optional arguments:

* `-w, --write`: Edit files in-place.
* `-c, --config <path>`: overriding default prettier config path, and use this configuration
* `--ignore-path <ignorePath>`: Specify path of ignore file