let users = [];

class UsersRepo {
  async getAllUsers() {
    return users;
  }

  async createUser(data) {
    return (users = data);
  }

  async updateUser(data) {
    return (users = data);
  }

  async deleteUser(data) {
    return (users = data);
  }
}

module.exports = new UsersRepo();
