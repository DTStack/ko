import { findRealPath } from "./utils";
import { ESLint } from 'eslint'
import { promises } from "fs";

export async function formatFilesWithEslint(
  files: string[],
  isCheck: boolean,
  configPath?: string) {
  const eslintConfig = configPath
    ? require(findRealPath(configPath))
    : require("ko-config/eslint")
  console.log('eslint process starting....')
  const eslint = new ESLint({ fix: true, baseConfig: eslintConfig })
  const eslintFilesPromises = files.map(async (file) => {
    try {
      const result = await eslint.lintFiles(file)
      const { errorCount, output } = result[0]
      if (isCheck) {
        return !!errorCount
      }
      return output && promises.writeFile(file, output, 'utf-8');
    } catch (ex) {
      throw ex
    }
  })
  try {
    let stdout = '';
    const result = await Promise.all(eslintFilesPromises)
    if (isCheck) {
      if (result.includes(false)) {
        stdout = 'Not all matched files are elinted';
      } else {
        stdout = 'All matched files are elinted';
      }
    } else {
      stdout = 'All matched files are rewrited successfully!';
    }
    console.log(stdout);
  } catch (ex) {
    console.log('eslint failed: ', ex)
  }
}
