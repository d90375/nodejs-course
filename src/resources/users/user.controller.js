const UsersRepo = require('./user.memory.repository');
const TasksRepo = require('../tasks/task.memory.repository');
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
      const newUser = new User(req.body);
      req.users.push(newUser);
      const result = await UsersRepo.createUser(req.users);
      if (result) return res.status(OK).json(User.toResponse(newUser));
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
    if (req.body && id) {
      const currUser = req.users.find(user => id === user.id);
      if (!currUser) {
        ErrorHandler(req, res, next, NOT_FOUND, 'User not found.');
      }
      req.users.find(user => {
        if (id === user.id) {
          user.name = req.body.name;
          user.login = req.body.login;
          user.password = req.body.password;
        }
      });
      const result = await UsersRepo.updateUser(req.users);
      if (result) return res.status(OK).json(User.toResponse(currUser));
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

  async deleteUser(req, res,next) {
    const { id } = req.params;
    if (id) {
      const currUser = req.users.find(user => id === user.id);
      if (currUser) {
        req.tasks.forEach(task => {
          if (id === task.userId) {
            task.userId = null;
          }
        });
        const delList = req.users.filter(user => id !== user.id);
        await TasksRepo.deleteTask(req.tasks);
        const result = await UsersRepo.deleteUser(delList);
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
