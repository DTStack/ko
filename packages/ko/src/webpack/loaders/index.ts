import Style from './style';
import asset from './asset';
import Script from './script';
import { IWebpackOptions } from '../../types';

const loaders = (opts: IWebpackOptions) => {
  const scripts = new Script(opts);
  const style = new Style(opts);
  return [...asset, ...style.config, ...scripts.config];
};

export default loaders;
