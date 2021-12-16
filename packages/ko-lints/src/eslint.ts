import { findRealPath } from './utils';
import { ESLint } from 'eslint';
import { Extensions } from './constants';
import { EslintOptions } from './interfaces';

export async function formatFilesWithEslint(
  opts: EslintOptions & { targetFiles: string[] }
) {
  const { targetFiles, configPath, fix } = opts;
  const config = configPath
    ? require(findRealPath(configPath))
    : require('ko-config/eslint');
  const extensions = [
    Extensions.JS,
    Extensions.JSX,
    Extensions.TS,
    Extensions.TSX,
  ];
  const eslint = new ESLint({
    fix,
    overrideConfig: config,
    useEslintrc: false,
    extensions,
  });
  const formatter = await eslint.loadFormatter();
  const eslintFilesPromises = targetFiles.map(async (file) => {
    const result = await eslint.lintFiles(file);
    if (result[0].errorCount) {
      const resultText = formatter.format(result);
      console.log(resultText);
      return false;
    }
    return true;
  });
  let stdout = '';
  const result = await Promise.all(eslintFilesPromises);
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
}
