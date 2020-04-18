const Task = require('./tasks.model');

class TasksRepo {
  async getAllTasks(id) {
    console.log(id)
    return Task.find({ boardId: id })
  }

  async createTask(data) {
    return Board.create(data);
  }

  async updateTask(boardToUpdate, id) {
    await Board.findByIdAndUpdate(id, boardToUpdate);
    return Board.findById(id,boardToUpdate)
  }

  async deleteTask(id) {
    return (await Board.deleteOne({ _id: id }).exec()).deletedCount;
  }
}

module.exports = new TasksRepo();
