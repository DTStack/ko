---
sidebar_position: 3
title: Command Line Interface
---

## ko dev

start a development server that provides live reloading.

Optional arguments:

* `-h --hash`: output filename with it's contenthash
* `-a,--analyzer`: show output files with an interactive zoomable treemap in **http://127.0.0.1:8888**

## ko build

Use internal webpack instance to bundle files, compiled files will be write to **dist** directory by default.

Optional arguments:

* `--hash`: output filename with it's contenthash

## ko lint

Lint your code via prettier, eslint or stylelint, You can use `pnpm` or `npx` to run lint on the command like this:

``` bash
# Run lint via prettier on files:
pnpm exec ko prettier file1.js file2.ts
# Run lint via prettier on multiple files via glob syntax and try to fix problems
pnpm exec ko prettier "src/**" --write
# Run lint via eslint on files:
pnpm exec ko eslint file1.js file2.ts
# Run lint via eslint on multiple files via glob syntax on concurrency mode
pnpm exec ko eslint "src/**" --concurrency
# Run lint via stylelint on files:
pnpm exec ko stylelint file1.css file2.less
# Run lint via stylelint on multiple files via glob syntax with custom config
pnpm exec ko stylelint "src/**" --configPath="/path/to/custom/config"
```

Optional arguments:

* `-w, --write`: try to fix problems automatically
* `-c, --configPath <path>`: overriding default config path, and use this configuration
* `--concurrency`: use multithreading to lint files
* `--concurrentNumber <number>`: specify threads number, default is `require('os').cpus().length`

You can add ignore patterns in `.gitignore` file and `.prettierignore` file via prettier, `.eslintignore` file via eslint, `.stylelint` file via stylelint,
all of these patterns matched files will be ignored when lint running.
