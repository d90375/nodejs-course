const mongoose = require('mongoose');
const { fillMagenta } = require('../common/chalk');
const User = require('../resources/users/user.model');
const usersJSON = require('../data/userData.json');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const users = usersJSON.map(user => new User(user));

const connectToDB = queueCb => {
  const mongoose = require('mongoose');
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(fillMagenta(`We're connected!`));
    // db.dropDatabase();
    // users.forEach(user => user.save());
    queueCb();
  });
};

module.exports = { connectToDB };
