const { Todo } = require('./model');

async function createTodo(todo) {
    let newTodo = new Todo(todo);
    await newTodo.save();
    return newTodo;
}

async function getTodoById(id) {
    return await Todo.findById(id);
}

async function getAllTodos() {
    return await Todo.find();
}

async function updateTodo(_id, todo) {
    let options = { new: true, returnOriginal: false }

    return await Todo.findByIdAndUpdate(
        { _id },
        { $set: todo },
        options
    );
}

async function deleteTodo(_id) {
    await Todo.deleteOne({ _id });
}

module.exports = {
    createTodo,
    updateTodo,
    getAllTodos,
    getTodoById,
    deleteTodo
}