const chalk = require('chalk');

const fillGreen = text => {
  return chalk.white.bgGreenBright.bold(text);
};

const fillRed = text => {
  return chalk.white.bgRed.bold(text);
};

const fillYellow = text => {
  return chalk.white.bgYellowBright.bold(text);
};

const fillBlue = text => {
  return chalk.white.bgBlueBright.bold(text);
};

const fillMagenta = text => {
  return chalk.white.bgMagentaBright.bold(text);
};

module.exports = {
  fillGreen,
  fillRed,
  fillYellow,
  fillBlue,
  fillMagenta
};
