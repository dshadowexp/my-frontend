const mongoose = require('mongoose');
const { validateTodo, validateUpdateTodo } = require('./model');
const service = require('./service');

const createTodoHandler = async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    let newTodo = await service.createTodo(req.body);
    res.status(201).send(newTodo);
}

const getAllTodoHandler = async (req, res) => {
    let todos = await service.getAllTodos();
    res.status(200).send(todos);
}

const updateTodoHandler = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send('Invalid request');

    const { error } = validateUpdateTodo(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    const existingTodo = await service.getTodoById(id);
    if (!existingTodo) 
        return res.status(404).send('Todo does not exist');

    let updatedTodo = await service.updateTodo(id, req.body);
    res.status(200).send(updatedTodo);
}

const deleteTodoHandler = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).send('Invalid request');

    const existingTodo = await service.getTodoById(id);
    if (!existingTodo) 
        return res.status(404).send('Todo does not exist');

    await service.deleteTodo(id);
    res.status(200).send();
}

module.exports = {
    createTodoHandler,
    getAllTodoHandler,
    updateTodoHandler,
    deleteTodoHandler
}

