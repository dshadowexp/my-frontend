const { Router } = require('express');
const todoController = require('./controller');

const router = Router();

router.post('/', todoController.createTodoHandler);

router.get('/', todoController.getAllTodoHandler);

router.put('/:id', todoController.updateTodoHandler);

router.delete('/:id', todoController.deleteTodoHandler);

module.exports = router;