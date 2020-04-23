const router = require('express').Router();
const TasksController = require('./tasks.controller');
const TasksService = require('./tasks.service');
const UsersService = require('../users/user.service');
const BoardsService = require('../boards/boards.service');
const catchError = require('../../middleware/catchError');
const ErrorHandler = require('../../middleware/ErrorHandler');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

router.use(async (req, res, next) => {
  const boardOriginalUrl = req.originalUrl.split('/');
  const boardId = boardOriginalUrl[2];
  const taskData = await TasksService.getAllTasks(boardId);
  const userData = await UsersService.getAllUsers();
  const boardData = await BoardsService.getAllBoards();
  if (taskData && userData && boardData) {
    req.tasks = taskData;
    req.users = userData;
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
