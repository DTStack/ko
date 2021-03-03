const { Command } = require('commander');
const program = new Command();

/**
 * NOTICE:
 * Multi-word options such as "--template-engine" are camel-cased, becoming program.opts().templateEngine etc
 */
const opts = program.opts();

module.exports = {
  program,
  opts,
};
