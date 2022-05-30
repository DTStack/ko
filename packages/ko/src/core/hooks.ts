import { AsyncSeriesWaterfallHook } from 'tapable';
import { HookItem, ACTION, HookOptions } from './types';

class Hooks {
  private hooks: Record<string, Record<ACTION, HookItem[]>>;
  constructor() {
    this.hooks = {};
  }

  register({ key, action, opts }: HookOptions) {
    this.hooks[key] ||= {
      [ACTION.ADD]: [],
      [ACTION.UPDATE]: [],
    };
    this.hooks[key][action].push(opts);
  }

  apply(opts: { key: string; args?: any }) {
    const hooks = this.hooks[opts.key];
    const tapInstance = new AsyncSeriesWaterfallHook(['ctx']);
    hooks[ACTION.ADD].forEach(hook => {
      tapInstance.tapPromise(
        { name: hook.name, stage: hook.stage, before: hook.before },
        async (ctx: any) => {
          const result = await hook.fn(opts.args);
          return ctx.concat(result);
        }
      );
    });
    hooks[ACTION.UPDATE].forEach(hook => {
      tapInstance.tapPromise(
        { name: hook.name, stage: hook.stage, before: hook.before },
        async ctx => {
          const result = await hook.fn(ctx, opts.args);
          return result;
        }
      );
    });
    return tapInstance.promise(true);
  }
}

export default Hooks;
