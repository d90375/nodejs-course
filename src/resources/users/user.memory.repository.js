const db = require('../../mock/db');

class UsersRepo {
  async getAllUsers() {
    return db.users;
  }

  async createUser(data) {
    db.users = data;
    return db.users;
  }

  async updateUser(data) {
    db.users = data;
    return db.users;
  }

  async deleteUser(data) {
    db.users = data;
    return db.users;
  }
}

module.exports = new UsersRepo();
