const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const UsersRepo = require('./user.memory.repository');
const TasksRepo = require('../tasks/task.memory.repository');

router.use(async (req, res, next) => {
  const usersData = await UsersRepo.getAllUsers();
  const tasksData = await TasksRepo.getAllTasks();
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
