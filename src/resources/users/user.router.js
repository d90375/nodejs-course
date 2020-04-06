const express = require('express');
const router = express.Router();
const User = require('./user.model');
const UserController = require('./user.controller');
const UsersService = require('./user.service');

router.use(async (req, res, next) => {
  const data = await UsersService.getAllUsers();
  if (data) {
    req.users = data.map(User.toResponse);
    next();
  } else return res.status(500).send({ message: 'Error while getting users' });
});

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
