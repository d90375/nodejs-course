const uuid = require('uuid');
const Fakerator = require('fakerator');
const fakerator = Fakerator('en-EN');

const createTasks = (boards, users) => {
  let returnList = [];
  boards.forEach(board => {
    board.columns.forEach(column => {
      const taskRndCounter = Math.floor(Math.random() * 2 + 1);
      const filledTask = Array(taskRndCounter)
        .fill(0)
        .map((task, index) => {
          const id = uuid();
          const title = `Task-title: ${fakerator.lorem.word()}`;
          const description = fakerator.lorem.sentence();
          const randUserIndex = Math.floor(Math.random() * users.length);
          task = {
            id,
            title,
            order: index,
            description,
            userId: users[randUserIndex].id,
            boardId: board.id,
            columnId: column.id
          };
          return task;
        });
     returnList =  returnList.concat(filledTask);
    });
  });
  return returnList;
};

module.exports = { createTasks };
