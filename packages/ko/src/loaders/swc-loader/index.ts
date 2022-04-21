import { transform, Options, JscConfig } from '@swc/core';
import { LoaderContext } from 'webpack';
interface LoaderOptions {}

async function swcLoader(this: LoaderContext<LoaderOptions>, source: string) {
  const callback = this.async();
  const filename = this.resourcePath;
  const options = this.getOptions();
  const defaultJscConfig: JscConfig = {
    transform: {
      react: {
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        throwIfNamespace: true,
        development: this.mode === 'development',
        useBuiltins: false,
      },
    },
  };
  const finalOptions: Options = { filename, jsc: defaultJscConfig, ...options };
  try {
    const output = await transform(source, finalOptions);
    callback(null, output.code, output.map);
  } catch (ex) {
    callback(ex as Error);
  }
}

export default swcLoader;
