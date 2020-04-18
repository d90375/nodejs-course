const TasksService = require('./tasks.service');
const Task = require('./tasks.model');
const ErrorHandler = require('../../common/ErrorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');

class TasksController {
  async getAllTasks(req, res, next) {
    console.log(req.params.boardId)
    const { boardId } = req.params;
    console.log(boardId)
    if (!req.tasks) {
      ErrorHandler(req, res, next, NOT_FOUND, 'Tasks not found.');
    }
    return res.status(OK).json(req.tasks.map(Task.toResponse));
  }

  async getTask(req, res, next) {
    const { taskId, boardId } = req.params;
    if (boardId && taskId) {
      const currTask = req.tasks.find(
        task => taskId === task.id && boardId === task.boardId
      );
      console.log(currTask);
      if (currTask) {
        return res.status(OK).json(currTask);
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'Tasks not found.');
    }
  }

  async createTask(req, res, next) {
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
      if (result) return res.status(OK).json(newTask);
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable create task.'
      );
    }
    ErrorHandler(req, res, next, NOT_FOUND, 'Tasks not found.');
  }

  async updateTask(req, res, next) {
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

      if (result) return res.status(OK).json(updatedTask);
      ErrorHandler(
        req,
        res,
        next,
        INTERNAL_SERVER_ERROR,
        'Unable update task.'
      );
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  async deleteTask(req, res, next) {
    const { taskId } = req.params;
    if (taskId) {
      const currUser = req.tasks.find(task => taskId === task.id);
      if (currUser) {
        const delList = req.tasks.filter(task => taskId !== task.id);
        const result = await TasksRepo.deleteTask(delList);
        if (result) return res.status(NO_CONTENT).json(result);
        ErrorHandler(
          req,
          res,
          next,
          INTERNAL_SERVER_ERROR,
          'Unable delete task.'
        );
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'Tasks not found.');
    }
    ErrorHandler(req, res, next, BAD_REQUEST, getStatusText(BAD_REQUEST));
  }
}

module.exports = new TasksController();
