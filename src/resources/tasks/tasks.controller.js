const TasksService = require('./tasks.service');
const Task = require('./tasks.model');

class TasksController {
  async getAllTasks(req, res) {
    const { boardId } = req.params;
    console.log(boardId)
    if (!req.tasks) {
      return res.status(404).send({ message: 'Tasks not found.' });
    }
    const x = req.tasks
    const tasks = x.filter(task => task.boardId === boardId);
    return res.status(200).json(tasks);
  }

  async setUserNull (id){

    req.tasks.forEach(task => {
      if (id === task.userId) {
        task.userId = null;
      }
    });
  }

  async getTask(req, res) {
    const { id } = req.params;
    if (id) {
      const currUser = req.tasks.find(user => id === user.id);
      if (currUser) {
        return res.status(200).json(currUser);
      }
      return res.status(404).send({ message: 'User not found.' });
    } else if (!req.tasks) {
      return res.status(404).send({ message: 'Users not found.' });
    }
  }

  async createTask(req, res) {
    if (req.body) {
      const newTask = new Task(req.body);
      req.tasks.push(newTask);
      const result = await TasksService.createTask(req.tasks);
      if (result) return res.status(200).json(newTask);
      return res.status(500).send({ message: 'Unable create user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async updateTask(req, res) {
    const { id } = req.params;
    if (req.body && id) {
      const currTask = req.tasks.find(task => id === task.id);
      if (!currTask) {
        return res.status(404).send({ message: 'User not found.' });
      }
      req.tasks.find(user => {
        if (id === user.id) {
          user.name = req.body.name;
          user.login = req.body.login;
          user.password = req.body.password;
        }
      });
      const result = await TasksService.updateTask(req.tasks);
      if (result) return res.status(200).json(result);
      return res.status(500).send({ message: 'Unable update user.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async deleteTask(req, res) {
    const { id } = req.params;
    if (id) {
      const currUser = req.tasks.find(user => id === user.id);
      if (currUser) {
        const delList = req.tasks.filter(user => id !== user.id);
        const result = await TasksService.deleteTask(delList);
        if (result) return res.status(200).json(result);
        return res.status(500).send({ message: 'Unable delete user.' });
      }
      return res.status(404).send({ message: 'User not found.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }
}

module.exports = new TasksController();
