const prettier = require('prettier');
const { join } = require('fs');
const { findRealPath } = require('./utils');

function formatFilesWithPrettier(files, configPath?) {
  const prettierConfig = configPath
    ? require(findRealPath(configPath))
    : require('ko-config/prettier');
  console.log(prettierConfig);
  const ret = prettier.getFileInfo.sync(files);
  console.log(ret);
}

formatFilesWithPrettier(join(__dirname, './foo/index.js'));