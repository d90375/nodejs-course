const fs = require('fs').promises;
const path = require('path');
const { createUsers } = require('./user');
const { createBoards } = require('./board');
const { createTasks } = require('./task');
const { fillGreen, fillRed } = require('../common/chalk');
const db = require('./db');

const exit = process.exit;

const JSONUsers = createUsers(3);
db.users = [...JSONUsers];

console.log(db);

fs.writeFile(
  path.join(__dirname, '../data', 'userData.json'),
  JSON.stringify(JSONUsers)
)
  .then(() => console.log(fillGreen('User db created')))
  .catch(err => {
    console.log(fillRed(`User db cannot be created ${err}`));
    exit(1);
  });

const JSONBoards = createBoards(3);
db.boards = [...JSONBoards];

fs.writeFile(
  path.join(__dirname, '../data', 'boardData.json'),
  JSON.stringify(JSONBoards)
)
  .then(() => console.log(fillGreen('Boards db created')))
  .catch(err => {
    console.log(fillRed(`Boards db cannot be created ${err}`));
    exit(1);
  });

const JSONTasks = createTasks(JSONBoards, JSONUsers);
db.tasks = [...JSONTasks];

fs.writeFile(
  path.join(__dirname, '../data', 'taskData.json'),
  JSON.stringify(JSONTasks)
)
  .then(() => console.log(fillGreen('Tasks db created')))
  .catch(err => {
    console.log(fillRed(`Tasks db cannot be created ${err}`));
    exit(1);
  });
