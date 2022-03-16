const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const filepath = join(__dirname, '../docs/advanced/migration.md');

function main() {
  try {
    const { plugins, loaders } = getPluginsAndLoaders();
    const replacedContent = replaceContent(plugins, loaders);
    writeFileSync(filepath, replacedContent);
  } catch (ex) {
    console.error(ex);
  }
}

function getPluginsAndLoaders() {
  const pkg = require('../../packages/ko/package.json');
  const plugins = [],
    loaders = [];
  Object.keys(pkg.dependencies).map(key => {
    if (/webpack-plugin$/.test(key)) {
      plugins.push(key);
    }
    if (/loader$/.test(key)) {
      loaders.push(key);
    }
  });
  return { plugins, loaders };
}

function replaceContent(plugins, loaders) {
  const content = readFileSync(filepath, 'utf8');
  return content
    .replace('loaderList', loaders.map(i => `* ${i}`).join('\n'))
    .replace('pluginList', plugins.map(i => `* ${i}`).join('\n'));
}

main();
