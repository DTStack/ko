---
sidebar_position: 2
title: ko dev
---

启动一个提供实时重载的开发服务器。您可以通过 **ko.config.js** 中的 **devServer** 值更改开发服务器的默认行为，或使用 cli 参数。

可选参数：
* `-p, --port <port>`: 服务器启动的端口号，接受数字值
* `--host <host>`: 服务器启动的主机，您可以指定像 **0.0.0.0** 这样的 IP
* `-t, --ts`: 是否支持 TypeScript，ko 默认支持 TypeScript
* `-h --hash`: 输出文件名及其内容哈希值
* `-a,--analyzer`: 在 **http://127.0.0.1:8888** 中显示带有可缩放交互式树状图的输出文件

