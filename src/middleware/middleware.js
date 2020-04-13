const logger = require('../common/logger');
const { finished } = require('stream');
const { fillGreen, fillYellow } = require('../common/chalk');

const middleware = (req, res, next) => {
  const start = Date.now();
  const { originalUrl, method, query, body, params } = req;
  logger.info(
    `request method: ${method}; request URL: ${originalUrl}; query: ${JSON.stringify(
      query
    )}; body: ${JSON.stringify(body)}`
  );
  console.log(
    fillGreen(
      `===================================================================================\nRequest - Url: ${originalUrl} - Method: ${method} - Body: ${JSON.stringify(
        body
      )} - Params: ${JSON.stringify(params)} - Query: ${JSON.stringify(
        query
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
