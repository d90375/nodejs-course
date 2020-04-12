const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/tasks.router');
const boardRouter = require('./resources/boards/boards.router');
const logger = require('./helpers/logger');
const middleware = require('./middleware/middleware');
const { ValidationError } = require('./helpers/error');
const { fillRed, fillBlue, fillMagenta } = require('./common/chalk');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(middleware);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});


app.use((err, req, res, next) => {
  const { originalUrl, method, body, params } = req;

  logger.error({
    url: originalUrl,
    method,
    body,
    params
  });

  const { statusCode, message, statusName } = err;
  console.log(
    fillRed(
      `= ERROR =\nStatusName: ${statusName} - StatusCode: ${statusCode} - Message: ${message}`
    )
  );
  res.status(statusCode).send(message);
  next(err);
});

// process.on('uncaughtException', (error, origin) => {
//   console.error(
//     fillBlue(
//       `= uncaughtException =\nDate: ${new Date().toUTCString()} uncaughtException: ${
//         error.message
//       }`
//     )
//   );
//   console.error(error.stack);
//   process.exit(1);
// });
//
// process.on('uncaughtExceptionMonitor', (error, origin) => {
//   logger.error(error);
//   console.error(
//     fillMagenta(
//       `= uncaughtExceptionMonitor =\nDate: ${new Date().toUTCString()} uncaughtExceptionMonitor: ${
//         error.message
//       }`
//     )
//   );
//   throw new ValidationError(
//     INTERNAL_SERVER_ERROR,
//     'uncaughtExceptionMonitor error',
//     getStatusText(INTERNAL_SERVER_ERROR)
//   );
// });
//
// process.on('unhandledRejection', reason => {
//   logger.warn(reason);
// });

module.exports = app;
