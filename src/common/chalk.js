const chalk = require('chalk');

const fillGreen = text => {
  return chalk.white.bgGreen.bold(text);
};

const fillRed = text => {
  return chalk.white.bgRed.bold(text);
};

const fillYellow = text => {
  return chalk.black.bgYellow.bold(text);
};

const fillBlue = text => {
  return chalk.white.bgBlue.bold(text);
};

const fillMagenta = text => {
  return chalk.white.bgMagenta.bold(text);
};

module.exports = {
  fillGreen,
  fillRed,
  fillYellow,
  fillBlue,
  fillMagenta
};
