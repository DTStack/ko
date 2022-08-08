# ko-lint-config

## 2.2.1

### Patch Changes

- dea5d69b: update eslint comma-dangle

## 2.2.0

### Minor Changes

- 67325569: update lint config

## 2.1.0

### Minor Changes

- 98ec512a: prettier printWidth
- 1721dfa0: Support Lints & Format with concurrency mode, Add Config & Plugin of Prettier in Eslint

  - `ko-lint-config`:

    Add Config & Plugin of Prettier in Eslint Config

  - `ko-lints`:

    - Support concurrency mode with multithreading to do lint or format tasks,you can enable concurrency mode via `--concurrency` cli flag
    - Default threads Count is `require('os').cpus().length`, you can specify it via `--concurrentNumber` like `--concurrentNumber=4`

  - `ko`:
    - Support `ko prettier`,`ko eslint`,`ko stylelint` commands with concurrency mode, you can also specify this mode with `ko.config.js`

## 2.0.1

### Patch Changes

- acb01e3e: update package.json config to include config files

## 2.0.0

### Major Changes

- e854ccd8: 1. add new plugin:eslint-plugin-dt-react
  2. update eslint & prettier configs

## 1.0.1

### Patch Changes

- 8a65b00b: add eslint-config-prettier

## 1.0.0

### Major Changes

- 84adca00: publish ko v6.0 and it's related packages
