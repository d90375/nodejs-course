const BoardsService = require('./boards.service');
const TasksService = require('../tasks/tasks.service');
const Board = require('./boards.model');

class BoardsController {
  async getAllBoards(req, res) {
    if (!req.boards) {
      return res.status(404).send({ message: 'Boards not found.' });
    }
    return res.status(200).json(req.boards);
  }

  async getBoard(req, res) {
    const { id } = req.params;
    if (id) {
      const currUser = req.boards.find(user => id === user.id);
      if (currUser) {
        return res.status(200).json(currUser);
      }
      return res.status(404).send({ message: 'User not found.' });
    } else if (!req.boards) {
      return res.status(404).send({ message: 'Users not found.' });
    }
  }

  async createBoard(req, res) {
    if (req.body) {
      const newBoard = new Board(req.body);
      req.boards.push(newBoard);
      const result = await BoardsService.createBoard(req.boards);
      if (result) return res.status(200).json(newBoard);
      return res.status(500).send({ message: 'Unable create board.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async updateBoard(req, res) {
    const { id } = req.params;
    if (req.body && id) {
      const currBoard = req.boards.find(board => id === board.id);
      if (!currBoard) {
        return res.status(404).send({ message: 'Board not found.' });
      }

      const newBoard = {};

      req.boards.forEach(board => {
        if (id === board.id) {
          newBoard.id = board.id;
          board.title = req.body.title ? req.body.title : board.title;
          newBoard.title = board.title;
          if (req.body.columns.length > 0) {
            board.columns.forEach(col => {
              req.body.columns.forEach(bodyCol => {
                if (col.id === bodyCol.id) {
                  col.id = bodyCol.id;
                  col.title = bodyCol.title;
                  col.order = bodyCol.order;
                }
              });
            });
          } else {
            newBoard.columns = board.columns;
          }
        }
      });

      const result = await BoardsService.updateBoard(req.boards);
      if (result) return res.status(200).json(result);
      return res.status(500).send({ message: 'Unable update user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async deleteBoard(req, res) {
    const { id } = req.params;
    if (id) {

      const newTasks = req.tasks.filter(task => id !== task.boardId);
      // if (!newTasks) {
      //   return res.status(404).send({ message: 'Task not found.' });
      // }

      const currBoard = req.boards.find(board => id === board.id);
      if (currBoard) {
        const newBoards = req.boards.filter(task => id !== task.id);
        await TasksService.deleteTask(newTasks);
        const result = await BoardsService.deleteBoard(newBoards);
        if (result) return res.status(204).json(newBoards);
        return res.status(500).send({ message: 'Unable delete board.' });
      }
      return res.status(404).send({ message: 'Board not found.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }
}

module.exports = new BoardsController();
