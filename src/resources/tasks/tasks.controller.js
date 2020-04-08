const TasksRepo = require('./task.memory.repository');
const Task = require('./tasks.model');

class TasksController {
  async getAllTasks(req, res) {
    const { boardId } = req.params;
    if (!req.tasks) {
      return res.status(404).send({ message: 'Tasks not found.' });
    }
    const tasks = req.tasks.filter(task => task.boardId === boardId);
    return res.status(200).json(tasks);
  }

  async getTask(req, res) {
    const { taskId, boardId } = req.params;
    if (boardId && taskId) {
      const currTask = req.tasks.find(
        task => taskId === task.id && boardId === task.boardId
      );
      console.log(currTask);
      if (currTask) {
        return res.status(200).json(currTask);
      }
      return res.status(404).send({ message: 'Tasks not found.' });
    }
  }

  async createTask(req, res) {
    const { boardId } = req.params;
    if (req.body) {
      const { title, order, description } = req.body;
      let { userId, columnId } = req.body;
      const col = req.tasks.filter(task => columnId === task.columnId);
      if (col.length <= 0) {
        columnId = null;
      }
      const user = req.users.filter(el => userId === el.id);
      if (user.length <= 0) {
        userId = null;
      }

      const newTask = new Task({
        title,
        description,
        order,
        userId,
        boardId,
        columnId
      });
      req.tasks.push(newTask);
      const result = await TasksRepo.createTask(req.tasks);
      if (result) return res.status(200).json(newTask);
      return res.status(500).send({ message: 'Unable create task.' });
    }
    return res.status(404).send({ message: 'Tasks not found.' });
  }

  async updateTask(req, res) {
    const { boardId, taskId } = req.params;
    if (req.body && boardId && taskId) {
      let updatedTask = {};
      const updatedArray = req.tasks.map(task => {
        const { id, title, order, description, userId, columnId } = task;
        if (id === taskId) {
          updatedTask = {
            ...updatedTask,
            id,
            title: req.body.title ? req.body.title : title,
            order: req.body.order ? req.body.order : order,
            description: req.body.description
              ? req.body.description
              : description,
            userId: req.body.userId ? req.body.userId : userId,
            boardId: req.body.boardId ? req.body.boardId : boardId,
            columnId: req.body.columnId ? req.body.columnId : columnId
          };
          return updatedTask;
        }
        return task;
      });

      const result = await TasksRepo.updateTask(updatedArray);

      if (result) return res.status(200).json(updatedTask);
      return res.status(500).send({ message: 'Unable update task.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }

  async deleteTask(req, res) {
    const { taskId } = req.params;
    if (taskId) {
      const currUser = req.tasks.find(task => taskId === task.id);
      if (currUser) {
        const delList = req.tasks.filter(task => taskId !== task.id);
        const result = await TasksRepo.deleteTask(delList);
        if (result) return res.status(200).json(result);
        return res.status(500).send({ message: 'Unable delete task.' });
      }
      return res.status(404).send({ message: 'Task not found.' });
    }
    return res.status(400).send({ message: 'Bad request.' });
  }
}

module.exports = new TasksController();
