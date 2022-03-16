---
sidebar_position: 1
title: Architecture
---

![architecture diagram](/img/architecture.svg)

This diagram shows how ko works to build your applications and lint your source code. we maintain 4 packages and get them together into package **ko**.
* **babel-preset-ko-app**: babel preset used by ko
* **ko-config**: our config files of eslint, prettier and stylelint, used by ko-lints as default configs
* **ko-lints**: cli for lint source code
* **ko**: main entrance, getting webpack instance and ko-lints together.

