const chalk = require('chalk');
const ALPHABET = 26;

const getOption = program => {
  const option = {};
  switch (program.action) {
    case 'encode':
      break;
    case 'decode':
      break;
    default:
      console.error(
        chalk.white.bgRed.bold('\n error:  ') +
          chalk.red('incorrect action input')
      );
  }
  option.action = program.action;

  if (isNaN(program.shift)) {
    console.error(
      chalk.white.bgRed.bold('\n error:  ') + chalk.red('incorrect shift input')
    );
  }

  program.shift = program.shift % ALPHABET;
  option.shift = parseInt(program.shift, 10);

  option.input = program.input ? program.input : false;
  option.output = program.output ? program.output : false;
  return option;
};

module.exports = getOption;
