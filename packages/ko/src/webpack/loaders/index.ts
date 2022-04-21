import style from './style';
import asset from './asset';
import Script from './script';
import Config from '../../utils/config';

const loaders = (config: typeof Config) => {
  const scripts = new Script(config.isProductionEnv);
  return [...style, ...asset, ...scripts.loaders];
};

export default loaders;
