const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const UsersRepo = require('./user.memory.repository');
const TasksRepo = require('../tasks/task.memory.repository');
const catchError = require('../../common/catchError');
const ErrorHandler = require('../../common/ErrorHandler');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

router.use(async (req, res, next) => {
  const usersData = await UsersRepo.getAllUsers();
  const tasksData = await TasksRepo.getAllTasks();
  if (usersData && tasksData) {
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
