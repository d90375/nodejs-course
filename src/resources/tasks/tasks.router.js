const router = require('express').Router();
const TasksService = require('./tasks.service');
const TasksController = require('./tasks.controller')


router.use(async (req, res, next) => {
  const data = await TasksService.getAllTasks();
  if (data) {
    req.tasks = data;
    next();
  } else return res.status(500).send({ message: 'Error while getting users' });
});



router
  .route('/:boardId/tasks')
  .get(TasksController.getAllTasks)
  .post(TasksController.createTask);

router
  .route('/:boardId/tasks/:taskId')
  .get(TasksController.getTask)
  .put(TasksController.updateTask)
  .delete(TasksController.deleteTask);

module.exports = router;
