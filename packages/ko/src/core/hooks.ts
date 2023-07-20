import { AsyncSeriesWaterfallHook } from 'tapable';
import { HookItem, ACTION, HOOK_KEY_SET, HookOptions } from '../types';
import webpack from 'webpack';

class Hooks {
  private hooks: Record<string, Record<ACTION, HookItem[]>>;
  public hookKeySet = HOOK_KEY_SET;
  constructor() {
    this.hooks = {};
  }

  public register({ key, action, opts }: HookOptions) {
    this.hooks[key] ||= {
      [ACTION.ADD]: [],
      [ACTION.UPDATE]: [],
    };
    this.hooks[key][action].push(opts);
  }

  public apply(opts: { key: string; context?: any }) {
    const hooks = this.hooks[opts.key];
    if (!hooks) return Promise.resolve(opts.context);
    const tapInstance = new AsyncSeriesWaterfallHook(['ctx']);
    hooks[ACTION.ADD].forEach(hook => {
      tapInstance.tapPromise(
        { name: hook.name, stage: hook.stage, before: hook.before },
        async (ctx: any) => {
          const result = await hook.fn(ctx, webpack);
          return ctx.concat(result);
        }
      );
    });
    hooks[ACTION.UPDATE].forEach(hook => {
      tapInstance.tapPromise(
        { name: hook.name, stage: hook.stage, before: hook.before },
        async ctx => {
          const result = await hook.fn(ctx, webpack);
          return result;
        }
      );
    });
    return tapInstance.promise(opts.context);
  }
}

export default Hooks;
