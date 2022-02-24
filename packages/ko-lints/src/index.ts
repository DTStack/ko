import { Command } from 'commander';
import { Pattern } from 'fast-glob';
import { defaultPatterns } from './constants';
import { getTargetFiles } from './utils';
import { formatFilesWithPrettier } from './prettier';
import { formatFilesWithEslint } from './eslint';
import { formatFilesWithStylelint } from './stylelint';
import { formatFilesWithMdlint } from './mdlint';
import { PrettierOptions, EslintOptions, StylelintOptions } from './interfaces';

function initKoLintCli(program: Command) {
  program
    .command('prettier [patterns]')
    .alias('pr')
    .description('use prettier to format your codes')
    .option('-w, --write', 'Edit files in-place. (Beware!)')
    .option('-c, --config <configPath>', 'Specify prettier config path')
    .option('--ignore-path <ignorePath>', 'Specify prettier ignore path')
    .action((patterns: Pattern = defaultPatterns, opts: PrettierOptions) => {
      const { write, configPath, ignorePath } = opts;
      const targetFiles = getTargetFiles(patterns, ignorePath);
      formatFilesWithPrettier(targetFiles, !write, configPath);
    });

  program
    .command('eslint [patterns]')
    .alias('el')
    .description('use eslint to format your codes')
    .option('-f, --fix', 'Automatically fix problems')
    .option('-c, --config <configPath>', 'Specify eslint config path')
    .option('--ignore-path <ignorePath>', 'Specify eslint ignore path')
    .action((patterns: Pattern = defaultPatterns, opts: EslintOptions) => {
      const targetFiles = getTargetFiles(patterns, opts.ignorePath);
      console.log(targetFiles);
      formatFilesWithEslint({ targetFiles, ...opts });
    });

  
  program
    .command('stylelint [patterns]')
    .alias('sl')
    .description('use stylelint to format your codes')
    .option('-f, --fix', 'Automatically fix problems')
    .option('-c, --config <configPath>', 'Specify stylelint config path')
    .option('--ignore-path <ignorePath>', 'Specify stylelint ignore path')
    .action((patterns: Pattern = defaultPatterns, opts: StylelintOptions) => {
      const targetFiles = getTargetFiles(patterns, opts.ignorePath);
      formatFilesWithStylelint({ targetFiles, ...opts });
    });
  program
    .command('mdlint [patterns]')
    .alias('md')
    .description('use mdlint to format your codes')
    .option('-f, --fix', 'Automatically fix problems')
    .option('-c, --config <configPath>', 'specify mdlint config path')
    .option('--ignore-path <ignorePath>', 'specify prettier ignore path')
    .action((patterns: Pattern = defaultMdPatterns, opts: MdlintOptions) => {
      const targetFiles = getAllTargetFiles(patterns, opts.ignorePath);
      formatFilesWithMdlint({ targetFiles, ...opts });
    });
}

export default initKoLintCli;
