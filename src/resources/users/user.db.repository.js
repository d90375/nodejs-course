const User = require('./user.model');

class UsersRepo {
  async getAllUsers() {
    return await User.find().exec();
  }

  async createUser(data) {
    return User.create(data);
  }

  async updateUser(userToUpdate) {
    return User.findOneAndUpdate(userToUpdate.id, userToUpdate, { new: true });
  }

  async deleteUser(id) {
    return (await User.deleteOne({ _id: id }).exec()).deletedCount;
  }
}

module.exports = new UsersRepo();
