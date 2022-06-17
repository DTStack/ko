import autoprefixer from 'autoprefixer';
import { UserConfig } from 'vite';
import { Plugin } from 'postcss';
import { IOptions } from '../core/types';

function getPostcssOptions(extraPostCSSPlugins?: Plugin[]) {
  if (extraPostCSSPlugins) {
    return {
      plugins: [
        autoprefixer(),
        ...extraPostCSSPlugins
      ]
    }
  } else {
    return {
      plugins: [
        autoprefixer()
      ]
    }
  }
  
}

function getViteSharedOptions(opts: IOptions):UserConfig {
  return {
    root: opts.cwd,
    base: opts.publicPath,
    resolve: {
      alias: opts.alias,   
    },
    css: {
      postcss: getPostcssOptions(opts.extraPostCSSPlugins)
    },
  }
}

export default getViteSharedOptions;