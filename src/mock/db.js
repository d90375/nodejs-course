const { createUsers } = require('./user');
const { createBoards } = require('./board');
const fs = require('fs').promises;
const path = require('path');
const { fillGreen, fillRed } = require('../common/chalk');

const exit = process.exit;

const users = createUsers(5);
fs.writeFile(
  path.join(__dirname, '../data', 'userData.json'),
  JSON.stringify(users)
)
  .then(() => console.log(fillGreen('User db created')))
  .catch(err => {
    console.log(fillRed(`User db cannot be created ${err}`));
    exit(1);
  });

const boards = createBoards(5);
fs.writeFile(
  path.join(__dirname, '../data', 'taskData.json'),
  JSON.stringify(boards)
)
  .then(() => console.log(fillGreen('Boards db created')))
  .catch(err => {
    console.log(fillRed(`Boards db cannot be created ${err}`));
    exit(1);
  });
