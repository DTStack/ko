const { Command } = require('commander');
const program = new Command();

const opts = {};

/**
 * attach program.opts() to process.env object
 * NOTICE:
 * Multi-word options such as "--template-engine" are camel-cased, becoming program.opts().templateEngine etc
 */
function attachOptions(program) {
  const options = program.opts();
  Object.assign(opts, options);
}

module.exports = {
  program,
  opts,
  attachOptions,
};
