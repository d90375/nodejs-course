const db = require('../../mock/db');

class BoardsService {
  async getAllBoards() {
    return db.boards;
  }

  async createBoard(data) {
    return (db.boards = data);
  }

  async updateBoard(data) {
    return (db.boards = data);
  }

  async deleteBoard(data) {
    return (db.boards = data);
  }
}

module.exports = new BoardsService();
