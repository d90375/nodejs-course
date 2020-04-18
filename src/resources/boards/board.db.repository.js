const Board = require('./boards.model');

class BoardsRepo {
  async getAllBoards() {
    return Board.find().exec();
  }

  async createBoard(data) {
    return Board.create(data);
  }

  async updateBoard(boardToUpdate, id) {
    await Board.findByIdAndUpdate(id, boardToUpdate);
    return Board.findById(id,boardToUpdate)
  }

  async deleteBoard(id) {
    return (await Board.deleteOne({ _id: id }).exec()).deletedCount;
  }
}

module.exports = new BoardsRepo();
