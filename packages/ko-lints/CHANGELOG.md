# ko-lints

## 4.0.5

### Patch Changes

- 472d7e0c: update eslint rules
- Updated dependencies [472d7e0c]
  - ko-lint-config@2.2.5

## 4.0.4

### Patch Changes

- Updated dependencies [25de5d7e]
  - ko-lint-config@2.2.4

## 4.0.3

### Patch Changes

- Updated dependencies [35a552d2]
  - ko-lint-config@2.2.3

## 4.0.2

### Patch Changes

- Updated dependencies [b82bab70]
  - ko-lint-config@2.2.2

## 4.0.1

### Patch Changes

- Updated dependencies [dea5d69b]
  - ko-lint-config@2.2.1

## 4.0.0

### Patch Changes

- Updated dependencies [67325569]
  - ko-lint-config@2.2.0

## 3.1.0

### Minor Changes

- 1721dfa0: Support Lints & Format with concurrency mode, Add Config & Plugin of Prettier in Eslint

  - `ko-lint-config`:

    Add Config & Plugin of Prettier in Eslint Config

  - `ko-lints`:

    - Support concurrency mode with multithreading to do lint or format tasks,you can enable concurrency mode via `--concurrency` cli flag
    - Default threads Count is `require('os').cpus().length`, you can specify it via `--concurrentNumber` like `--concurrentNumber=4`

  - `ko`:
    - Support `ko prettier`,`ko eslint`,`ko stylelint` commands with concurrency mode, you can also specify this mode with `ko.config.js`

### Patch Changes

- Updated dependencies [98ec512a]
- Updated dependencies [1721dfa0]
  - ko-lint-config@2.1.0

## 3.0.1

### Patch Changes

- Updated dependencies [acb01e3e]
  - ko-lint-config@2.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [e854ccd8]
  - ko-lint-config@2.0.0

## 2.0.0

### Major Changes

- 84adca00: publish ko v6.0 and it's related packages

### Patch Changes

- Updated dependencies [84adca00]
  - ko-lint-config@1.0.0
