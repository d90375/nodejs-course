const { program } = require('commander');
const chalk = require('chalk');
const { pipeline } = require('stream');
const getOption = require('./getOption');
const Transformer = require('./transformer');
const { createRS, createWS } = require('./fileChecker');

program
  .requiredOption('-a, --action <type>', 'action')
  .requiredOption('-s, --shift <number>', 'shift')
  .option('-i, --input <type>', 'input ')
  .option('-o, --output <type>', 'output')
  .parse(process.argv);

const result = getOption(program);
const exit = process.exit;

const cipher = async args => {
  const { input, output, action, shift } = args;
  let readStream;

  if (input) {
    readStream = await createRS(input);
  } else {
    if (!input && output) {
      console.log(
        chalk.white.bgRed.bold('\nerror: ') +
          chalk.red("Input file doesn't exist or incorrect ")
      );
      exit(1);
    }
    console.log(
      chalk.white.bgRed.bold('\nerror: ') +
        chalk.red("Input file doesn't exist or incorrect ") +
        chalk.white.bgGreenBright.bold(' try 2 write text (cmd) ') +
        chalk.white.bgBlueBright.bold(' if u need exit press ctrl + c \n')
    );

    readStream = process.stdin;
  }

  const writeStream = output ? await createWS(output) : process.stdout;

  pipeline(
    readStream,
    new Transformer({
      shift,
      action
    }),
    writeStream,
    err => {
      if (err) {
        console.error(
          chalk.white.bgRed.bold('\nerror: ') +
            chalk.red('Incorrect pipeline\n')
        );
        console.log(err);
      } else {
        console.info(chalk.white.bgGreenBright.bold('Pipelined!'));
      }
    }
  );
};

cipher(result);
