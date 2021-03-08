const colors = require('colors');
const ora = require('ora');

function inProcess(conf) {
  const {
    initStr = 'process start',
    spinStr = 'in process',
    spinColor = 'yellow',
    process,
  } = conf;
  const spinner = ora(initStr).start();
  setTimeout(() => {
    spinner.text = spinStr;
    spinner.color = spinColor;
  }, 100);
  process();
  spinner.stop();
}

function logWithColor(color, text) {
  try {
    if (color) {
      console.log(colors[color](text));
    } else {
      console.log(text);
    }
  } catch (ex) {
    console.error(ex);
  }
}

module.exports = {
  inProcess,
  logWithColor,
};
