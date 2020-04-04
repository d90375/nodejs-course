const UsersService = require('./user.service');

class UsersController {
  async getAllUsers(req, res) {
    return res.status(200).send({ data: req.users });
  }

  async getUser(req, res) {
    if (req.params.id) {
      if (req.users.hasOwnProperty(req.params.id)) {
        return res.status(200).send({ data: req.users[req.params.id] });
      }
      return res.status(404).send({ message: 'User not found.' });
    } else if (!req.users) {
      return res.status(404).send({ message: 'Users not found.' });
    }
  }

  async createUser(req, res) {
    console.log(req.body.id);
    if (req.body.user && req.body.user.id) {
      if (req.users.hasOwnProperty(req.body.user.id)) {
        return res.status(409).send({ message: 'User already exists.' });
      }

      req.users[req.body.user.id] = req.body.user;

      const result = await UsersService.createUser(req.users);

      if (result) return res.status(200).send(result);
      return res.status(500).send({ message: 'Unable create user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async updateUser(req, res) {
    if (req.body.user && req.body.user.id) {
      if (!req.users.hasOwnProperty(req.body.user.id)) {
        return res.status(404).send({ message: 'User not found.' });
      }

      req.users[req.body.user.id] = req.body.user;

      const result = await UsersService.updateUser(req.users);

      if (result) return res.status(200).send(result);
      return res.status(500).send({ message: 'Unable update user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async deleteUser(req, res) {
    if (req.query.id) {
      if (req.users.hasOwnProperty(req.query.id)) {
        delete req.users[req.query.id];

        const result = await UsersService.deleteUser(req.users);

        if (result) return res.status(200).send(result);
        return res.status(500).send({ message: 'Unable delete user.' });
      }
      return res.status(404).send({ message: 'User not found.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }
}

module.exports = new UsersController();
