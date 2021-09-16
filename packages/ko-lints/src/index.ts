import { Command } from 'commander';
import { Pattern } from 'fast-glob'
import { defaultPatterns } from './constants';
import { getTargetFiles } from './utils';
import { formatFilesWithPrettier } from './prettier';
import { formatFilesWithEslint } from './eslint';
import { PrettierOptions, EslintOptions } from './interfaces';

function initKoLintCli(program: Command) {
  program
    .command('prettier [patterns]')
    .alias('pr')
    .description('use prettier to format your codes')
    .option('-w, --write', 'Edit files in-place. (Beware!)')
    .option('-c, --config <configPath>', 'set prettier config path')
    .action((patterns: Pattern = defaultPatterns, opts: PrettierOptions) => {
      const { write, configPath } = opts;
      const targetFiles = getTargetFiles(patterns);
      formatFilesWithPrettier(targetFiles, !write, configPath);
    });

  program
    .command('eslint [patterns]')
    .alias('es')
    .description('use eslint to format your codes')
    .option('-f, --fix', 'Automatically fix problems')
    .option('-c, --config <configPath>', 'set eslint config path')
    .option('--react', 'support react lint')
    .option('-t, --typescript', 'support typescript lint')
    .action((patterns: Pattern = defaultPatterns, opts: EslintOptions) => {
      const targetFiles = getTargetFiles(patterns)
      formatFilesWithEslint({ targetFiles, ...opts })
    });
}

export default initKoLintCli;
