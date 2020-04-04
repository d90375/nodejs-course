const fs = require('fs');
const path = require('path');

class UsersService {
  getAllUsers() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../../data', 'userData.json'),
        (err, data) => {
          if (err) {
            return res(false);
          }
          return res(JSON.parse(data));
        }
      );
    });
  }

  createUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        '../../data/userData',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false);

          return res({ message: 'User created.' });
        }
      );
    });
  }

  updateUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        '../../data/userData',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false);

          return res({ message: 'User updated.' });
        }
      );
    });
  }

  deleteUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        '../../data/userData',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false);

          return res({ message: 'User deleted.' });
        }
      );
    });
  }
}

module.exports = new UsersService();
