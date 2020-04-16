const router = require('express').Router();
const TasksController = require('./tasks.controller');
const TasksRepo = require('./task.memory.repository');
// const UsersRepo = require('../users/user.memory.repository');
const BoardsRepo = require('../boards/board.memory.repository');
const catchError = require('../../common/catchError');
const ErrorHandler = require('../../common/ErrorHandler');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

router.use(async (req, res, next) => {
  const taskData = await TasksRepo.getAllTasks();
  // const userData = await UsersRepo.getAllUsers();
  const boardData = await BoardsRepo.getAllBoards();
  if (taskData  && boardData) {
    req.tasks = taskData;
    // req.users = userData;
    req.boards = boardData;
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
  .route('/:boardId/tasks')
  .get(catchError(TasksController.getAllTasks))
  .post(catchError(TasksController.createTask));

router
  .route('/:boardId/tasks/:taskId')
  .get(catchError(TasksController.getTask))
  .put(catchError(TasksController.updateTask))
  .delete(catchError(TasksController.deleteTask));

module.exports = router;
