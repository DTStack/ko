---
sidebar_position: 2
title: ko dev
---

启动一个提供实时热重载的开发服务器。您可以通过 **ko.config.js** 中的 **devServer** 值更改开发服务器的默认行为，或使用 cli 参数。

可选参数：
* `-p, --port <port>`: 服务器启动的端口号
* `--host <host>`: 服务器启动的主机，您可以指定像 **0.0.0.0** 这样的 IP
* `-t, --ts`: 是否支持 TypeScript，ko 默认支持 TypeScript
* `-h --hash`: 输出带有内容哈希的文件名
* `-a,--analyzer`: 在 **http://127.0.0.1:8888** 中显示文件的可视化bundle报告

