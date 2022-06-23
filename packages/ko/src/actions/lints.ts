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
      options: [
        {
          flags: '--write',
          description: 'try to fix problems automatically',
          defaultValue: false,
        },
        {
          flags: '--configPath',
          description: `Specify ${name} config path`,
          defaultValue: '',
        },
        {
          flags: '--patterns',
          description: `Specify ${name} patterns(via glob)`,
          defaultValue: '',
        },
      ],
    });
    this.service.commander.bindAction(name, this.action.bind(this));
  }

  protected async action(cliOpts: ILintOpts) {
    const config = this.generateConfig();
    const finalOpts = Object.freeze({ name: this.name, ...config, ...cliOpts });
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
      this.warningStdout('[failed]', `lint via ${name}`);
      result.forEach(str => {
        this.warningStdout('[failed]', str);
      });
    }
  }
}

export default LintFactory;
