const router = require('express').Router();
const BoardsService = require('./boards.service');
const BoardsController = require('./boards.controller');

router.use(async (req, res, next) => {
  const data = await BoardsService.getAllBoards();
  if (data) {
    req.boards = data;
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
