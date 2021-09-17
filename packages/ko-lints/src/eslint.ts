import { findRealPath } from "./utils";
import { ESLint } from 'eslint';
import { Extensions } from './constants';
import { EslintOptions } from './interfaces';

export async function formatFilesWithEslint(
  opts: EslintOptions & { targetFiles: string[] }) {
  const { targetFiles, configPath, fix } = opts;
  const config = configPath ? require(findRealPath(configPath)) : require('ko-config/eslint');
  const extensions = [Extensions.JS, Extensions.JSX, Extensions.TS, Extensions.TSX];
  const eslint = new ESLint({ fix, overrideConfig: config, useEslintrc: false, extensions });
  const eslintFilesPromises = targetFiles.map(async (file) => {
    try {
      const result = await eslint.lintFiles(file);
      if (result[0].errorCount) {
        const formatter = await eslint.loadFormatter();
        //TODO: checkout formatter can init before mapping files
        const resultText = formatter.format(result);
        console.log(resultText);
        return false;
      }
      return true;
    } catch (ex) {
      throw ex
    }
  })
  try {
    let stdout = '';
    const result = await Promise.all(eslintFilesPromises)
    if (!fix) {
      if (result.includes(false)) {
        stdout = 'Not all matched files are linted';
      } else {
        stdout = 'All matched files are linted';
      }
    } else {
      stdout = 'All matched files has been fixed successfully!';
    }
    console.log(stdout);
  } catch (ex) {
    console.log('eslint failed: ', ex)
  }
}
