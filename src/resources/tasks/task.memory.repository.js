let tasks = [];

class TasksRepo {
  async getAllTasks() {
    return tasks;
  }

  async createTask(data) {
    return (tasks = data);
  }

  async updateTask(data) {
    return (tasks = data);
  }

  async deleteTask(data) {
    return (tasks = data);
  }
}

module.exports = new TasksRepo();
