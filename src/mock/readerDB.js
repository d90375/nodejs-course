const fs = require('fs').promises;
const db = require('./db');
const path = require('path');

const readData = async (file, data) => {
  const fileToRead = path.join(__dirname, '../data/', file);
  return fs
    .readFile(fileToRead)
    .then(data => JSON.parse(data))
    .then(result => {
      db[data] = [...result];
    })
    .catch(error => {
      console.log('readData -> error', error);
      const exit = process.exit;
      exit(1);
    });
};

const generateDB = async () => {
  await readData('userData.json', 'users');
  await readData('boardData.json', 'boards');
  await readData('userData.json', 'tasks');
};

module.exports = generateDB;
