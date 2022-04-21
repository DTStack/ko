import swc, { Options } from '@swc/core';
import { LoaderContext } from 'webpack';

interface LoaderOptions {}

async function swcLoader(this: LoaderContext<LoaderOptions>, source: string) {
  const callback = this.async();
  const filename = this.resourcePath;
  const options = this.getOptions();
  const finalOptions: Options = { filename, ...options };
  if (this.mode === 'development') {
    finalOptions.jsc.transform.react.development = true;
  }
  try {
    const output = await swc.transform(source, finalOptions);
    callback(null, output.code, output.map);
  } catch (ex) {
    callback(ex as Error);
  }
}

export default swcLoader;
