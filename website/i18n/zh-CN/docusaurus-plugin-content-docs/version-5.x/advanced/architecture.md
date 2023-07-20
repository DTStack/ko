---
sidebar_position: 1
title: 架构
---

![架构图](/img/architecture.svg)

这张图展示了 ko 如何构建你的应用并对你的源代码进行 lint。我们维护了 4 个包并将它们合并到了 **ko** 包中。
* **babel-preset-ko-app**: ko 使用的 babel preset
* **ko-config**: 我们的 eslint、prettier 和 stylelint 配置文件，作为 ko-lints 的默认配置
* **ko-lints**: 用于 lint 源代码的 CLI
* **ko**: 主入口，将 webpack 实例和 ko-lints 结合在一起。

