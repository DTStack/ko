# ko-lints

## 4.0.18

### Patch Changes

- 2f66429b: space-before-function-paren
- Updated dependencies [2f66429b]
  - ko-lint-config@2.2.18

## 4.0.17

### Patch Changes

- 7a0c20ff: space-before-function-paren anonymous
- Updated dependencies [7a0c20ff]
  - ko-lint-config@2.2.17

## 4.0.16

### Patch Changes

- Updated dependencies [ab8fd720]
  - ko-lint-config@2.2.16

## 4.0.15

### Patch Changes

- 0b1a315c: postcss-less
- Updated dependencies [0b1a315c]
  - ko-lint-config@2.2.15

## 4.0.14

### Patch Changes

- ec113a5e: add theme rules
- Updated dependencies [ec113a5e]
  - ko-lint-config@2.2.14

## 4.0.13

### Patch Changes

- 456fd274: lint config
- Updated dependencies [456fd274]
  - ko-lint-config@2.2.13

## 4.0.12

### Patch Changes

- 8d8d981f: lock dependencies version
- Updated dependencies [8d8d981f]
  - ko-lint-config@2.2.12

## 4.0.11

### Patch Changes

- 830b3280: ko lint tsc
- Updated dependencies [830b3280]
  - ko-lint-config@2.2.11

## 4.0.10

### Patch Changes

- 9554156e: stylelint version
- Updated dependencies [9554156e]
  - ko-lint-config@2.2.10

## 4.0.9

### Patch Changes

- 205b0044: lint config
- Updated dependencies [205b0044]
  - ko-lint-config@2.2.9

## 4.0.8

### Patch Changes

- 40884a3c: lint config
- Updated dependencies [40884a3c]
  - ko-lint-config@2.2.8

## 4.0.7

### Patch Changes

- edb4ae7e: change prettier config
- Updated dependencies [edb4ae7e]
  - ko-lint-config@2.2.7

## 4.0.6

### Patch Changes

- 5f645514: update stylelint rules
- Updated dependencies [5f645514]
  - ko-lint-config@2.2.6

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
