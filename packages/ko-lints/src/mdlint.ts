import chalk from 'chalk';
import { findRealPath } from './utils';
import { MdlintOptions, MdError } from './interfaces';

export async function formatFilesWithMdlint(
  opts: MdlintOptions & { targetFiles: string[] }
) {
  const { targetFiles, configPath, fix } = opts;
  const { runMdLinted, runMdFixed } = require('ko-config/mdlint');
  const config = configPath ? require(findRealPath(configPath)) : '';
  console.log(chalk.green('mdlint process starting...'));
  const handleMdLint = (file: string, rules: any) => {
    return !fix ? runMdLinted({ file, rules }) : runMdFixed({ file, rules });
  };
  const mdlintFilesPromises = targetFiles.map(async (file) => {
      const result = await handleMdLint(file, config);
      if (result?.path && result?.errors?.length) {
        console.log(result.path);
        result?.errors.map((err: MdError) => {
          const { start, text, level, type} = err;
          console.log(
            chalk.gray(`${start.line}:${start.column}  `),
            chalk.red(level),
            chalk.white(`${text || ''}`),
            chalk.gray(type),
          );
        })
        return false;
      }
      return true;
  });

  try {
    let stdout = '';
    const result = await Promise.all(mdlintFilesPromises);
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
    console.log('mdlint failed: ', ex);
  }
}
