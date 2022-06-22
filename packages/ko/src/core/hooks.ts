import { AsyncSeriesWaterfallHook } from 'tapable';
import { HookItem, ACTION, HookOptions } from '../types';

enum HOOK_KEY_SET {
  WEBPACK_PLUGIN = 'WebpackPlugin',
}

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
    const tapInstance = new AsyncSeriesWaterfallHook(['ctx']);
    hooks[ACTION.ADD].forEach(hook => {
      tapInstance.tapPromise(
        { name: hook.name, stage: hook.stage, before: hook.before },
        async (ctx: any) => {
          const result = await hook.fn(ctx);
          return ctx.concat(result);
        }
      );
    });
    hooks[ACTION.UPDATE].forEach(hook => {
      tapInstance.tapPromise(
        { name: hook.name, stage: hook.stage, before: hook.before },
        async ctx => {
          const result = await hook.fn(ctx);
          return result;
        }
      );
    });
    return tapInstance.promise(opts.context);
  }
}

export default Hooks;
