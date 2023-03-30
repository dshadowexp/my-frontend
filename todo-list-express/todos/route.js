const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/', controller.createTodoHandler);

router.get('/', controller.getAllTodoHandler);

router.put('/:id', controller.updateTodoHandler);

router.delete('/:id', controller.deleteTodoHandler);

module.exports = router;