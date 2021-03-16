const { Command } = require('commander');
const program = new Command();

/**
 * attach program.opts() to process.env object
 * NOTICE:
 * Multi-word options such as "--template-engine" are camel-cased, becoming program.opts().templateEngine etc
 */
function attachOptions(program) {
  const opts = program.opts();
  module.exports.opts = Object.assign({}, opts);
}

module.exports.program = program;
module.exports.attachOptions = attachOptions;
