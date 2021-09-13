# Contributing to ko

First, we use `yarn workspace` and `lerna` to manage our packages. so make sure you use `yarn` as a package manager than `npm`.

To get started with this repo:

``` bash
lerna bootstrap
```

## Code Structure

as a `monorepo`, ko now include four packages in `packages`:

* `ko`: main package
* `ko-lints`: code format cli, include `eslint`, `prettier`, can be integrated in ko or use individual
* `ko-config`: default config used by `ko-lints`
* `babel-preset-ko-app`: babel preset used by ko

## Commands

### Debug

use `yarn debug` to debug local packages

### Local Testing

use `yarn link` to link local packages for testing
