const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const UserService = require('./user.service');
const TasksService = require('../tasks/tasks.service');
const catchError = require('../../common/catchError');
const ErrorHandler = require('../../common/ErrorHandler');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

router.use(async (req, res, next) => {
  const usersData = await UserService.getAllUsers();
  const tasksData = await TasksService.getAllTasks();
  if (usersData) {
    req.users = usersData;
    req.tasks = tasksData;
    next();
  } else {
    ErrorHandler(
      req,
      res,
      next,
      INTERNAL_SERVER_ERROR,
      getStatusText(INTERNAL_SERVER_ERROR)
    );
  }
});

router
  .route('/')
  .get(catchError(UserController.getAllUsers))
  .post(catchError(UserController.createUser));

router
  .route('/:id')
  .get(catchError(UserController.getUser))
  .put(catchError(UserController.updateUser))
  .delete(catchError(UserController.deleteUser));

module.exports = router;
