const uuid = require('uuid');
const Fakerator = require('fakerator');
const fake = Fakerator('en-EN');

const createUsers = count => {
  return Array(count)
    .fill(0)
    .map(user => {
      const id = uuid();
      const name = fake.names.name();
      const login = fake.names.firstName();
      const password = fake.internet.password(8);
      user = { id, name, login, password };
      return user;
    });
};

module.exports = {
  createUsers
};
