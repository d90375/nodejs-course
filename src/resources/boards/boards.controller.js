const BoardsService = require('./boards.service');
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
      const newUser = new Board(req.body);
      req.boards.push(newUser);
      const result = await BoardsService.createBoard(req.boards);
      if (result) return res.status(200).json(newUser);
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
      req.boards.find(board => {
        if (id === board.id) {
          console.log(req.body)
          board.name = req.body.title;
        }
      });
      const result = await BoardsService.updateBoard(req.boards);
      if (result) return res.status(200).json(currBoard);
      return res.status(500).send({ message: 'Unable update user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async deleteBoard(req, res) {
    const { id } = req.params;
    if (id) {
      const currUser = req.boards.find(user => id === user.id);
      if (currUser) {
        const delList = req.boards.filter(user => id !== user.id);
        const result = await BoardsService.deleteBoard(delList);
        if (result) return res.status(200).json(result);
        return res.status(500).send({ message: 'Unable delete board.' });
      }
      return res.status(404).send({ message: 'Board not found.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }
}

module.exports = new BoardsController();
