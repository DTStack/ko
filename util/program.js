const { Command } = require('commander');
const program = new Command();

/**
 * attach program.opts() to process.env object
 * NOTICE:
 * Multi-word options such as "--template-engine" are camel-cased, becoming program.opts().templateEngine etc
 */
function attachOptionsToProcessEnv(program) {
  const opts = program.opts();
  Object.keys(opts).forEach(key => {
    process.env[key] = opts[key];
  });
}

module.exports = {
  program,
  attachOptionsToProcessEnv,
};
