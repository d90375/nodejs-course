const Board = require('./boards.model');

class BoardsRepo {
  async getAllBoards() {
    return Board.find().exec();
  }

  async createBoard(data) {
    return Board.create(data);
  }

  async updateBoard(boardToUpdate) {
   return  await Board.updateOne({ _id: boardToUpdate.id }, boardToUpdate);
  }

  async deleteBoard(id) {
    return (await Board.deleteOne({ _id: id }).exec()).deletedCount;
  }
}

module.exports = new BoardsRepo();
