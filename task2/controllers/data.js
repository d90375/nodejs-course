const fs = require('fs');
const path = require('path');
const util = require('util');

const rf = util.promisify(fs.readFile);

const getData = () => {
  return rf(path.join(__dirname, '../data/data.json'), 'utf-8').then(jsonData =>
    JSON.parse(jsonData)
  );
};

const getName = id => {
  return getData().then(data => data.find(name => name.id === id));
};

module.exports = {
  getData,
  getName
};
