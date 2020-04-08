let boards = [];

class BoardsService {
  async getAllBoards() {
    return boards;
  }

  async createBoard(data) {
    return (boards = data);
  }

  async updateBoard(data) {
    return (boards = data);
  }

  async deleteBoard(data) {
    return (boards = data);
  }
}

module.exports = new BoardsService();
