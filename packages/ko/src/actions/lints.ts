import { ActionFactory } from './factory';
import Lints, { IKeys, IOpts as ILintOpts } from 'ko-lints';
import Service from '../core/service';
import { assert } from '../utils';

class LintFactory extends ActionFactory {
  private name: IKeys;
  constructor(service: Service, name: IKeys) {
    super(service);
    this.name = name;
    this.generateConfig();
  }

  public generateConfig() {
    const opts = this.service.config?.lints?.[this.name];
    return opts || {};
  }

  public registerCommand(): void {
    const name = this.name;
    this.service.commander.registerCommand({
      name,
      description: `lint your codes via ${name}`,
      args: [
        {
          flags: '<patterns>',
          description: ` Specify ${name} lint patterns(via glob)`,
        },
      ],
      options: [
        {
          flags: '-w, --write',
          description: 'try to fix problems automatically',
          defaultValue: false,
        },
        {
          flags: '-c, --configPath <configPath>',
          description: `Specify ${name} config path`,
          defaultValue: '',
        },
      ],
    });
    this.service.commander.bindAction(name, this.action.bind(this));
  }

  protected async action(patterns: string | string[], cliOpts: ILintOpts) {
    const config = this.generateConfig();
    const finalOpts = Object.freeze({
      name: this.name,
      ...config,
      ...cliOpts,
      patterns: Array.isArray(patterns) ? patterns : [patterns],
    });
    const { name, ...opts } = finalOpts;
    assert(
      opts.patterns,
      `patterns config of ${name} should be specified(via glob)`
    );
    process.title = finalOpts.name;
    const lintRunner = new Lints(opts);
    const result = await lintRunner.run(name);
    if (typeof result === 'boolean' && result) {
      this.successStdout('[success]', `lint via ${name}`);
      process.exit(0);
    } else {
      this.warningStdout(`lint via ${name} failed:`);
      result.forEach(str => {
        this.warningStdout('[failed]', str);
      });
    }
  }
}

export default LintFactory;
