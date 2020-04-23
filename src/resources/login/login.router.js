const router = require('express').Router();
const UsersService = require('../users/user.service');
const LoginController = require('./login.controller');
const catchError = require('../../common/catchError');
const ErrorHandler = require('../../common/ErrorHandler');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

router.use(async (req, res, next) => {
  const userData = await UsersService.getAllUsers();
  if (userData) {
    req.users = userData;
    next();
  } else {
    ErrorHandler(
      req,
      res,
      next,
      INTERNAL_SERVER_ERROR,
      'User not found 403.'
    );
  }
});

router.route('/').post(catchError(LoginController.checkUser));

module.exports = router;
