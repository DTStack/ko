const server = require('pushstate-server');
const paths = require('../config/defaultPaths');
const colors = require('colors');
module.exports = (program) => {
  const directory = program.dist
    ? paths.resolveApp(program.dist)
    : paths.appDist;

  const port = program.port || 1234;
  const host = program.ip || '127.0.0.1';
  server.start({
    port,
    host,
    directory,
  });
  console.log(
    [
      `\n    - directory:   ${colors.yellow(directory)}`,
      `    - Local:   ${colors.yellow('http://' + host + ':' + port)}`,
    ].join('\n')
  );
};
