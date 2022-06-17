import { UserConfig, ProxyOptions } from 'vite';
import { IOptions } from '../core/types';

function getViteServerConfig(opts: IOptions): UserConfig {
  return {
    server: {
      port: opts.serve.port,
      host: opts.serve.host,
      proxy: opts.serve.proxy as Record<string, string | ProxyOptions>,
    }
  }
}

export default getViteServerConfig;