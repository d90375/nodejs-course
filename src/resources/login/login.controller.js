const LoginService = require('./login.service');
const ErrorHandler = require('../../common/ErrorHandler');

const { FORBIDDEN, OK, getStatusText } = require('http-status-codes');

class LoginController {
  async checkUser(req, res, next) {
    const result = await LoginService.checkUser(req.body);
    console.log(result)
    if (result) return res.status(OK).json({ result });
    ErrorHandler(req, res, next, FORBIDDEN, getStatusText(FORBIDDEN));
  }
}

module.exports = new LoginController();

