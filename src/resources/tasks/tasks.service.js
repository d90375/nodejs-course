const fs = require('fs');
const path = require('path');

class TasksService {
  getAllTasks() {
    return new Promise(res => {
      fs.readFile(
        path.join(__dirname, '../../data/', 'taskData.json'),
        (err, data) => {
          if (err) {
            return res(false);
          }
          return res(JSON.parse(data));
        }
      );
    });
  }

  createTask(data) {
    return new Promise(res => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'taskData.json'),
        JSON.stringify(data),
        err => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }

  updateTask(data) {
    return new Promise(res => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'taskData.json'),
        JSON.stringify(data),
        err => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }

  deleteTask(data) {
    return new Promise(res => {
      fs.writeFile(
        path.join(__dirname, '../../data/', 'taskData.json'),
        JSON.stringify(data),
        err => {
          if (err) return res(false);

          return res(data);
        }
      );
    });
  }
}

module.exports = new TasksService();
