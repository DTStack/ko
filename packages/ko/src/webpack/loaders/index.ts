import Style from './style';
import asset from './asset';
import Script from './script';
import { ILoaderOptions } from '../../core/types';

const loaders = (opts: ILoaderOptions) => {
  const scripts = new Script(opts);
  const style = new Style(opts);
  return [...asset, ...style.config, ...scripts.config];
};

export default loaders;
