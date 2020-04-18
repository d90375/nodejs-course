const UserRepo = require('./user.db.repository');

class UsersService {
  async getAllUsers() {
    return await UserRepo.getAllUsers();
  }

  async createUser(data) {
    return await UserRepo.createUser(data);
  }

  async updateUser(data) {
    return await UserRepo.updateUser(data);
  }

  async deleteUser(id) {
    return await UserRepo.deleteUser(id);
  }
}

module.exports = new UsersService();
