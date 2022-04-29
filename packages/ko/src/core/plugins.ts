import { isAbsolute } from 'path';
import Ajv, { Schema } from 'ajv';
import { AsyncSeriesWaterfallHook } from 'tapable';
import Service from './service';
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
type EventItem = {
  key: string;
  name: string;
  fn: Function;
  stage?: number;
};

enum ACTION {
  ADD = 'add',
  UPDATE = 'update',
}

class Plugins {
  private hooks: Record<string, HookItem[]>;
  private events: Record<string, EventItem[]>;
  private service: Service;
  constructor(service: Service) {
    this.hooks = {};
    this.events = {};
    this.service = service;
  }
  register(opts: HookItem) {
    const { key } = opts;
    this.hooks[key] ||= [];
    opts.fn = (data: any) => {
      const { schema } = opts;
      if (schema) {
        this.schemaValidate(schema, data);
      }
      return opts.fn;
    };
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

  registerEvent(opts: EventItem) {
    const { key } = opts;
    this.events[key] ||= [];
    this.events[key].push(opts);
  }

  applyEvent(opts: { key: string; args?: any }) {
    const events = this.events[opts.key];
    events
      .sort((a, b) => {
        return (a.stage || 0) - (b.stage || 0);
      })
      .forEach(event => {
        event.fn(opts.args);
      });
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

export default Plugins;
