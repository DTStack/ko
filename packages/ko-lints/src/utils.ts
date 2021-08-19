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
export function getTargetFiles(
  patterns: Pattern,
  ignoreFile?: string
): Array<string> {
  if (!ignoreFile) {
    ignoreFile = join(process.cwd(), defaultIgnoreFile);
  }
  return sync(patterns, {
    ignore: getIgnorePatterns(ignoreFile),
  });
}

function getIgnorePatterns(ignoreFile: string): Array<string> {
  const gitIgnorePath = join(process.cwd(), '.gitignore');
  const gitIgnorePatterns = getFilePatterns(gitIgnorePath);
  const ignorePatterns = getFilePatterns(ignoreFile);
  return ignorePatterns.reduce((accumlator, currentValue) => {
    if (!accumlator.includes(currentValue)) {
      accumlator.push(currentValue);
    }
    return accumlator;
  }, gitIgnorePatterns);
}

function getFilePatterns(filePath: string): Array<string> {
  let patterns: Array<string> = [];
  if (existsSync(filePath)) {
    patterns = readFileSync(filePath, 'utf-8').split('\n');
  }
  return patterns;
}
