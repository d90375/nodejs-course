const fs = require('fs');
const { program } = require('commander');
const { pipeline } = require('stream');
const getOption = require('./getOption');
const Transformer = require('./transformer');
const chalk = require('chalk');

program
  .requiredOption('-a, --action <type>', 'action')
  .requiredOption('-s, --shift <number>', 'shift')
  .option('-i, --input <type>', 'input ')
  .option('-o, --output <type>', 'output', 'output.txt')
  .parse(process.argv);

const result = getOption(program);

const cipher = async args => {
  const { action, shift } = args;
  pipeline(
    fs.createReadStream('task1/input.txt'),
    new Transformer({
      shift,
      action
    }),
    fs.createWriteStream('task1/output.txt'),
    err => {
      if (err) {
        console.error(
          chalk.white.bgRed.bold('\nerror: ') +
            chalk.red('incorrect pipeline\n')
        );
        console.log(err);
      } else {
        console.info(chalk.white.bgGreenBright.bold('Pipelined!'));
      }
    }
  );
};

cipher(result);
