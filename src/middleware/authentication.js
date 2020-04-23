const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const errorHandler = require('./ErrorHandler');

const authentication = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) errorHandler(req, res, next, UNAUTHORIZED, 'No token.');

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else errorHandler(req, res, next, UNAUTHORIZED, 'No Bearer scheme.');

    jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    res.status(UNAUTHORIZED).send(getStatusText(UNAUTHORIZED));
    return;
  }

  next();
};

module.exports = {
  authentication
};
