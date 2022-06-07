import Style from './style';
import asset from './asset';
import Script from './script';
import { IWebpackOptions } from '../../core/types';
import ModuleGraph from '../plugins/moduleGraph';

const loaders = (opts: IWebpackOptions, moduleGraph?: ModuleGraph) => {
  const scripts = new Script(opts, moduleGraph);
  const style = new Style(opts);
  return [...asset, ...style.config, ...scripts.config];
};

export default loaders;
