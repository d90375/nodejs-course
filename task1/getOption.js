const chalk = require('chalk');

const ALPHABET = 26;
const exit = process.exit;

const getOption = program => {
  const option = {};
  switch (program.action) {
    case 'encode':
      break;
    case 'decode':
      break;
    default:
      console.error(
        chalk.white.bgRed.bold('\n error: ') +
          chalk.red('incorrect action input add -a / -action attribute ') +
          chalk.white.bgGreenBright.bold(' For more info see README.MD ')
      );
      exit(1);
  }
  option.action = program.action;

  option.shift = parseInt(program.shift, 10);
  if (isNaN(option.shift) || option.shift <= 0) {
    console.error(
      chalk.white.bgRed.bold('\n error:  ') + chalk.red('incorrect shift input')
    );
    exit(1);
  }

  program.shift = program.shift % ALPHABET;

  option.input = program.input ? program.input : false;
  option.output = program.output ? program.output : false;
  return option;
};

module.exports = getOption;
