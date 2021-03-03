const { resolve } = require('path');

function getFileRealPath(path) {
  return resolve(process.cwd(), path);
}

module.exports = {
  getFileRealPath,
};
