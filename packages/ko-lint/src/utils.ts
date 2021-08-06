import { join } from 'path';

export function findRealPath(configPath: string): string {
  if (!fs.realpathSync(configPath)) {
    configPath = join(process.cwd(), configPath);
  }
  if (fs.existsSync(configPath)) {
    return configPath;
  }
  throw new Error(
    'config file is not exist, please checkout config file path!'
  );
}
