const { PORT } = require('./common/config');
const app = require('./app');
const { fillGreen } = require('./common/chalk');
const logger = require('./common/logger');
const { connectToDB } = require('./db/db.client');

const exit = process.exit;

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(fillGreen(`App is running on http://localhost:${PORT}`))
  );
});

// TODO: uncomment if u need test UncaughtException / UnhandledRejection

// setTimeout(() => {
//   throw new Error('UncaughtException!');
// }, 1000);

process.on('uncaughtException', err => {
  logger.error(`captured error: ${err.message}`);

  exit(1);
});

// setTimeout(() => {
//   Promise.reject(new Error('UnhandledRejection!'));
// }, 1000);

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled Rejection, reason: ${reason}`);

  exit(1);
});
