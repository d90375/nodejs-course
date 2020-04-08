const router = require('express').Router();
const TasksService = require('./tasks.service');
const TasksController = require('./tasks.controller');
const UsersService = require('../users/user.service');
const BoardsService = require('../boards/boards.service');

router.use(async (req, res, next) => {
  const taskData = await TasksService.getAllTasks();
  const userData = await UsersService.getAllUsers();
  const boardData = await BoardsService.getAllBoards();
  if (taskData ) {
    req.tasks = taskData;
    req.users = userData;
    req.boards = boardData;
    next();
  } else return res.status(500).send({ message: 'Error while getting users' });
});

router
  .route('/:boardId/tasks')
  .get(TasksController.getAllTasks)
  .post(TasksController.createTask);

router
  .route('/:boardId/tasks/:taskId')
  .get(TasksController.getTask)
  .put(TasksController.updateTask)
  .delete(TasksController.deleteTask);

module.exports = router;
