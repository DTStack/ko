import getViteSharedOptions from './shared';
import getViteServerConfig from './server';

import { UserConfig } from 'vite';
import { IOptions } from '../core/types';


class ViteConfig {
  private opts: IOptions;
  constructor(opts: IOptions) {
    this.opts = opts;
  }
}

export default ViteConfig;