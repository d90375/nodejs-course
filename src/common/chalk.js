const chalk = require('chalk');

const fillGreen = text => {
  return chalk.white.bgGreenBright.bold(text);
};

const fillRed = text => {
  return chalk.white.bgRed.bold(text);
};

module.exports = {
  fillGreen,
  fillRed
};
