import { isAbsolute } from 'path';

const NODE_MODULE_REGEX = /node_modules/;
const STYLE_REGEX = /\.(css|s(a|c)ss|less)$/;

export function checkIfMatch(
  path: string,
  {
    externals,
    alias,
  }: {
    externals: Record<string, string>;
    alias: Record<string, string>;
  }
) {
  if (path.startsWith('.')) return false;
  if (STYLE_REGEX.test(path)) return false;
  if (/dt-common|dt-react-component/.test(path)) return false;
  if (externals[path]) return false;
  if (isAbsolute(path)) return NODE_MODULE_REGEX.test(path);
  if (alias[path]) return NODE_MODULE_REGEX.test(alias[path]);
  return true;
}
