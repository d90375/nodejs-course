const fs = require('fs');
const path = require('path');

class BoardsService {
  getAllBoards() {
    return new Promise(res => {
      fs.readFile(
        path.join(__dirname, '../../data/', 'boardData.json'),
        (err, data) => {
          if (err) {
            return res(false);
          }
          return res(JSON.parse(data));
        }
      );
    });
  }

  createBoard(data) {
    return new Promise(res => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'boardData.json'),
        JSON.stringify(data),
        err => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }

  updateBoard(data) {
    return new Promise(res => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'boardData.json'),
        JSON.stringify(data),
        err => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }

  deleteBoard(data) {
    return new Promise(res => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'boardData.json'),
        JSON.stringify(data),
        err => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }
}

module.exports = new BoardsService();
