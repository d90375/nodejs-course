const { fillRed } = require('../common/chalk');

module.exports = (req, res, next, errorType, message) => {
  console.log(fillRed(message));
  const err = new Error(message);
  err.status = errorType;
  return next(err);
};
