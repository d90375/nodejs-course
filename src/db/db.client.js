const { fillMagenta } = require('../common/chalk');

const connectToDB = queueCb => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb+srv://admin:admin@cluster0-dp9sj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log(fillMagenta(`We're connected!`));
    queueCb();
  });
};

module.exports = { connectToDB };
