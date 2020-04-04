const { createUsers } = require('./user');
const fs = require('fs').promises;
const path = require('path');
const { fillGreen, fillRed } = require('../common/chalk');

const exit = process.exit;

const users = createUsers(5);
fs.writeFile(
  path.join(__dirname, '../data', 'userData.json'),
  JSON.stringify(users)
)
  .then(() => console.log(fillGreen('db created')))
  .catch(err => {
    console.log(fillRed(`db cannot be created ${err}`));
    exit(1);
  });
