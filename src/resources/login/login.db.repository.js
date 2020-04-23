const User = require('../users/user.model');

class LoginRepo {
  async checkLogin(data) {
    return await User.findOne({ login: data.login }).exec();
  }
}

module.exports = new LoginRepo();
