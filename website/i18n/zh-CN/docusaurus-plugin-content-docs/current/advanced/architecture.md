---
sidebar_position: 1
title: 架构
---

![架构图](/img/architecture.svg)

这张图展示了 ko 如何构建您的应用程序并对源代码进行 lint。我们维护 4 个包并将它们组合成 **ko** 包。

* **babel-preset-ko-app**：ko 使用的 babel 预设
* **ko-lint-config**：我们的 eslint、prettier 和 stylelint 配置文件，作为 ko-lints 的默认配置
* **ko-lints**：用于 lint 源代码的 CLI
* **ko**：主入口，将 webpack 实例和 ko-lints 结合在一起。

