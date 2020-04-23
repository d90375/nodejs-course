const LoginRepo = require('./login.db.repository');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');

class LoginService {
  async checkUser(data) {
    const checkedUser = await LoginRepo.checkLogin(data);
    if (!checkedUser) {
      return false;
    }
    const isPasswordValidate = await bcrypt.compare(
      data.password,
      checkedUser.password
    );
    if (!isPasswordValidate) {
      return false;
    }
    const { id, login } = checkedUser;
    return jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '10h' });
  }
}

module.exports = new LoginService();
