const fs = require('fs');
const path = require('path');

const { program } = require('commander');
const caesar = require('./caesar');

const parseIntHere = n => parseInt(n, 10);

program
  .option('-a, --action <type>', 'action')
  .option('-i, --input <type>', 'input')
  .option('-o, --output <type>', 'verbosity that can be increased')
  .option('-s, --shift <number>', 'repeatable value', parseIntHere);

program.parse(process.argv);
switch (program.action) {
  case 'encode':
    console.log('start code');
    break;
  case 'decode':
    console.log('start decode');
    break;
  default:
    console.error('error');
}

const inputFilePath = path.join(__dirname, program.input);

const outputFilePath = path.join(__dirname, program.output);

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('err');
  }
  fs.writeFile(outputFilePath, caesar(data), errOutput => {
    if (errOutput) throw errOutput;
    console.log('The file has been saved!');
  });
});
