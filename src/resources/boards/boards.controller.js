const BoardsService = require('./boards.service');
const TasksService = require('../tasks/tasks.service');
const ErrorHandler = require('../../middleware/ErrorHandler');
const Board = require('./boards.model');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');

class BoardsController {
  async getAllBoards(req, res, next) {
    if (!req.boards) {
      ErrorHandler(req, res, next, NOT_FOUND, 'Boards not found.');
    }
    return res.status(OK).json(req.boards.map(Board.toResponse));
  }

  async getBoard(req, res, next) {
    const { id } = req.params;
    if (id) {
      const currUser = req.boards.find(user => id === user.id);
      if (currUser) {
        return res.status(OK).json(Board.toResponse(currUser));
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'Board not found.');
    } else if (!req.boards) {
      ErrorHandler(req, res, next, NOT_FOUND, 'Boards not found.');
    }
  }

  async createBoard(req, res, next) {
    if (req.body.constructor === Object && Object.keys(req.body).length !== 0) {
      const result = await BoardsService.createBoard(req.body);
      if (result) return res.status(OK).json(Board.toResponse(result));
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

  async updateBoard(req, res, next) {
    const { id } = req.params;
    if (
      req.body.constructor === Object &&
      Object.keys(req.body).length !== 0 &&
      id
    ) {
      const currBoard = req.boards.find(board => id === board.id);
      if (!currBoard) {
        ErrorHandler(req, res, next, NOT_FOUND, 'Board not found.');
      }
      const boardToUpdate = { ...req.body, _id: id };
      const result = await BoardsService.updateBoard(boardToUpdate);
      if (result) return res.status(OK).json(Board.toResponse(result));
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable update board.'
      );
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  async deleteBoard(req, res, next) {
    const { id } = req.params;
    if (id) {
      const currBoard = req.boards.find(board => id === board.id);
      if (currBoard) {
        const result = await BoardsService.deleteBoard(id);
        if (result) return res.status(NO_CONTENT).json(result);
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
