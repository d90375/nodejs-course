const uuid = require('uuid');
const Fakerator = require('fakerator');
const fakerator = Fakerator('en-EN');

const createBoards = count => {
  return Array(count)
    .fill(0)
    .map(board => {
      const id = uuid();
      const title = `Title: ${fakerator.lorem.word()}`;
      const rndCol = Math.floor(Math.random() * 3 + 1);
      const columns = Array(rndCol)
        .fill(0)
        .map((col, index) => {
          col = { id: uuid(),
            title: `Title: ${fakerator.lorem.word()}`,
            order: index
          };
          return col;
        });
      board = { id, title, columns };
      return board;
    });
};

module.exports = { createBoards };
