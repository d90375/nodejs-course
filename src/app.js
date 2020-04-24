const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/tasks.router');
const boardRouter = require('./resources/boards/boards.router');
const logger = require('./common/logger');
const infoLogger = require('./middleware/logHandler');
const { authentication } = require('./middleware/authentication');
const { fillRed } = require('./common/chalk');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(infoLogger);

app.use('/login', loginRouter);
app.use('/users', authentication, userRouter);
app.use('/boards', authentication, boardRouter);
app.use('/boards', authentication, taskRouter);

app.use('*', authentication, (req, res, next) => {
  const err = new Error('Route was not found');
  console.log(fillRed('Route was not found'));
  err.status = NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  logger.error(
    `Error status code ${err.status ||
      INTERNAL_SERVER_ERROR} - Status text: ${getStatusText(
      err.status || INTERNAL_SERVER_ERROR
    )} - Message: ${err.message}`
  );
  if (!err.status) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  res.status(err.status).send(err.message || getStatusText(err.status));
});

module.exports = app;
