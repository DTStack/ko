import style from './style';
import asset from './asset';
import Script from './script';
import { ILoaderOptions } from '../../core/types';

const loaders = (opts: ILoaderOptions) => {
  const scripts = new Script(opts);
  return [...style, ...asset, ...scripts.loaders];
};

export default loaders;
