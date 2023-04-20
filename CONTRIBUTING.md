# Contributing to ko

We use **pnpm workspace** to manage our packages. so make sure you use **pnpm** as package manager than **npm** or **yarn**.

To getting started with this repo:

``` bash
pnpm install
```

## Code Structure

as a **monorepo**, ko now maintain 5 packages in packages directory:

* **ko**: main package
* **ko-lints**: code format cli, include **eslint**, **prettier** and **stylelint**, can be integrated in ko or use individually
* **ko-config**: default config used by **ko-lints**
* **ko-lint-config**: code format configs, include **eslint**, **prettier** and **stylelint**
* **babel-preset-ko-app**: babel preset used by ko
### Debug

use `pnpm debug` to debug local packages

### Local Testing

use **pnpm link** to link `ko` into local packages for testing

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:
- Run `pnpm changeset` in the root of the repository and describe your changes. The resulting files should be committed as they will be used during release.
- Run the full test suite and ensure that all tests pass.
- Push your branch to GitHub:

  ```shell
  git push origin my-fix-branch
  ```

- In GitHub, send a pull request.
- If we suggest changes then:

  - Make the required updates.
  - Re-run the test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

That's it! Thank you for your contribution!
