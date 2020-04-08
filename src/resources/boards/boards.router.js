const router = require('express').Router();
const BoardsService = require('./boards.service');
const BoardsController = require('./boards.controller');
const TasksService = require('../tasks/tasks.service');

router.use(async (req, res, next) => {
  const dataBoard = await BoardsService.getAllBoards();
  const dataTask = await TasksService.getAllTasks();
  if (dataBoard && dataTask) {
    req.boards = dataBoard;
    req.tasks = dataTask;
    next();
  } else return res.status(500).send({ message: 'Error while getting users' });
});

router
  .route('/')
  .get(BoardsController.getAllBoards)
  .post(BoardsController.createBoard);

router
  .route('/:id')
  .get(BoardsController.getBoard)
  .put(BoardsController.updateBoard)
  .delete(BoardsController.deleteBoard);

module.exports = router;
