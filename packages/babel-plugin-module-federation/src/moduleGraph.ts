import { join } from 'path';
import { writeFileSync } from 'fs';
import { debounce } from 'lodash';
import pkgUp from 'pkg-up';

class ModuleGraph {
  private cwd: string;
  private isCollecting: true;
  private graphOutputPath: string;
  private graph: Record<string, string> = {};
  private version: Record<string, string> = {};
  constructor() {
    this.cwd = process.cwd();
    this.graphOutputPath = join(this.cwd, 'ko.moduleGraph.json');
  }

  onMatch(pkg: string) {
    const meta = this.getGraphMeta(pkg);
    if (meta) {
      if (this.graph[pkg]) {
        console.warn(`path ${pkg} has been defined, will be overwritten`);
      }
      this.graph[pkg] = meta.path;
      this.version[pkg] = meta.version;
      debugger;
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

//TODO: refactor this
let instance: ModuleGraph;

function getModuleGraph(): ModuleGraph {
  if (instance) {
    return instance;
  } else {
    instance = new ModuleGraph();
    return instance;
  }
}

export default getModuleGraph;
