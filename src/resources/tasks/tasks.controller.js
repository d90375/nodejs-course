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
      if (currTask) {
        return res.status(OK).json(Task.toResponse(currTask));
      }
      ErrorHandler(req, res, next, NOT_FOUND, 'Tasks not found.');
    }
  }

  async createTask(req, res, next) {
    const { boardId } = req.params;
    if (req.body.constructor === Object && Object.keys(req.body).length !== 0) {
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
      const result = await TasksService.createTask(newTask);
      if (result) return res.status(OK).json(Task.toResponse(result));
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
    if (
      req.body.constructor === Object &&
      Object.keys(req.body).length !== 0 &&
      boardId &&
      taskId
    ) {
      const { boardId, title, order, description, userId, columnId } = req.body;
      const result = await TasksService.updateTask({
        boardId,
        taskId,
        title,
        order,
        description,
        userId,
        columnId
      });
      if (result) return res.status(OK).json(Task.toResponse(result));

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

        const result = await TasksService.deleteTask(taskId);
        if (result) return res.status(NO_CONTENT).json(Task.toResponse(result));
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
