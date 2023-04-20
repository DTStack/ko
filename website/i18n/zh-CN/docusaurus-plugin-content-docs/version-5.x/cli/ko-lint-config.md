---
sidebar_position: 6
title: ko-lint-config
---

`ko-lint-config` 为您节省时间的三种方式：

- **无需配置** - 在项目中强制执行代码质量的更简单方法。没有配置规则。它只是起作用。
- **自动格式化代码** - 只需运行 `pnpm lint-fix`，就可以告别混乱或不一致的代码。
- **尽早捕获样式问题和程序员错误** - 减少代码审查过程中的手动审核，并将简单的事情留给工具来节省时间。

毫不犹豫。不再维护 `.eslintrc`。现在就试试吧！

## 详细规则
- **需要四个空格** – 缩进
- **字符串需要单引号** – 除了需要转义的地方
- **需要关键字后跟空格** - ` if (condition) {...}`
- **函数名后不需要空格** - ` function name (arg) {...}` 除了匿名函数和异步 ` function (arg) {...} `` async () { ... }`
- **分号不是必需的**
- **不强制 = = =** - 后端返回的字段类型无法保证
- **不强制三元运算符换行**
- **允许但不要求尾随逗号** - 当最后一个元素或属性在不同行时，与结尾或属性不同行
- **函数内容允许为空**
- **允许使用 this 别名** - 别名可选 `self` `_this` `that'，不能从中解构出来
- **不需要调试器**
- **不建议使用控制台**


## Install

``` bash
pnpm add ko-lint-config -D
```

## Usage

&emsp;&emsp;How to get Code Style Guide: <a href="https://dtstack.yuque.com/rd-center/sm6war/eeyxxe" target="_black">如何引入 Code Style Guide</a>

1、Then, add this to your `.eslintrc.js`、`.prettierrc.js`、`.stylelintrc.js` file:

``` js
module.exports = {
  extends: [require.resolve('ko-lint-config')],
}
```
``` js
const prettier = require('ko-lint-config/.prettierrc')

module.exports = {
  ...prettier,
}
```
``` js
module.exports = {
  extends: [require.resolve('ko-lint-config/.stylelintrc')],
}
```

You should not override settings. Because this is a Code Style Guide for group.

2、Add script to `package.json`:

``` json
"scripts": {
  "lint": "npx eslint './src/**/*.ts' './src/**/*.tsx'",
  "lint-fix": "npx eslint './src/**/*.ts' './src/**/*.tsx' --fix",
  "lint-css": "npx stylelint './src/**/*.scss' './src/**/*.css'",
  "lint-css-fix": "npx stylelint './src/**/*.scss' './src/**/*.css' --fix"
},
```

你可以使用 `pnpm lint-fix` 来修复大多数代码风格问题。

## 如何禁用 eslint 规则？

在极少数情况下，您需要打破规则并隐藏由 `Code Style Guide` 生成的错误。

`ko-lint-config` 在幕后使用 [ESLint](http://eslint.org/)，您可以像直接使用 ESLint 一样正常隐藏错误。stylelint 与 eslint 相同。

在特定行上禁用 **所有规则**：

```js
file = 'I know what I am doing' // eslint-disable-line
```

Or, disable **only** the `"no-use-before-define"` rule:

```js
file = 'I know what I am doing' // eslint-disable-line no-use-before-define
```

Or, disable the `"no-use-before-define"` rule for **multiple lines**:

```js
/* eslint-disable no-use-before-define */
console.log('offending code goes here...')
console.log('offending code goes here...')
console.log('offending code goes here...')
/* eslint-enable no-use-before-define */
```

### 想找比这更简单的东西吗？

您可以添加到“pnpm lint”脚本中，并为vscode安装eslint插件。
