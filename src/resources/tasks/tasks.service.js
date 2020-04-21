const TasksRepo = require('./tasks.db.repository');

class TasksService {
  async getAllTasks(id) {
    return await TasksRepo.getAllTasks(id);
  }

  async createTask(data) {
    return await TasksRepo.createTask(data);
  }

  async updateTask(data, id) {
    return await TasksRepo.updateTask(data, id);
  }

  async deleteTask(id) {
    return await TasksRepo.deleteTask(id);
  }

  async deleteByBoardId(id) {
    return await TasksRepo.deleteByBoardId(id);
  }

  async nullUserById(id) {
    return await TasksRepo.nullUserById(id);
  }
}

module.exports = new TasksService();
