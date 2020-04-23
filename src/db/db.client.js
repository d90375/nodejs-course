const mongoose = require('mongoose');
const { fillMagenta } = require('../common/chalk');

const { MONGO_CONNECTION_STRING } = require('../common/config');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/boards.model');
const Task = require('../resources/tasks/tasks.model');

const usersJSON = require('../data/userData.json');
const boardsJSON = require('../data/boardData.json');
const tasksJSON = require('../data/taskData.json');

const users = usersJSON.map(user => new User(user));
const boards = boardsJSON.map(board => new Board(board));
const tasks = tasksJSON.map(task => new Task(task));


const connectToDB = queueCb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(fillMagenta(`We're mongoDB connected!`));
    db.dropDatabase();
    setTimeout(() => {
      users.forEach(user => user.save());
      boards.forEach(board => board.save());
      tasks.forEach(task => task.save());
      queueCb();
    }, 1000);
  });
};

module.exports = { connectToDB };
