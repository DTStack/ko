# ko-lint-config

## 2.2.15

### Patch Changes

- 0b1a315c: postcss-less

## 2.2.14

### Patch Changes

- ec113a5e: add theme rules

## 2.2.13

### Patch Changes

- 456fd274: lint config

## 2.2.12

### Patch Changes

- 8d8d981f: lock dependencies version

## 2.2.11

### Patch Changes

- 830b3280: ko lint tsc

## 2.2.10

### Patch Changes

- 9554156e: stylelint version

## 2.2.9

### Patch Changes

- 205b0044: lint config

## 2.2.8

### Patch Changes

- 40884a3c: lint config

## 2.2.7

### Patch Changes

- edb4ae7e: change prettier config

## 2.2.6

### Patch Changes

- 5f645514: update stylelint rules

## 2.2.5

### Patch Changes

- 472d7e0c: update eslint rules

## 2.2.4

### Patch Changes

- 25de5d7e: update eslint rules

## 2.2.3

### Patch Changes

- 35a552d2: update eslint semi and stylelint config

## 2.2.2

### Patch Changes

- b82bab70: update eslint config

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
