const UserRepo = require('./user.db.repository');
const TasksService = require('../tasks/tasks.service');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class UsersService {
  async getAllUsers() {
    return await UserRepo.getAllUsers();
  }

  async createUser(data) {
    // const { password } = data;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashPassword = await bcrypt.hash(password, salt);
    // data = { ...data, password: hashPassword };
    return await UserRepo.createUser(data);
  }

  async updateUser(data) {
    return await UserRepo.updateUser(data);
  }

  async deleteUser(id) {
    await TasksService.nullUserById(id);
    return await UserRepo.deleteUser(id);
  }
}

module.exports = new UsersService();
