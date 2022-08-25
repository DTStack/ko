import { ResolvePluginInstance, Resolver } from 'webpack';

export type IOptions = {
  source?: string;
  target?: string;
  dynamic: <T>(request: T) => T;
};

class DynamicResolveWebpackPlugin implements ResolvePluginInstance {
  private opts: IOptions;
  constructor(opts: IOptions) {
    this.opts = opts;
    if (!this.opts.dynamic) {
      throw new SyntaxError('dynamic callback function is noop');
    }
  }

  apply(resolver: Resolver) {
    const { source = 'file', target = 'final-file', dynamic } = this.opts;
    resolver.ensureHook(source);
    resolver.ensureHook(target);
    resolver
      .getHook(source)
      .tapAsync(DynamicResolveWebpackPlugin.name, (request, ctx, callback) => {
        const newResolve = dynamic(request);
        return resolver.doResolve(
          target,
          newResolve,
          `${DynamicResolveWebpackPlugin.name}: ${request.path}`,
          ctx,
          (err: Error, result: any) => {
            if (err) return callback(err);
            if (result) return callback(null, result);
            return callback();
          }
        );
      });
  }
}

export default DynamicResolveWebpackPlugin;
