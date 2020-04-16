const UserRepo = require('./user.db.repository');

class UsersService {
  async getAllUsers() {
    return UserRepo.getAllUsers();
  }

  async createUser(data) {
   return await UserRepo.createUser(data);
  }

  async updateUser(id, newData) {
    return await UserRepo.updateUser(id, newData);
  }



  async deleteUser(id) {
    return  await UserRepo.deleteUser(id);
  }
}

module.exports = new UsersService();
