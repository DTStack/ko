import { promises } from 'fs';
import { format, check } from 'prettier';
import { findRealPath } from './utils';

export async function formatFilesWithPrettier(
  files: string[],
  isCheck: boolean,
  configPath?: string
) {
  const prettierConfig = configPath
    ? require(findRealPath(configPath))
    : require('ko-config/prettier');
  console.log('prettier process starting...');
  const formatFilesPromises = files.map(async (file) => {
    try {
      const source = await promises.readFile(file, 'utf-8');
      const opts = { ...prettierConfig, filepath: file };
      if (isCheck) {
        return check(source, opts);
      } else {
        const formatContent = format(source, opts);
        return promises.writeFile(file, formatContent, 'utf-8');
      }
    } catch (ex) {
      throw ex;
    }
  });
  try {
    let stdout = '';
    const result = await Promise.all(formatFilesPromises);
    if (isCheck) {
      if (result.includes(false)) {
        stdout = 'Not all matched files are formatted';
      } else {
        stdout = 'All matched files are formatted';
      }
    } else {
      stdout = 'All matched files are rewrited successfully!';
    }
    console.log(stdout);
  } catch (ex) {
    console.error('prettier failed:', ex);
  }
}
