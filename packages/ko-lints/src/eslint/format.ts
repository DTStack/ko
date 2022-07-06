import { eslint } from 'ko-lint-config';
import { IRet, IFormatOpts } from '../interfaces';

const { ESLint } = eslint;

async function format(opts: IFormatOpts): Promise<IRet> {
  const { write, config, extensions, entries } = opts;
  const eslintInstance = new ESLint({
    fix: write,
    overrideConfig: config,
    useEslintrc: false,
    extensions,
  });
  const stdout: string[] = [];
  const formatter = await eslintInstance.loadFormatter();
  try {
    const eslintFilesPromises = entries.map(async file => {
      const result = await eslintInstance.lintFiles(file);
      if (result[0].errorCount) {
        const resultText = formatter.format(result) as string;
        stdout.push(resultText);
        return false;
      }
      return true;
    });
    const result = await Promise.all(eslintFilesPromises);
    if (result.includes(false)) {
      return stdout;
    } else {
      return [];
    }
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}

export default format;
