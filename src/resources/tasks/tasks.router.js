const router = require('express').Router();
const TasksController = require('./tasks.controller');
const TasksRepo = require('./task.memory.repository');
const UsersRepo = require('../users/user.memory.repository');
const BoardsRepo = require('../boards/board.memory.repository');

router.use(async (req, res, next) => {
  const taskData = await TasksRepo.getAllTasks();
  const userData = await UsersRepo.getAllUsers();
  const boardData = await BoardsRepo.getAllBoards();
  if (taskData) {
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
