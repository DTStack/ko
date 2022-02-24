import { Options } from '../../interfaces';
import style from './style';
import asset from './asset';
import getScriptLoaders from './script';

function getLoaders(opts: Options) {
  return [...style, ...asset, ...getScriptLoaders(opts.ts)];
}

export default getLoaders;
