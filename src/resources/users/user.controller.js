const UsersRepo = require('./user.memory.repository');
const TasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');
const { ValidationError } = require('../../../src/error/error');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');

class UsersController {
  async getAllUsers(req, res) {
    if (!req.users) {
      return res.status(404).send({ message: 'Users not found.' });
      // throw new ValidationError(
      //   NOT_FOUND,
      //   'Users not found.',
      //   getStatusText(NOT_FOUND)
      // );
    }
    return res.status(200).send(req.users);
  }

  async getUser(req, res) {
    const { id } = req.params;
    if (id) {
      const currUser = req.users.find(user => id === user.id);
      if (currUser) {
        return res.status(200).send(User.toResponse(currUser));
      }
      // return res.status(404).send({ message: 'User not found.' });
      throw new ValidationError(
        NOT_FOUND,
        'User not found.',
        getStatusText(NOT_FOUND)
      );
    } else if (!req.users) {
      // return res.status(404).send({ message: 'Users not found.' });
      throw new ValidationError(
        NOT_FOUND,
        'Users not found.',
        getStatusText(NOT_FOUND)
      );
    }
  }

  async createUser(req, res) {
    if (req.body) {
      const newUser = new User(req.body);
      req.users.push(newUser);
      const result = await UsersRepo.createUser(req.users);
      if (result) return res.status(200).send(User.toResponse(newUser));
      return res.status(500).send({ message: 'Unable create user.' });
    }
    // return res.status(400).send({ message: 'Bad request.' });
    throw new ValidationError(
      BAD_REQUEST,
      'Bad request.',
      getStatusText(BAD_REQUEST)
    );
  }

  async updateUser(req, res) {
    const { id } = req.params;
    if (req.body && id) {
      const currUser = req.users.find(user => id === user.id);
      if (!currUser) {
        return res.status(404).send({ message: 'User not found.' });
      }
      req.users.find(user => {
        if (id === user.id) {
          user.name = req.body.name;
          user.login = req.body.login;
          user.password = req.body.password;
        }
      });
      const result = await UsersRepo.updateUser(req.users);
      if (result) return res.status(200).send(User.toResponse(currUser));
      return res.status(500).send({ message: 'Unable update user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async deleteUser(req, res) {
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
        if (result) return res.status(204).send(User.toResponse(result));
        return res.status(500).send({ message: 'Unable delete user.' });
      }
      return res.status(404).send({ message: 'User not found.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }
}

module.exports = new UsersController();
