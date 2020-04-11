const db = require('../../mock/db');

class TasksRepo {
  async getAllTasks() {
    return db.tasks;
  }

  async createTask(data) {
    return (db.tasks = data);
  }

  async updateTask(data) {
    return (db.tasks = data);
  }

  async deleteTask(data) {
    return (db.tasks = data);
  }
}

module.exports = new TasksRepo();
