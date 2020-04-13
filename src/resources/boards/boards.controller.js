const BoardsRepo = require('./board.memory.repository');
const TasksRepo = require('../tasks/task.memory.repository');
const Board = require('./boards.model');
const ErrorHandler = require('../../common/ErrorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');

class BoardsController {
  async getAllBoards(req, res,next) {
    if (!req.boards) {
      ErrorHandler(req, res, next, NOT_FOUND, 'Boards not found.');
    }
    return res.status(OK).json(req.boards);
  }

  async getBoard(req, res,next) {
    const { id } = req.params;
    if (id) {
      const currUser = req.boards.find(user => id === user.id);
      if (currUser) {
        return res.status(OK).json(currUser);
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'Board not found.');

    } else if (!req.boards) {
      ErrorHandler(req, res, next, NOT_FOUND, 'Boards not found.');
    }
  }

  async createBoard(req, res,next) {
    if (req.body) {
      const newBoard = new Board(req.body);
      req.boards.push(newBoard);
      const result = await BoardsRepo.createBoard(req.boards);
      if (result) return res.status(OK).json(newBoard);
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable create task.'
      );
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  async updateBoard(req, res,next) {
    const { id } = req.params;
    if (req.body && id) {
      const currBoard = req.boards.find(board => id === board.id);
      if (!currBoard) {
        ErrorHandler(req, res, next, NOT_FOUND, 'Board not found.');
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

      const result = await BoardsRepo.updateBoard(req.boards);
      if (result) return res.status(OK).json(result);
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable update task.'
      );
    }

    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  async deleteBoard(req, res, next) {
    const { id } = req.params;
    if (id) {
      const newTasks = req.tasks.filter(task => id !== task.boardId);

      const currBoard = req.boards.find(board => id === board.id);
      if (currBoard) {
        const newBoards = req.boards.filter(task => id !== task.id);
        await TasksRepo.deleteTask(newTasks);
        const result = await BoardsRepo.deleteBoard(newBoards);
        if (result) return res.status(NO_CONTENT).json(newBoards);
        ErrorHandler(
          req,
          res,
          next,
          INTERNAL_SERVER_ERROR,
          'Unable delete board.'
        );
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'Board not found.');
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }
}

module.exports = new BoardsController();
