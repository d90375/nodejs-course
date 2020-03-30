const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

// console.log(process.argv);
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
// console.log(__dirname);

const outputFilePath = path.join(__dirname, process.argv[2]);
const inputFilePath = path.join(__dirname, process.argv[3]);
console.log('outputFilePath: ', outputFilePath);
//
fs.readFile(inputFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('err');
  }
  console.log(data);
});

const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile(outputFilePath, data, err => {
  if (err) {
    console.error('err#2');
  }
  console.log('The file has been saved! ', data);
});

const transform_stream = data1 => data1;

pipeline(
  inputFilePath, // input file stream or stdin stream
  transform_stream, // standard Transform stream or https://github.com/rvagg/through2
  outputFilePath // output file stream or stdout stream
).then((a, e) => {
  console.log('a: ', a);
  console.log('e: ', e);
});
