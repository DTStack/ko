import { findRealPath } from "./utils";
import { ESLint } from 'eslint'
import { promises } from "fs";
const ESLINT_FILETYPE = ['ts', 'js', 'jsx', 'tsx', 'json', 'JSON'];

export async function formatFilesWithEslint(
  files: string[],
  isCheck: boolean,
  configPath?: string) {
  const eslintConfig = configPath
    ? require(findRealPath(configPath))
    : require("ko-config/eslint")
  console.log('eslint process starting....')
  const eslint = new ESLint({ fix: !isCheck, overrideConfig: eslintConfig })
  const eslintFilesPromises = files.map(async (file) => {
    try {
      let result;
      let resultText;
      const type = file.split('.').pop() || ''
      if (ESLINT_FILETYPE.includes(type)) {
        result = await eslint.lintFiles(file)
        await ESLint.outputFixes(result);
        const formatter = await eslint.loadFormatter("stylish");
        resultText = formatter.format(result);
        resultText && console.log(resultText);
        const { errorCount, output } = result[0]
        if (isCheck) {
          return !errorCount
        }
        return output
      }
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
