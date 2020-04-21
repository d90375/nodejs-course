const Task = require('./tasks.model');

class TasksRepo {
  async getAllTasks(id) {
    return Task.find({ boardId: id });
  }

  async createTask(data) {
    return Task.create(data);
  }

  async updateTask(TaskToUpdate) {
    return Task.updateOne({ _id: TaskToUpdate.taskId }, TaskToUpdate);
  }

  async deleteTask(taskId) {
    return (await Task.deleteOne({ _id: taskId }).exec()).deletedCount;
  }

  async deleteByBoardId(boardId) {
    return Task.deleteMany({ boardId });
  }

  async nullUserById(userId) {
    return Task.findOneAndUpdate(
      { userId },
      { userId: null },
      { new: true, useFindAndModify: false },
      (err, data) => {
        return data;
      }
    );
  }
}

module.exports = new TasksRepo();
