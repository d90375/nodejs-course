const router = require('express').Router();
const BoardsRepo = require('./board.memory.repository');
const BoardsController = require('./boards.controller');
const TasksRepo = require('../tasks/task.memory.repository');

router.use(async (req, res, next) => {
  const dataBoard = await BoardsRepo.getAllBoards();
  const dataTask = await TasksRepo.getAllTasks();
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
