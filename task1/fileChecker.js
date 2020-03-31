const fs = require('fs');
const promises = fs.promises;
const chalk = require('chalk');

const exit = process.exit;

const checkFile = (filename, stream, isRead) => {
  const mode = isRead ? fs.constants.R_OK : fs.constants.W_OK;
  const error = isRead
    ? chalk.white.bgRed.bold('\n error: no access to read(input) file ') +
      chalk.white.bgGreenBright.bold(' file not found or incorrect directory')
    : chalk.white.bgRed.bold('\n error: no access to write(output) file ') +
      chalk.white.bgGreenBright.bold(' file not found or incorrect directory');

  return promises
    .access(filename, mode)
    .then(() => promises.lstat(filename))
    .then(result => {
      if (result.isDirectory()) {
        throw Error();
      }
      return true;
    })
    .then(() => {
      return stream(filename);
    })
    .catch(() => {
      console.log(error);
      exit(1);
    });
};

exports.createRS = async filename => {
  return checkFile(filename, fs.createReadStream, true);
};

exports.createWS = async filename => {
  return checkFile(filename, fs.createWriteStream, false);
};
