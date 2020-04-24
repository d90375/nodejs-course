const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');


const authentication = (req, res, next) => {
  try {
    let token = req.headers.authorization;
   console.log(token);
    if (!token) {
      throw new Error('No token.');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else {
      throw new Error('No Bearer schema.');
    }
    console.log(token);
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
