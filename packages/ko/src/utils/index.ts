export function getCacheIdentifier(env: string, pkgs: string[]): string {
  let cacheIdentifier = env || '';
  Object.values(pkgs).forEach(pkgName => {
    cacheIdentifier += `:${pkgName}@`;
    cacheIdentifier += require(`${pkgName}/package.json`).version || '';
  });
  return cacheIdentifier;
}

export function getResolvePath(name: string) {
  const resolvePath = require.resolve(name);
  return resolvePath;
}
