---
sidebar_position: 1
title: ko build
---

Use internal webpack instance to bundle files, compiled files will be write to **dist** directory by default. You can change this behavior via **ko.config.js**.

Optional arguments:

* `--hash`: output filename with it's contenthash
* `-t,--ts,--typescript`: support typescript or not, ko support typescript by default
* `-e,--esbuild`: enable esbuild (now only esbuild minification is supported)