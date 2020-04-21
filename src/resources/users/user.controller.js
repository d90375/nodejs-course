const UsersRepo = require('./user.db.repository');
const UserService = require('./user.service');
// const TasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');
const ErrorHandler = require('../../common/ErrorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');

class UsersController {
  async getAllUsers(req, res, next) {
    if (!req.users) {
      ErrorHandler(req, res, next, NOT_FOUND, 'User not found.');
    }
    return res.status(OK).json(req.users.map(User.toResponse));
  }

  async getUser(req, res, next) {
    const { id } = req.params;
    if (id) {
      const currUser = req.users.find(user => id === user.id);
      if (currUser) {
        return res.status(OK).json(User.toResponse(currUser));
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'User not found.');
    } else if (!req.users) {
      ErrorHandler(req, res, next, NOT_FOUND, 'Users not found.');
    }
  }

  async createUser(req, res, next) {
    if (req.body.constructor === Object && Object.keys(req.body).length !== 0) {
      const result = await UserService.createUser(req.body);
      if (result) return res.status(OK).json(User.toResponse(result));
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable create user.'
      );
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  async updateUser(req, res, next) {
    const { id } = req.params;
    if (req.body.constructor === Object && Object.keys(req.body).length !== 0 && id) {
      const currUser = req.users.find(user => id === user.id);
      if (!currUser) {
        ErrorHandler(req, res, next, NOT_FOUND, 'User not found.');
      }
      const userToUpdate = { ...req.body, id: id };
      const result = await UserService.updateUser(userToUpdate);
      if (result) return res.status(OK).json(User.toResponse(result));
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable update user.'
      );
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  async deleteUser(req, res, next) {
    const { id } = req.params;
    if (id) {
      const currUser = req.users.find(user => id === user.id);
      if (currUser) {
        const result = await UserService.deleteUser(id);
        if (result) return res.status(NO_CONTENT).json(User.toResponse(result));
        ErrorHandler(
          req,
          res,
          next,
          INTERNAL_SERVER_ERROR,
          'Unable delete user.'
        );
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'User not found.');
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }
}

module.exports = new UsersController();
