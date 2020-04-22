const UserRepo = require('./user.db.repository');
const TasksService = require('../tasks/tasks.service');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class UsersService {
  async getAllUsers() {
    return await UserRepo.getAllUsers();
  }

  async createUser(data) {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    data = { ...data, password: hashPassword };
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
