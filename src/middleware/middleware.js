const logger = require('../logger/logger');
const { finished } = require('stream');

const middleware = (req, res, next) => {
  const start = Date.now();
  const { url, method, body, params } = req;

  const logMessage = JSON.stringify({
    url,
    method,
    body,
    params
  });
  logger.info(logMessage);

  finished(res, () => {
    const delay = Date.now() - start;
  });

  next();
};

module.exports = middleware;
