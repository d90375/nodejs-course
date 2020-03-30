const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const caesar = require('./caesar');
const parseIntHere = n => parseInt(n, 10);

program
  .option('-a, --action <type>', 'action')
  .option('-i, --input <type>', 'input')
  .option('-o, --output <type>', 'verbosity')
  .option('-s, --shift <number>', 'repeatable value', parseIntHere);
program.parse(process.argv);

let setCaesar;
switch (program.action) {
  case 'encode':
    setCaesar = caesar.encode;
    break;
  case 'decode':
    setCaesar = caesar.decode;
    break;
  default:
    console.error('error decode');
}

const inputFilePath = path.join(__dirname, program.input);
const outputFilePath = path.join(__dirname, program.output);

fs.readFile(inputFilePath, 'utf-8', (inputError, data) => {
  if (inputError) {
    console.error(`error ${inputError} readFile`);
  }
  fs.writeFile(outputFilePath, setCaesar(data, program.shift), err => {
    if (err) throw err;
    console.log('File saved');
  });
});
