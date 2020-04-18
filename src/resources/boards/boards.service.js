const BoardsRepo = require('./board.db.repository');

class BoardsService {
  async getAllBoards() {
    return await BoardsRepo.getAllBoards();
  }

  async createBoard(data) {
    return await BoardsRepo.createBoard(data);
  }

  async updateBoard(data,id) {
    return await BoardsRepo.updateBoard(data,id);
  }

  async deleteBoard(id) {
    return await BoardsRepo.deleteBoard(id);
  }
}

module.exports = new BoardsService();
