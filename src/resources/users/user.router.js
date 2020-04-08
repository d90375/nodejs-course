const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const UsersService = require('./user.service');
const TasksService = require('../tasks/tasks.service');

router.use(async (req, res, next) => {
  const usersData = await UsersService.getAllUsers();
  const tasksData = await TasksService.getAllTasks();
  if (usersData && tasksData) {
    req.users = usersData;
    req.tasks = tasksData;
    next();
  } else return res.status(500).send({ message: 'Error while getting users' });
});

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
