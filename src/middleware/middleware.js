const logger = require('../helpers/logger');
const { finished } = require('stream');
const { fillGreen, fillYellow } = require('../common/chalk');

const middleware = (req, res, next) => {
  const start = Date.now();
  const { url, method, body, params } = req;
  logger.info({ url, method, body, params });
  console.log(
    fillGreen(
      `===================================================================================\nRequest - Url: ${url} - Method: ${method} - Body: ${JSON.stringify(
        body
      )} - Params: ${JSON.stringify(
        params
      )}\n===================================================================================`
    )
  );
  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.log(
      fillYellow(
        `===================================================================================\nResponse - Delay time: ${ms}ms - Status code: ${statusCode}\n===================================================================================`
      )
    );
  });
};

module.exports = middleware;
