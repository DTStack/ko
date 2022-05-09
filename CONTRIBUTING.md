---
sidebar_position: 6
title: Contributing
---

# Contributing to ko

We use **pnpm workspace** to manage our packages. so make sure you use **pnpm** as package manager than **npm** or **yarn**.

To getting started with this repo:

``` bash
pnpm install
```

## Code Structure

as a **monorepo**, ko now maintain 4 packages in packages directory:

* **ko**: main package
* **ko-lints**: code format cli, include **eslint**, **prettier** and **stylelint**, can be integrated in ko or use individually
* **ko-config**: default config used by **ko-lints**
* **ko-lint-config**: code format configs, include **eslint**, **prettier** and **stylelint**
* **babel-preset-ko-app**: babel preset used by ko

## Commands

### Debug

use `pnpm debug` to debug local packages

### Local Testing

use **pnpm link** to link `ko` into local packages for testing
