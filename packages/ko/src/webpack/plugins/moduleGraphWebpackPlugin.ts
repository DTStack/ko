import { join } from 'path';
import { existsSync } from 'fs';
import { Compiler, container } from 'webpack';
import ModuleGraph from './moduleGraph';
import { IWebpackOptions } from '../../core/types';

class ModuleGraphWebpackPlugin {
  private opts: IWebpackOptions;
  private moduleGraph: ModuleGraph;
  private depSet: Set<string> = new Set();
  constructor(opts: IWebpackOptions, remoteName: string = 'ko') {
    this.opts = opts;
    this.moduleGraph = new ModuleGraph(opts);
    this.depSet = this.findAllDependencies(this.opts.cwd);
  }

  findAllDependencies(cwd: string, dep: number = 2) {
    const pkgPathList = [];
    for (let i = 0; i < dep; i++) {
      if (i === 0) {
        pkgPathList.push('package.json');
      } else {
        pkgPathList.push('../'.repeat(dep) + 'package.json');
      }
      return pkgPathList
        .map((path) => this.readPkgFile(join(cwd, path)))
        .reduce((prev, curr) => {
          Object.keys(curr).forEach((key) => {
            if (
              !/@types|@testing-library|dt-react-component|dt-common/.test(key)
            ) {
              prev.add(key);
            }
          });
          return prev;
        }, new Set());
    }
  }

  readPkgFile(path: string) {
    if (existsSync(path)) {
      return require(path)?.dependencies || {};
    }
    return {};
  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeRun.tap('ModuleGraphWebpackPlugin', (compiler) => {
      compiler.options.plugins.push();
    });
  }

  // get moduleFederationConfig() {}

  // apply(compiler: Compiler) {
  //   compiler.hooks.emit.tapAsync(
  //     'ModuleGraphWebpackPlugin',
  //     (compilation, callback) => {
  //       this.moduleGraph.collect(this.depSet);
  //       this.moduleGraph.write(this.opts.cwd);
  //       callback();
  //     }
  //   );
  // }

  // apply(compiler: Compiler) {
  //   const includeRegex = new RegExp(Array.from(this.depSet).join('|'));
  //   compiler.hooks.normalModuleFactory.tap(
  //     'ModuleGraphWebpackPlugin',
  //     factory => {
  //       factory.hooks.parser
  //         .for('javascript/auto')
  //         .tap('ModuleGraphWebpackImportPlugin', parser => {
  //           parser.hooks.import.tap(
  //             'ModuleGraphWebpackImportPlugin',
  //             (statement: any, source: any) => {
  //               if (this.moduleGraph.checkIfMatch(source, includeRegex)) {
  //                 this.moduleGraph.onMatch(source);
  //               }
  //             }
  //           );
  //         });
  //     }
  //   );
  // }
}

export default ModuleGraphWebpackPlugin;
