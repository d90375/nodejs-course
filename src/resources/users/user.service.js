const fs = require('fs');
const path = require('path');
const User = require('./user.model');

class UsersService {
  getAllUsers() {
    return new Promise((res) => {
      fs.readFile(
        path.join(__dirname, '../../data/', 'userData.json'),
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
    return new Promise((res) => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'userData.json'),
        JSON.stringify(data),
        (err) => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }

  updateUser(data) {
    return new Promise((res) => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'userData.json'),
        JSON.stringify(data),
        (err) => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }

  deleteUser(data) {
    return new Promise((res) => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'userData.json'),
        JSON.stringify(data),
        (err) => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }
}

module.exports = new UsersService();
