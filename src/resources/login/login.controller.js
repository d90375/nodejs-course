const LoginService = require('./login.service');
const ErrorHandler = require('../../middleware/ErrorHandler');

const { FORBIDDEN, OK, getStatusText } = require('http-status-codes');

class LoginController {
  async checkUser(req, res, next) {
    const token = await LoginService.checkUser(req.body);
    console.log(token);
    if (token) return res.status(OK).json({ token });
    ErrorHandler(req, res, next, FORBIDDEN, getStatusText(FORBIDDEN));
  }
}

module.exports = new LoginController();
