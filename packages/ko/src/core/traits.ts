import { isAbsolute } from 'path';
import Ajv, { Schema } from 'ajv';
import { AsyncSeriesWaterfallHook } from 'tapable';
import assert from 'assert';

type ISchema = Schema | string;
type HookItem = {
  key: string;
  name: string;
  schema?: ISchema;
  fn: Function;
  stage?: number;
  before?: string | string[];
};
type CommandOptions = {
  name: string;
  desc: string;
  options: [string, string][];
  fn: Function;
};

enum ACTION {
  ADD = 'add',
  UPDATE = 'update',
}

class Traits {
  private hooks: Record<string, HookItem[]>;
  private commands: Record<string, CommandOptions>;
  private schema: Record<string, any>;

  constructor() {
    this.hooks = {};
    this.commands = {};
  }

  register(opts: HookItem) {
    const { key } = opts;
    this.hooks[key] ||= [];
    if (opts.schema) {
      this.registerSchema({ name: opts.name, schema: opts.schema });
    }
    this.hooks[key].push(opts);
  }

  apply(opts: { key: string; type: ACTION; args?: any }) {
    const hooks = this.hooks[opts.key];
    const tapInstance = new AsyncSeriesWaterfallHook(['ctx']);
    if (!Object.keys(ACTION).includes(opts.type)) {
      throw new Error("type must be one of 'add' or 'update'");
    }

    switch (opts.type) {
      case ACTION.ADD:
        hooks.forEach(hook => {
          tapInstance.tapPromise(
            { name: hook.name, stage: hook.stage, before: hook.before },
            async ctx => {
              const result = await hook.fn(opts.args);
              return ctx.concat(result);
            }
          );
        });
        return tapInstance.promise();
      case ACTION.UPDATE:
        hooks.forEach(hook => {
          tapInstance.tapPromise(
            {
              name: hook.name,
              stage: hook.stage,
              before: hook.before,
            },
            async ctx => {
              const result = await hook.fn(ctx, opts.args);
              return result;
            }
          );
        });
        return tapInstance.promise();
      default:
        throw new Error(`apply failed: please check your configs`);
    }
  }

  registerCommand(opts: CommandOptions): void {
    assert(
      this.commands[opts.name],
      `command ${opts.name} has been registered before`
    );
    this.commands[opts.name] = opts;
  }

  registerSchema(opts: { name: string; schema: ISchema }) {
    assert(
      this.schema[opts.name],
      `command ${opts.name} has been registered before`
    );
    this.schema[opts.name] =
      typeof opts.schema === 'string' ? require(opts.schema) : opts.schema;
  }

  private schemaValidate(schema: ISchema, data: any) {
    if (typeof schema === 'string') {
      assert(isAbsolute(schema), 'schema must be absolute path');
      schema = require(schema);
    }
    const ajv = new Ajv();
    const validate = ajv.compile(schema as Schema);
    assert(
      validate(data),
      'configs are not valid: ' + ajv.errorsText(validate.errors)
    );
  }
}

export default Traits;
