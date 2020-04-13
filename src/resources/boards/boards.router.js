const router = require('express').Router();
const BoardsRepo = require('./board.memory.repository');
const BoardsController = require('./boards.controller');
const TasksRepo = require('../tasks/task.memory.repository');
const catchError = require('../../common/catchError');
const ErrorHandler = require('../../common/ErrorHandler');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

router.use(async (req, res, next) => {
  const dataBoard = await BoardsRepo.getAllBoards();
  const dataTask = await TasksRepo.getAllTasks();
  if (dataBoard && dataTask) {
    req.boards = dataBoard;
    req.tasks = dataTask;
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
  .get(catchError(BoardsController.getAllBoards))
  .post(catchError(BoardsController.createBoard));

router
  .route('/:id')
  .get(catchError(BoardsController.getBoard))
  .put(catchError(BoardsController.updateBoard))
  .delete(catchError(BoardsController.deleteBoard));

module.exports = router;
