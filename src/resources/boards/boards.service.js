const BoardsRepo = require('./board.db.repository');
const TasksService = require('../tasks/tasks.service')

class BoardsService {
  async getAllBoards() {
    return await BoardsRepo.getAllBoards();
  }

  async createBoard(data) {
    return await BoardsRepo.createBoard(data);
  }

  async updateBoard(data) {
    return await BoardsRepo.updateBoard(data);
  }

  async deleteBoard(id) {
    await TasksService.deleteByBoardId(id);
    return await BoardsRepo.deleteBoard(id);
  }
}

module.exports = new BoardsService();
