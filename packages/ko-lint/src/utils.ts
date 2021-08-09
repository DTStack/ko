import { realpathSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { sync, Pattern } from 'fast-glob';
import { defaultIgnoreFile } from './constants';

export function findRealPath(configPath: string): string {
  if (!realpathSync(configPath)) {
    configPath = join(process.cwd(), configPath);
  }
  if (existsSync(configPath)) {
    return configPath;
  }
  throw new Error(
    'config file is not exist, please checkout config file path!'
  );
}

/**
 * @link Pattern syntax: https://github.com/mrmlnc/fast-glob#pattern-syntax
 */
export function getTargetFiles(patterns: Pattern, ignoreFile?: string): Array<string> {
  if (!ignoreFile) {
    ignoreFile = join(process.cwd(), defaultIgnoreFile);
  }
  return sync(patterns, {
    ignore: getIgnorePatterns(ignoreFile)
  })
}

function getIgnorePatterns(ignoreFile: string): Array<string> {
  const gitIgnorePatterns = readFileSync(ignoreFile, 'utf-8').split('\n');
  const ignorePatterns = readFileSync(ignoreFile, 'utf-8').split('\n');
  return ignorePatterns.reduce((accumlator, currentValue) => {
    if (!accumlator.includes(currentValue)) {
      accumlator.push(currentValue)
    }
    return accumlator;
  }, gitIgnorePatterns)
}