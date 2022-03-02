import style from './style';
import asset from './asset';
import script from './script';

const loaders = [...style, ...asset, ...script];

export default loaders;
