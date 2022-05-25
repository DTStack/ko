export const getCacheIdentifier = require('./getCacheIdentifier');

export function getResolvePath(name: string) {
  const resolvePath = require.resolve(name);
  return resolvePath;
}
