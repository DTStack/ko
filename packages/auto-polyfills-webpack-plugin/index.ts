import { createHash } from 'crypto';
import { join, basename } from 'path';
import {
  existsSync,
  readFileSync,
  rmSync,
  readdirSync,
  statSync,
  writeFileSync,
  copyFileSync,
} from 'fs';
import { Compiler } from 'webpack';
import { getHooks } from 'html-webpack-plugin';
import { minify } from 'terser';
// @ts-ignore
import builder from 'core-js-builder';

export type IOpts = {
  cwd?: string;
  browserslistPath?: string;
  hashType?: string;
  customPrefix?: string;
  excludeCoreJsModules?: (string | RegExp)[];
  longTermCache?: boolean;
};

class AutoPolyfillsWebpackPlugin {
  static defaultBrowserslistPath = '.browserslistrc';
  private opts: IOpts;
  private targetHash: string;
  private strBeforeHash: string;
  private polyfillFilename: string;
  constructor(opts: IOpts = {}) {
    this.opts = opts;
    this.opts.cwd ||= process.cwd();
    this.opts.browserslistPath ||= join(
      this.opts.cwd,
      AutoPolyfillsWebpackPlugin.defaultBrowserslistPath
    );
    if (!existsSync(this.opts.browserslistPath)) {
      throw new Error(
        `browserslist file not find,please check if it has been placed in correct path.`
      );
    }
    this.opts.customPrefix ||= 'dt';
    this.strBeforeHash = `${this.opts.customPrefix}-polyfills-`;
    this.opts.excludeCoreJsModules ||= [];
    this.opts.hashType ||= 'md5';
    this.opts.longTermCache =
      typeof this.opts.longTermCache === 'boolean' && !this.opts.longTermCache
        ? false
        : true;
  }

  apply(compiler: Compiler) {
    if (
      compiler.options.mode === 'development' ||
      process.env.NODE_ENV === 'development'
    ) {
      return;
    }
    compiler.hooks.beforeRun.tapPromise(
      AutoPolyfillsWebpackPlugin.name,
      async () => {
        const polyfillsFiles = this.getDirPolyfillsFiles();
        const targetHashContent = JSON.stringify({
          coreJsVersion: this.coreJsVersion,
          browserslistQuery: this.browserslistQuery,
        });
        this.targetHash = this.getHashResult(targetHashContent);
        // polyfills file name should like `dt-polyfills-${hash}.js`
        this.polyfillFilename = `${this.strBeforeHash}${this.targetHash}.js`;
        let polyfillExist = false;
        polyfillsFiles.forEach(file => {
          const baseName = basename(file, '.js');
          const [_, originHash] = baseName.split(this.strBeforeHash);
          if (originHash === this.targetHash) {
            polyfillExist = true;
          } else {
            rmSync(join(this.opts.cwd!, file));
          }
        });
        if (!polyfillExist) {
          await this.generatePolyfillEntry();
        }
      }
    );
    compiler.hooks.compilation.tap(
      AutoPolyfillsWebpackPlugin.name,
      compilation => {
        // html-webpack-plugin hook
        const htmlWebpackHooks = getHooks(compilation);
        const htmlWebpackHookName = `${AutoPolyfillsWebpackPlugin.name}-html-plugin`;
        htmlWebpackHooks.beforeAssetTagGeneration.tapAsync(
          htmlWebpackHookName,
          (data, callback) => {
            const { js: originJsAssets, publicPath } = data.assets;
            originJsAssets.unshift(
              [publicPath, this.polyfillFilename].join('')
            );
            callback(null, data);
          }
        );
      }
    );
    compiler.hooks.afterEmit.tapPromise(
      AutoPolyfillsWebpackPlugin.name,
      async () => {
        const polyfillPath = join(this.opts.cwd!, this.polyfillFilename);
        copyFileSync(
          polyfillPath,
          join(compiler.options.output.path!, this.polyfillFilename)
        );
        if (!this.opts.longTermCache) {
          rmSync(polyfillPath);
        }
      }
    );
  }

  getDirPolyfillsFiles() {
    return readdirSync(this.opts.cwd!).filter(
      path =>
        path.includes(this.strBeforeHash) &&
        !statSync(join(this.opts.cwd!, path)).isDirectory()
    );
  }

  async generatePolyfillEntry() {
    const filename = join(this.opts.cwd!, this.polyfillFilename);
    try {
      const bundleContent = await builder({
        targets: this.browserslistQuery,
        exclude: this.opts.excludeCoreJsModules,
      });
      const { code } = await minify(bundleContent);
      writeFileSync(filename, code!);
    } catch (ex) {
      throw ex;
    }
  }

  getHashResult(content: string) {
    const hash = createHash(this.opts.hashType!);
    hash.update(content);
    return hash.digest('hex');
  }

  get coreJsVersion() {
    try {
      const coreJsPath = require.resolve('core-js');
      // Windows’s path separator is \\, MacOS and Linux is /
      const splitKey = coreJsPath.includes('/') ? '/' : '\\';
      const coreJsPathList = coreJsPath.split(splitKey);
      coreJsPathList.pop();
      const coreJsPkg = join(coreJsPathList.join(splitKey), './package.json');
      return require(coreJsPkg).version;
    } catch (ex) {
      throw ex;
    }
  }

  get browserslistQuery() {
    try {
      const content = readFileSync(this.opts.browserslistPath!, 'utf-8');
      const queryList = content
        .split('\n')
        .map(txt => txt.replace(/#((\s)*(\w)+)*/, '').trim())
        .filter(Boolean);
      return queryList.join(',');
    } catch (ex) {
      throw ex;
    }
  }
}

export default AutoPolyfillsWebpackPlugin;
