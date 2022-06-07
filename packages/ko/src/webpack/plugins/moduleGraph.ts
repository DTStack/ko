import { join, isAbsolute } from 'path';
import { writeFileSync } from 'fs';
import { debounce } from 'lodash';
import pkgUp from 'pkg-up';
import { IWebpackOptions } from '../../core/types';

const NODE_MODULE_REGEX = /node_modules/;
const STYLE_REGEX = /\.(css|s(a|c)ss|less)$/;

class ModuleGraph {
  private opts: IWebpackOptions;
  private externals: { [key: string]: string } = {};
  private alias: { [key: string]: string } = {};
  private isCollecting: true;
  private graphOutputPath: string;
  private graph: Record<string, string> = {};
  private version: Record<string, string> = {};
  constructor(opts: IWebpackOptions) {
    this.opts = opts;
    this.graphOutputPath = join(this.opts.cwd, 'ko.moduleGraph.json');
  }

  checkIfMatch(path: string, includeRegex: RegExp) {
    if (!includeRegex.test(path)) return false;
    if (path.startsWith('.')) return false;
    if (STYLE_REGEX.test(path)) return false;
    if (this.externals[path]) return false;
    if (isAbsolute(path)) return NODE_MODULE_REGEX.test(path);
    if (this.alias[path]) return NODE_MODULE_REGEX.test(this.alias[path]);
    return true;
  }

  onMatch(pkg: string) {
    const meta = this.getGraphMeta(pkg);
    if (meta) {
      if (this.graph[pkg]) {
        console.warn(`path ${pkg} has been defined, will be overwritten`);
      }
      this.graph[pkg] = meta.path;
      this.version[pkg] = meta.version;
      console.log(this.graph);
    }
  }

  getGraphMeta(pkg: string) {
    const realPkgName = pkg.split('/').shift()!;
    const resolvePath = require.resolve(realPkgName);
    const closestPkgFile = pkgUp.sync({
      cwd: resolvePath,
    });
    if (closestPkgFile) {
      const version = require(closestPkgFile).version;
      return {
        path: resolvePath,
        version,
      };
    }
    return null;
  }

  storageGraph() {
    debounce(() => {
      if (this.isCollecting) {
        writeFileSync(this.graphOutputPath, JSON.stringify(this.graph));
      }
    }, 1000);
  }
}

export default ModuleGraph;
