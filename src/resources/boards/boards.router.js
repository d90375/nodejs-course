const router = require('express').Router();
const BoardsService = require('./boards.service');
const TaskService = require('../tasks/tasks.service');
const BoardsController = require('./boards.controller');
const catchError = require('../../common/catchError');
const ErrorHandler = require('../../common/ErrorHandler');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

router.use(async (req, res, next) => {
  const dataBoard = await BoardsService.getAllBoards();
  // const dataTask = await TaskService.getAllTasks();
  if (dataBoard) {
    req.boards = dataBoard;
    // req.tasks = dataTask;
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
