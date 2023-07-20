# 贡献到 ko

We use **pnpm workspace** to manage our packages. so make sure you use **pnpm** as package manager than **npm** or **yarn**.
我们使用 **pnpm workspace** 来管理我们的包，请确保您使用 **pnpm** 作为包管理器，而不是 **npm** 或 **yarn**。

在使用此仓库之前:
``` bash
pnpm install
```

## 代码结构

作为一个 monorepo，ko 现在在 packages 目录中维护了 5 个包:

* **ko**: 主要包
* **ko-lints**: 代码格式化 cli, 包 **eslint**, **prettier** 和 **stylelint**, 可以集成到 ko 中或单独使用
* **ko-config**: **ko-lints** 使用的默认配置
* **ko-lint-config**: 代码格式化配置，包括 **eslint**, **prettier** 和 **stylelint**
* **babel-preset-ko-app**: ko 使用的 babel 预设

### 调试

使用 `pnpm debug` 调试本地包

### 本地测试

使用 **pnpm link** 将 `ko` 链接到本地包中进行测试

## 提交 Pull Request (PR)

在提交 Pull Request (PR) 之前，请考虑以下准则:
- 在存储库的根目录中运行 `pnpm changeset`，并描述您的更改。生成的文件应该被提交，因为它们将在发布时使用。
- 运行完整的测试套件，并确保所有测试都通过。
- 推送您的分支到 GitHub:

  ```shell
  git push origin my-fix-branch
  ```

- 在 GitHub 上发送一个 pull request。
- 如果我们建议更改，则:

  - Make the required updates.
  - Re-run the test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):
  - 进行所需的更新。

  - 重新运行测试套件，以确保测试仍然通过。

  - 将您的分支 rebase 并强制推送到您的 GitHub 存储库（这将更新您的 Pull Request）：

    ```shell
    git rebase main -i
    git push -f
    ```

感谢您的贡献！
